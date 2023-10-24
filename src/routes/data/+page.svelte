<script>
  import { loadDb } from '$lib/db';

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
