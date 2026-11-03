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
  - `colormap?: "diverging" | "rainbow" | "RdBu_r"`
    `diverging` (default) as above; `rainbow` is matplotlib's, from the smallest
    to the largest value; `RdBu_r` is matplotlib's red-blue map, symmetric
    around zero (blue negative, white zero, red positive).
  - `xLabel?`, `yLabel?: string`
    Titles for the columns and the rows.
-->
<script lang="ts">
  let {
    rows,
    columns,
    values,
    colormap = "diverging",
    xLabel = "",
    yLabel = "",
  }: {
    rows: string[];
    columns: string[];
    values: number[][];
    colormap?: "diverging" | "rainbow" | "RdBu_r";
    xLabel?: string;
    yLabel?: string;
  } = $props();

  const finite = $derived(values.flat().filter(Number.isFinite));
  const lo = $derived(finite.reduce((a, v) => Math.min(a, v), Infinity));
  const hi = $derived(finite.reduce((a, v) => Math.max(a, v), -Infinity));

  // ColorBrewer's RdBu, reversed: blue (negative) through white to red.
  const RDBU_R = [
    [5, 48, 97],
    [33, 102, 172],
    [67, 147, 195],
    [146, 197, 222],
    [209, 229, 240],
    [247, 247, 247],
    [253, 219, 199],
    [244, 165, 130],
    [214, 96, 77],
    [178, 24, 43],
    [103, 0, 31],
  ];

  /** A sequential colour for `t` in [0, 1]. */
  function sequential(t: number): string {
    if (colormap === "rainbow") {
      // matplotlib's rainbow: r = |2t - 0.5|, g = sin(pi t), b = cos(pi t / 2).
      const c = (v: number) => Math.round(Math.min(1, Math.max(0, v)) * 255);
      return `rgb(${c(Math.abs(2 * t - 0.5))}, ${c(Math.sin(Math.PI * t))}, ${c(Math.cos((Math.PI * t) / 2))})`;
    }
    const x = t * (RDBU_R.length - 1);
    const k = Math.min(Math.floor(x), RDBU_R.length - 2);
    const f = x - k;
    const mix = (i: number) =>
      Math.round(RDBU_R[k][i] + (RDBU_R[k + 1][i] - RDBU_R[k][i]) * f);
    return `rgb(${mix(0)}, ${mix(1)}, ${mix(2)})`;
  }

  const limit = $derived(
    values
      .flat()
      .filter(Number.isFinite)
      .reduce((a, v) => Math.max(a, Math.abs(v)), 0) || 1,
  );

  function color(v: number): string {
    if (!Number.isFinite(v)) return "transparent";
    if (colormap === "rainbow") {
      return sequential(hi > lo ? (v - lo) / (hi - lo) : 0.5);
    }
    if (colormap === "RdBu_r") return sequential((v / limit + 1) / 2);
    const t = Math.abs(v) / limit;
    const pole = v >= 0 ? "var(--color-primary)" : "var(--color-accent)";
    return `color-mix(in oklab, ${pole} ${(t * 100).toFixed(0)}%, #d9d9d9)`;
  }

  const format = (v: number) =>
    Number.isFinite(v) ? v.toPrecision(3) : "not available";
</script>

<div class="scroll">
  {#if xLabel}<p class="axis">{xLabel}</p>{/if}
  <table>
    <thead>
      <tr>
        <th>{yLabel}</th>
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
  {#if colormap === "diverging"}
    <p>Scale: ±{limit.toPrecision(3)}, orange negative, petrol positive</p>
  {:else if colormap === "RdBu_r"}
    <p>Scale: ±{limit.toPrecision(3)}, blue negative, red positive</p>
  {:else}
    <p>Scale: {lo.toPrecision(3)} to {hi.toPrecision(3)}</p>
  {/if}
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

  .axis {
    color: var(--color-text);
    text-align: center;
  }

  p {
    color: var(--color-text-muted);
    font-size: var(--text-sm);
  }
</style>
