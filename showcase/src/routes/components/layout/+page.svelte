<script lang="ts">
  import ShowcaseSection from "$lib/ShowcaseSection.svelte";
  import ShowcaseSidebar from "$lib/ShowcaseSidebar.svelte";
  import {
    CardFeature,
    Grid,
    GridPerson,
    GridSponsor,
    InlineGrid,
    PageNav,
    Pair,
    Row,
    Text,
  } from "@computational-biology-aachen/design";

  const links = [
    { label: "Row", id: "row" },
    { label: "Grid", id: "grid" },
    { label: "InlineGrid", id: "inlinegrid" },
    { label: "GridPerson", id: "gridperson" },
    { label: "GridSponsor", id: "gridsponsor" },
    { label: "Pair", id: "pair" },
    { label: "Narrow", id: "narrow" },
    { label: "Main", id: "main" },
    { label: "CardFeature", id: "featurebox" },
    { label: "DynBoxGrid / DynBoxRow", id: "dynbox" },
  ];
</script>

<svelte:head><title>Layout — CPBL Design</title></svelte:head>

<div class="showcase-page">
  <ShowcaseSidebar links={links} />
  <div>
    <ShowcaseSection
      id="row"
      title="Row"
    >
      <h3>Flex row with gap, align, justify, wrap props</h3>
      <div class="preview">
        <p class="demo-label">justify="between"</p>
        <Row justify="between">
          <div class="box">A</div>
          <div class="box">B</div>
          <div class="box">C</div>
        </Row>
      </div>
      <div class="preview">
        <p class="demo-label">justify="center" gap="var(--space-6)"</p>
        <Row
          justify="center"
          gap="var(--space-6)"
        >
          <div class="box">A</div>
          <div class="box">B</div>
          <div class="box">C</div>
        </Row>
      </div>
      <div class="preview">
        <p class="demo-label">wrap gap="var(--space-3)"</p>
        <Row
          wrap
          gap="var(--space-3)"
        >
          {#each ["Alpha", "Beta", "Gamma", "Delta", "Epsilon", "Zeta"] as label}
            <div class="pill">{label}</div>
          {/each}
        </Row>
      </div>
      <pre><code
          >{`<Row justify="between">…</Row>
<Row justify="center" gap="var(--space-6)">…</Row>
<Row wrap gap="var(--space-3)">…</Row>
<Row stack>…</Row>  <!-- flex-direction: column -->`}</code
        ></pre>
    </ShowcaseSection>

    <ShowcaseSection
      id="grid"
      title="Grid"
    >
      <h3>Responsive CSS grid — 1 to 4 columns</h3>
      <div class="preview">
        <p class="demo-label">columns={2}</p>
        <Grid
          columns={2}
          gap="var(--space-3)"
        >
          <div class="box">A</div>
          <div class="box">B</div>
          <div class="box">C</div>
          <div class="box">D</div>
        </Grid>
      </div>
      <div class="preview">
        <p class="demo-label">columns={3}</p>
        <Grid
          columns={3}
          gap="var(--space-3)"
        >
          <div class="box">A</div>
          <div class="box">B</div>
          <div class="box">C</div>
        </Grid>
      </div>
      <pre><code
          >{`<Grid columns={2}>…</Grid>
<Grid columns={3} gap="var(--space-6)">…</Grid>
<Grid columns={4}>…</Grid>`}</code
        ></pre>
    </ShowcaseSection>

    <ShowcaseSection
      id="inlinegrid"
      title="InlineGrid"
    >
      <h3>Inline label–value grid — 2, 3, or 4 columns</h3>
      <div class="preview">
        <p class="demo-label">cols={2} (default)</p>
        <InlineGrid>
          <span>Temperature</span><span>37 °C</span>
          <span>pH</span><span>7.4</span>
          <span>Growth rate</span><span>0.42 h⁻¹</span>
        </InlineGrid>
      </div>
      <div class="preview">
        <p class="demo-label">cols={3}</p>
        <InlineGrid cols={3}>
          <span>Name</span><span>Value</span><span>Unit</span>
          <span>kcat</span><span>120</span><span>s⁻¹</span>
          <span>Km</span><span>0.5</span><span>mM</span>
        </InlineGrid>
      </div>
      <pre><code
          >{`<InlineGrid>
  <label>Temperature</label><span>37 °C</span>
  <label>pH</label><span>7.4</span>
</InlineGrid>
<InlineGrid cols={3}>…</InlineGrid>`}</code
        ></pre>
    </ShowcaseSection>

    <ShowcaseSection
      id="gridperson"
      title="GridPerson"
    >
      <h3>Responsive auto-fill grid for person cards (300px min column)</h3>
      <div class="preview">
        <GridPerson>
          {#each ["Anna Müller", "Jonas Weber", "Lena Schmidt", "Max Fischer"] as name}
            <div class="person-placeholder">{name}</div>
          {/each}
        </GridPerson>
      </div>
      <pre><code
          >{`<GridPerson>
  <CardPerson title="Anna Müller" slug="anna" />
  <CardPerson title="Jonas Weber" slug="jonas" />
</GridPerson>`}</code
        ></pre>
    </ShowcaseSection>

    <ShowcaseSection
      id="gridsponsor"
      title="GridSponsor"
    >
      <h3>Responsive 1→2 column grid for sponsor logos</h3>
      <div class="preview">
        <GridSponsor>
          <div class="sponsor-placeholder">Sponsor A</div>
          <div class="sponsor-placeholder">Sponsor B</div>
          <div class="sponsor-placeholder">Sponsor C</div>
          <div class="sponsor-placeholder">Sponsor D</div>
        </GridSponsor>
      </div>
      <pre><code
          >{`<GridSponsor>
  <CardSponsor name="RWTH" href="…" img="/rwth.svg" />
  <CardSponsor name="DFG"  href="…" img="/dfg.svg" />
</GridSponsor>`}</code
        ></pre>
    </ShowcaseSection>

    <ShowcaseSection
      id="pair"
      title="Pair"
    >
      <h3>
        Flex row with centered alignment — for icon+label or two related
        elements
      </h3>
      <div class="preview">
        <Pair>
          <span class="icon-demo">📌</span>
          <span>Pinned item</span>
        </Pair>
        <Pair justify="end">
          <span>Right-aligned</span>
          <span class="icon-demo">→</span>
        </Pair>
      </div>
      <pre><code
          >{`<Pair>
  <Icon>star</Icon>
  <span>Label</span>
</Pair>
<Pair justify="end">…</Pair>`}</code
        ></pre>
    </ShowcaseSection>

    <ShowcaseSection
      id="main"
      title="Main"
    >
      <h3>Page main wrapper — centered, padded, full-height column</h3>
      <div class="preview">
        <Text color="secondary">
          <code>Main</code> wraps page content with responsive padding, centered
          at
          <code>--max-width</code>, and a minimum height of
          <code>100vh - --nav-height</code>. Used as the primary content
          container inside a layout.
        </Text>
      </div>
      <pre><code
          >{`<!-- In your +layout.svelte or +page.svelte -->
<Main>
  <Section variant="light">…</Section>
  <Section variant="surface">…</Section>
</Main>`}</code
        ></pre>
    </ShowcaseSection>

    <ShowcaseSection
      id="featurebox"
      title="CardFeature"
    >
      <h3>Colored feature highlight with icon and description</h3>
      <div class="preview">
        <Grid
          columns={2}
          gap="var(--space-4)"
        >
          <CardFeature
            color="c1"
            icon="interactive_space"
            header="Simulation"
            body="Run ODE models directly in the browser with no install required."
          />
          <CardFeature
            color="c2"
            icon="group"
            header="Collaboration"
            body="Open source tools built for reproducible computational biology."
          />
          <CardFeature
            color="c3"
            icon="genetics"
            header="Genomics"
            body="Integrate multi-omics data into your kinetic modelling workflow."
          />
          <CardFeature
            color="c4"
            icon="open_in_browser"
            header="Web-first"
            body="SvelteKit-powered sites with fast static builds and CDN deployment."
          />
        </Grid>
      </div>
      <pre><code
          >{`<CardFeature
  color="c1"
  icon="interactive_space"
  header="Simulation"
  body="Run ODE models in the browser."
/>`}</code
        ></pre>
    </ShowcaseSection>

    <ShowcaseSection
      id="dynbox"
      title="DynBoxGrid / DynBoxRow"
    >
      <h3>Interactive drag-and-resize box grid — used in the model editor</h3>
      <div class="preview note">
        <Text color="secondary">
          <strong>DynBoxGrid</strong> and <strong>DynBoxRow</strong> implement a
          6-column drag-and-resize layout for the mxlweb model editor. They
          manage internal row/box state and require <code>items</code>,
          <code>onAdd</code>, and <code>onRemove</code> callbacks.
        </Text>
      </div>
      <pre><code
          >{`<DynBoxGrid {items} {onAdd} {onRemove}>
  {#snippet children({ box })}
    <MyBoxContent {box} />
  {/snippet}
</DynBoxGrid>`}</code
        ></pre>
    </ShowcaseSection>

    <PageNav
      prev={{ href: "/components/cards", label: "Cards" }}
      next={{ href: "/components/inputs", label: "Inputs" }}
    />
  </div>
</div>

<style>
  .box {
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: var(--radius-md);
    background-color: var(--color-primary);
    width: 48px;
    height: 48px;
    color: var(--color-text-inverse);
    font-weight: 600;
  }

  .pill {
    border: var(--border);
    border-radius: var(--radius-full);
    background-color: var(--color-surface);
    padding: var(--space-1) var(--space-3);
    font-size: 0.875rem;
  }

  .demo-label {
    margin: 0 0 var(--space-3) 0;
    color: var(--color-text-muted);
    font-size: 0.75rem;
    font-family: var(--font-mono);
  }

  .person-placeholder {
    border: var(--border);
    border-radius: var(--radius-md);
    background: var(--color-surface);
    padding: var(--space-4);
    color: var(--color-text-muted);
    font-size: 0.875rem;
    text-align: center;
  }

  .sponsor-placeholder {
    border: var(--border);
    border-radius: var(--radius-md);
    background: var(--color-surface);
    padding: var(--space-6);
    color: var(--color-text-muted);
    font-size: 0.875rem;
    text-align: center;
  }

  .icon-demo {
    font-size: 1.25rem;
  }

  .note {
    font-size: 0.9rem;
  }
</style>
