import { initDB } from './duckdb';
import { base } from '$app/paths';
import { AsyncDuckDBConnection } from '@duckdb/duckdb-wasm';

import files from './data-manifest.json';

let getConnection: Promise<AsyncDuckDBConnection>;

export async function loadDb() {
  if (getConnection) {
    console.log('ALREADY LOADING DB');
    return getConnection;
  }
  console.log('LOADING DB');
  const db = await initDB();

  await Promise.all(
    files.map((f) => {
      db.registerFileURL(f, `${base}/${f}`, 4, false);
    })
  )

  const conn = await db.connect();
  return conn;
}

getConnection = loadDb();

const cleanOutput = result => result
  .toArray()
  .map((row) => row.toJSON());

export async function runQuery(sql: string) {
  const conn = await getConnection;
  return conn.query(sql)
    .then(cleanOutput);
}

export async function buildPreparedStatement(sql: string) {
  const conn = await getConnection;
  const stmt = await conn.prepare(sql);
  
  const query = async (...params: any[]) => stmt
    .query(...params)
    .then(cleanOutput);
  return {
    query,
    close: async () => stmt.close(),
  }
}