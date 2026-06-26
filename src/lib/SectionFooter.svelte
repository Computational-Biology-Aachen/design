<!--
  @component

  A page footer with a dark background and a centred, max-width inner column.
  Sticks to the bottom of the layout via `margin-top: auto`.

  ### Props

  - `styleVars?: { innerMaxWidth?: string; innerGap?: string }`
    Override CSS custom properties on the inner element.
  - `children: Snippet`
    The footer content (links, imprint, copyright).

  ### Example

  ```svelte
  <SectionFooter>
    <Text color="light">© 2026 CPBL</Text>
  </SectionFooter>
  ```
-->
<script lang="ts">
  import type { Snippet } from "svelte";

  interface Props {
    styleVars?: {
      innerMaxWidth?: string;
      innerGap?: string;
    };
    children: Snippet;
  }

  let {
    styleVars = {},
    children,
  }: Props = $props();

  let innerCssVars = $derived({
    ...(styleVars.innerMaxWidth
      ? { "--section-inner-max-width": styleVars.innerMaxWidth }
      : {}),
    ...(styleVars.innerGap
      ? { "--section-inner-gap": styleVars.innerGap }
      : {}),
  });
</script>

<footer>
  <div
    class="inner"
    style={Object.entries(innerCssVars)
      .map(([k, v]) => `${k}:${v}`)
      .join(";")}
  >
    {@render children()}
  </div>
</footer>

<style>
  footer {
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin-top: auto;
    background-color: var(--color-text);
    padding: var(--space-12) var(--space-4);
    width: 100%;
    min-height: 12rem;
    color: var(--color-text-inverse);
  }

  .inner {
    display: flex;
    flex-direction: column;
    gap: var(--section-inner-gap);
    margin: 0 auto;
    width: 100%;
    max-width: var(--section-inner-max-width);
  }
</style>
