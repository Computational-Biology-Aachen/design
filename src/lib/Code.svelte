<!--
  @component

  Inline code span (`<code>`) for short snippets such as identifiers or
  commands. For multi-line code blocks use [[Pre]].

  ### Props

  - `children: Snippet`
    The code content.
  - `pad?: "0" | "1"`
    Padding variant. Defaults to `"0"`.
  - `styleVars?: { [key: string]: string }`
    Optional CSS custom property overrides applied via inline style.

  ### Example

  ```svelte
  <p>Run <Code>npm install</Code> first.</p>
  ```
-->
<script lang="ts">
  import type { Snippet } from "svelte";

  interface Props {
    children: Snippet;
    pad?: "0" | "1";
    styleVars?: { [key: string]: string };
  }

  let { children, pad = "0", styleVars = {} }: Props = $props();

  let inlineStyle = $derived(
    Object.entries(styleVars)
      .map(([k, v]) => `${k}:${v}`)
      .join(";"),
  );
</script>

<code
  class="pad-{pad}"
  style={inlineStyle}
>
  {@render children()}
</code>

<style>
  code {
    --code-pad: 0;
    padding: var(--code-pad);
    font-family: monospace;
  }

  .pad-0 {
    --code-pad: 0;
  }

  .pad-1 {
    --code-pad: 1rem;
  }
</style>
