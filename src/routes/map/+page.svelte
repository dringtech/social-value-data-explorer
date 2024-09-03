<script>
	import Leaflet from '$lib/components/leaflet/Leaflet.svelte';
	import GeoJson from '$lib/components/leaflet/GeoJson.svelte';
	export let data;

	// const l = await read('/geojson/lad.geojson');
	// $: console.log(l);


	let map;
	import { uk } from '$lib/maps/bounds';
	import { greyscale } from '$lib/maps/basemaps';
	import { lightCarto } from '$lib/maps/labels';
</script>

<Leaflet mapId="map" bind:map bounds={uk} baseLayer={greyscale} labelLayer={lightCarto}>
	<GeoJson feature={ data.features.lad }></GeoJson>
</Leaflet>
