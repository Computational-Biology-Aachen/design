<!--
  @component

  Table body group (`<tbody>`). Use inside [[Table]] to wrap the data [[Tr]]
  rows.

  ### Props

  - `children: Snippet`
    The body rows.
  - `styleVars?: { [key: string]: string }`
    Optional CSS custom property overrides applied via inline style.
  - `...rest`
    Additional attributes spread onto the `<tbody>` element.
-->
<script lang="ts">
  import { toStyleString } from "./utils";
  import type { Snippet } from "svelte";

  let {
    children,
    styleVars = {},
    ...rest
  }: {
    children: Snippet;
    styleVars?: { [key: string]: string };
    [key: string]: unknown;
  } = $props();

  let inlineStyle = $derived(toStyleString(styleVars));
</script>

<tbody
  {...rest}
  style={inlineStyle}
>
  {@render children()}
</tbody>

<style>
</style>
