<script lang="ts">
  import type { Snippet } from "svelte";

  type Justify = "start" | "center" | "end" | "between" | "around";
  type Align = "start" | "center" | "end" | "stretch";

  interface Props {
    gap?: string;
    align?: Align;
    justify?: Justify;
    wrap?: boolean;
    stack?: boolean;
    children: Snippet;
  }

  let {
    gap = "var(--space-4)",
    align = "center",
    justify = "start",
    wrap = false,
    stack = false,
    children,
  }: Props = $props();

  const justifyMap: Record<Justify, string> = {
    start: "flex-start",
    center: "center",
    end: "flex-end",
    between: "space-between",
    around: "space-around",
  };
</script>

<div
  class:stack={stack}
  style:gap={gap}
  style:align-items={align}
  style:justify-content={justifyMap[justify]}
  style:flex-wrap={wrap ? "wrap" : "nowrap"}
>
  {@render children()}
</div>

<style>
  div {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
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
