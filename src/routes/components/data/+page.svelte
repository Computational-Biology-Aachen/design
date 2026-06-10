<script lang="ts">
  import {
    CardModel,
    LineChart,
    Math as MathComponent,
    ModelGallery,
    PageNav,
    ParameterTable,
    SimChart,
    TableAlumni,
    Text,
  } from "$lib/index.js";
  import ShowcaseContainer from "$lib/ShowcaseContainer.svelte";
  import ShowcaseSection from "$lib/ShowcaseSection.svelte";
  import ShowcaseSidebar from "$lib/ShowcaseSidebar.svelte";

  const links = [
    { label: "LineChart", id: "linechart" },
    { label: "SimChart", id: "simchart" },
    { label: "Math", id: "math" },
    { label: "TableAlumni", id: "tablealumni" },
    { label: "TableParameter", id: "tableparameter" },
    { label: "LiteratureExpander", id: "literatureexpander" },
    { label: "ModelGallery", id: "modelgallery" },
    { label: "LogoBar", id: "logobar" },
  ];

  const t = Array.from({ length: 101 }, (_, i) => i * 0.1);
  const lineChartData = {
    labels: t,
    datasets: [
      {
        label: "Compound A",
        data: t.map((x) => Math.exp(-0.3 * x) * 10),
        borderColor: "rgb(0, 97, 101)",
        backgroundColor: "rgba(0, 97, 101, 0.1)",
        tension: 0.3,
      },
      {
        label: "Compound B",
        data: t.map((x) => 10 * (1 - Math.exp(-0.3 * x))),
        borderColor: "rgb(246, 168, 0)",
        backgroundColor: "rgba(246, 168, 0, 0.1)",
        tension: 0.3,
      },
    ],
  };

  const simX = Array.from({ length: 201 }, (_, i) => i * 0.5);
  const simY = simX.map((x) => 5 * Math.sin(x * 0.3) * Math.exp(-0.05 * x) + 5);

  const paramRows = [
    { label: "kcat", newVal: "120 s⁻¹" },
    { label: "Km", newVal: "0.5 mM" },
    { label: "Vmax", newVal: "60 nmol/s" },
    { label: "koff", newVal: "0.02 s⁻¹" },
  ];
</script>

<svelte:head><title>Data & Science - CPBL Design</title></svelte:head>

