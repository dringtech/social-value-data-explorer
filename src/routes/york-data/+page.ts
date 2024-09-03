import type { PageLoad } from './$types';

// DuckDB is client-side only
export const ssr = false;

export const load: PageLoad = () => {
    const onsCode = 'E06000014';

	return {
		title: 'York data',
		description: 'Prototype visualiser of data for York City Council, covering apprenticeships of residents.',
		onsCode,
	};
};