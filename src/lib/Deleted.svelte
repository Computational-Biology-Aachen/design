<!--
  @component

  Marks inline content as deleted by wrapping its children in a semantic `<del>`
  element. Pairs with [[Inserted]] to show edits.

  ### Props

  - `children: Snippet`
    The inline content to mark as removed.
  - `styleVars?: { [key: string]: string }`
    Optional CSS custom property overrides applied via inline style.

  ### Example

  ```svelte
  <p><Deleted>five</Deleted> <Inserted>six</Inserted> samples.</p>
  ```
-->
<script lang="ts">
  import { toStyleString } from "./utils";
  import type { Snippet } from "svelte";

  interface Props {
    children: Snippet;
    styleVars?: { [key: string]: string };
  }

  let { children, styleVars = {} }: Props = $props();

  let inlineStyle = $derived(toStyleString(styleVars));
</script>

<del style={inlineStyle}>
  {@render children()}
</del>

<style>
</style>
