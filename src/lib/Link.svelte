<!--
  @component

  An inline text hyperlink styled with the design-system palette. Underlines on
  hover; the `color` prop selects which palette colour the link text uses.

  ### Props

  - `href: string`
    Destination URL.
  - `color?: "dark" | "light" | "primary" | "secondary"`
    Link colour. Defaults to `"primary"` (RWTH petrol). Use `"light"` on dark
    backgrounds and `"secondary"` for the accent colour.
  - `children: Snippet`
    The link label.

  ### Example

  ```svelte
  <p>See the <Link href="/docs">documentation</Link>.</p>
  <Link href="/" color="light">Home</Link>
  ```
-->
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
    font-size: 1rem;
    font-family: var(--font-sans);
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
