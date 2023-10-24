<script>
  import { loadDb } from '$lib/db';

  import Leaflet from '$lib/components/leaflet/Leaflet.svelte';
	import Marker from '$lib/components/leaflet/Marker.svelte';
	// import GeoJson from '$lib/components/leaflet/GeoJson.svelte';
	import { uk } from '$lib/maps/bounds';
	import { greyscale } from '$lib/maps/basemaps';
	import { lightCarto } from '$lib/maps/labels';
  
	let map;

  // Set up the db connection as an empty promise.
	const getConnection = loadDb();

	let searchString = '';
  let places = [];

	$: placeQuery = new Promise(() => {});
	$: findPlace(searchString);

	async function findPlace(name) {
		const conn = await getConnection;
		placeQuery = conn
			.query(
				`
          SELECT
          LAD22CD AS code,
          LAD22NM AS name,
          {
            'lng': LONG,
            'lat': LAT
          } AS latLng
          FROM read_parquet('lad22.parquet')
          WHERE
          LAD22NM ILIKE '${name}%';
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

<div id="map">
	<Leaflet bind:map bounds={uk} baseLayer={greyscale} labelLayer={lightCarto} >
    {#each places as place (place.code)}
      <Marker latLng={ place.latLng }></Marker>
    {/each}
  </Leaflet>
</div>

<pre>
{JSON.stringify(places, null, 2)}
</pre>
<style>
	#map {
		width: 100%;
		height: 800px;
		max-height: 80vh;
		position: relative;
		margin: 1em 0;
	}
</style>
