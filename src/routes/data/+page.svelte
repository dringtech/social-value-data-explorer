<script async>
  import { getContext } from 'svelte';
  import { runQuery } from '$lib/db';
  import { numberFormatter, dateFormatter } from '$lib/formatters';

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
<p>Running query</p>
{:then rows}
<ul>
{#each rows as row}
  <li>{ numberFormatter(row[$place]) } apprenticeship starts in the academic year to { dateFormatter(row.date) }</li>
{/each}
</ul>
{/await}
