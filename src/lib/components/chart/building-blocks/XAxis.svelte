<script>
  import { getContext } from 'svelte';
  export let tickCount = 5;
  export let fontSize = 10;
  export let labelFormatter = (x) => x;

  const yAxisCrossing = 0;
  const tickSize = 5;
  
  const range = getContext('range');
  const s = getContext('scaler');
  $: tickSpacing = ($range.x.max - $range.x.min) / (tickCount - 1);
  $: tickXPos = Array.from(Array(tickCount)).map((_, i) => i * tickSpacing + $range.x.min).map($s.x)
</script>
{#if $s}
<g transform="scale(1 -1)">
  <path d='M{ $s.x($range.x.min) } { yAxisCrossing }H{ $s.x($range.x.max) }'></path>
  <path d={ tickXPos.map(x => `M${x} ${yAxisCrossing} v${tickSize}`).join() } />

  <g font-size={ fontSize } font-weight="normal" text-anchor="middle" fill="black" stroke="none">
    {#each tickXPos as x}  
    <text { x } y={ 2 * tickSize } dy={ fontSize }>{ labelFormatter($s.x.inverse(x)) }</text>
    {/each}
  </g>
</g>
{/if}