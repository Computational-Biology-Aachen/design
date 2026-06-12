<!--
  @component

  A responsive grid of [[LineChart]]s that can share axis bounds across all
  cells, so a set of related time-courses line up on the same scale. The grid
  scans every chart's data to compute the shared `min`/`max` and forwards
  common props (labels, scales, loading state, phases) to each chart, while any
  per-chart entry can override them.

  ### Props

  - `charts: LineChartGridItem[]`
    One entry per chart. `data` is required; every other `LineChart` prop is
    optional and, when omitted, falls back to the grid-level default.
  - `columns?: number`
    Column count on wide viewports (drops to 1 on screens ≤640px). Defaults to `2`.
  - `shareX?: boolean`
    Share x-axis bounds across all charts. Defaults to `true`.
  - `shareY?: boolean`
    Share y-axis bounds across all charts. Defaults to `false`.
  - `gap?: string`
    CSS grid gap. Defaults to `"var(--gap)"`.
  - `xLabel?`, `yLabel?`, `xScale?`, `yScale?`, `loading?`, `loadingDelay?`, `lineDisplay?`, `phases?`
    Grid-level defaults forwarded to every chart; overridable per entry.

  ### Bound sharing

  When an axis is shared the grid takes the global min/max over every chart's
  values **and** any explicit per-chart bound. The single shared value is then
  used for all charts, unless an individual entry sets its own bound (`??`
  override wins). Charts that don't share keep `LineChart`'s own defaults.

  ### Example

  ```svelte
  <LineChartGrid
    columns={2}
    xLabel="Time / s"
    loading={isRunning}
    charts={[
      { data: atpData, yLabel: "ATP / mM" },
      { data: nadphData, yLabel: "NADPH / mM" },
    ]}
  />
  ```
-->
<script lang="ts">
  import type { ChartData } from "chart.js/auto";
  import type { ComponentProps } from "svelte";
  import LineChart from "./LineChart.svelte";

  type LineChartProps = ComponentProps<typeof LineChart>;
  export type LineChartGridItem = Partial<LineChartProps> & {
    data: ChartData;
  };

  let {
    charts,
    columns = 2,
    shareX = true,
    shareY = false,
    gap = "var(--gap)",
    xLabel,
    yLabel,
    xScale,
    yScale,
    loading,
    loadingDelay,
    lineDisplay,
    phases,
  }: {
    charts: LineChartGridItem[];
    columns?: number;
    shareX?: boolean;
    shareY?: boolean;
    gap?: string;
    xLabel?: LineChartProps["xLabel"];
    yLabel?: LineChartProps["yLabel"];
    xScale?: LineChartProps["xScale"];
    yScale?: LineChartProps["yScale"];
    loading?: LineChartProps["loading"];
    loadingDelay?: LineChartProps["loadingDelay"];
    lineDisplay?: LineChartProps["lineDisplay"];
    phases?: LineChartProps["phases"];
  } = $props();

  const gridDefaults = $derived({
    xLabel,
    yLabel,
    xScale,
    yScale,
    loading,
    loadingDelay,
    lineDisplay,
    phases,
  });

  /** Numeric value of a single dataset point (`number`, `{x,y}`, or `[x,y]`). */
  function pointValue(point: unknown): number | undefined {
    if (typeof point === "number") return point;
    if (Array.isArray(point))
      return typeof point[1] === "number" ? point[1] : undefined;
    if (point && typeof point === "object" && "y" in point) {
      const y = (point as { y: unknown }).y;
      return typeof y === "number" ? y : undefined;
    }
    return undefined;
  }

  /** Fold finite numbers into a running [min, max], seeding undefined bounds. */
  function extend(
    bounds: [number | undefined, number | undefined],
    value: number | undefined,
  ): [number | undefined, number | undefined] {
    if (value === undefined || !Number.isFinite(value)) return bounds;
    const [min, max] = bounds;
    return [
      min === undefined ? value : Math.min(min, value),
      max === undefined ? value : Math.max(max, value),
    ];
  }

  const sharedX = $derived.by<[number | undefined, number | undefined]>(() => {
    if (!shareX) return [undefined, undefined];
    let bounds: [number | undefined, number | undefined] = [
      undefined,
      undefined,
    ];
    for (const chart of charts) {
      for (const label of chart.data.labels ?? [])
        bounds = extend(bounds, Number(label));
      bounds = extend(bounds, chart.xMin);
      bounds = extend(bounds, chart.xMax);
    }
    return bounds;
  });

  const sharedY = $derived.by<[number | undefined, number | undefined]>(() => {
    if (!shareY) return [undefined, undefined];
    let bounds: [number | undefined, number | undefined] = [
      undefined,
      undefined,
    ];
    for (const chart of charts) {
      for (const ds of chart.data.datasets ?? [])
        for (const point of ds.data ?? [])
          bounds = extend(bounds, pointValue(point));
      bounds = extend(bounds, chart.yMin);
      bounds = extend(bounds, chart.yMax);
    }
    return bounds;
  });

  const resolved = $derived(
    charts.map((chart) => ({
      ...gridDefaults,
      ...chart,
      xMin: chart.xMin ?? (shareX ? sharedX[0] : undefined),
      xMax: chart.xMax ?? (shareX ? sharedX[1] : undefined),
      yMin: chart.yMin ?? (shareY ? sharedY[0] : undefined),
      yMax: chart.yMax ?? (shareY ? sharedY[1] : undefined),
    })),
  );
</script>

<div
  class="chart-grid"
  style:--cols={columns}
  style:gap={gap}
>
  {#each resolved as props, i (i)}
    <LineChart {...props} />
  {/each}
</div>

<style>
  .chart-grid {
    display: grid;
    grid-template-columns: repeat(var(--cols), minmax(0, 1fr));
    align-items: start;
    width: 100%;
  }

  @media (max-width: 640px) {
    .chart-grid {
      grid-template-columns: 1fr;
    }
  }
</style>
