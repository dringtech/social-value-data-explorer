<script>
	import Leaflet from '$lib/components/leaflet/Leaflet.svelte';
	import GeoJson from '$lib/components/leaflet/GeoJson.svelte';
	let map;
	import { uk } from '$lib/maps/bounds';
	import { greyscale } from '$lib/maps/basemaps';
	import { lightCarto } from '$lib/maps/labels';
	import { lad } from '$lib/maps/features';
</script>

<div id="map">
	<Leaflet bind:map bounds={uk} baseLayer={greyscale} labelLayer={lightCarto}>
		<GeoJson feature={ lad }></GeoJson>
	</Leaflet>
</div>

<style>
	#map {
		width: 100%;
		height: 800px;
		max-height: 80vh;
		position: relative;
		margin: 1em 0;
	}
</style>
