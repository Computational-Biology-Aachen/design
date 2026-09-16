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
  import { toStyleString } from "./utils";
  import type { Snippet } from "svelte";

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

  let inlineStyle = $derived(toStyleString(styleVars));
  let mobileOpen = $state(false);

  function handleKeydown(event: KeyboardEvent) {
    if (mobileOpen && event.key === "Escape") {
      mobileOpen = false;
    }
  }
</script>

<!--
  Both variants render unconditionally and are toggled by a real @media
  query (injected here since `collapseAt` is a runtime prop and CSS media
  conditions can't reference a custom property). A JS-computed `MediaQuery`
  boolean would decide the mobile/desktop split during SSR too, but
  `svelte/reactivity`'s server stub always resolves that to `false` — every
  page would ship the desktop bar's markup regardless of viewport, and only
  correct itself once client JS hydrates and re-evaluates it. On slower or
  more JS-heavy pages that gap is long enough for visitors to see the
  unhydrated desktop bar overflow off a narrow viewport. Pure CSS has no
  such gap.
-->
{@html `<style>
  @media (max-width: ${collapseAt}) {
    .collapse-bar { display: none !important; }
  }
  @media (min-width: calc(${collapseAt} + 0.02px)) {
    .collapse-mobile { display: none !important; }
  }
</style>`}

<ul
  class="bar collapse-bar"
  style={inlineStyle}
>
  {@render children()}
</ul>

<!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
<details
  class="mobile collapse-mobile"
  style={inlineStyle}
  bind:open={mobileOpen}
  onkeydown={handleKeydown}
>
  <summary aria-label="Toggle navigation">☰</summary>
  <ul class="dropdown">
    {@render children()}
  </ul>
</details>

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
    /* A plain "display: flex" here would outrank the browser's native
       details:not([open]) > *:not(summary) collapse rule (an author class
       selector always beats a UA-stylesheet tag selector), so the menu
       would stay laid out, just hidden behind whatever paints over it,
       even while closed. Gate it on [open] explicitly instead. */
    display: none;
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

  details[open] > .dropdown {
    display: flex;
  }
</style>
