<!--
  @component

  A range slider that shows the value live while dragging but only commits the
  bound `val` (and fires `callback`) on release — useful when each committed
  change triggers an expensive recomputation. External updates (e.g. reset) sync
  back in when not dragging. See [[Slider]] for the commit-on-every-change
  variant.

  The displayed value can also be edited directly: click it (or focus it with
  Tab and press Enter/Space) to reveal a number input. Enter or blur commits
  the typed value — clamped to `[min, max]`, otherwise left as typed — and
  fires `callback` immediately, same as a drag release. Escape cancels.

  ### Props

  - `name: string`
    The slider label.
  - `desc?: string`
    Optional descriptor shown in parentheses. Defaults to `""`.
  - `val: number` (bindable)
    The committed value (updated on release).
  - `min: string`, `max: string`, `step: string`
    The range bounds and step.
  - `disabled?: boolean`
    Disables the slider. Defaults to `false`.
  - `callback?: () => void`
    Called once when dragging ends.
  - `styleVars?: { [key: string]: string }`
    Optional CSS custom property overrides applied via inline style.

  ### Example

  ```svelte
  <Slider2 name="k_cat" bind:val={kcat} min="0" max="10" step="0.1" callback={rerun} />
  ```
-->
<script lang="ts">
  import { toStyleString } from "./utils";
  let {
    name,
    desc = "",
    val: finalValue = $bindable(),
    min,
    max,
    step,
    disabled = false,
    callback,
    styleVars = {},
  }: {
    val: number;
    desc?: string;
    min: string;
    max: string;
    step: string;
    name: string;
    disabled?: boolean;
    callback?: () => void;
    styleVars?: { [key: string]: string };
  } = $props();

  let liveVal = $state(finalValue);
  let dragging = false;

  let editing = $state(false);
  let editValue = $state("");
  let editInput: HTMLInputElement | undefined = $state();

  // Sync liveVal with finalValue when not dragging (external updates like reset)
  $effect(() => {
    if (!dragging) {
      liveVal = finalValue;
    }
  });

  $effect(() => {
    if (editing) editInput?.focus();
  });

  function startDrag() {
    dragging = true;
  }

  function stopDrag() {
    dragging = false;
    finalValue = liveVal;
    if (callback) callback();
  }

  function startEdit() {
    if (disabled) return;
    editValue = String(liveVal);
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
      liveVal = clamped;
      finalValue = clamped;
      if (callback) callback();
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

  let inlineStyle = $derived(toStyleString(styleVars));
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
        onkeydown={onValueKeydown}>{liveVal}</span
      >
    {/if}
  </div>
  <input
    type="range"
    aria-label="{name}{desc ? ` (${desc})` : ''}"
    min={min}
    max={max}
    step={step}
    bind:value={liveVal}
    onmousedown={startDrag}
    onmouseup={stopDrag}
    ontouchstart={startDrag}
    ontouchend={stopDrag}
    disabled={disabled}
  />
</div>

<style>
  .slider {
    display: flex;
    flex-direction: column;
    gap: var(--space-1);
    padding: 0 var(--space-2);
    width: 100%;
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
    font-weight: var(--weight-bold);
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
    font-weight: var(--weight-bold);
    font-size: var(--text-sm);
    font-family: inherit;
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
