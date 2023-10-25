<script>
  export let data;
</script>

<h2>Framework Prototype</h2>

<p>
  The framework defines the following themes:
</p>

<ul class="auto-grid">
{#each data.framework.themes as theme (theme.id)}
  <li><a href={ './' + theme.id }>{theme.title}</a></li>
{/each}
</ul>
