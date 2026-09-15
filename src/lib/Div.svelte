<!--
  @component

  A minimal vertical flex container that stacks its children in a column with the
  design-system `--gap` spacing. The simplest layout primitive.

  ### Props

  - `styleVars?: { boxGap?: string }`
    Override the gap CSS custom property.
  - `children: Snippet`
    The content to stack vertically.

  ### Example

  ```svelte
  <Div>
    <H2>Title</H2>
    <Text>Body copy.</Text>
  </Div>
  ```
-->
<script lang="ts">
  import { toStyleString } from "./utils";
  import type { Snippet } from "svelte";
  let {
    styleVars = {},
    children,
  }: {
    styleVars?: {
      boxGap?: string;
    };
    children: Snippet;
  } = $props();

  let boxCssVars = $derived({
    ...(styleVars.boxGap ? { "--box-gap": styleVars.boxGap } : {}),
  });
</script>

<div style={toStyleString(boxCssVars)}>
  {@render children()}
</div>

<style>
  div {
    --box-gap: var(--gap);

    display: flex;
    flex-direction: column;
    gap: var(--box-gap);
    width: 100%;
  }
</style>
