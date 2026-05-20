<script lang="ts">
  import { H1 } from "@computational-biology-aachen/design";
  import { MediaQuery } from "svelte/reactivity";

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
