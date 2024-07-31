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

<header>
	<a href="{base}/">Social Value Data Explorer</a>
</header>
<nav>
	<ul>
		<li><a href="{base}/york-data/">York data</a></li>
		<!-- <li><a href="{base}/framework/">Framework</a></li> -->
	</ul>
</nav>

<main>
	<slot />
</main>

<style>
	header {
		font-size: 3em;
		font-weight: 100;
		text-align: center;
	}
	nav > ul {
		list-style: none;
		display: flex;
		justify-content: center;
		/* margin-inline: -0.5em; */
	}
	nav li {
		padding: 0.5em;
	}
	nav li:hover {
		color: black;
		background: yellow;
	}
	a {
		color: inherit;
	}
	main {
		box-sizing: border-box;
	}
</style>
