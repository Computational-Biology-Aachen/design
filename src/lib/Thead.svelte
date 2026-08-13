<!--
  @component

  Table header group (`<thead>`). Use inside [[Table]] to wrap the header
  [[Tr]] row(s).

  ### Props

  - `children: Snippet`
    The header rows.
  - `styleVars?: { [key: string]: string }`
    Optional CSS custom property overrides applied via inline style.
  - `...rest`
    Additional attributes spread onto the `<thead>` element.
-->
<script lang="ts">
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

  let inlineStyle = $derived(
    Object.entries(styleVars)
      .map(([k, v]) => `${k}:${v}`)
      .join(";"),
  );
</script>

<thead
  {...rest}
  style={inlineStyle}
>
  {@render children()}
</thead>

<style>
</style>
