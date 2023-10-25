<script>
  import { getContext } from 'svelte';
  const frame = getContext('frame');
</script>
<path d='M0,0V{frame.width}'></path>
