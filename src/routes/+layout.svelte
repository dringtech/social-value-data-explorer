<script>
  import { base } from '$app/paths';
	import { onNavigate } from '$app/navigation';
  import { setContext } from 'svelte';

  import place from '$lib/stores/place';

	import '$lib/style.css';

  setContext('place', place);

	onNavigate((navigation) => {
		if (!document.startViewTransition) return;

		return new Promise((resolve) => {
			document.startViewTransition(async () => {
				resolve();
				await navigation.complete;
			});
		});
	});
</script>

<div class="page-header">
	<header>
		<h1><a href="{base}/">Social Value Data Explorer</a></h1>
	</header>
	<nav>
		<ul>
		  <li><a href="{base}/place-picker/">Select place</a></li>
      <li><a href="{base}/framework/">Framework</a></li>
    </ul>
	</nav>
</div>
<aside>
  <p>
    Selected place {#if $place}{$place}{:else}(No place selected yet){/if}
  </p>
</aside>
<main>
	<slot />
</main>

<style>
	header,
	nav,
  aside,
	main {
		box-sizing: content-box;
		max-inline-size: 60ch;
		margin-inline: auto;
		padding-inline-start: var(--s1);
		padding-inline-end: var(--s1);
	}
	nav > ul {
		list-style: none;
    display: flex;
    justify-content: start;
    /* gap: 1em; */
	}
  nav li {
    padding: 0.5em;
  }
  nav li:hover {
    color: black;
    background: yellow;
  }
  aside {
    color: black;
    background: yellow;
    padding-block: 0.5em;
  }
	main {
		padding-block: 2ch;
	}
	.page-header {
		background: black;
		color: white;
		padding-block-start: 2ch;
    view-transition-name: header;
	}
	.page-header a {
		color: inherit;
	}
</style>
