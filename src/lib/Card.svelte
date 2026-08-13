<!--
  @component

  An elevated content card with a coloured top border that lifts and deepens its
  shadow on hover. Can be a fixed square or stretch to fill its container.

  ### Props

  - `children: Snippet`
    The card content.
  - `format?: "full" | "fixed"`
    `"fixed"` renders a 26rem × 26rem square; `"full"` fills the available
    width. Defaults to `"fixed"`.
  - `color?: "dark" | "light" | "primary" | "secondary"`
    Background colour. Defaults to `"light"`.
  - `styleVars?: { cardPadding?: string; cardWidth?: string; cardHeight?: string; innerPadding?: string }`
    Override CSS custom properties for the card and inner content area.

  ### Example

  ```svelte
  <Card format="full">
    <H3>Project</H3>
    <Text>Description…</Text>
  </Card>
  ```
-->
<script lang="ts">
  import type { Snippet } from "svelte";

  let {
    children,
    format = "fixed",
    color = "light",
    styleVars = {},
  }: {
    children: Snippet;
    format?: "full" | "fixed";
    color?: "dark" | "light" | "primary" | "secondary";
    styleVars?: {
      cardPadding?: string;
      cardWidth?: string;
      cardHeight?: string;
      innerPadding?: string;
    };
  } = $props();

  let outerCssVars = $derived({
    ...(styleVars.cardPadding
      ? { "--card-padding": styleVars.cardPadding }
      : {}),
    ...(styleVars.cardWidth ? { "--card-width": styleVars.cardWidth } : {}),
    ...(styleVars.cardHeight ? { "--card-height": styleVars.cardHeight } : {}),
  });
  let innerCssVars = $derived({
    ...(styleVars.innerPadding
      ? { "--card-inner-padding": styleVars.innerPadding }
      : {}),
  });
</script>

<div
  class={`card ${color} ${format}`}
  style={Object.entries(outerCssVars)
    .map(([k, v]) => `${k}:${v}`)
    .join(";")}
>
  <div
    class="inner"
    style={Object.entries(innerCssVars)
      .map(([k, v]) => `${k}:${v}`)
      .join(";")}
  >
    {@render children()}
  </div>
</div>

<style>
  .card {
    --card-padding: 2rem 2.5rem;
    --card-width: 26rem;
    --card-height: 26rem;

    transform: scale(1);
    transition: transform 0.3s ease;
    box-shadow:
      0px 18px 36px -18px rgba(0, 0, 0, 0.1),
      0px 30px 45px -30px rgba(50, 50, 93, 0.25);
    /* cursor: pointer; */
    border-top: 8px var(--color-primary) solid;
    border-radius: 8px;
    padding: var(--card-padding);
  }
  .card:hover {
    transform: scale(1.03);
    box-shadow:
      0px 18px 36px -18px rgba(0, 0, 0, 0.4),
      0px 30px 45px -30px rgba(50, 50, 93, 0.4);
  }
  .inner {
    --card-inner-padding: 2rem 0;

    display: flex;
    flex-direction: column;
    justify-content: space-around;
    margin: 0 auto;
    padding: var(--card-inner-padding);
    width: 100%;
    height: 100%;
  }

  .full {
    width: 100%;
  }
  .fixed {
    width: var(--card-width);
    height: var(--card-height);
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
