<!--
  @component

  A Chart.js chart for scientific figures: each series has its own x values, can
  be a line or markers with error bars, and may use a second y axis. Use
  [[LineChart]] for series sharing one x axis that update while simulating.

  ### Props

  - `series: PlotSeries[]`
    `{ label?, x, y, err?, axis?: "left" | "right", style?: "line" | "markers" }`.
  - `xLabel?`, `yLabel?`, `yRightLabel?: string`
    Axis titles.
  - `xLim?`, `yLim?`, `yRightLim?: [number, number]`
    Axis bounds.
  - `logX?: boolean`
    Logarithmic x axis.
  - `phases?: PlotPhase[]`
    Shaded x spans, `{ from, to }`.
  - `identity?: [number, number]`
    Draw the line y = x between these values, for measured-against-simulated plots.
-->
<script lang="ts">
  import Chart from "chart.js/auto";
  import type { Attachment } from "svelte/attachments";

  export interface PlotSeries {
    label?: string;
    x: number[];
    y: number[];
    err?: number[];
    axis?: "left" | "right";
    style?: "line" | "markers";
  }

  export interface PlotPhase {
    from: number;
    to: number;
  }

  let {
    series,
    xLabel = "",
    yLabel = "",
    yRightLabel = "",
    xLim = undefined,
    yLim = undefined,
    yRightLim = undefined,
    logX = false,
    phases = [],
    identity = undefined,
  }: {
    series: PlotSeries[];
    xLabel?: string;
    yLabel?: string;
    yRightLabel?: string;
    xLim?: [number, number];
    yLim?: [number, number];
    yRightLim?: [number, number];
    logX?: boolean;
    phases?: PlotPhase[];
    identity?: [number, number];
  } = $props();

  const phaseShading = {
    id: "plotPhases",
    beforeDraw(ch: Chart) {
      const { ctx, chartArea, scales } = ch;
      ctx.save();
      ctx.fillStyle = "rgba(0, 0, 0, 0.1)";
      for (const { from, to } of phases) {
        const left = Math.max(scales.x.getPixelForValue(from), chartArea.left);
        const right = Math.min(scales.x.getPixelForValue(to), chartArea.right);
        if (right > left) {
          ctx.fillRect(left, chartArea.top, right - left, chartArea.height);
        }
      }
      ctx.restore();
    },
  };

  const errorBars = {
    id: "plotErrorBars",
    afterDatasetsDraw(ch: Chart) {
      const { ctx, scales } = ch;
      ctx.save();
      series.forEach((s, i) => {
        if (!s.err || !ch.isDatasetVisible(i)) return;
        const y = scales[s.axis === "right" ? "yRight" : "y"];
        ctx.strokeStyle = String(ch.data.datasets[i].borderColor);
        s.err.forEach((e, k) => {
          const px = scales.x.getPixelForValue(s.x[k]);
          ctx.beginPath();
          ctx.moveTo(px, y.getPixelForValue(s.y[k] - e));
          ctx.lineTo(px, y.getPixelForValue(s.y[k] + e));
          ctx.stroke();
        });
      });
      ctx.restore();
    },
  };

  const hasRight = $derived(series.some((s) => s.axis === "right"));

  const draw: Attachment = (canvas) => {
    const datasets = series.map((s) => ({
      label: s.label ?? "",
      data: s.x.map((x, i) => ({ x, y: s.y[i] })),
      yAxisID: s.axis === "right" ? "yRight" : "y",
      showLine: s.style !== "markers",
      pointRadius: s.style === "markers" ? 4 : 0,
      borderWidth: 2,
    }));
    if (identity) {
      datasets.push({
        label: "",
        data: identity.map((v) => ({ x: v, y: v })),
        yAxisID: "y",
        showLine: true,
        pointRadius: 0,
        borderWidth: 1,
      });
    }
    const chart = new Chart(canvas as HTMLCanvasElement, {
      type: "scatter",
      plugins: [phaseShading, errorBars],
      data: { datasets },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        animation: false,
        scales: {
          x: {
            type: logX ? "logarithmic" : "linear",
            min: xLim?.[0],
            max: xLim?.[1],
            title: { display: xLabel !== "", text: xLabel },
          },
          y: {
            min: yLim?.[0],
            max: yLim?.[1],
            title: { display: yLabel !== "", text: yLabel },
          },
          ...(hasRight
            ? {
                yRight: {
                  position: "right" as const,
                  min: yRightLim?.[0],
                  max: yRightLim?.[1],
                  title: { display: yRightLabel !== "", text: yRightLabel },
                  grid: { drawOnChartArea: false },
                },
              }
            : {}),
        },
        plugins: {
          legend: {
            display: series.length > 1,
            labels: { filter: (item) => item.text !== "" },
          },
        },
      },
    });
    return () => chart.destroy();
  };
</script>

<div class="plot-chart">
  <canvas {@attach draw}></canvas>
</div>

<style>
  .plot-chart {
    width: 100%;
    height: 300px;
  }

  canvas {
    max-width: 100%;
    max-height: 100%;
  }
</style>
