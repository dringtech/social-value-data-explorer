<script>
	import { initDB } from '$lib/duckdb';
	import { base } from '$app/paths';
	import Leaflet from '$lib/components/leaflet/Leaflet.svelte';
	import Marker from '$lib/components/leaflet/Marker.svelte';
	// import GeoJson from '$lib/components/leaflet/GeoJson.svelte';
	let map;
	import { uk } from '$lib/maps/bounds';
	import { greyscale } from '$lib/maps/basemaps';
	import { lightCarto } from '$lib/maps/labels';

	async function loadDb() {
		console.log('LOADING DB');
		const db = await initDB();
		// await db.registerFileURL('lad22.geojson', `${base}/lad22.geojson`, 4, false);
		await db.registerFileURL('lad22.parquet', `${base}/lad22.parquet`, 4, false);
		const conn = await db.connect();
		// await conn.query(`
		// -- spatial not officially available for WASM
		//   -- INSTALL spatial;
		//   LOAD spatial;
		// `);
		return conn;
	}

	// Set up the db connection as an empty promise.
	const getConnection = loadDb();

	let searchString = '';

	$: placeQuery = new Promise(() => {});
	$: places = await findPlace(searchString);

	async function findPlace(name) {
		if (name.length < 2) {
			placeQuery = Promise.reject(
				new Error('Please enter a search string of more than two letters')
			);
			return;
		}
		const conn = await getConnection;
		placeQuery = conn
			.query(
				`
          SELECT
          LAD22CD,
          LAD22NM,
          LONG,
          LAT,
          FROM read_parquet('lad22.parquet')
          WHERE
          LAD22NM ILIKE '${name}%'
          LIMIT 100;
        `
			)
			.then((result) => result.toArray().map((row) => row.toJSON()))
			.then((result) => {
				if (result.length < 1) {
					throw new Error('No places found');
				}
				return result;
			})
			.then((result) => {
				const features = result.map((x) => ({
          ...x,
          id: x.LAD22CD,
          coordinates: { lat: x.LAT, lng: x.LONG },
				}));
				return features;
			});
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
    <!-- {#await placeQuery then places} -->
      {#each places as place (place.id)}
        <Marker latLng={ place.coordinates }></Marker>
      {/each}
    <!-- {/await} -->
  </Leaflet>
</div>

<code><pre>
{JSON.stringify(places)}
</pre></code>


<style>
	#map {
		width: 100%;
		height: 800px;
		max-height: 80vh;
		position: relative;
		margin: 1em 0;
	}
</style>
