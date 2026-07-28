import adapter from "@sveltejs/adapter-static";
import { vitePreprocess } from "@sveltejs/vite-plugin-svelte";

/** @type {import('@sveltejs/kit').Config} */
const config = {
  compilerOptions: {
    // Force runes mode for the project, except for libraries. Can be removed in svelte 6.
    runes: ({ filename }) =>
      filename.split(/[/\\]/).includes("node_modules") ? undefined : true,
  },
  preprocess: [vitePreprocess()],
  kit: {
    adapter: adapter({
      pages: "build",
      assets: "build",
      fallback: "404.html",
      precompress: false,
      strict: true,
    }),
    prerender: {
      handleHttpError: ({ status, path }) => {
        // Demo links in component examples don't map to real routes
        if (status === 404) return;
        throw new Error(`${status} ${path}`);
      },
    },
    paths: {
      base: process.argv.includes("dev") ? "" : "/design",
    },
    version: {
      // Poll for new deploys so long-lived tabs upgrade proactively instead of
      // only recovering reactively after a failed navigation.
      pollInterval: 300_000,
    },
  },
};

export default config;
