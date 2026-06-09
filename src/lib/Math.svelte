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

  ### Example

  ```svelte
  <Math tex="\\frac{dC}{dt} = v_1 - v_2" display={true} />
  ```
-->
<script lang="ts">
  import katex from "katex";
  import "katex/dist/katex.min.css";

  let {
    tex,
    display,
    fontSize = "1rem",
  }: { fontSize?: string; tex: string; display: boolean } = $props();

  let el: HTMLElement;

  $effect(() => {
    if (!el) return;
    katex.render(tex, el, {
      displayMode: display,
      throwOnError: false,
      trust: true,
      output: "html",
    });
  });
</script>

<span
  bind:this={el}
  style:font-size={fontSize}
  style:margin="0"
  style:padding="0"
></span>

<style>
  span {
    display: inline-block;
    margin: 0;
    padding: 0;
    max-width: 100%;
    /* transform-origin: left; */
    /* transform: scale(0.75); */
  }
</style>
