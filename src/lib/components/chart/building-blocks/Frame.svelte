<script>
  import { getContext, setContext } from 'svelte';
  import { writable, readonly } from 'svelte/store';
  import { scaler } from "../../../utils";

  export let width = 400;
  export let aspectRatio = 4/3;
  const margins = { left: 0.15, right: 0.15, top: 0.15, bottom: 0.15 };

  const range = getContext('range');

  $: height = width / aspectRatio;
  
  // Setup frame context
  const size = writable({ width, height });
  $: $size = { width, height };
  setContext('frame', readonly(size));

  $: viewBox = [
    - margins.left * $size.width,
    - margins.top * $size.width,
    $size.width + $size.width * (margins.left + margins.right),
    $size.height + $size.width * (margins.top + margins.bottom),
  ]

  // Setup x and y scalers
  const scalers = writable();
  $: $scalers = {
    x: scaler($range.x.min, $range.x.max, 0, $size.width ),
    y: scaler($range.y.min, $range.y.max, 0, $size.height ),
  }
  setContext('scaler', readonly(scalers));
</script>

<svg class="dt-viz" viewBox={ viewBox.join(' ') } xmlns="http://www.w3.org/2000/svg">
  <g transform="translate(0 {height}) scale(1 -1)">
    <slot/>
  </g>
</svg>
