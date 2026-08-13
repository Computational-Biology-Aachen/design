<!--
  @component

  A centred main heading block that renders an uppercased title as an [[H1]],
  adapting its layout direction below/above 800px.

  ### Props

  - `n: string`
    A section number/identifier associated with the heading.
  - `title: string`
    The heading text (rendered uppercased).
  - `color?: "dark" | "light" | "primary" | "secondary"`
    Heading colour. Defaults to `"dark"`.
  - `styleVars?: {}`
    Optional CSS custom property overrides applied via inline style.

  ### Example

  ```svelte
  <BoxHeadingMain n="01" title="Research" />
  ```
-->
<script lang="ts">
  import { MediaQuery } from "svelte/reactivity";
  import H1 from "./H1.svelte";

  interface Props {
    n: string;
    title: string;
    color?: "dark" | "light" | "primary" | "secondary";
    styleVars?: {};
  }

  let {
    // public prop, documented but not yet rendered
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    n,
    title,
    color = "dark",
    styleVars = {},
  }: Props = $props();

  const small = new MediaQuery("max-width: 800px");

  let inlineStyle = $derived(
    Object.entries(styleVars)
      .map(([k, v]) => `${k}:${v}`)
      .join(";"),
  );
</script>

<div
  class="box"
  style={inlineStyle}
>
  {#if small.current}
    <H1 color={color}>{title.toUpperCase()}</H1>
  {:else}
    <H1 color={color}>{title.toUpperCase()}</H1>
  {/if}
</div>

<style>
  .box {
    display: flex;
    flex-direction: row;
  }

  @media screen and (min-width: 800px) {
    .box {
      flex-direction: column;
      align-items: center;
    }
  }
</style>
