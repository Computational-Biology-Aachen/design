<script lang="ts">
  import type { Snippet } from "svelte";

  let {
    href,
    color = "primary",
    children,
  }: {
    href: string;
    color?: "dark" | "light" | "primary" | "secondary";
    children: Snippet;
  } = $props();
</script>

<a
  href={href}
  class={`${color}`}
>
  {@render children()}
</a>

<style>
  a {
    /* text-decoration: currentcolor underline dashed auto; */
    transition: var(--transition);
    padding: 0;
    font-family: sans-serif;
    text-decoration: none;
  }
  a:hover {
    text-decoration: underline;
    /* filter: brightness(150%); */
  }
  .dark {
    color: var(--color-text);
  }
  .light {
    color: var(--color-bg);
  }
  .primary {
    color: var(--color-primary);
  }
  .secondary {
    color: var(--color-accent);
  }
</style>
