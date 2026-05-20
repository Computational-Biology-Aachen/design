import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
	plugins: [sveltekit()],
	resolve: {
		alias: {
			'@computational-biology-aachen/design': resolve('../src/lib/index.ts'),
			'@computational-biology-aachen/design/tokens.css': resolve('../src/lib/tokens.css')
		}
	}
});
