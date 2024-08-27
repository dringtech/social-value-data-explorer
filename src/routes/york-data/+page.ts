import type { PageLoad } from './$types';

export const prerender = false;
export const ssr = false;

export const load: PageLoad = async () => {
    const onsCode = 'E06000014';

	return {
		onsCode,
	};
};