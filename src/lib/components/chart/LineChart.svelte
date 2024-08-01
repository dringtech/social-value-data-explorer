<script lang="ts">
	import { setContext } from 'svelte';
	import { writable, readonly } from 'svelte/store';
    
    import Frame from './building-blocks/Frame.svelte';
	import XAxis from './building-blocks/XAxis.svelte';
    import YAxis from './building-blocks/YAxis.svelte';
	import LineSeries from './building-blocks/LineSeries.svelte';

    import { pick, transpose } from '../../utils';

    import type { AxisConfig, ChartData, ChartSeries, Range } from '../../types';

    export let data: ChartData = [];
    export let series: ChartSeries[] = [];
    export let xMapper = (x: number) => x;
    export let stacked = false;
    export let xAxis: AxisConfig = {};
    export let yAxis: AxisConfig = {};

    const rangeReducer = (a: Range, v: number): Range => ({
        min: Math.min(a.min, v),
        max: Math.max(a.max, v)
    });

    let seriesData = [];
    $: seriesData = series.map(
        ({x, y, colour}) => ({
            colour,
            values: data.map(
                d => ({
                    x: (xMapper)(d[x]),
                    y: d[y],
                })
            )
        })
    );

    // Set up range context
    const range = writable();
    $: xRange = seriesData.map(x => x.values)
        .flat().map(({x}) => x)
        .reduce(rangeReducer, { min: Infinity, max: -Infinity });
    $: yRange = {
        ...transpose(seriesData.map(x => x.values))
            .map(i => i.map(({y})=> y))
            .map(i => stacked ? i.reduce((a, v) => a + v) : Math.max(...i))
            .reduce(rangeReducer, { min: 0, max: 0 }),
        ...pick(yAxis, 'max', 'min')
    };
    $: $range = {
        x: xRange,
        y: yRange,
    }
    setContext('range', readonly(range));
    $: console.log(seriesData);
</script>
<Frame>
    <g class="axis" stroke="black" stroke-width="1">
    <XAxis { ...pick(xAxis, 'labelFormatter') } tickCount={ seriesData[0].values.length }/>
    <YAxis { ...pick(yAxis, 'tickSpacing') }/>
    </g>
    {#each seriesData as s}
        <LineSeries { ...s }/>
    {/each}
</Frame>
