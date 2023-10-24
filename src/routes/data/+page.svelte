<script>
	import { initDB } from '$lib/duckdb';
	import { base } from '$app/paths';

	async function loadDb() {
		console.log('LOADING DB');
		const db = await initDB();
		await db.registerFileURL('places.parquet', `${base}/places.parquet`, 4, false);
		const conn = await db.connect();
		return conn;
	}

	// Set up the db connection as an empty promise.
	const getConnection = loadDb();

	let searchString = 'Bradford';
	$: results = new Promise(() => {});
	$: findPlace(searchString);

	async function findPlace(name) {
    if (name.length < 2) {
      results = Promise.resolve({
        status: 'Search string is too short',
        data: []
      })
      return;
    } 
		const conn = await getConnection;
		results = conn.query(`
      SELECT *
      FROM read_parquet('places.parquet')
      WHERE name ILIKE '${name}%'
      AND "feature code" LIKE 'PPL%'
      LIMIT 100;
    `).then(
      result => ({
        data: result.toArray().map((row) => row.toJSON())
      })
    );
	}
</script>

<div>
	<label for="place">Place:</label>
	<input id="place" bind:value={searchString} type="text" />
</div>

{#await results}
	<p>Querying database</p>
{:then result}
	<code><pre>{JSON.stringify(result.data, null, 2)}</pre></code>
{/await}
