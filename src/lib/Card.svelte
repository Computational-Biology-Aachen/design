<script lang="ts">
  import type { Snippet } from "svelte";

  let {
    children,
    format = "fixed",
    color = "light",
  }: {
    children: Snippet;
    format?: "full" | "fixed";
    color?: "dark" | "light" | "primary" | "secondary";
  } = $props();
</script>

<div class={`card ${color} ${format}`}>
  <div class="inner">
    {@render children()}
  </div>
</div>

<style>
  .card {
    transform: scale(1);
    transition: transform 0.3s ease;
    box-shadow:
      0px 18px 36px -18px rgba(0, 0, 0, 0.1),
      0px 30px 45px -30px rgba(50, 50, 93, 0.25);
    /* cursor: pointer; */
    border-top: 8px var(--color-primary) solid;
    border-radius: 8px;
    padding: 2rem 2.5rem;
  }
  .card:hover {
    transform: scale(1.03);
    box-shadow:
      0px 18px 36px -18px rgba(0, 0, 0, 0.4),
      0px 30px 45px -30px rgba(50, 50, 93, 0.4);
  }
  .inner {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    margin: 0 auto;
    padding: 2rem 0;
    width: 100%;
    height: 100%;
  }

  .full {
    width: 100%;
  }
  .fixed {
    width: 26rem;
    height: 26rem;
  }
  .dark {
    background-color: var(--color-text);
  }
  .light {
    background-color: color-mix(in srgb, var(--color-bg), white 10%);
  }
  .primary {
    background-color: var(--color-surface);
  }
  .secondary {
    background-color: var(--color-accent);
  }
</style>
