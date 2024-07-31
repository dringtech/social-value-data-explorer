<script>
	import Leaflet from '$lib/components/leaflet/Leaflet.svelte';
	import GeoJson from '$lib/components/leaflet/GeoJson.svelte';
	let map;
	import { uk } from '$lib/maps/bounds';
	import { greyscale } from '$lib/maps/basemaps';
	import { lightCarto } from '$lib/maps/labels';
	import { lad } from '$lib/maps/features';
</script>

<Leaflet mapId="map" bind:map bounds={uk} baseLayer={greyscale} labelLayer={lightCarto}>
	<GeoJson feature={ lad }></GeoJson>
</Leaflet>
