import * as duckdb from '@duckdb/duckdb-wasm';
import duckdbWASM from '/node_modules/@duckdb/duckdb-wasm/dist/duckdb-mvp.wasm?url';
import duckdbWorker from '/node_modules/@duckdb/duckdb-wasm/dist/duckdb-browser-mvp.worker.js?worker';

import type { AsyncDuckDB } from '@duckdb/duckdb-wasm';

let db: AsyncDuckDB | null = null;

const initDB = async () => {
	if (db) {
		return db; // Return existing database, if any
	}

	// Instantiate worker
	const logger = new duckdb.ConsoleLogger(duckdb.LogLevel.DEBUG);
	const worker = new duckdbWorker();

	// and asynchronous database
	db = new duckdb.AsyncDuckDB(logger, worker);
	await db.instantiate(duckdbWASM);
	return db;
};

export { initDB }; // so we can import this elsewhere