<script lang="ts">
  import type { Snippet } from "svelte";

  interface Props {
    children: Snippet;
  }

  let { children }: Props = $props();
</script>

<footer>
  <div class="inner">
    {@render children()}
  </div>
</footer>

<style>
  footer {
    background-color: var(--color-text);
    padding: var(--space-12) 0;
    color: var(--color-text-inverse);
  }

  .inner {
    margin: 0 auto;
    padding: 0 var(--space-4);
    max-width: var(--max-width);
  }

  @media (min-width: 768px) {
    .inner {
      padding: 0;
    }
  }
</style>
