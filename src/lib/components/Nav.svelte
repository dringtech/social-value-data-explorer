<script>
    import { base } from '$app/paths';
    import { page } from '$app/stores';
</script>
<nav>
	<ul>
        {#each $page.data.menu as l}
		<li><a href="{base}{l.href}">{l.title}</a></li>
        {/each}
	</ul>
</nav>

<style>
    ul {
		list-style: none;
		display: flex;
		justify-content: center;
		/* margin-inline: -0.5em; */
	}
	li {
		padding: 0.5em;
        &:hover {
            color: black;
            background: yellow;
	    }
	}
</style>
