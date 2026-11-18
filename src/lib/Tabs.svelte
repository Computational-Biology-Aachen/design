<!--
  @component

  A tabbed panel: renders a [[ButtonTab]] bar from a `tabs` list and shows the
  active tab's content via a snippet that receives the active key. Defaults to
  the first tab and self-heals if the active key disappears. Implements the
  ARIA tabs pattern (roles, `aria-selected`, roving tabindex; ←/→/Home/End move
  and select).

  ### Props

  - `tabs: { key: string; label: string }[]`
    The tab definitions, in display order.
  - `children: Snippet<[string]>`
    Renders the panel body; receives the active tab `key`.
  - `label?: string`
    Accessible name of the tab list (`aria-label`).

  ### Style Overrides

  - `styleVars.contentGap` → overrides `--tabs-content-gap`
  - `styleVars.contentMinHeight` → overrides `--tabs-content-min-height`

  ### Example

  ```svelte
  <Tabs tabs={[{ key: "code", label: "Code" }, { key: "preview", label: "Preview" }]}>
    {#snippet children(key)}
      {#if key === "code"}<Pre>…</Pre>{:else}<Preview />{/if}
    {/snippet}
  </Tabs>
  ```
-->
<script lang="ts">
  import { toStyleString } from "./utils";
  import type { Snippet } from "svelte";
  import { tick, untrack } from "svelte";
  import ButtonTab from "./ButtonTab.svelte";

  let {
    tabs,
    children,
    label,
    styleVars = {},
  }: {
    tabs: { key: string; label: string }[];
    children: Snippet<[string]>;
    label?: string;
    styleVars?: { contentGap?: string; contentMinHeight?: string };
  } = $props();

  const uid = $props.id();
  const tabId = (key: string) => `tabs-${uid}-${key}`;

  let activeKey = $state(untrack(() => tabs[0]?.key ?? ""));
  let tabBar = $state<HTMLDivElement | null>(null);

  $effect(() => {
    if (!tabs.some((t) => t.key === activeKey)) {
      activeKey = tabs[0]?.key ?? "";
    }
  });

  async function onKeydown(event: KeyboardEvent) {
    const i = tabs.findIndex((t) => t.key === activeKey);
    const next = {
      ArrowRight: (i + 1) % tabs.length,
      ArrowLeft: (i - 1 + tabs.length) % tabs.length,
      Home: 0,
      End: tabs.length - 1,
    }[event.key];
    if (next === undefined || i === -1) return;
    event.preventDefault();
    activeKey = tabs[next].key;
    await tick();
    tabBar
      ?.querySelector<HTMLElement>(`#${CSS.escape(tabId(activeKey))}`)
      ?.focus();
  }

  let cssVars = $derived({
    ...(styleVars.contentGap
      ? { "--tabs-content-gap": styleVars.contentGap }
      : {}),
    ...(styleVars.contentMinHeight
      ? { "--tabs-content-min-height": styleVars.contentMinHeight }
      : {}),
  });
  let inlineStyle = $derived(toStyleString(cssVars));
</script>

<div
  class="tab-bar"
  role="tablist"
  tabindex="-1"
  aria-label={label}
  bind:this={tabBar}
  onkeydown={onKeydown}
>
  {#each tabs as tab (tab.key)}
    <ButtonTab
      id={tabId(tab.key)}
      role="tab"
      aria-selected={activeKey === tab.key}
      tabindex={activeKey === tab.key ? 0 : -1}
      selected={activeKey === tab.key}
      onclick={() => (activeKey = tab.key)}
    >
      {tab.label}
    </ButtonTab>
  {/each}
</div>

<div
  class="tab-content"
  role="tabpanel"
  tabindex="0"
  aria-labelledby={activeKey ? tabId(activeKey) : undefined}
  style={inlineStyle}
>
  {@render children(activeKey)}
</div>

<style>
  .tab-bar {
    display: flex;
    flex-wrap: wrap;
    /* ButtonTab only has margins from 768px up; keep tabs apart below that. */
    gap: 0 1rem;
    margin-bottom: var(--space-4, 16px);
    border-bottom: 1px solid var(--color-border);
    width: 100%;

    @media (min-width: 768px) {
      gap: 0;
    }
  }

  .tab-content {
    --tabs-content-gap: var(--gap);
    --tabs-content-min-height: 4rem;
    display: flex;
    flex-direction: column;
    gap: var(--tabs-content-gap);
    min-height: var(--tabs-content-min-height);
  }
</style>
