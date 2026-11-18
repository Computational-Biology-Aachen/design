<!--
  @component

  A responsive navigation list that renders inline on wide viewports and
  collapses into a ☰ burger dropdown (native `popover="auto"`: light dismiss,
  `Esc`, closes on link click) below the `collapseAt` breakpoint. Place [[NavItem]]s as children.

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

  const uid = $props.id();
  const menuId = `ctb-menu-${uid}`;
  let menuEl = $state<HTMLUListElement | null>(null);

  // `collapseAt` gets spliced into a raw style-tag string below (see
  // comment there for why). Restricting it to a plain CSS length keeps
  // that injection-safe regardless of where the prop value ends up coming
  // from.
  const CSS_LENGTH = /^\d+(\.\d+)?(px|rem|em)$/;
  let safeCollapseAt = $derived.by(() => {
    if (!CSS_LENGTH.test(collapseAt)) {
      throw new Error(
        `CollapseToBurger: collapseAt must be a plain CSS length (e.g. "768px"), got ${JSON.stringify(collapseAt)}`,
      );
    }
    return collapseAt;
  });

  // Client-side navigation keeps the page, so close the menu on link click.
  function closeOnLinkClick(event: MouseEvent) {
    if ((event.target as Element | null)?.closest("a")) menuEl?.hidePopover();
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
<!-- safeCollapseAt is validated above to be a plain CSS length, so no
     markup or script can break out of the injected style tag. -->
<!-- eslint-disable-next-line svelte/no-at-html-tags -->
{@html `<style>
  @media (max-width: ${safeCollapseAt}) {
    .collapse-bar { display: none !important; }
  }
  @media (min-width: calc(${safeCollapseAt} + 0.02px)) {
    .collapse-mobile { display: none !important; }
  }
</style>`}

<ul
  class="bar collapse-bar"
  style={inlineStyle}
>
  {@render children()}
</ul>

<div
  class="mobile collapse-mobile"
  style={inlineStyle}
  style:--ctb-anchor="--{menuId}"
>
  <button
    type="button"
    class="burger"
    popovertarget={menuId}
    aria-controls={menuId}
    aria-label="Toggle navigation"><span aria-hidden="true">☰</span></button
  >
  <!-- svelte-ignore a11y_click_events_have_key_events, a11y_no_noninteractive_element_interactions -->
  <ul
    id={menuId}
    class="dropdown"
    popover="auto"
    bind:this={menuEl}
    onclick={closeOnLinkClick}
  >
    {@render children()}
  </ul>
</div>

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

  .mobile {
    margin-left: auto;
  }

  .burger {
    --ctb-summary-padding: 0 var(--space-3);
    --ctb-summary-font-size: 1.25rem;
    --ctb-summary-height: 2.5rem;
    display: flex;
    anchor-name: var(--ctb-anchor);
    align-items: center;
    cursor: pointer;
    border: none;
    border-radius: var(--radius-md);
    background: none;
    padding: var(--ctb-summary-padding);
    height: var(--ctb-summary-height);
    color: var(--color-text);
    font-size: var(--ctb-summary-font-size);
    line-height: 1;
    user-select: none;
  }

  .burger:hover {
    background-color: var(--color-surface);
  }

  .dropdown {
    --ctb-dropdown-min-width: 15rem;
    --ctb-dropdown-padding: var(--space-2);
    position: fixed;
    position-anchor: var(--ctb-anchor);
    inset: auto;
    /* Without anchor positioning (Firefox) the first declaration of each pair
       survives: below the nav bar, at the right gutter. */
    top: calc(var(--nav-height) + var(--space-1));
    top: calc(anchor(bottom) + var(--space-1));
    right: var(--space-4);
    right: anchor(right);
    flex-direction: column;
    margin: 0;
    box-shadow: var(--shadow-md);
    border: var(--border);
    border-radius: var(--radius-md);
    background-color: var(--color-bg);
    padding: var(--ctb-dropdown-padding);
    min-width: var(--ctb-dropdown-min-width);
    max-height: calc(100dvh - var(--nav-height) - var(--space-4));
    overflow: auto;
    color: var(--color-text);
    list-style: none;
  }

  .dropdown:popover-open {
    display: flex;
  }
</style>
