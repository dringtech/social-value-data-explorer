import { initDB } from './duckdb';
import { base } from '$app/paths';

export async function loadDb() {
  console.log('LOADING DB');
  const db = await initDB();

  await db.registerFileURL('places.parquet', `${base}/places.parquet`, 4, false);
  // await db.registerFileURL('lad22.geojson', `${base}/lad22.geojson`, 4, false);
  await db.registerFileURL('lad22.parquet', `${base}/lad22.parquet`, 4, false);

  const conn = await db.connect();
  return conn;
}

