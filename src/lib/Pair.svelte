<!--
  @component

  A horizontal flex row that lays its children side by side with a small gap,
  vertically centred. Items wrap by default; on viewports ≥768px the `justify`
  prop can push them to the end.

  ### Props

  - `children: Snippet`
    The items to lay out in a row.
  - `justify?: "start" | "end"`
    Horizontal alignment. Defaults to `"start"`.
  - `wrap?: "wrap" | "nowrap"`
    Whether items wrap onto multiple lines. Defaults to `"wrap"`.

  ### Example

  ```svelte
  <Pair justify="end">
    <Button>Cancel</Button>
    <Button>Save</Button>
  </Pair>
  ```
-->
<script lang="ts">
  import type { Snippet } from "svelte";

  let {
    children,
    justify = "start",
    wrap = "wrap",
  }: {
    children: Snippet;
    justify?: "start" | "end";
    wrap?: "wrap" | "nowrap";
  } = $props();
</script>

<div class="justify-{justify} wrap-{wrap}">
  {@render children()}
</div>

<style>
  div {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 0.5rem;
    width: 100%;
  }
  .justify-start {
    justify-content: start;
  }
  .justify-end {
    justify-content: start;

    @media (min-width: 768px) {
      justify-content: end;
    }
  }

  .wrap-wrap {
    flex-wrap: wrap;
  }
  .wrap-nowrap {
    flex-wrap: nowrap;
  }
</style>
