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
    display: flex;
    flex-direction: column;
    justify-content: center;
    background-color: var(--color-text);
    padding: var(--space-12) var(--space-4);
    width: 100%;
    min-height: 12rem;
    color: var(--color-text-inverse);
  }

  .inner {
    display: flex;
    flex-direction: column;
    gap: var(--gap);
    margin: 0 auto;
    width: 100%;
    max-width: var(--max-width);
  }
</style>
