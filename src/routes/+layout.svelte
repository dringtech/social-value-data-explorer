<script>
	import { setContext } from 'svelte';
	import { base } from '$app/paths';
	import { page } from '$app/stores';
	import place from '$lib/stores/place';
	import Nav from '$lib/components/Nav.svelte';

	setContext('place', place);

	import '$lib/style.css';
</script>

<svelte:head>
	<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/water.css@2/out/water.css" />
	<title>{$page.data.title || 'Social Value Date Explorer'}</title>
	<meta name="description" content={$page.data.description} />
</svelte:head>

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
