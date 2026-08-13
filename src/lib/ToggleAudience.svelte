<!--
  @component

  A segmented toggle for switching the page's target audience (e.g. biologists
  vs. mathematicians). Reads/writes an external audience store and highlights the
  active option.

  ### Props

  - `audienceStore: { audience: "4bio" | "4math"; setAudience: (v) => void }`
    Store holding the current audience and a setter.
  - `options: { value: "4bio" | "4math"; label: string }[]`
    The selectable audience options, in display order.

  ### Style Overrides

  - `styleVars.btnFontSize` → overrides `--toggle-btn-font-size`
  - `styleVars.btnPadding` → overrides `--toggle-btn-padding`

  ### Example

  ```svelte
  <ToggleAudience
    audienceStore={store}
    options={[
      { value: "4bio", label: "For biologists" },
      { value: "4math", label: "For mathematicians" },
    ]}
  />
  ```
-->
<script lang="ts">
  type Audience = "4bio" | "4math";
  type AudienceStore = {
    audience: Audience;
    setAudience: (value: Audience) => void;
  };

  type AudienceOption = {
    value: Audience;
    label: string;
  };

  let {
    audienceStore,
    options,
    styleVars = {},
  }: {
    audienceStore: AudienceStore;
    options: AudienceOption[];
    styleVars?: { btnFontSize?: string; btnPadding?: string };
  } = $props();

  let cssVars = $derived({
    ...(styleVars.btnFontSize
      ? { "--toggle-btn-font-size": styleVars.btnFontSize }
      : {}),
    ...(styleVars.btnPadding
      ? { "--toggle-btn-padding": styleVars.btnPadding }
      : {}),
  });
  let inlineStyle = $derived(
    Object.entries(cssVars)
      .map(([k, v]) => `${k}:${v}`)
      .join(";"),
  );
</script>

<div
  class="audience-toggle"
  style={inlineStyle}
  role="group"
  aria-label="Audience"
>
  {#each options as option (option.value)}
    <button
      class="toggle-btn"
      class:active={audienceStore.audience === option.value}
      onclick={() => audienceStore.setAudience(option.value)}
      aria-pressed={audienceStore.audience === option.value}
    >
      {option.label}
    </button>
  {/each}
</div>

<style>
  .audience-toggle {
    display: flex;
    gap: 0;
    border: 1px solid var(--color-border);
    border-radius: 6px;
    overflow: hidden;
  }

  .toggle-btn {
    --toggle-btn-font-size: 0.85rem;
    --toggle-btn-padding: var(--space-1) var(--space-3);
    transition:
      background-color 0.15s,
      color 0.15s;
    cursor: pointer;
    border: none;
    background: var(--color-bg);
    padding: var(--toggle-btn-padding);
    color: var(--color-text-muted);
    font-weight: 500;
    font-size: var(--toggle-btn-font-size);
  }

  .toggle-btn:hover {
    background-color: var(--color-surface);
    color: var(--color-text);
  }

  .toggle-btn.active {
    background-color: var(--color-primary);
    color: #ffffff;
  }
</style>
