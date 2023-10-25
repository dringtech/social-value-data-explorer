import { initDB } from './duckdb';
import { base } from '$app/paths';
import { AsyncDuckDBConnection } from '@duckdb/duckdb-wasm';

let getConnection: Promise<AsyncDuckDBConnection>;

export async function loadDb() {
  if (getConnection) {
    console.log('ALREADY LOADING DB');
    return getConnection;
  }
  console.log('LOADING DB');
  const db = await initDB();

  await db.registerFileURL('places.parquet', `${base}/places.parquet`, 4, false);
  // await db.registerFileURL('lad22.geojson', `${base}/lad22.geojson`, 4, false);
  await db.registerFileURL('lad22.parquet', `${base}/lad22.parquet`, 4, false);
  await db.registerFileURL('data.parquet', `${base}/data.parquet`, 4, true);

  const conn = await db.connect();
  return conn;
}

getConnection = loadDb();

export async function runQuery(sql: string) {
  const conn = await getConnection;
  return conn.query(sql)
    .then(
      result => result.toArray().map((row) => row.toJSON())
    )
} 


