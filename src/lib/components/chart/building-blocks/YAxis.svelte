<script>
  import { getContext } from 'svelte';
  export let tickSpacing = 20;
  export let labelFormatter = x => x.toLocaleString();
  const range = getContext('range');
  const s = getContext('scaler');
  const tickSize = 5;
  const fontSize = 10;

  $: xCrossing = $range.x.min;
  $: ready = $s !== undefined;
  $: tickCount = Math.floor(($range.y.max - $range.y.min) / tickSpacing) + 1;
  $: tickYPos = Array.from(Array(tickCount)).map((_, i) => i * tickSpacing).map($s.y);
  $: tickPath = tickYPos.map(y => `M${$s.x(xCrossing)} ${y}h${-tickSize}`).join('')
</script>
{#if ready}
<path d='M{$s.x($range.x.min)} {$s.y($range.y.min)}V{$s.y($range.y.max)}'/>
<path d={ tickPath } />
<g text-anchor="end" fill="black" stroke="none" font-size={ fontSize } transform="scale(1 -1)">
  {#each tickYPos as y}
    <text x={-2 * tickSize} y={ -y } dy={ fontSize * 0.4 }>{ labelFormatter($s.y.inverse(y)) }</text>
  {/each}
</g>
{/if}