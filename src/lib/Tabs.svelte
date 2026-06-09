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
  }: {
    tabs: { key: string; label: string }[];
    children: Snippet<[string]>;
  } = $props();

  let activeKey = $state("");

  $effect(() => {
    if (!tabs.some((t) => t.key === activeKey)) {
      activeKey = tabs[0]?.key ?? "";
    }
  });
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

<div class="tab-content">
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
    display: flex;
    flex-direction: column;
    gap: var(--gap);
    min-height: 4rem;
  }
</style>
