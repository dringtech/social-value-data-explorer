<script>
  import { getContext } from 'svelte';
  export let values = [];
  export let colour = 'red';
  export let strokeWidth=3;

  console.log({values});
  const scaler = getContext('scaler');

  const points = values.reduce((
    path,
    {x, y},
    index
  ) => {
    if (index > 0) path += 'L'
    path += `${$scaler.x(x)} ${$scaler.y(y)}`;
    return path;
  }, 'M');
  
</script>

<path 
  d={ points }
  fill='none'
  stroke={ colour }
  stroke-width={ strokeWidth }
></path>
