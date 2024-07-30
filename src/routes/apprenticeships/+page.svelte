<script lang="ts">
	import { runQuery } from '$lib/db';
	import Loading from '$lib/components/Loading.svelte';
    import LineChart from '$lib/components/chart/LineChart.svelte';
    import { academicYearFormatter } from '$lib/formatters';

    $: starts = runQuery(`
        PIVOT (
            SELECT year_start::DATE AS year, apps_level AS level, CAST(starts AS INTEGER) AS starts
            FROM read_parquet('autoload-data/apprenticeships_by_year.parquet')
        )
        ON level
        USING first(starts)
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
