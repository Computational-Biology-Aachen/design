<!--
  @component

  A Chart.js stacked bar chart.

  ### Props

  - `categories: string[]`
    One bar per category.
  - `stacks: Array<{ label: string; values: number[] }>`
    Segments, bottom to top, with one value per category.
  - `yLabel?: string`, `yLim?: [number, number]`
    Axis title and bounds.
-->
<script lang="ts">
  import Chart from "chart.js/auto";
  import type { Attachment } from "svelte/attachments";

  let {
    categories,
    stacks,
    yLabel = "",
    yLim = undefined,
  }: {
    categories: string[];
    stacks: Array<{ label: string; values: number[] }>;
    yLabel?: string;
    yLim?: [number, number];
  } = $props();

  const draw: Attachment = (canvas) => {
    const chart = new Chart(canvas as HTMLCanvasElement, {
      type: "bar",
      data: {
        labels: categories,
        datasets: stacks.map((s) => ({
          label: s.label,
          data: s.values,
        })),
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        animation: false,
        scales: {
          x: { stacked: true },
          y: {
            stacked: true,
            min: yLim?.[0],
            max: yLim?.[1],
            title: { display: yLabel !== "", text: yLabel },
          },
        },
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
