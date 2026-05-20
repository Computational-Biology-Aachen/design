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
