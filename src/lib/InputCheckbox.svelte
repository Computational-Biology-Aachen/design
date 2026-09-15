<!--
  @component

  A labelled checkbox laid out as a label/control pair in an [[InlineGrid]]. The
  `checked` state is `$bindable`.

  ### Props

  - `id: string`
    Element id linking the label to the input.
  - `label: string`
    The checkbox label text.
  - `checked: boolean` (bindable)
    Whether the box is checked.
  - `border?: "transparent" | "solid"`
    Border style of the control. Defaults to `"solid"`.
  - `error?: string`
    Validation message. When set, the border turns `--color-danger`, the
    message renders below the field, and `aria-invalid`/`aria-describedby`
    are wired up for assistive tech.
  - `styleVars?: { borderRadius?: string; backgroundColor?: string; padding?: string; width?: string; fontSize?: string }`
    Override the default input styles via CSS custom properties.

  ### Example

  ```svelte
  <InputCheckbox id="agree" label="I agree" bind:checked={agreed} />
  ```
-->
<script lang="ts">
  import { toStyleString } from "./utils";
  import InlineGrid from "./InlineGrid.svelte";

  type Props = {
    id: string;
    label: string;
    checked: boolean;
    border?: "transparent" | "solid";
    error?: string;
    styleVars?: {
      borderRadius?: string;
      backgroundColor?: string;
      padding?: string;
      width?: string;
      fontSize?: string;
    };
  };
  let {
    id,
    label: name,
    checked = $bindable(),
    border = "solid",
    error,
    styleVars = {},
  }: Props = $props();

  let cssVars = $derived({
    ...(styleVars.borderRadius
      ? { "--input-border-radius": styleVars.borderRadius }
      : {}),
    ...(styleVars.backgroundColor
      ? { "--input-background-color": styleVars.backgroundColor }
      : {}),
    ...(styleVars.padding ? { "--input-padding": styleVars.padding } : {}),
    ...(styleVars.width ? { "--input-width": styleVars.width } : {}),
    ...(styleVars.fontSize ? { "--input-font-size": styleVars.fontSize } : {}),
  });
  let inlineStyle = $derived(toStyleString(cssVars));
</script>

<InlineGrid>
  <label for={id}>{name}</label>
  <input
    id={id}
    class={border}
    class:error={Boolean(error)}
    type="checkbox"
    bind:checked={checked}
    style={inlineStyle}
    aria-invalid={error ? "true" : undefined}
    aria-describedby={error ? `${id}-error` : undefined}
  />
</InlineGrid>
{#if error}
  <p
    id="{id}-error"
    class="error-message"
  >
    {error}
  </p>
{/if}

<style>
  input {
    --input-border-radius: var(--radius-lg);
    --input-background-color: transparent;
    --input-padding: 0.35rem 0.5rem;
    --input-width: 100%;
    --input-font-size: var(--text-sm);
    border-radius: var(--input-border-radius);
    background-color: var(--input-background-color);
    padding: var(--input-padding);
    width: var(--input-width);
    font-size: var(--input-font-size);
  }
  .transparent {
    border: var(--border-transparent);
  }

  .solid {
    border: var(--border);
  }

  .error {
    border-color: var(--color-danger);
  }

  .error-message {
    margin-top: var(--space-1);
    color: var(--color-danger);
    font-size: var(--text-callout);
  }
</style>
