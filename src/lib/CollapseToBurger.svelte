<!--
  @component

  A responsive navigation list that renders inline on wide viewports and
  collapses into a ☰ burger dropdown (native `<details>`) below the `collapseAt`
  breakpoint. Place [[NavItem]]s as children.

  ### Props

  - `brand?: Snippet`
    Optional brand content (currently reserved for layout use).
  - `collapseAt?: string`
    Max-width at which the bar collapses to a burger. Defaults to `"768px"`.
  - `children: Snippet`
    The navigation items.
  - `styleVars?: { [key: string]: string }`
    Optional CSS custom property overrides applied via inline style.

  ### Example

  ```svelte
  <CollapseToBurger>
    <NavItem href="/team">Team</NavItem>
    <NavItem href="/news">News</NavItem>
  </CollapseToBurger>
  ```
-->
<script lang="ts">
  import type { Snippet } from "svelte";
  import { MediaQuery } from "svelte/reactivity";

  interface Props {
    brand?: Snippet;
    collapseAt?: string;
    children: Snippet;
    styleVars?: { [key: string]: string };
  }

  let {
    // public prop, reserved for layout use (not yet rendered)
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    brand,
    children,
    collapseAt = "768px",
    styleVars = {},
  }: Props = $props();

  // svelte-ignore state_referenced_locally
  const small = new MediaQuery(`max-width: ${collapseAt}`);

  let inlineStyle = $derived(
    Object.entries(styleVars)
      .map(([k, v]) => `${k}:${v}`)
      .join(";"),
  );
</script>

{#if small.current}
  <details
    class="mobile"
    style={inlineStyle}
  >
    <summary aria-label="Toggle navigation">☰</summary>
    <ul class="dropdown">
      {@render children()}
    </ul>
  </details>
{:else}
  <ul
    class="bar"
    style={inlineStyle}
  >
    {@render children()}
  </ul>
{/if}

<style>
  .bar {
    --ctb-gap: var(--gap);
    display: flex;
    flex-direction: row;
    gap: var(--ctb-gap);
    margin: 0;
    margin-left: auto;
    padding: 0;
    list-style: none;
  }

  details.mobile {
    position: relative;
    margin-left: auto;
  }

  summary {
    --ctb-summary-padding: var(--space-2) var(--space-3);
    --ctb-summary-font-size: 1.25rem;
    cursor: pointer;
    border-radius: var(--radius-md);
    padding: var(--ctb-summary-padding);
    color: var(--color-text);
    font-size: var(--ctb-summary-font-size);
    line-height: 1;
    list-style: none;
    user-select: none;
  }

  summary::-webkit-details-marker {
    display: none;
  }

  summary:hover {
    background-color: var(--color-surface);
  }

  .dropdown {
    --ctb-dropdown-min-width: 15rem;
    --ctb-dropdown-padding: var(--space-2);
    display: flex;
    position: absolute;
    top: calc(100% + var(--space-1));
    right: 0;
    flex-direction: column;
    margin: 0;
    box-shadow: var(--shadow-md);
    border: var(--border);
    border-radius: var(--radius-md);
    background-color: var(--color-bg);
    padding: var(--ctb-dropdown-padding);
    min-width: var(--ctb-dropdown-min-width);
    list-style: none;
  }
</style>
