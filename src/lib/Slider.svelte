<!--
  @component

  A labelled range slider that shows the current value next to its name and
  updates live as it is dragged. The `value` is `$bindable`. See [[Slider2]] for
  a variant that only commits on release.

  The displayed value can also be edited directly: click it (or focus it with
  Tab and press Enter/Space) to reveal a number input. Enter or blur commits
  the typed value — clamped to `[min, max]`, otherwise left as typed — and
  calls `onchange`. Escape cancels.

  ### Props

  - `name: string`
    The slider label.
  - `desc?: string`
    Optional descriptor shown in parentheses after the name. Defaults to `""`.
  - `value: number` (bindable)
    The current value.
  - `min: number | string`, `max: number | string`
    The range bounds.
  - `step?: number | string`
    Step increment. Defaults to `"any"`.
  - `disabled?: boolean`
    Disables the slider. Defaults to `false`.
  - `onchange?: () => void`
    Called when the value changes.
  - `styleVars?: { [key: string]: string }`
    Optional CSS custom property overrides applied via inline style.

  ### Example

  ```svelte
  <Slider name="Light intensity" value={i} min={0} max={1000} bind:value={i} />
  ```
-->
<script lang="ts">
  import { toStyleString } from "./utils";
  interface Props {
    name: string;
    desc?: string;
    value: number;
    min: number | string;
    max: number | string;
    step?: number | string;
    disabled?: boolean;
    onchange?: () => void;
    styleVars?: { [key: string]: string };
  }

  let {
    name,
    desc = "",
    value = $bindable(),
    min,
    max,
    step = "any",
    disabled = false,
    onchange,
    styleVars = {},
  }: Props = $props();

  let inlineStyle = $derived(toStyleString(styleVars));

  let editing = $state(false);
  let editValue = $state("");
  let editInput: HTMLInputElement | undefined = $state();

  $effect(() => {
    if (editing) editInput?.focus();
  });

  function startEdit() {
    if (disabled) return;
    editValue = String(value);
    editing = true;
  }

  function commitEdit() {
    const parsed = Number(editValue);
    if (!Number.isNaN(parsed)) {
      const lo = Number(min);
      const hi = Number(max);
      const clamped =
        Number.isNaN(lo) || Number.isNaN(hi)
          ? parsed
          : Math.min(Math.max(parsed, lo), hi);
      value = clamped;
      if (onchange) onchange();
    }
    editing = false;
  }

  function onEditKeydown(event: KeyboardEvent) {
    if (event.key === "Enter") {
      event.preventDefault();
      commitEdit();
    } else if (event.key === "Escape") {
      event.preventDefault();
      editing = false;
    }
  }

  function onValueKeydown(event: KeyboardEvent) {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      startEdit();
    }
  }
</script>

<div
  class="slider"
  style={inlineStyle}
>
  <div class="row">
    <span class="name">{name}{desc ? ` (${desc})` : ""}</span>
    {#if editing}
      <input
        class="value-input"
        type="number"
        step="any"
        min={min}
        max={max}
        bind:value={editValue}
        bind:this={editInput}
        onkeydown={onEditKeydown}
        onblur={commitEdit}
      />
    {:else}
      <span
        class="value"
        role="button"
        tabindex={disabled ? -1 : 0}
        onclick={startEdit}
        onkeydown={onValueKeydown}>{value}</span
      >
    {/if}
  </div>
  <input
    type="range"
    aria-label="{name}{desc ? ` (${desc})` : ''}"
    min={min}
    max={max}
    step={step}
    disabled={disabled}
    bind:value={value}
    onchange={onchange}
  />
</div>

<style>
  .slider {
    display: flex;
    flex-direction: column;
    gap: var(--space-1);
    padding: 0 var(--space-2);
  }
  .row {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    font-size: var(--text-sm);
  }
  span.name {
    font-weight: var(--weight-medium);
  }
  span.value {
    cursor: pointer;
    border: 2px solid transparent;
    border-radius: var(--radius-sm);
    padding: 0 var(--space-1);
    color: var(--color-primary);
    font-weight: 700;
    font-variant-numeric: tabular-nums;
  }
  span.value:hover,
  span.value:focus-visible {
    border-color: var(--color-primary);
  }
  .value-input {
    border: 2px solid var(--color-primary);
    border-radius: var(--radius-sm);
    background: transparent;
    padding: 0 var(--space-1);
    width: 4.5em;
    color: var(--color-primary);
    font-weight: 700;
    font-size: var(--text-sm);
    font-family: inherit;
    font-variant-numeric: tabular-nums;
    text-align: right;
  }
  .value-input:focus {
    outline: none;
  }
  input[type="range"] {
    cursor: pointer;
    width: 100%;
    accent-color: var(--color-primary);
  }
  input:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
</style>
