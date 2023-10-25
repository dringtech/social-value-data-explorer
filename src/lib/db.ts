import { initDB } from './duckdb';
import { base } from '$app/paths';

export async function loadDb() {
  console.log('LOADING DB');
  const db = await initDB();

  await db.registerFileURL('places.parquet', `${base}/places.parquet`, 4, false);
  // await db.registerFileURL('lad22.geojson', `${base}/lad22.geojson`, 4, false);
  await db.registerFileURL('lad22.parquet', `${base}/lad22.parquet`, 4, false);
  await db.registerFileURL('data.parquet', `${base}/data.parquet`, 4, true);

  const conn = await db.connect();
  return conn;
}

const getConnection = loadDb();

export async function runQuery(sql: string) {
  const conn = await getConnection;
  return conn.query(sql)
    .then(
      result => result.toArray().map((row) => row.toJSON())
    )
} 


