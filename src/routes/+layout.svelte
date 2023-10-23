<script>
	import { base } from '$app/paths';
	import '$lib/style.css';

	import { onNavigate } from '$app/navigation';

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
		<ul><li><a href="{base}/framework/">Framework</a></li></ul>
	</nav>
</div>
<main>
	<slot />
</main>

<style>
	header,
	nav,
	main {
		box-sizing: content-box;
		max-inline-size: 60ch;
		margin-inline: auto;
		padding-inline-start: var(--s1);
		padding-inline-end: var(--s1);
	}
	nav > ul {
		list-style: none;
	}
	main {
		padding-block: 2ch;
	}
	.page-header {
		background: black;
		color: white;
		padding-block: 2ch;
    view-transition-name: header;
	}
	.page-header a {
		color: inherit;
	}
</style>
