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

  ### Example

  ```svelte
  <InputCheckbox id="agree" label="I agree" bind:checked={agreed} />
  ```
-->
<script lang="ts">
  import InlineGrid from "./InlineGrid.svelte";

  type Props = {
    id: string;
    label: string;
    checked: boolean;
    border?: "transparent" | "solid";
  };
  let {
    id,
    label: name,
    checked = $bindable(),
    border = "solid",
  }: Props = $props();
</script>

<InlineGrid>
  <label for={id}>{name}</label>
  <input
    id={id}
    class={border}
    type="checkbox"
    bind:checked={checked}
  />
</InlineGrid>

<style>
  input {
    border-radius: var(--radius-lg);
    background-color: transparent;
    padding: 0.35rem 0.5rem;
    width: 100%;
    font-size: 0.875rem;
  }
  .transparent {
    border: var(--border-transparent);
  }

  .solid {
    border: var(--border);
  }
</style>
