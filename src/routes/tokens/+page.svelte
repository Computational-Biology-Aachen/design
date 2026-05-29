<script lang="ts">
  import ShowcaseContainer from "$lib/ShowcaseContainer.svelte";
  import ShowcaseSection from "$lib/ShowcaseSection.svelte";
  import ShowcaseSidebar from "$lib/ShowcaseSidebar.svelte";

  const links = [
    { label: "RWTH Palette", id: "rwth-palette" },
    { label: "Greys", id: "greys" },
    { label: "Semantic Colors", id: "semantic-colors" },
    { label: "Typography", id: "typography" },
    { label: "Spacing", id: "spacing" },
    { label: "Border Radius", id: "border-radius" },
    { label: "Shadows", id: "shadows" },
  ];

  const rwthColors = [
    { name: "--rwth-blue", value: "rgb(0, 84, 159)", label: "Blue" },
    { name: "--rwth-petrol", value: "rgb(0, 97, 101)", label: "Petrol" },
    { name: "--rwth-turquoise", value: "rgb(0, 152, 161)", label: "Turquoise" },
    { name: "--rwth-green", value: "rgb(87, 171, 39)", label: "Green" },
    {
      name: "--rwth-light-green",
      value: "rgb(189, 205, 0)",
      label: "Light Green",
    },
    { name: "--rwth-yellow", value: "rgb(255, 237, 0)", label: "Yellow" },
    { name: "--rwth-orange", value: "rgb(246, 168, 0)", label: "Orange" },
    { name: "--rwth-red", value: "rgb(204, 7, 30)", label: "Red" },
    { name: "--rwth-magenta", value: "rgb(227, 0, 102)", label: "Magenta" },
    { name: "--rwth-bordeaux", value: "rgb(161, 16, 53)", label: "Bordeaux" },
    { name: "--rwth-violet", value: "rgb(97, 33, 88)", label: "Violet" },
    { name: "--rwth-lilac", value: "rgb(122, 111, 172)", label: "Lilac" },
  ];

  const greys = [
    { name: "--slate-50", value: "rgb(226 232 240)", label: "Slate 50" },
    { name: "--slate-400", value: "rgb(148 163 184)", label: "Slate 400" },
    { name: "--slate-500", value: "rgb(100 116 139)", label: "Slate 500" },
    { name: "--slate", value: "rgb(15 23 42)", label: "Slate" },
  ];

  const semanticColors = [
    { name: "--color-primary", label: "Primary", dark: true },
    { name: "--color-accent", label: "Accent", dark: false },
    { name: "--color-bg", label: "Background", dark: false },
    { name: "--color-surface", label: "Surface", dark: false },
    { name: "--color-border", label: "Border", dark: false },
    { name: "--color-text", label: "Text", dark: true },
    { name: "--color-text-muted", label: "Text Muted", dark: true },
    { name: "--color-text-inverse", label: "Text Inverse", dark: false },
  ];

  const spacingScale = [1, 2, 3, 4, 6, 8, 12, 16] as const;
  const spacingValues: Record<number, string> = {
    1: "0.25rem / 4px",
    2: "0.5rem / 8px",
    3: "0.75rem / 12px",
    4: "1rem / 16px",
    6: "1.5rem / 24px",
    8: "2rem / 32px",
    12: "3rem / 48px",
    16: "4rem / 64px",
  };

  const radiusTokens = [
    { name: "--radius-sm", value: "0.25rem", label: "sm" },
    { name: "--radius-md", value: "0.5rem", label: "md" },
    { name: "--radius-lg", value: "1rem", label: "lg" },
    { name: "--radius-full", value: "9999px", label: "full" },
  ];
</script>

<svelte:head><title>Tokens - CPBL Design</title></svelte:head>

