<script>
	import FrameworkNavigation from '$lib/components/FrameworkNavigation.svelte';
	export let data;
</script>

<div class="with-sidebar">
	<nav>
		<FrameworkNavigation tree={data.framework} />
	</nav>
	<article>
		<slot />
    <p>This is a prototype site.</p>
    lorem
	</article>
</div>

<style>
	.with-sidebar {
		display: flex;
		flex-wrap: wrap;
		gap: 1em;
	}
	.with-sidebar > nav {
		flex-basis: 20rem;
		flex-grow: 1;
	}
	.with-sidebar > article {
		flex-basis: 0;
		flex-grow: 999;
	}
</style>
