<script>
  import { getContext } from 'svelte';
  export let values = [];
  export let max;
  const frame = getContext('frame');

  const makeCoordinates = (current, index, array) => [
    frame.width * (index + 0.5) / array.length,
    frame.width * current / max
  ];

  const points = values.map(makeCoordinates).reduce((
    accumulator,
    current,
    index
  ) => {
    if (!accumulator) accumulator == '';
    accumulator += (index == 0) ? 'M' : 'L';
    accumulator += current.join(',');
    return accumulator;
  }, '');

</script>

<path 
  d={ points }>
</path>

<style>
  path {
    stroke: red;
  }
</style>