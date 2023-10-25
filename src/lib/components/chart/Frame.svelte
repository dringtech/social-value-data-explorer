<script>
  import { setContext } from 'svelte';

  export let width = 100;
  const padding = 0.05;

  setContext('frame', {
    width,
  });

</script>

<svg viewBox='{ 0 - width * padding } { 0 - width * padding } { width * (1 + 2 * padding) } { width * ( 1 + 2 * padding )}' xmlns="http://www.w3.org/2000/svg">
  <g transform="translate(0 {width}) scale(1 -1)">
    <slot/>
  </g>
</svg>

<style>
  svg {
    aspect-ratio: 1.5;
    stroke-linecap: round;
  }
  svg :global(*) {
    fill: none;
    stroke: black;
    stroke-width: 1;
  }
</style>