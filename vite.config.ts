import { sveltekit } from "@sveltejs/kit/vite";
import { resolve } from "path";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [sveltekit()],
  resolve: {
    alias: {
      "@computational-biology-aachen/design": resolve("./src/lib/"),
      "@computational-biology-aachen/design/tokens.css": resolve(
        "./src/lib/tokens.css",
      ),
    },
  },
});
