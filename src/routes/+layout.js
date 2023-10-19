export const trailingSlash = 'always';
export const prerender = true;
export const ssr = false;

import '$lib/style.css';
import framework from '$lib/framework.json';

/** @type {import('./$types').PageLoad} */
export function load() {
	return {
		framework
	};
}
