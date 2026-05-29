<script lang="ts">
  import type { Snippet } from "svelte";

  let {
    width = "full",
    gap = "normal",
    align = "center",
    children,
  }: {
    width?: "full" | "narrow" | "90ch";
    gap?: "normal" | "large";
    align?: "center" | "start";
    children: Snippet;
  } = $props();
</script>

<main class="width-{width} gap-{gap} align-{align}">
  {@render children()}
</main>

<style>
  main {
    display: flex;
    flex-direction: column;
    margin: 0 auto;
    padding: 1rem;
    width: 100%;
    min-height: calc(100vh - var(--nav-height));

    @media (min-width: 50rem) {
      padding: 3rem 1rem;
    }

    @media (min-width: 75rem) {
      padding: 5rem 1rem;
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
  .width-90ch {
    max-width: 90ch;
  }

  .align-center {
    align-items: center;
  }
  .align-start {
    align-items: start;
  }
</style>