<div class="showcase-page">
  <ShowcaseSidebar links={links} />
  <ShowcaseContainer>
    <ShowcaseSection
      id="rwth-palette"
      title="RWTH Color Palette"
    >
      <div class="swatch-grid">
        {#each rwthColors as c}
          <div class="swatch">
            <div
              class="swatch-color"
              style="background-color: var({c.name})"
            ></div>
            <div class="swatch-label">{c.label}</div>
            <code class="swatch-token">{c.name}</code>
            <div class="swatch-value">{c.value}</div>
          </div>
        {/each}
      </div>
    </ShowcaseSection>

    <ShowcaseSection
      id="greys"
      title="Greys"
    >
      <div class="swatch-grid">
        {#each greys as c}
          <div class="swatch">
            <div
              class="swatch-color"
              style="background-color: var({c.name})"
            ></div>
            <div class="swatch-label">{c.label}</div>
            <code class="swatch-token">{c.name}</code>
            <div class="swatch-value">{c.value}</div>
          </div>
        {/each}
      </div>
    </ShowcaseSection>

    <ShowcaseSection
      id="semantic-colors"
      title="Semantic Colors"
    >
      <div class="semantic-grid">
        {#each semanticColors as c}
          <div class="semantic-row">
            <div
              class="semantic-swatch"
              style="background-color: var({c.name}); color: {c.dark
                ? 'white'
                : 'var(--color-text)'}; border: var(--border)"
            >
              Aa
            </div>
            <div class="semantic-info">
              <code>{c.name}</code>
              <span>{c.label}</span>
            </div>
          </div>
        {/each}
      </div>
    </ShowcaseSection>

    <ShowcaseSection
      id="typography"
      title="Typography"
    >
      <div class="type-samples">
        <div class="type-row">
          <span class="type-label">--font-sans</span>
          <span style="font-family: var(--font-sans); font-size: 1.25rem"
            >Space Grotesk - The quick brown fox</span
          >
        </div>
        <div class="type-row">
          <span class="type-label">--font-mono</span>
          <span style="font-family: var(--font-mono)"
            >const x = model.integrate(t)</span
          >
        </div>
      </div>
      <div class="weight-samples">
        {#each [300, 400, 500, 600, 700] as w}
          <div class="weight-row">
            <span class="type-label">weight {w}</span>
            <span
              style="font-family: var(--font-sans); font-weight: {w}; font-size: 1.25rem"
            >
              CPBL Computational Biology
            </span>
          </div>
        {/each}
      </div>
    </ShowcaseSection>

    <ShowcaseSection
      id="spacing"
      title="Spacing Scale"
    >
      <div class="spacing-rows">
        {#each spacingScale as n}
          <div class="spacing-row">
            <code class="spacing-token">--space-{n}</code>
            <div
              class="spacing-bar"
              style="width: var(--space-{n}); height: var(--space-4); background-color: var(--color-primary); border-radius: var(--radius-sm)"
            ></div>
            <span class="spacing-value">{spacingValues[n]}</span>
          </div>
        {/each}
      </div>
    </ShowcaseSection>

    <ShowcaseSection
      id="border-radius"
      title="Border Radius"
    >
      <div class="radius-row">
        {#each radiusTokens as r}
          <div class="radius-item">
            <div
              class="radius-box"
              style="border-radius: var({r.name}); background-color: var(--color-primary)"
            ></div>
            <code>{r.name}</code>
            <span>{r.value}</span>
          </div>
        {/each}
      </div>
    </ShowcaseSection>

    <ShowcaseSection
      id="shadows"
      title="Shadows"
    >
      <div class="shadow-row">
        {#each [{ name: "--shadow-sm", label: "sm" }, { name: "--shadow-md", label: "md" }, { name: "--shadow-primary", label: "primary" }] as s}
          <div class="shadow-item">
            <div
              class="shadow-box"
              style="box-shadow: var({s.name})"
            ></div>
            <code>{s.name}</code>
          </div>
        {/each}
      </div>
    </ShowcaseSection>
  </ShowcaseContainer>
</div>

<style>
  .swatch-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
    gap: var(--space-4);
  }

  .swatch-color {
    margin-bottom: var(--space-2);
    border: var(--border);
    border-radius: var(--radius-md);
    height: 80px;
  }

  .swatch-label {
    font-weight: 600;
    font-size: 0.875rem;
  }

  .swatch-token {
    display: block;
    color: var(--color-text-muted);
    font-size: 0.75rem;
  }

  .swatch-value {
    color: var(--color-text-muted);
    font-size: 0.75rem;
  }

  .semantic-grid {
    display: flex;
    flex-direction: column;
    gap: var(--space-2);
    max-width: 480px;
  }

  .semantic-row {
    display: flex;
    align-items: center;
    gap: var(--space-4);
  }

  .semantic-swatch {
    display: flex;
    flex-shrink: 0;
    justify-content: center;
    align-items: center;
    border-radius: var(--radius-md);
    width: 64px;
    height: 40px;
    font-weight: 600;
    font-size: 0.875rem;
  }

  .semantic-info {
    display: flex;
    flex-direction: column;
    gap: 2px;
  }

  .semantic-info code {
    font-size: 0.8125rem;
  }

  .semantic-info span {
    color: var(--color-text-muted);
    font-size: 0.75rem;
  }

  .type-samples,
  .weight-samples {
    display: flex;
    flex-direction: column;
    gap: var(--space-4);
    margin-bottom: var(--space-6);
  }

  .type-row,
  .weight-row {
    display: flex;
    align-items: baseline;
    gap: var(--space-6);
  }

  .type-label {
    flex-shrink: 0;
    min-width: 120px;
    color: var(--color-text-muted);
    font-size: 0.75rem;
    font-family: var(--font-mono);
  }

  .spacing-rows {
    display: flex;
    flex-direction: column;
    gap: var(--space-3);
  }

  .spacing-row {
    display: flex;
    align-items: center;
    gap: var(--space-4);
  }

  .spacing-token {
    flex-shrink: 0;
    min-width: 90px;
    font-size: 0.8125rem;
  }

  .spacing-value {
    color: var(--color-text-muted);
    font-size: 0.8125rem;
  }

  .radius-row {
    display: flex;
    flex-wrap: wrap;
    gap: var(--space-8);
  }

  .radius-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: var(--space-2);
  }

  .radius-box {
    width: 64px;
    height: 64px;
  }

  .radius-item code,
  .radius-item span {
    color: var(--color-text-muted);
    font-size: 0.75rem;
  }

  .shadow-row {
    display: flex;
    flex-wrap: wrap;
    gap: var(--space-8);
  }

  .shadow-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: var(--space-4);
  }

  .shadow-box {
    border-radius: var(--radius-md);
    background-color: var(--color-bg);
    width: 80px;
    height: 80px;
  }

  .shadow-item code {
    color: var(--color-text-muted);
    font-size: 0.75rem;
  }
</style>
