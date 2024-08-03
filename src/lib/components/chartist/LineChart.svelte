<script>
    import { onMount } from 'svelte';
    
    import { LineChart } from 'chartist';
    import 'chartist/dist/index.css';

    export let series;
    export let labels;
    export let options = {};

    const config = {
        ...options,
        axisX: {
            autoScaleAxis: true,
            ...options.axisX,
        }
    }

    console.log({ labels, series });

    let chart;
    onMount(() => {
        chart = new LineChart(context, { labels, series }, config);
    })
    let context;
</script>

<div bind:this={context} />

<style>
    div {
        background: white;
    }
</style>