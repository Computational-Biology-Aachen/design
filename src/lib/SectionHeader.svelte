<script lang="ts">
  import type { Snippet } from "svelte";

  let {
    variant = "light",
    width = "full",
    gap = "normal",
    children,
  }: {
    variant?: "light" | "surface" | "dark" | "primary" | "accent";
    width?: "full" | "narrow";
    gap?: "normal" | "large";
    children: Snippet;
  } = $props();
</script>

<header>
  <div class="inner width-{width} gap-{gap}">
    {@render children()}
  </div>
</header>

<style>
  header {
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin: 0;
    background-color: var(--color-primary);
    padding: var(--space-8) 0;
    min-height: 12rem;
  }
  .inner {
    margin: 0 auto;
    padding: 0 1rem;
    width: 100%;
    max-width: var(--max-width);
  }

  @media (min-width: 768px) {
    .inner {
      padding: 0;
    }
  }
  .gap-normal {
    gap: var(--gap);
  }

  .gap-large {
    gap: var(--gap-lg);
  }

  .width-full {
    max-width: var(--max-width);
  }

  .width-narrow {
    max-width: 100ch;
  }
</style>
