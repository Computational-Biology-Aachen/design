<!--
  @component

  A semantic `<aside>` wrapper for tangential content such as sidebars or notes.

  ### Props

  - `children: Snippet`
    The aside content.
  - `styleVars?: {}`
    Optional CSS custom property overrides applied via inline style.

  ### Example

  ```svelte
  <Aside>Related: see our publications.</Aside>
  ```
-->
<script lang="ts">
  import type { Snippet } from "svelte";

  interface Props {
    children: Snippet;
    styleVars?: {};
  }

  let { children, styleVars = {} }: Props = $props();

  let inlineStyle = $derived(
    Object.entries(styleVars)
      .map(([k, v]) => `${k}:${v}`)
      .join(";"),
  );
</script>

{@render children()}
