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
  - `styleVars?: { fontSize?: string; color?: string }`
    Override the default font-size and color via CSS custom properties.

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
    styleVars = {},
  }: {
    href: string;
    color?: "dark" | "light" | "primary" | "secondary";
    children: Snippet;
    styleVars?: { fontSize?: string; color?: string };
  } = $props();

  let cssVars = $derived({
    ...(styleVars.fontSize ? { "--link-font-size": styleVars.fontSize } : {}),
    ...(styleVars.color ? { "--link-color": styleVars.color } : {}),
  });
  let inlineStyle = $derived(
    Object.entries(cssVars)
      .map(([k, v]) => `${k}:${v}`)
      .join(";"),
  );
</script>

<a
  href={href}
  class={`${color}`}
  style={inlineStyle}
>
  {@render children()}
</a>

<style>
  a {
    --link-font-size: 1rem;
    transition: var(--transition);
    padding: 0;
    font-size: var(--link-font-size);
    font-family: var(--font-sans);
    text-decoration: none;
  }
  a:hover {
    text-decoration: underline;
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
