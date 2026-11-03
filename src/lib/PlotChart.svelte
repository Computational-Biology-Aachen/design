<!--
  @component

  A Chart.js chart for scientific figures: each series has its own x values, can
  be a line and/or markers with error bars, and may use a second y axis. The
  styling options follow matplotlib's, so published figures can be redrawn
  faithfully. Use [[LineChart]] for series sharing one x axis that update while
  simulating.

  ### Props

  - `series: PlotSeries[]`
    `{ label?, x, y, err?, axis?: "left" | "right", style?: "line" | "markers" }`,
    plus styling: `color`, `marker` (matplotlib codes `o s ^ v < > D d x + * .`,
    drawn on a line too), `markerSize` (radius, px), `markerFace` (fill colour,
    `"none"` for hollow), `markerEdge` (outline colour), `dash` (`"solid" | "dashed" | "dotted" | "dashdot"`, or
    on/off lengths in line widths, as matplotlib's `(0, (3, 1, 1, 1))`),
    `lineWidth` (px), `alpha`, `fillTo` (fill between `y` and these values) and
    `zorder` (higher draws on top; ties draw in order, later on top), and
    `segmentColors` (the colour of each segment, from point k to k + 1) and
    `endLabel` (text just right of the series' last point).
  - `xLabel?`, `yLabel?`, `yRightLabel?: string`
    Axis titles.
  - `xLim?`, `yLim?`, `yRightLim?: [number, number]`
    Axis bounds.
  - `yColor?`, `yRightColor?: string`
    Colour of a y axis' title and tick labels, to tie it to its series.
  - `axes?: PlotAxis[]`
    Further y axes, `{ id, position?, label?, lim?, ticks?, color? }`, stacked
    outside the left or right one; a series picks one with `axis: id`.
  - `xTicks?`, `yTicks?`, `yRightTicks?: number[]`, `xTickLabels?: string[]`
    Tick positions (and labels for the x ticks).
  - `logX?`, `logY?`, `reverseX?`, `reverseY?: boolean`
    Logarithmic or reversed axes.
  - `phases?: PlotPhase[]`
    Shaded spans, `{ from, to, color?, alpha?, edgeColor?, y?: [lo, hi], above?, text?, textColor? }`;
    without `y` they span the whole height, with `above` they form a bar above
    the plot area (e.g. light/dark protocol bars).
  - `hLines?`, `vLines?: PlotRule[]`
    Reference lines, `{ value, color?, dash?, lineWidth?, axis? }`.
  - `annotations?: PlotAnnotation[]`
    Text, `{ text, x, y, coords?: "data" | "axes", color?, size?, bold?, align? }`;
    axes coordinates run 0–1 from the plot area's bottom left.
  - `identity?: [number, number]`
    Draw the line y = x between these values, for measured-against-simulated plots.
  - `legend?: boolean`, `legendTitle?: string`, `legendPosition?: "top" | "bottom" | "right"`
    Defaults to showing it when more than one series is labelled.
  - `grid?: boolean`
    Grid lines, default `true`.
  - `margin?: number`
    Fit unset axis bounds to the data plus this fraction of its range on each
    side (matplotlib uses 0.05), instead of Chart.js's rounded bounds.
-->
<script lang="ts">
  import Chart from "chart.js/auto";
  import type { Attachment } from "svelte/attachments";

  export type PlotMarker =
    "o" | "s" | "^" | "v" | "<" | ">" | "D" | "d" | "x" | "+" | "*" | ".";
  export type PlotDash = "solid" | "dashed" | "dotted" | "dashdot" | number[];

  export interface PlotSeries {
    label?: string;
    x: number[];
    y: number[];
    err?: number[];
    /** `"left"` (default), `"right"`, or the `id` of one of `axes`. */
    axis?: string;
    style?: "line" | "markers";
    color?: string;
    marker?: PlotMarker;
    markerSize?: number;
    markerFace?: string;
    markerEdge?: string;
    dash?: PlotDash;
    lineWidth?: number;
    alpha?: number;
    fillTo?: number[];
    zorder?: number;
    segmentColors?: string[];
    endLabel?: string;
    /** Error bar line width and cap half-width, px. */
    errLineWidth?: number;
    capSize?: number;
    /** Mark only every n-th point, as matplotlib's `markevery`. */
    markEvery?: number;
  }

  export interface PlotPhase {
    from: number;
    to: number;
    color?: string;
    alpha?: number;
    y?: [number, number];
    edgeColor?: string;
    /** Draw as a bar just above the plot area instead of inside it. */
    above?: boolean;
    text?: string;
    textColor?: string;
  }

  export interface PlotRule {
    value: number;
    color?: string;
    dash?: PlotDash;
    lineWidth?: number;
    axis?: string;
  }

  /** A further y axis, beside the left and right ones. */
  export interface PlotAxis {
    id: string;
    position?: "left" | "right";
    label?: string;
    lim?: [number, number];
    ticks?: number[];
    color?: string;
  }

  export interface PlotAnnotation {
    text: string;
    x: number;
    y: number;
    coords?: "data" | "axes";
    color?: string;
    size?: number;
    bold?: boolean;
    align?: "left" | "center" | "right";
  }

  let {
    series,
    xLabel = "",
    yLabel = "",
    yRightLabel = "",
    xLim = undefined,
    yLim = undefined,
    yRightLim = undefined,
    yColor = undefined,
    yRightColor = undefined,
    xTicks = undefined,
    yTicks = undefined,
    yRightTicks = undefined,
    xTickLabels = undefined,
    logX = false,
    logY = false,
    reverseX = false,
    reverseY = false,
    phases = [],
    hLines = [],
    vLines = [],
    annotations = [],
    identity = undefined,
    axes = [],
    legend = undefined,
    legendTitle = undefined,
    legendPosition = undefined,
    grid = true,
    margin = undefined,
  }: {
    series: PlotSeries[];
    xLabel?: string;
    yLabel?: string;
    yRightLabel?: string;
    xLim?: [number, number];
    yLim?: [number, number];
    yRightLim?: [number, number];
    yColor?: string;
    yRightColor?: string;
    xTicks?: number[];
    yTicks?: number[];
    yRightTicks?: number[];
    xTickLabels?: string[];
    logX?: boolean;
    logY?: boolean;
    reverseX?: boolean;
    reverseY?: boolean;
    phases?: PlotPhase[];
    hLines?: PlotRule[];
    vLines?: PlotRule[];
    annotations?: PlotAnnotation[];
    identity?: [number, number];
    axes?: PlotAxis[];
    legend?: boolean;
    legendTitle?: string;
    legendPosition?: "top" | "bottom" | "right";
    grid?: boolean;
    margin?: number;
  } = $props();

  const DEFAULT_COLORS = [
    "#1f77b4",
    "#ff7f0e",
    "#2ca02c",
    "#d62728",
    "#9467bd",
    "#8c564b",
    "#e377c2",
    "#7f7f7f",
    "#bcbd22",
    "#17becf",
  ];

  /** `color` with its opacity multiplied by `alpha`, as rgba(). */
  function withAlpha(color: string, alpha = 1): string {
    if (alpha >= 1 || color === "transparent") return color;
    const ctx = document.createElement("canvas").getContext("2d");
    if (!ctx) return color;
    ctx.fillStyle = color;
    const normal = ctx.fillStyle;
    if (normal.startsWith("#")) {
      const n = parseInt(normal.slice(1), 16);
      return `rgba(${(n >> 16) & 255}, ${(n >> 8) & 255}, ${n & 255}, ${alpha})`;
    }
    // rgba(r, g, b, a): scale the existing alpha.
    const parts = normal.match(/[\d.]+/g)?.map(Number) ?? [0, 0, 0, 1];
    return `rgba(${parts[0]}, ${parts[1]}, ${parts[2]}, ${(parts[3] ?? 1) * alpha})`;
  }

  /** matplotlib's dash patterns, which scale with the line width. */
  function dashPattern(dash: PlotDash | undefined, width: number): number[] {
    const w = Math.max(width, 1);
    if (Array.isArray(dash)) return dash.map((d) => d * w);
    switch (dash) {
      case "dashed":
        return [3.7 * w, 1.6 * w];
      case "dotted":
        return [1 * w, 1.65 * w];
      case "dashdot":
        return [6.4 * w, 1.6 * w, 1 * w, 1.6 * w];
      default:
        return [];
    }
  }

  const POINT_STYLES: Record<
    PlotMarker,
    { style: string; rotation?: number; scale?: number }
  > = {
    o: { style: "circle" },
    ".": { style: "circle", scale: 0.5 },
    s: { style: "rect" },
    "^": { style: "triangle" },
    v: { style: "triangle", rotation: 180 },
    "<": { style: "triangle", rotation: 270 },
    ">": { style: "triangle", rotation: 90 },
    D: { style: "rectRot" },
    d: { style: "rectRot", scale: 0.8 },
    x: { style: "crossRot" },
    "+": { style: "cross" },
    "*": { style: "star" },
  };

  /** Height of the bar `above` phases draw over the plot area, px. */
  const ABOVE_BAR = 14;

  const phaseShading = {
    id: "plotPhases",
    beforeDatasetsDraw(ch: Chart) {
      const { ctx, chartArea, scales } = ch;
      ctx.save();
      for (const p of phases) {
        const a = scales.x.getPixelForValue(p.from);
        const b = scales.x.getPixelForValue(p.to);
        const left = Math.max(Math.min(a, b), chartArea.left);
        const right = Math.min(Math.max(a, b), chartArea.right);
        if (right <= left) continue;
        let top = chartArea.top;
        let bottom = chartArea.bottom;
        if (p.above) {
          // A bar just above the plot area, as matplotlib's unclipped patches.
          top = chartArea.top - ABOVE_BAR;
          bottom = chartArea.top;
        } else if (p.y) {
          const ya = scales.y.getPixelForValue(p.y[0]);
          const yb = scales.y.getPixelForValue(p.y[1]);
          top = Math.max(Math.min(ya, yb), chartArea.top);
          bottom = Math.min(Math.max(ya, yb), chartArea.bottom);
        }
        ctx.fillStyle = p.color
          ? withAlpha(p.color, p.alpha ?? 1)
          : `rgba(0, 0, 0, ${p.alpha ?? 0.1})`;
        ctx.fillRect(left, top, right - left, bottom - top);
        if (p.edgeColor) {
          ctx.strokeStyle = p.edgeColor;
          ctx.lineWidth = 1;
          ctx.setLineDash([]);
          ctx.strokeRect(left, top, right - left, bottom - top);
        }
        if (p.text) {
          ctx.fillStyle = p.textColor ?? "#000";
          ctx.textAlign = "center";
          ctx.textBaseline = "middle";
          ctx.font = `12px ${Chart.defaults.font.family}`;
          ctx.fillText(p.text, (left + right) / 2, (top + bottom) / 2);
        }
      }
      ctx.restore();
    },
  };

  const fills = {
    id: "plotFills",
    beforeDatasetsDraw(ch: Chart) {
      const { ctx, scales, chartArea } = ch;
      ctx.save();
      ctx.beginPath();
      ctx.rect(
        chartArea.left,
        chartArea.top,
        chartArea.right - chartArea.left,
        chartArea.bottom - chartArea.top,
      );
      ctx.clip();
      series.forEach((s, i) => {
        if (!s.fillTo || !ch.isDatasetVisible(i)) return;
        const y = scales[scaleId(s.axis)];
        const fill = s.fillTo;
        ctx.fillStyle = withAlpha(colorOf(s, i), s.alpha ?? 1);
        ctx.beginPath();
        s.x.forEach((x, k) => {
          const px = scales.x.getPixelForValue(x);
          const py = y.getPixelForValue(s.y[k]);
          if (k === 0) ctx.moveTo(px, py);
          else ctx.lineTo(px, py);
        });
        for (let k = s.x.length - 1; k >= 0; k--) {
          ctx.lineTo(
            scales.x.getPixelForValue(s.x[k]),
            y.getPixelForValue(fill[k]),
          );
        }
        ctx.closePath();
        ctx.fill();
      });
      ctx.restore();
    },
  };

  const rules = {
    id: "plotRules",
    afterDatasetsDraw(ch: Chart) {
      const { ctx, chartArea, scales } = ch;
      ctx.save();
      const stroke = (r: PlotRule) => {
        const width = r.lineWidth ?? 1.5;
        ctx.strokeStyle = r.color ?? "#000";
        ctx.lineWidth = width;
        ctx.setLineDash(dashPattern(r.dash, width));
      };
      for (const r of hLines) {
        const scale = scales[scaleId(r.axis)];
        if (!scale) continue;
        const py = scale.getPixelForValue(r.value);
        if (py < chartArea.top || py > chartArea.bottom) continue;
        stroke(r);
        ctx.beginPath();
        ctx.moveTo(chartArea.left, py);
        ctx.lineTo(chartArea.right, py);
        ctx.stroke();
      }
      for (const r of vLines) {
        const px = scales.x.getPixelForValue(r.value);
        if (px < chartArea.left || px > chartArea.right) continue;
        stroke(r);
        ctx.beginPath();
        ctx.moveTo(px, chartArea.top);
        ctx.lineTo(px, chartArea.bottom);
        ctx.stroke();
      }
      ctx.restore();
    },
  };

  const texts = {
    id: "plotAnnotations",
    afterDraw(ch: Chart) {
      const { ctx, chartArea, scales } = ch;
      ctx.save();
      ctx.textBaseline = "middle";
      ctx.font = `12px ${Chart.defaults.font.family}`;
      series.forEach((s, i) => {
        if (!s.endLabel || !ch.isDatasetVisible(i)) return;
        let k = s.y.length - 1;
        while (k >= 0 && !Number.isFinite(s.y[k])) k--;
        if (k < 0) return;
        const y = scales[scaleId(s.axis)];
        ctx.fillStyle = colorOf(s, i);
        ctx.textAlign = "left";
        ctx.fillText(
          s.endLabel,
          scales.x.getPixelForValue(s.x[k]) + 4,
          y.getPixelForValue(s.y[k]),
        );
      });
      for (const a of annotations) {
        const px =
          a.coords === "axes"
            ? chartArea.left + a.x * (chartArea.right - chartArea.left)
            : scales.x.getPixelForValue(a.x);
        const py =
          a.coords === "axes"
            ? chartArea.bottom - a.y * (chartArea.bottom - chartArea.top)
            : scales.y.getPixelForValue(a.y);
        ctx.fillStyle = a.color ?? "#000";
        ctx.textAlign = a.align ?? "center";
        ctx.textBaseline = "middle";
        ctx.font = `${a.bold ? "bold " : ""}${a.size ?? 12}px ${Chart.defaults.font.family}`;
        ctx.fillText(a.text, px, py);
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
        const y = scales[scaleId(s.axis)];
        ctx.strokeStyle = String(ch.data.datasets[i].borderColor);
        ctx.lineWidth = s.errLineWidth ?? 1.5;
        ctx.setLineDash([]);
        const cap = s.capSize ?? 0;
        s.err.forEach((e, k) => {
          const px = scales.x.getPixelForValue(s.x[k]);
          const lo = y.getPixelForValue(s.y[k] - e);
          const hi = y.getPixelForValue(s.y[k] + e);
          ctx.beginPath();
          ctx.moveTo(px, lo);
          ctx.lineTo(px, hi);
          if (cap > 0) {
            ctx.moveTo(px - cap, lo);
            ctx.lineTo(px + cap, lo);
            ctx.moveTo(px - cap, hi);
            ctx.lineTo(px + cap, hi);
          }
          ctx.stroke();
        });
      });
      ctx.restore();
    },
  };

  /** Unstyled series take the next default colour of their own axis. */
  function colorOf(s: PlotSeries, i: number): string {
    if (s.color) return s.color;
    const k = series
      .slice(0, i)
      .filter((o) => !o.color && scaleId(o.axis) === scaleId(s.axis)).length;
    return DEFAULT_COLORS[k % DEFAULT_COLORS.length];
  }

  /** The Chart.js scale a series or rule is drawn against. */
  function scaleId(axis: string | undefined): string {
    if (axis === undefined || axis === "left") return "y";
    return axis === "right" ? "yRight" : `axis_${axis}`;
  }

  const hasRight = $derived(series.some((s) => s.axis === "right"));
  // With every series on the right axis, the empty left one is hidden.
  const hasLeft = $derived(
    !hasRight || series.some((s) => scaleId(s.axis) === "y"),
  );

  /**
   * The data's extent plus `margin` of it on each side, or nothing to leave the
   * bound to Chart.js; on a log axis the margin is taken in decades.
   */
  function fitted(
    values: number[],
    log: boolean,
    lim: [number, number] | undefined,
  ): { min?: number; max?: number; bounds?: "data" } {
    // `bounds: "data"` keeps the bounds exact; with "ticks" a log axis drops
    // a maximum that isn't a decade.
    if (lim) return { min: lim[0], max: lim[1], bounds: "data" as const };
    if (margin === undefined) return {};
    const t = (v: number) => (log ? Math.log10(v) : v);
    const inv = (v: number) => (log ? 10 ** v : v);
    let lo = Infinity;
    let hi = -Infinity;
    for (const v of values) {
      if (!Number.isFinite(v) || (log && v <= 0)) continue;
      lo = Math.min(lo, t(v));
      hi = Math.max(hi, t(v));
    }
    if (!Number.isFinite(lo)) return {};
    const pad = (hi - lo || Math.abs(hi) || 1) * margin;
    return { min: inv(lo - pad), max: inv(hi + pad), bounds: "data" as const };
  }

  function yValues(axis: string): number[] {
    const out: number[] = [];
    for (const s of series) {
      if (scaleId(s.axis) !== scaleId(axis)) continue;
      out.push(...s.y);
      if (s.fillTo) out.push(...s.fillTo);
      if (s.err) s.y.forEach((v, k) => out.push(v - s.err![k], v + s.err![k]));
    }
    for (const r of hLines)
      if (scaleId(r.axis) === scaleId(axis)) out.push(r.value);
    // Bounded phases count, as matplotlib's autoscale includes patches.
    if (axis === "left") for (const p of phases) if (p.y) out.push(...p.y);
    return out;
  }

  /** A tick value as matplotlib writes it: exact, without digit grouping. */
  const plain = (value: number | string) => {
    const v = Number(value);
    // Steps like linspace(-0.006, 0.006, 7) land on 1e-19 instead of 0.
    return Math.abs(v) < 1e-12 ? "0" : String(Number(v.toPrecision(12)));
  };

  const SUPERSCRIPT = "⁰¹²³⁴⁵⁶⁷⁸⁹";
  /** Label only decades on a log axis, as 10ⁿ, like matplotlib. */
  const decade = (value: number | string) => {
    const e = Math.log10(Number(value));
    if (Math.abs(e - Math.round(e)) > 1e-9) return "";
    const n = Math.round(e);
    const digits = [...String(Math.abs(n))]
      .map((d) => SUPERSCRIPT[+d])
      .join("");
    return `10${n < 0 ? "⁻" : ""}${digits}`;
  };

  type Ticks = { min: number; max: number; ticks: Array<{ value: number }> };

  /**
   * Fixed tick positions, or else ticks on whole multiples of Chart.js's step
   * only: with bounds fitted to the data it would also label the odd bounds.
   */
  function ticksAt(
    values: number[] | undefined,
    labels?: string[],
    log = false,
  ) {
    if (!values) {
      return log
        ? { ticks: { autoSkip: false, callback: decade } }
        : {
            afterBuildTicks: (axis: Ticks) => {
              const t = axis.ticks.map((tick) => tick.value);
              if (t.length < 2) return;
              // A matplotlib-like step of 1, 2, 2.5 or 5 times a power of ten,
              // for up to about eight ticks; Chart.js skips labels that crowd.
              const raw = (axis.max - axis.min) / 8;
              const mag = 10 ** Math.floor(Math.log10(raw));
              const step =
                mag * ([1, 2, 2.5, 5, 10].find((m) => m * mag >= raw) ?? 10);
              if (!Number.isFinite(step)) return;
              const digits = Math.max(0, 2 - Math.floor(Math.log10(step)));
              const round = (v: number) => Number(v.toFixed(digits));
              const out: Array<{ value: number }> = [];
              for (
                let k = Math.ceil(axis.min / step - 1e-9);
                k * step <= axis.max + step * 1e-9;
                k++
              ) {
                out.push({ value: round(k * step) });
              }
              axis.ticks = out;
            },
            ticks: { callback: plain },
          };
    }
    return {
      afterBuildTicks: (axis: Ticks) => {
        axis.ticks = values.map((value) => ({ value }));
      },
      // Fixed ticks are all kept where they fit; Chart.js drops some where
      // they would overlap, on narrow charts.
      ticks: labels
        ? {
            autoSkip: true,
            maxRotation: 0,
            callback: (value: number | string) => {
              const k = values.indexOf(Number(value));
              return k >= 0 ? (labels[k] ?? "") : "";
            },
          }
        : { autoSkip: true, maxRotation: 0, callback: log ? decade : plain },
    };
  }

  /** Tick options with their labels in `color`. */
  function colored<T extends { ticks?: object }>(options: T, color?: string) {
    return color ? { ...options, ticks: { ...options.ticks, color } } : options;
  }

  const draw: Attachment = (canvas) => {
    const n = series.length;
    const datasets = series.map((s, i) => {
      const color = withAlpha(colorOf(s, i), s.alpha ?? 1);
      const width = s.lineWidth ?? 2;
      const markers = s.style === "markers" || s.marker !== undefined;
      const point = POINT_STYLES[s.marker ?? "o"];
      const radius = markers ? (s.markerSize ?? 4) * (point.scale ?? 1) : 0;
      const face =
        s.markerFace === "none"
          ? "transparent"
          : withAlpha(s.markerFace ?? colorOf(s, i), s.alpha ?? 1);
      return {
        label: s.label ?? "",
        data: s.x.map((x, k) => ({ x, y: s.y[k] })),
        yAxisID: scaleId(s.axis),
        showLine: s.style !== "markers" && width > 0,
        borderColor: color,
        backgroundColor: face,
        borderWidth: width,
        borderDash: dashPattern(s.dash, width),
        ...(s.segmentColors
          ? {
              segment: {
                borderColor: (ctx: { p0DataIndex: number }) =>
                  s.segmentColors?.[ctx.p0DataIndex] ?? color,
              },
            }
          : {}),
        pointStyle: point.style,
        rotation: point.rotation ?? 0,
        pointRadius: s.markEvery
          ? (ctx: { dataIndex: number }) =>
              ctx.dataIndex % (s.markEvery ?? 1) === 0 ? radius : 0
          : radius,
        pointHoverRadius: radius,
        pointBorderColor: s.markerEdge ?? color,
        pointBackgroundColor: face,
        pointBorderWidth: markers ? 1.5 : 0,
        // Chart.js draws higher `order` first; matplotlib draws later on top.
        order: -((s.zorder ?? 2) * 1e6 + i - n),
      };
    });
    if (identity) {
      datasets.push({
        ...datasets[0],
        label: "",
        data: identity.map((v) => ({ x: v, y: v })),
        yAxisID: "y",
        showLine: true,
        borderColor: "#000",
        backgroundColor: "#000",
        borderWidth: 1,
        borderDash: [],
        pointRadius: 0,
        pointHoverRadius: 0,
        pointBorderWidth: 0,
        order: 1e9,
      });
    }
    const labelled = series.filter((s) => s.label).length;
    const chart = new Chart(canvas as HTMLCanvasElement, {
      type: "scatter",
      plugins: [phaseShading, fills, errorBars, rules, texts],
      data: { datasets },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        animation: false,
        // Room for text placed above the plot area, such as a "×10²" scale.
        layout: {
          padding: {
            top:
              (annotations.some((a) => a.coords === "axes" && a.y > 1)
                ? 16
                : 0) + (phases.some((p) => p.above) ? ABOVE_BAR + 2 : 0),
          },
        },
        scales: {
          x: {
            type: logX ? "logarithmic" : "linear",
            reverse: reverseX,
            ...fitted(
              [...series.flatMap((s) => s.x), ...vLines.map((r) => r.value)],
              logX,
              xLim,
            ),
            title: { display: xLabel !== "", text: xLabel },
            grid: { display: grid },
            ...ticksAt(xTicks, xTickLabels, logX),
          },
          y: {
            type: logY ? "logarithmic" : "linear",
            display: hasLeft,
            reverse: reverseY,
            ...fitted(yValues("left"), logY, yLim),
            title: { display: yLabel !== "", text: yLabel, color: yColor },
            grid: { display: grid },
            ...colored(ticksAt(yTicks, undefined, logY), yColor),
          },
          ...Object.fromEntries(
            axes.map((a) => [
              scaleId(a.id),
              {
                position: a.position ?? "right",
                ...fitted(yValues(a.id), false, a.lim),
                title: {
                  display: (a.label ?? "") !== "",
                  text: a.label ?? "",
                  color: a.color,
                },
                grid: { drawOnChartArea: false },
                ...colored(ticksAt(a.ticks), a.color),
              },
            ]),
          ),
          ...(hasRight
            ? {
                yRight: {
                  position: "right" as const,
                  ...fitted(yValues("right"), false, yRightLim),
                  title: {
                    display: yRightLabel !== "",
                    text: yRightLabel,
                    color: yRightColor,
                  },
                  grid: { drawOnChartArea: false },
                  ...colored(ticksAt(yRightTicks), yRightColor),
                },
              }
            : {}),
        },
        plugins: {
          legend: {
            display: legend ?? labelled > 1,
            // A bar above the plot would cover a legend on top.
            position:
              legendPosition ??
              (phases.some((p) => p.above) ? "bottom" : "top"),
            title: {
              display: legendTitle !== undefined,
              text: legendTitle ?? "",
            },
            labels: {
              filter: (item) => item.text !== "",
              // In series order, not in drawing order.
              sort: (a, b) => (a.datasetIndex ?? 0) - (b.datasetIndex ?? 0),
              usePointStyle: true,
              boxHeight: 8,
              // Lines show as lines and marker series as their marker, like matplotlib.
              generateLabels: (ch) =>
                Chart.defaults.plugins.legend.labels
                  .generateLabels(ch)
                  .map((item) => {
                    const s = series[item.datasetIndex ?? -1];
                    if (!s) return item;
                    const markerOnly =
                      s.style === "markers" || (s.lineWidth ?? 2) === 0;
                    if (s.fillTo && (s.lineWidth ?? 2) === 0) {
                      return { ...item, pointStyle: "rect" };
                    }
                    return markerOnly
                      ? item
                      : {
                          ...item,
                          pointStyle: "line",
                          lineWidth: s.lineWidth ?? 2,
                          lineDash: dashPattern(s.dash, s.lineWidth ?? 2),
                        };
                  }),
            },
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
