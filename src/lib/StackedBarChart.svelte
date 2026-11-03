<!--
  @component

  A Chart.js stacked bar chart.

  ### Props

  - `categories: string[]`
    One bar per category.
  - `stacks: Array<{ label: string; values: number[]; color?: string }>`
    Segments, bottom to top, with one value per category.
  - `yLabel?: string`, `yLim?: [number, number]`, `yTicks?: number[]`
    Axis title, bounds and tick positions.
  - `reverseLegend?: boolean`
    List the segments top to bottom, as they are stacked.
  - `grid?: boolean`
    Grid lines, default `true`.
-->
<script lang="ts">
  import Chart from "chart.js/auto";
  import type { Attachment } from "svelte/attachments";

  let {
    categories,
    stacks,
    yLabel = "",
    yLim = undefined,
    yTicks = undefined,
    reverseLegend = false,
    grid = true,
  }: {
    categories: string[];
    stacks: Array<{ label: string; values: number[]; color?: string }>;
    yLabel?: string;
    yLim?: [number, number];
    yTicks?: number[];
    reverseLegend?: boolean;
    grid?: boolean;
  } = $props();

  const draw: Attachment = (canvas) => {
    const chart = new Chart(canvas as HTMLCanvasElement, {
      type: "bar",
      data: {
        labels: categories,
        datasets: stacks.map((s) => ({
          label: s.label,
          data: s.values,
          ...(s.color
            ? { backgroundColor: s.color, borderColor: s.color }
            : {}),
        })),
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        animation: false,
        scales: {
          x: { stacked: true, grid: { display: grid } },
          y: {
            stacked: true,
            min: yLim?.[0],
            max: yLim?.[1],
            title: { display: yLabel !== "", text: yLabel },
            grid: { display: grid },
            ...(yTicks
              ? {
                  afterBuildTicks: (axis: {
                    ticks: Array<{ value: number }>;
                  }) => {
                    axis.ticks = yTicks.map((value) => ({ value }));
                  },
                }
              : {}),
          },
        },
        plugins: { legend: { reverse: reverseLegend } },
      },
    });
    return () => chart.destroy();
  };
</script>

<div class="stacked-bar">
  <canvas {@attach draw}></canvas>
</div>

<style>
  .stacked-bar {
    width: 100%;
    height: 300px;
  }

  canvas {
    max-width: 100%;
    max-height: 100%;
  }
</style>
