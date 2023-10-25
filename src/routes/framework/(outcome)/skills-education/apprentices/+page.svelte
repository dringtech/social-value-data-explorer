<script async>
	import { getContext } from 'svelte';
	import { runQuery } from '$lib/db';
	import { numberFormatter, dateFormatter } from '$lib/formatters';

	import Loading from '$lib/components/Loading.svelte';
	import Frame from '$lib/components/chart/Frame.svelte';
	import Line from '$lib/components/chart/Line.svelte';
	import XAxis from '$lib/components/chart/XAxis.svelte';
	import YAxis from '$lib/components/chart/YAxis.svelte';

	const place = getContext('place');

	$: starts = runQuery(`
    PIVOT (
      SELECT
        geo_code,
        value::DOUBLE as value,
        strftime(date, '%x') AS date
      FROM read_parquet('data.parquet')
      WHERE geo_code == '${$place}'
      AND variable == 'starts'
    )
    ON geo_code
    USING SUM(value)
    GROUP BY date;
  `);
</script>

{#await starts}
<Loading />
{:then rows}
{#if rows.length > 0}
<p>
  This chart shows the number of apprentices starting by academic year up to { dateFormatter(rows[rows.length-1].date) },
  when there were { numberFormatter(rows[rows.length-1][$place]) } starts.
</p>
	<Frame width="50">
		<XAxis />
		<YAxis />
		<Line values={rows.map((x) => x[$place])} max="10000" />
	</Frame>
{:else}
  <p>No data returned for {$place}</p>
{/if}
{/await}
