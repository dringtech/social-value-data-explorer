<script async>
	import { getContext } from 'svelte';
	import { runQuery } from '$lib/db';
	import { numberFormatter, dateFormatter } from '$lib/formatters';

	import Loading from '$lib/components/Loading.svelte';
  import LineChart from '$lib/components/chart/LineChart.svelte';
	import XAxis from '../../../../../lib/components/chart/building-blocks/XAxis.svelte';

	const place = getContext('place');

	$: starts = runQuery(`
    PIVOT (
      SELECT
        geo_code,
        value::DOUBLE as value,
        date::DATE AS date
      FROM read_parquet('autoload-data/data.parquet')
      WHERE geo_code == '${$place}'
      AND variable == 'starts'
    )
    ON geo_code
    USING SUM(value)
    GROUP BY date;
  `);
  $: series = [{
    x: 'date',
    y: $place,
  }]
  $: xAxis = {
    labelFormatter: (x) => new Date(x).toLocaleDateString(undefined, { year: "numeric" })
  }
  $: yAxis = {
    tickSpacing: 200,
  }
</script>

{#await starts}
<Loading />
{:then rows}
{#if rows.length > 0}
<p>
  This chart shows the number of apprentices starting by academic year up to { dateFormatter(rows[rows.length-1].date) },
  when there were { numberFormatter(rows[rows.length-1][$place]) } starts.
</p>
  <LineChart data={ rows } { series } { xAxis } { yAxis }/>
{:else}
  <p>No data returned for {$place}</p>
{/if}
{/await}
