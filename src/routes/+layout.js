import '$lib/style.css';
export const trailingSlash = 'always';

import framework from '$lib/framework.json';

/** @type {import('./$types').PageLoad} */
export function load() {
	return {
		framework
	};
}
