<!--
  @component

  A labelled grid of values on a diverging scale: gray at zero, RWTH petrol for
  positive and orange for negative values, symmetric around zero. Hovering a cell
  shows its value.

  ### Props

  - `rows: string[]`, `columns: string[]`
    Labels of the grid's rows and columns.
  - `values: number[][]`
    `values[row][column]`; a non-finite value leaves its cell empty.
-->
<script lang="ts">
  let {
    rows,
    columns,
    values,
  }: {
    rows: string[];
    columns: string[];
    values: number[][];
  } = $props();

  const limit = $derived(
    values
      .flat()
      .filter(Number.isFinite)
      .reduce((a, v) => Math.max(a, Math.abs(v)), 0) || 1,
  );

  function color(v: number): string {
    if (!Number.isFinite(v)) return "transparent";
    const t = Math.abs(v) / limit;
    const pole = v >= 0 ? "var(--color-primary)" : "var(--color-accent)";
    return `color-mix(in oklab, ${pole} ${(t * 100).toFixed(0)}%, #d9d9d9)`;
  }

  const format = (v: number) =>
    Number.isFinite(v) ? v.toPrecision(3) : "not available";
</script>

<div class="scroll">
  <table>
    <thead>
      <tr>
        <th></th>
        {#each columns as column (column)}
          <th scope="col">{column}</th>
        {/each}
      </tr>
    </thead>
    <tbody>
      {#each rows as row, r (row)}
        <tr>
          <th scope="row">{row}</th>
          {#each columns as column, c (column)}
            <td
              style:background-color={color(values[r][c])}
              title="{row}, {column}: {format(values[r][c])}"
              aria-label="{row}, {column}: {format(values[r][c])}"
            ></td>
          {/each}
        </tr>
      {/each}
    </tbody>
  </table>
  <p>Scale: ±{limit.toPrecision(3)}, orange negative, petrol positive</p>
</div>

<style>
  .scroll {
    width: 100%;
    overflow-x: auto;
  }

  table {
    border-spacing: 2px;
    font-size: var(--text-sm);
  }

  th {
    font-weight: normal;
    text-align: right;
    white-space: nowrap;
  }

  td {
    border-radius: 2px;
    min-width: 1.5rem;
    height: 1.25rem;
  }

  p {
    color: var(--color-text-muted);
    font-size: var(--text-sm);
  }
</style>
