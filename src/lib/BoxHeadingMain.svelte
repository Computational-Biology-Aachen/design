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

  ### Example

  ```svelte
  <BoxHeadingMain n="01" title="Research" />
  ```
-->
<script lang="ts">
  import { MediaQuery } from "svelte/reactivity";
  import H1 from "./H1.svelte";

  let {
    n,
    title,
    color = "dark",
  }: {
    n: string;
    title: string;
    color?: "dark" | "light" | "primary" | "secondary";
  } = $props();

  const small = new MediaQuery("max-width: 800px");
</script>

<div class="box">
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