<div class="showcase-page">
  <ShowcaseSidebar links={links} />
  <ShowcaseContainer>
    <ShowcaseSection
      id="linechart"
      title="LineChart"
    >
      <h3>Chart.js wrapper - time-course visualization with phase regions</h3>
      <div
        class="preview"
        style="width: 100%"
      >
        <LineChart
          data={lineChartData}
          xLabel="Time / s"
          yLabel="Concentration / mM"
          loading={false}
        />
      </div>
      <pre><code
          >{`import type { ChartData } from "chart.js/auto";

const data: ChartData = {
  labels: timePoints,
  datasets: [
    {
      label: "Compound A",
      data: concentrations,
      borderColor: "rgb(0, 97, 101)",
      tension: 0.3,
    },
  ],
};

<LineChart
  {data}
  xLabel="Time / s"
  yLabel="Concentration / mM"
  loading={false}
/>`}</code
        ></pre>
    </ShowcaseSection>

    <ShowcaseSection
      id="simchart"
      title="SimChart"
    >
      <h3>
        Lightweight canvas chart for simulation results - supports old/new run
        overlay
      </h3>
      <div
        class="preview"
        style="width: 100%"
      >
        <SimChart
          xNew={simX}
          yNew={simY}
          yLabel="Signal / a.u."
          totalTime={100}
        />
      </div>
      <pre><code
          >{`<SimChart
  xNew={timePoints}
  yNew={values}
  xOld={prevTimePoints}
  yOld={prevValues}
  yLabel="Signal / a.u."
  totalTime={100}
/>`}</code
        ></pre>
    </ShowcaseSection>

    <ShowcaseSection
      id="math"
      title="Math"
    >
      <h3>KaTeX renderer - inline and display modes</h3>
      <div class="preview">
        <p>
          Inline: <MathComponent
            tex="E = mc^2"
            display={false}
          />
        </p>
        <p>
          Inline: <MathComponent
            tex={"\\frac{d[A]}{dt} = -k_1[A][B]"}
            display={false}
          />
        </p>
        <MathComponent
          tex={"\\frac{d[NPQ]}{dt} = k_{\\rm act} \\cdot [NPQ]"}
          display={true}
        />
        <MathComponent
          tex={"\\int_0^\\infty e^{-\\lambda t}\\,dt = \\frac{1}{\\lambda}"}
          display={true}
        />
      </div>
      <pre><code
          >{`<!-- Inline -->
<Math tex={"E = mc^2"} display={false} />

<!-- Display (block) -->
<Math
  tex={"\\\\frac{d[A]}{dt} = -k_1[A][B]"}
  display={true}
  fontSize="1.1rem"
/>`}</code
        ></pre>
    </ShowcaseSection>

    <ShowcaseSection
      id="tablealumni"
      title="TableAlumni"
    >
      <h3>
        Alumni table - hardcoded CPBL data, responsive card view on mobile
      </h3>
      <div
        class="preview"
        style="overflow-x: auto"
      >
        <TableAlumni />
      </div>
      <pre><code
          >{`<!-- No props - data is hardcoded inside the component -->
<TableAlumni />`}</code
        ></pre>
    </ShowcaseSection>

    <ShowcaseSection
      id="tableparameter"
      title="TableParameter"
    >
      <h3>
        Parameter comparison table - shows new (and optionally old) values
      </h3>
      <div class="preview">
        <ParameterTable rows={paramRows} />
      </div>
      <div class="preview">
        <ParameterTable
          rows={paramRows.map((r, i) => ({
            ...r,
            oldVal: `${parseFloat(r.newVal) * 0.8 || i + 1}`,
          }))}
          showOld
          newLabel="Current"
          oldLabel="Previous"
        />
      </div>
      <pre><code
          >{`const rows = [
  { label: "kcat", newVal: "120 s⁻¹" },
  { label: "Km",   newVal: "0.5 mM" },
];

<ParameterTable {rows} />
<ParameterTable {rows} showOld newLabel="Current" oldLabel="Previous" />`}</code
        ></pre>
    </ShowcaseSection>

    <ShowcaseSection
      id="literatureexpander"
      title="LiteratureExpander"
    >
      <h3>Collapsible literature list - requires paraglide-js i18n</h3>
      <div class="preview note">
        <Text color="secondary">
          <strong>LiteratureExpander</strong> wraps an <code>Accordion</code>
          and renders its content from paraglide message keys (<code
            >m.literature()</code
          >, <code>m.literature_onpage()</code>). It is site-specific to comphot
          and cannot be previewed here.
        </Text>
      </div>
      <pre><code
          >{`<!-- Requires messages/en.json with "literature" and "literature_onpage" keys -->
<LiteratureExpander />`}</code
        ></pre>
    </ShowcaseSection>

    <ShowcaseSection
      id="modelgallery"
      title="ModelGallery"
    >
      <h3>Titled gallery grid for model cards</h3>
      <div class="preview">
        <ModelGallery title="Photosynthesis models">
          <CardModel
            name="NPQ Model"
            href="/"
          />
          <CardModel
            name="FVCB Model"
            href="/"
          />
          <CardModel
            name="PAM Fluorescence"
            href="/"
          />
        </ModelGallery>
      </div>
      <pre><code
          >{`<ModelGallery title="Photosynthesis models">
  <CardModel name="NPQ Model" href="/matuszynska2016_npq" />
  <CardModel name="FVCB Model" href="/fvcb" />
</ModelGallery>`}</code
        ></pre>
    </ShowcaseSection>

    <ShowcaseSection
      id="logobar"
      title="LogoBar"
    >
      <h3>Scrolling or static logo strip with marquee animation</h3>
      <div class="preview note">
        <Text color="secondary">
          <strong>LogoBar</strong> accepts an array of
          <code>{"{ href, img, name }[]"}</code> and animates as a marquee when
          the number of logos exceeds the <code>max</code> threshold for the current
          breakpoint.
        </Text>
      </div>
      <pre><code
          >{`const logos = [
  { href: "https://rwth-aachen.de", img: "/rwth.svg", name: "RWTH Aachen" },
  { href: "https://dfg.de",         img: "/dfg.svg",  name: "DFG" },
];

<LogoBar {logos} max={5} maxMd={3} maxSm={2} speed={40} />`}</code
        ></pre>
    </ShowcaseSection>

    <PageNav
      prev={{ href: "/components/interactive", label: "Interactive" }}
      next={{ href: "/components/navigation", label: "Navigation" }}
    />
  </ShowcaseContainer>
</div>

<style>
  .note {
    font-size: 0.9rem;
  }
</style>
