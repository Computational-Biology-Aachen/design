<script lang="ts">
  import type { Snippet } from "svelte";

  interface Props {
    src?: string;
    children: Snippet;
  }

  let { src, children }: Props = $props();
</script>

<div
  class="hero"
  style:background-image={src
    ? `linear-gradient(
      to bottom,
      rgba(245,246,252,0.4),
      color-mix(in srgb, var(--color-primary) 75%, transparent)
      ), url(${src})`
    : undefined}
>
  <div class="inner">
    {@render children()}
  </div>
</div>

<style>
  .hero {
    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;
    background-color: var(--color-primary);
    width: 100%;
  }

  .inner {
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin: 0 auto;
    padding: var(--space-8) var(--space-4);
    max-width: var(--max-width);
    min-height: 50vh;
    max-height: 800px;
  }
</style>
