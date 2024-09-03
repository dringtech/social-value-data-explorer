<script>
	import { onNavigate } from '$app/navigation';
	import { setContext } from 'svelte';
	import { base } from '$app/paths';

	import place from '$lib/stores/place';

	import Nav from '$lib/components/Nav.svelte';

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
<Nav />
<main>
	<slot />
</main>

<style>
	header {
		font-size: 3em;
		font-weight: 100;
		text-align: center;
	}
	a {
		color: inherit;
	}
	main {
		box-sizing: border-box;
	}
</style>
