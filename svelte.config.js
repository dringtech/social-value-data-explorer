import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

import adapter from 'svelte-adapter-deno';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: vitePreprocess(),
	kit: {
		adapter: adapter({
			pages: 'build',
			assets: 'build',
			fallback: '404.html',
			precompress: false,
			strict: true
		})
	}
};

config.paths = { base: process.argv.includes('dev') ? '' : process.env.BASE_PATH };

export default config;
