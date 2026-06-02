<script lang="ts">
  import type { Snippet } from "svelte";

  let {
    width = "full",
    pad = "full",
    gap = "normal",
    align = "center",
    children,
  }: {
    pad?: "full" | "tight";
    width?: "full" | "narrow" | "90ch";
    gap?: "normal" | "large";
    align?: "center" | "start";
    children: Snippet;
  } = $props();
</script>

<main>
  <div class="inner width-{width} pad-{pad} gap-{gap} align-{align}">
    {@render children()}
  </div>
</main>

<style>
  main {
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin: 0;
    padding: 0 var(--space-4);
    width: 100%;
    min-height: calc(100vh - var(--nav-height));
  }

  .inner {
    display: flex;
    flex-direction: column;
    gap: var(--gap);
    margin: 0 auto;
    width: 100%;
    max-width: var(--max-width);
  }

  /* Conditional styles */
  .pad-tight {
    padding: 1rem;
  }

  .pad-full {
    padding: 1rem;

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
