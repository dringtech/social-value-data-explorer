<script lang="ts">
	import { runQuery } from '$lib/db';
    import Loading from '$lib/components/Loading.svelte';
    import LineChart from '$lib/components/chartist/LineChart.svelte';
    import DataTable from '$lib/components/DataTable.svelte';
    import { academicYearFormatter } from '$lib/formatters';

    const ons_code = 'E06000014';

    let dimension = 'starts';

    $: starts = runQuery(`
        PIVOT (
            SELECT year::DATE as year, apps_level AS level, CAST(value AS INTEGER) AS value
            FROM read_parquet('autoload-data/apprenticeships/**/*.parquet')
            WHERE variable == '${dimension}'
            AND ons_code == '${ons_code}'
        )
        ON level
        USING first(value)
        GROUP BY year;
    `);

    $: achievements = runQuery(`
        PIVOT (
            SELECT year::DATE as year, apps_level AS level, CAST(value AS INTEGER) AS value
            FROM read_parquet('autoload-data/apprenticeships/**/*.parquet')
            WHERE variable == 'achievements'
            AND ons_code == '${ons_code}'
        )
        ON level
        USING first(value)
        GROUP BY year;
    `);

    $: active = runQuery(`
        PIVOT (
            SELECT year::DATE as year, apps_level AS level, CAST(value AS INTEGER) AS value
            FROM read_parquet('autoload-data/apprenticeships/**/*.parquet')
            WHERE variable == 'active'
            AND ons_code == '${ons_code}'
        )
        ON level
        USING first(value)
        GROUP BY year;
    `);


    const series = [
        { x: 'year', y: 'Intermediate Apprenticeship', colour: 'blue' },
        { x: 'year', y: 'Advanced Apprenticeship', colour: 'green' },
        { x: 'year', y: 'Higher Apprenticeship', colour: 'red' },
    ]

    const tableColumns = ['Academic Year', ...series.map(s => s.y )];
    const addAcademicYear = d => ({ ...d, "Academic Year": academicYearFormatter(d.year) });

    const options = {
        height: '20em',
    }
</script>

<h1>York data</h1>

<p>This page shows data related to York.</p>

<h2>Apprenticeships</h2>
<h3>Construction apprenticeship starts by year</h3>

{#await starts}
    <Loading />
{:then data}
    <LineChart
        series={ series.map(s => ({
            name: s,
            data: data.map(d => ({x: d[s.x], y: d[s.y]}))
        })) }
        labels={ data.map(x => academicYearFormatter(x.year)) }
        { options }
    />
    <DataTable data={ data.map(addAcademicYear) } columns={ tableColumns } />
{:catch e}
    <p class="error">{ e }</p>
{/await}

<h3>Construction apprenticeship achievements by year</h3>

{#await achievements}
    <Loading />
{:then data}
    <LineChart
        series={ series.map(s => data.map(d => ({x: d[s.x], y: d[s.y]}))) }
        labels={ data.map(x => academicYearFormatter(x.year)) }
        { options }
    />
    <DataTable data={ data.map(addAcademicYear) } columns={ tableColumns } />
{:catch e}
    <p class="error">{ e }</p>
{/await}

<h3>Construction apprenticeship active by year (modelled)</h3>

<p>
    The chart below is an estimate of the number of apprentices active during a year.
    It is based on an (wrong and naive!) assumption that an apprenticeship lasts 2 years.
    It will be refined to take account of shorter durations.
</p>

{#await active}
    <Loading />
{:then data}
    <LineChart
        series={ series.map(s => data.map(d => ({x: d[s.x], y: d[s.y]}))) }
        labels={ data.map(x => academicYearFormatter(x.year)) }
        { options }
    />
    <DataTable data={ data.map(addAcademicYear) } columns={ tableColumns } />
{:catch e}
    <p class="error">{ e }</p>
{/await}
