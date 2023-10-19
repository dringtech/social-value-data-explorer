<script lang='ts'>
	export let tree;
	const siteRoot = '/framework';
	const getLink = (...segments) => [siteRoot, ...segments, ''].join('/');
</script>

<ul class:hide={!open}>
  <li class="level-1"><a href={siteRoot}>Home</a></li>
  {#each tree.themes as theme (theme.id)}
    <li class="level-1">
      <a href={getLink(theme.id)}>{theme.title}</a>
    </li>
    {#if theme.outcomes}
      <ul>
        {#each theme.outcomes as outcome (outcome.id)}
          <li><a href={getLink(theme.id, outcome.id)}>{outcome.title}</a></li>{/each}
      </ul>
    {/if}
  {/each}
</ul>

<style>
	.level-1 {
		font-size: 1.2em;
		border-block-start: 1px solid black;
	}
	* + .level-1 {
		margin-top: 1em;
	}
	ul {
		list-style: none;
	}
	a {
		text-align: left;
		text-decoration: none;
		color: inherit;
	}
	a:hover {
		text-decoration: underline;
		background: yellow;
	}
</style>
