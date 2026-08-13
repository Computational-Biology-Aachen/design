<!--
  @component

  A tabbed panel: renders a [[ButtonTab]] bar from a `tabs` list and shows the
  active tab's content via a snippet that receives the active key. Defaults to
  the first tab and self-heals if the active key disappears.

  ### Props

  - `tabs: { key: string; label: string }[]`
    The tab definitions, in display order.
  - `children: Snippet<[string]>`
    Renders the panel body; receives the active tab `key`.

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
  import type { Snippet } from "svelte";
  import ButtonTab from "./ButtonTab.svelte";

  let {
    tabs,
    children,
    styleVars = {},
  }: {
    tabs: { key: string; label: string }[];
    children: Snippet<[string]>;
    styleVars?: { contentGap?: string; contentMinHeight?: string };
  } = $props();

  let activeKey = $state("");

  $effect(() => {
    if (!tabs.some((t) => t.key === activeKey)) {
      activeKey = tabs[0]?.key ?? "";
    }
  });

  let cssVars = $derived({
    ...(styleVars.contentGap
      ? { "--tabs-content-gap": styleVars.contentGap }
      : {}),
    ...(styleVars.contentMinHeight
      ? { "--tabs-content-min-height": styleVars.contentMinHeight }
      : {}),
  });
  let inlineStyle = $derived(
    Object.entries(cssVars)
      .map(([k, v]) => `${k}:${v}`)
      .join(";"),
  );
</script>

<div
  class="tab-bar"
  role="tablist"
>
  {#each tabs as tab (tab.key)}
    <ButtonTab
      selected={activeKey === tab.key}
      onclick={() => (activeKey = tab.key)}
    >
      {tab.label}
    </ButtonTab>
  {/each}
</div>

<div
  class="tab-content"
  style={inlineStyle}
>
  {@render children(activeKey)}
</div>

<style>
  .tab-bar {
    display: flex;
    flex-wrap: wrap;
    gap: 0;
    margin-bottom: var(--space-4, 16px);
    border-bottom: 1px solid var(--color-border);
    width: 100%;
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
