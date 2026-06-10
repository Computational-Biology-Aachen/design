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
  }

  let {
    rows,
    showOld = false,
    newLabel = "New",
    oldLabel = "Old",
  }: Props = $props();
</script>

<div class="param-table-wrap">
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
    border-collapse: collapse;
    width: 100%;
    font-size: 0.85rem;
  }

  th,
  td {
    border-bottom: 1px solid var(--color-border);
    padding: 0.35rem 0.75rem;
    text-align: left;
  }

  th {
    background: var(--color-surface);
    font-weight: 600;
    white-space: nowrap;
  }

  .val {
    font-size: 0.8rem;
    font-family: var(--font-mono);
    font-variant-numeric: tabular-nums;
  }
</style>
