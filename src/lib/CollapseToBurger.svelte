<!--
  @component

  A responsive navigation list that renders inline when it fits and collapses
  into a ☰ burger dropdown (native `popover="auto"`: light dismiss, `Esc`,
  closes on link click) when it doesn't. Place [[NavItem]]s as children, inside
  a row such as [[Navbar]].

  "Fits" is measured, not guessed: once hydrated, a ResizeObserver compares the
  natural width of everything in the row (brand, this bar, siblings, gaps) with
  the row's width, so the switch point follows the real content, font size
  and text zoom. While the bar is inline, row items keep their natural width
  (the bar collapses instead of squeezing the brand into the links). Before
  hydration, and without JS, `collapseAt` is the media-query breakpoint used
  instead.

  ### Props

  - `brand?: Snippet`
    Optional brand content (currently reserved for layout use).
  - `collapseAt?: string`
    Viewport max-width at which the bar collapses before the measured layout
    takes over (server render, no JS). Defaults to `"768px"`.
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
  let barEl = $state<HTMLUListElement | null>(null);
  let mobileEl = $state<HTMLDivElement | null>(null);

  // "auto": not measured yet (SSR / before hydration) -> collapseAt media
  // query decides. Afterwards the measurement below does.
  let mode = $state<"auto" | "wide" | "narrow">("auto");

  // Width the row needs to show the bar inline: every other row item at its
  // natural width (they don't shrink, see CSS) + the bar's natural width +
  // the gaps. The burger is excluded, so the result doesn't depend on which
  // mode is showing and the switch can't oscillate.
  // Collapsed, row items may shrink again (a long brand can wrap on tiny
  // screens), so remember each item's natural width from the last layout in
  // which items kept it, and never measure an item as narrower than that.
  const natural = new WeakMap<Element, number>();

  function measure(row: HTMLElement, bar: HTMLElement): void {
    const style = getComputedStyle(row);
    const available =
      row.clientWidth -
      parseFloat(style.paddingLeft) -
      parseFloat(style.paddingRight);
    let needed = bar.getBoundingClientRect().width;
    let items = 1;
    for (const child of row.children) {
      if (child === bar || child === mobileEl) continue;
      const cs = getComputedStyle(child);
      if (cs.display === "none" || cs.position === "absolute") continue;
      if (cs.position === "fixed") continue;
      let width = child.getBoundingClientRect().width;
      if (mode === "narrow") width = Math.max(width, natural.get(child) ?? 0);
      else natural.set(child, width);
      needed += width;
      items += 1;
    }
    needed += (parseFloat(style.columnGap) || 0) * (items - 1);
    // 1px slack for sub-pixel rounding.
    mode = needed <= available - 1 ? "wide" : "narrow";
  }

  $effect(() => {
    const bar = barEl;
    const row = bar?.parentElement;
    if (!bar || !row) return;
    const update = () => measure(row, bar);
    const observer = new ResizeObserver(update);
    // The row catches viewport/container changes; its items (incl. the bar,
    // measured even while hidden) catch font loading and text zoom.
    observer.observe(row);
    for (const child of row.children) observer.observe(child);
    update();
    return () => observer.disconnect();
  });

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
    .collapse-bar[data-ctb="auto"] { display: none !important; }
  }
  @media (min-width: calc(${safeCollapseAt} + 0.02px)) {
    .collapse-mobile[data-ctb="auto"] { display: none !important; }
  }
</style>`}

<ul
  class="bar collapse-bar"
  data-ctb={mode}
  aria-hidden={mode === "narrow" ? "true" : undefined}
  style={inlineStyle}
  bind:this={barEl}
>
  {@render children()}
</ul>

<div
  class="mobile collapse-mobile"
  data-ctb={mode}
  bind:this={mobileEl}
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
    white-space: nowrap;
  }

  /* In a row that holds a burger bar, items keep their natural width: the
     bar collapses instead of the brand being squeezed into the links. */
  :global(:has(> .collapse-bar:not([data-ctb="narrow"])) > *) {
    flex-shrink: 0;
  }

  /* Collapsed, the bar stays laid out (but invisible, inert and out of the
     flow) so its natural width can still be measured on zoom/font changes.
     position: fixed keeps it from adding scrollable overflow. */
  .bar[data-ctb="narrow"] {
    position: fixed;
    top: 0;
    left: 0;
    visibility: hidden;
    pointer-events: none;
  }

  .mobile[data-ctb="wide"] {
    display: none;
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
