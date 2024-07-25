<script lang="ts">
	import { getContext } from "svelte";

    const place = getContext('place');
</script>
<aside>
	<p>
    {#if $place}
		Selected place {$place} <a href="/place-picker/">Change</a>.
    {:else}
        No place selected: <a href="/place-picker/">Pick</a>
    {/if}
	</p>
</aside>

<style>
    aside {
        color: black;
        background: yellow;
        padding-block: 0.5em;
        padding-inline: 1em;
    }
</style>
