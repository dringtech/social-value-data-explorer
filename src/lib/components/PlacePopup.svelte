<script>
  export let name;
  export let callback;
</script>

<div>
  <p>{ name }</p>
  <button on:click={callback}>Select</button>
</div>
