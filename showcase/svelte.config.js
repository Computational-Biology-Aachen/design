import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
export default {
	preprocess: [vitePreprocess()],
	kit: {
		adapter: adapter({ fallback: '404.html' }),
		prerender: {
			handleHttpError: ({ status, path }) => {
				// Demo links in component examples don't map to real routes
				if (status === 404) return;
				throw new Error(`${status} ${path}`);
			}
		}
	}
};
