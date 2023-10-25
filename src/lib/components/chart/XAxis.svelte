<script>
  import { getContext } from 'svelte';
  const frame = getContext('frame');
</script>
<path d='M0,0H{frame.width}'></path>
