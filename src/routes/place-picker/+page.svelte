<script>
	import { getContext } from 'svelte';
	import { loadDb } from '$lib/db';

	// Retrieve user store from context
	const place = getContext('place');

	import Leaflet from '$lib/components/leaflet/Leaflet.svelte';
	import Marker from '$lib/components/leaflet/Marker.svelte';
	import Popup from '$lib/components/leaflet/Popup.svelte';
	import Tooltip from '$lib/components/leaflet/Tooltip.svelte';
	import PlacePopup from '$lib/components/PlacePopup.svelte';
	import GeoJson from '$lib/components/leaflet/GeoJson.svelte';

	import { uk } from '$lib/maps/bounds';
	import { greyscale } from '$lib/maps/basemaps';
	import { lightCarto } from '$lib/maps/labels';
	import { lad } from '$lib/maps/features';

	let map;

	// Set up the db connection as an empty promise.
	const getConnection = loadDb();

	let searchString = '';
	let places = [];

	$: placeQuery = new Promise(() => {});
	$: findPlace(searchString);

	const setPlace = (code) => {
		console.log(code);
		place.set(code);
	};

	async function findPlace(name) {
		const conn = await getConnection;
		placeQuery = conn
			.query(
				`
          SELECT
          LAD24CD AS code,
          LAD24NM AS name,
          {
            'lng': LONG,
            'lat': LAT
          } AS latLng
          FROM read_parquet('autoload-data/lad.parquet')
          WHERE
          LAD24NM ILIKE '${name}%';
        `
			)
			.then((result) => result.toArray().map((row) => row.toJSON()))
			.then((result) => {
				if (result.length < 1) {
					throw new Error('No places found');
				}
				return result;
			});

		try {
			places = await placeQuery;
		} catch {
			places = [];
		}
	}
</script>

<div>
	<label for="place">Place:</label>
	<input id="place" bind:value={searchString} type="text" />
</div>

{#await placeQuery}
	<p>Querying database</p>
{:then result}
	<p>Loaded {result.length} places</p>
{:catch error}
	<p>{error.message}</p>
{/await}

<Leaflet mapId="map" bind:map bounds={uk} baseLayer={greyscale} labelLayer={lightCarto}>
	{#each places as place (place.code)}
		<Marker latLng={place.latLng}>
			<Popup>
				<PlacePopup name={place.name} callback={() => setPlace(place.code)} />
			</Popup>
			<Tooltip>{place.name}</Tooltip>
		</Marker>
	{/each}
	<GeoJson feature={ lad }></GeoJson>
</Leaflet>

<style>
	:global(#map) {
		width: 100%;
		height: 800px;
		max-height: 80vh;
		position: relative;
		margin: 1em 0;
		font-size: 1em;
		font-family: inherit;
	}
</style>
