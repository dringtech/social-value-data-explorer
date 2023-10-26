import { initDB } from './duckdb';
import { base } from '$app/paths';
import { AsyncDuckDBConnection } from '@duckdb/duckdb-wasm';

const defaultFiles = [
  'autoload-data/places.parquet',
  'autoload-data/lad22.parquet',
  'autoload-data/data.parquet'
]

let getConnection: Promise<AsyncDuckDBConnection>;

export async function loadDb() {
  if (getConnection) {
    console.log('ALREADY LOADING DB');
    return getConnection;
  }
  console.log('LOADING DB');
  const db = await initDB();

  await Promise.all(
    defaultFiles.map((f) => {
      db.registerFileURL(f, `${base}/${f}`, 4, false);
    })
  )

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


