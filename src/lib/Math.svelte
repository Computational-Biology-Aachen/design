<!--
  @component

  Renders a LaTeX expression to HTML using KaTeX (errors are rendered inline
  rather than thrown). Supports inline and display modes.

  ### Props

  - `tex: string`
    The LaTeX source to render.
  - `display: boolean`
    `true` for block/display math, `false` for inline.
  - `fontSize?: string`
    CSS font size for the rendered math. Defaults to `"1rem"`.
  - `styleVars?: { fontSize?: string }`
    Override the default font-size via CSS custom property.

  ### Example

  ```svelte
  <Math tex="\\frac{dC}{dt} = v_1 - v_2" display={true} />
  ```
-->
<script module lang="ts">
  import katex from "katex";
  import "katex/dist/katex.min.css";

  // KaTeX's web fonts are registered by the imported stylesheet but aren't
  // fetched until something is laid out with them, so the very first render
  // can paint with invisible glyphs (FOIT) until an unrelated repaint (e.g.
  // remounting the component) happens to pull them in. Explicitly loading
  // every KaTeX FontFace sidesteps that: it triggers the fetch directly
  // instead of waiting for layout to discover it, so callers know exactly
  // when it's safe to re-render with real glyphs.
  //
  // This has to stay lazy rather than run at module top-level: inserting
  // the imported stylesheet registers its @font-face rules into
  // `document.fonts` asynchronously, so reading `document.fonts` in the
  // same synchronous pass as the CSS import can observe it still empty.
  // Deferring to first use (inside a mounted <Math>'s $effect, i.e. after
  // at least one task boundary) reliably lands after that registration.
  let katexFontsLoadedPromise: Promise<unknown> | undefined;
  function loadKatexFonts(): Promise<unknown> {
    if (!katexFontsLoadedPromise) {
      katexFontsLoadedPromise =
        typeof document === "undefined"
          ? Promise.resolve()
          : Promise.all(
              Array.from(document.fonts)
                .filter((font) => font.family.includes("KaTeX"))
                .map((font) => font.load().catch(() => undefined)),
            );
    }
    return katexFontsLoadedPromise;
  }
</script>

<script lang="ts">
  import { toStyleString } from "./utils";

  let {
    tex,
    display,
    fontSize = "1rem",
    styleVars = {},
  }: {
    fontSize?: string;
    tex: string;
    display: boolean;
    styleVars?: { fontSize?: string };
  } = $props();

  let el: HTMLElement;

  let cssVars = $derived({
    ...(styleVars.fontSize ? { "--math-font-size": styleVars.fontSize } : {}),
  });
  let inlineStyle = $derived(toStyleString(cssVars));

  $effect(() => {
    if (!el) return;
    const target = el;
    const opts = {
      displayMode: display,
      throwOnError: false,
      trust: true,
      output: "html" as const,
    };
    katex.render(tex, target, opts);
    loadKatexFonts().then(() => {
      if (el !== target) return;
      katex.render(tex, target, opts);
    });
  });
</script>

<span
  bind:this={el}
  style:font-size={fontSize}
  style:margin="0"
  style:padding="0"
  style={inlineStyle}
></span>

<style>
  span {
    display: inline-block;
    margin: 0;
    padding: 0;
    max-width: 100%;
  }
</style>
