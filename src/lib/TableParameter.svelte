<!--
  @component

  A compact, horizontally scrollable parameter table with monospaced values and
  an optional second column for comparing old vs. new values.

  ### Props

  - `rows: { label: string; newVal: string | number; oldVal?: string | number }[]`
    The parameter rows.
  - `showOld?: boolean`
    Show the old-value column. Defaults to `false`.
  - `newLabel?: string`
    Header for the new-value column. Defaults to `"New"`.
  - `oldLabel?: string`
    Header for the old-value column. Defaults to `"Old"`.

  ### Style Overrides

  - `styleVars.fontSize` → overrides `--param-table-font-size`
  - `styleVars.cellPadding` → overrides `--param-table-cell-padding`
  - `styleVars.valFontSize` → overrides `--param-table-val-font-size`

  ### Example

  ```svelte
  <TableParameter
    rows={[{ label: "k_cat", newVal: 1.2, oldVal: 1.0 }]}
    showOld
  />
  ```
-->
<script lang="ts">
  interface ParamRow {
    label: string;
    newVal: string | number;
    oldVal?: string | number;
  }

  interface Props {
    rows: ParamRow[];
    showOld?: boolean;
    newLabel?: string;
    oldLabel?: string;
    styleVars?: {
      fontSize?: string;
      cellPadding?: string;
      valFontSize?: string;
    };
  }

  let {
    rows,
    showOld = false,
    newLabel = "New",
    oldLabel = "Old",
    styleVars = {},
  }: Props = $props();

  let cssVars = $derived({
    ...(styleVars.fontSize
      ? { "--param-table-font-size": styleVars.fontSize }
      : {}),
    ...(styleVars.cellPadding
      ? { "--param-table-cell-padding": styleVars.cellPadding }
      : {}),
    ...(styleVars.valFontSize
      ? { "--param-table-val-font-size": styleVars.valFontSize }
      : {}),
  });
  let inlineStyle = $derived(
    Object.entries(cssVars)
      .map(([k, v]) => `${k}:${v}`)
      .join(";"),
  );
</script>

<div
  class="param-table-wrap"
  style={inlineStyle}
>
  <table class="param-table">
    <thead>
      <tr>
        <th>Parameter</th>
        <th>{newLabel}</th>
        {#if showOld}
          <th>{oldLabel}</th>
        {/if}
      </tr>
    </thead>
    <tbody>
      {#each rows as row (row.label)}
        <tr>
          <td>{row.label}</td>
          <td class="val">{row.newVal}</td>
          {#if showOld}
            <td class="val">{row.oldVal ?? "-"}</td>
          {/if}
        </tr>
      {/each}
    </tbody>
  </table>
</div>

<style>
  .param-table-wrap {
    overflow-x: auto;
  }

  .param-table {
    --param-table-font-size: 0.85rem;
    --param-table-cell-padding: 0.35rem 0.75rem;
    --param-table-val-font-size: 0.8rem;
    border-collapse: collapse;
    width: 100%;
    font-size: var(--param-table-font-size);
  }

  th,
  td {
    border-bottom: 1px solid var(--color-border);
    padding: var(--param-table-cell-padding);
    text-align: left;
  }

  th {
    background: var(--color-surface);
    font-weight: 600;
    white-space: nowrap;
  }

  .val {
    font-size: var(--param-table-val-font-size);
    font-family: var(--font-mono);
    font-variant-numeric: tabular-nums;
  }
</style>
