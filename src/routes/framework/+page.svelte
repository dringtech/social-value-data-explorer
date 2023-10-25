<script>
  export let data;
</script>

<h2>Framework Prototype</h2>

<p>
  The framework defines the following themes:
</p>

<ul class="grid">
{#each data.framework.themes as theme (theme.id)}
  <li><a href={ './' + theme.id }>{theme.title}</a></li>
{/each}
</ul>

<style>
  .grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(15em, 1fr));
    gap: 1em;
    list-style: none;
  }
  .grid > * {
    margin-block-start: 0;
  }
  .grid li {
    color: yellow;
    background: black;
    padding: 1em;
    min-height: 5ex;
  }
  a {
    color: inherit;
  }
</style>