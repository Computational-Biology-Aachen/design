<!--
  @component

  A flexible horizontal flex row with configurable gap, alignment, justification
  and wrapping. With `stack` enabled it collapses to a vertical column below
  768px and becomes a row above it.

  ### Props

  - `gap?: string`
    CSS gap between items. Defaults to `"var(--space-4)"`.
  - `align?: "start" | "center" | "end" | "stretch"`
    Cross-axis (`align-items`). Defaults to `"center"`.
  - `justify?: "start" | "center" | "end" | "between" | "around"`
    Main-axis (`justify-content`). Defaults to `"start"`.
  - `wrap?: boolean`
    Allow items to wrap. Defaults to `false`.
  - `stack?: boolean`
    Stack vertically on mobile, row on desktop. Defaults to `false`.
  - `children: Snippet`
    The row items.
  - `styleVars?: { [key: string]: string }`
    Optional CSS custom property overrides applied via inline style.

  ### Example

  ```svelte
  <Row justify="between" stack>
    <Logo />
    <Navbar />
  </Row>
  ```
-->
<script lang="ts">
  import type { Snippet } from "svelte";

  type Justify = "start" | "center" | "end" | "between" | "around";
  type Align = "start" | "center" | "end" | "stretch";

  let {
    gap = "var(--space-4)",
    align = "center",
    justify = "start",
    wrap = false,
    stack = false,
    children,
    styleVars = {},
  }: {
    gap?: string;
    align?: Align;
    justify?: Justify;
    wrap?: boolean;
    stack?: boolean;
    children: Snippet;
    styleVars?: { [key: string]: string };
  } = $props();

  const justifyMap: Record<Justify, string> = {
    start: "flex-start",
    center: "center",
    end: "flex-end",
    between: "space-between",
    around: "space-around",
  };

  let inlineStyle = $derived(
    Object.entries(styleVars)
      .map(([k, v]) => `${k}:${v}`)
      .join(";"),
  );
</script>

<div
  class:stack={stack}
  style:gap={gap}
  style:align-items={align}
  style:justify-content={justifyMap[justify]}
  style:flex-wrap={wrap ? "wrap" : "nowrap"}
  style={inlineStyle}
>
  {@render children()}
</div>

<style>
  div {
    display: flex;
    flex-direction: row;
    width: 100%;
  }

  /* stack: column on mobile, row on desktop */
  .stack {
    flex-direction: column;
    align-items: flex-start;

    @media (min-width: 768px) {
      flex-direction: row;
      align-items: center;
    }
  }
</style>
