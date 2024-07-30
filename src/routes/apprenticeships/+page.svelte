<script lang="ts">
	import { runQuery } from '$lib/db';
    import Loading from '$lib/components/Loading.svelte';
    import LineChart from '$lib/components/chart/LineChart.svelte';
    import { academicYearFormatter } from '$lib/formatters';

    const ons_code = 'E06000014';

    $: starts = runQuery(`
        PIVOT (
            SELECT year::DATE as year, apps_level AS level, CAST(value AS INTEGER) AS value
            FROM read_parquet('autoload-data/apprenticeships/**/*.parquet')
            WHERE variable == 'starts'
            AND ons_code == '${ons_code}'
        )
        ON level
        USING first(value)
        GROUP BY year;
    `);

    const series = [
        { x: 'year', y: 'Higher Apprenticeship', colour: 'red' },
        { x: 'year', y: 'Intermediate Apprenticeship', colour: 'blue' },
        { x: 'year', y: 'Advanced Apprenticeship', colour: 'green' },
    ]
    const xMapper = (x: Date) => x.valueOf();
    const xAxis = {
        labelFormatter: academicYearFormatter
    }
</script>

{#await starts}
    <Loading />
{:then data}
    <LineChart { data } { series } { xMapper } { xAxis }/>
{:catch e}
    <p class="error">{ e }</p>
{/await}
