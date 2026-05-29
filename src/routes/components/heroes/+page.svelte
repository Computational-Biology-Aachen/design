<script lang="ts">
  import {
    BoxHeadingMain,
    Hero,
    PageNav,
    Section,
    SectionHeader,
    SectionHeaderPerson,
    Text,
  } from "$lib/index.js";
  import ShowcaseContainer from "$lib/ShowcaseContainer.svelte";
  import ShowcaseSection from "$lib/ShowcaseSection.svelte";
  import ShowcaseSidebar from "$lib/ShowcaseSidebar.svelte";

  const sectionVariants = ["light", "surface", "primary", "accent"] as const;

  const links = [
    { label: "Hero", id: "hero" },
    { label: "HeroGradient", id: "herogradient" },
    { label: "Section", id: "section" },
    { label: "SectionHeader", id: "sectionheader" },
    { label: "SectionHeaderPerson", id: "sectionheaderperson" },
    { label: "BoxHeadingMain", id: "boxheadingmain" },
  ];
</script>

<svelte:head><title>Heroes - CPBL Design</title></svelte:head>

<div class="showcase-page">
  <ShowcaseSidebar links={links} />
  <ShowcaseContainer>
    <ShowcaseSection
      id="hero"
      title="Hero"
    >
      <h3>Full-width section with background image and gradient overlay</h3>
      <div
        class="preview"
        style="padding: 0; overflow: hidden"
      >
        <Hero>
          <h2 class="hero-title">The Matuszyńska Lab</h2>
          <p class="hero-sub">Computational Biology · RWTH Aachen</p>
        </Hero>
      </div>
      <pre><code
          >{`<Hero src={heroImage}>
  <h1>The Matuszyńska Lab</h1>
  <p>Computational Biology · RWTH Aachen</p>
</Hero>`}</code
        ></pre>
    </ShowcaseSection>

    <ShowcaseSection
      id="herogradient"
      title="HeroGradient"
    >
      <h3>Hero with gradient overlay and CPBL logo - requires image URLs</h3>
      <div class="preview note">
        <Text color="secondary">
          <strong>HeroGradient</strong> renders a full-width hero with a
          primary-color gradient overlay and an overlaid logo image. It requires
          <code>src</code>
          (background image) and
          <code>cpblLogo</code> (logo image) props - both site-provided image URLs
          or imports.
        </Text>
      </div>
      <pre><code
          >{`import heroImg from "$lib/assets/hero.jpg";
import cpblLogo from "$lib/assets/cpbl-logo.svg";

<HeroGradient src={heroImg} cpblLogo={cpblLogo}>
  <h1>The Matuszyńska Lab</h1>
  <p>Computational Biology · RWTH Aachen</p>
</HeroGradient>`}</code
        ></pre>
    </ShowcaseSection>

    <ShowcaseSection
      id="section"
      title="Section"
    >
      <h3>
        Content section - constrained to max-width with responsive padding
      </h3>
      {#each sectionVariants as variant (variant)}
        <div
          class="preview"
          style="padding: 0; overflow: hidden; margin-bottom: var(--space-3)"
        >
          <Section variant={variant}>
            <div class="section-demo">
              <strong>variant="{variant}"</strong>
              <p>
                Content constrained to <code>--max-width</code> with responsive padding.
              </p>
            </div>
          </Section>
        </div>
      {/each}
      <pre><code
          >{`<Section variant="light">…</Section>
<Section variant="surface">…</Section>
<Section variant="primary">…</Section>
<Section variant="accent">…</Section>`}</code
        ></pre>
    </ShowcaseSection>

    <ShowcaseSection
      id="sectionheader"
      title="SectionHeader"
    >
      <h3>Primary-colored section header - full-width, min 12rem tall</h3>
      <div
        class="preview"
        style="padding: 0; overflow: hidden"
      >
        <SectionHeader>
          <h1 style="color: var(--color-text-inverse); margin: 0;">Research</h1>
          <p
            style="color: var(--color-text-inverse); opacity: 0.8; margin: var(--space-2) 0 0"
          >
            Computational photosynthesis and beyond
          </p>
        </SectionHeader>
      </div>
      <pre><code
          >{`<SectionHeader>
  <H1 color="light">Research</H1>
  <Text color="light">Computational photosynthesis and beyond</Text>
</SectionHeader>`}</code
        ></pre>
    </ShowcaseSection>

    <ShowcaseSection
      id="sectionheaderperson"
      title="SectionHeaderPerson"
    >
      <h3>Person profile header with name, links, and photo</h3>
      <div
        class="preview"
        style="padding: 0; overflow: hidden"
      >
        <SectionHeaderPerson
          name="Anna Müller"
          img="/placeholder-person.jpg"
          mail="anna@example.com"
          github="https://github.com"
          orcid="https://orcid.org/0000-0000-0000-0000"
        />
      </div>
      <pre><code
          >{`<SectionHeaderPerson
  name="Anna Müller"
  img={personPhoto}
  mail="anna@lab.de"
  github="https://github.com/anna"
  gitlab="https://gitlab.com/anna"
  orcid="https://orcid.org/…"
  website="https://anna.dev"
/>`}</code
        ></pre>
    </ShowcaseSection>

    <ShowcaseSection
      id="boxheadingmain"
      title="BoxHeadingMain"
    >
      <h3>Large styled heading box - adapts to screen size</h3>
      <div class="preview">
        <BoxHeadingMain
          n="01"
          title="Research"
          color="dark"
        />
      </div>
      <div class="preview-primary">
        <BoxHeadingMain
          n="02"
          title="Publications"
          color="light"
        />
      </div>
      <pre><code
          >{`<BoxHeadingMain n="01" title="Research" />
<BoxHeadingMain n="02" title="Publications" color="light" />
<BoxHeadingMain n="03" title="Team" color="primary" />`}</code
        ></pre>
    </ShowcaseSection>

    <PageNav
      prev={{ href: "/components/navigation", label: "Navigation" }}
      next={{ href: "/components/buttons", label: "Buttons" }}
    />
  </ShowcaseContainer>
</div>

<style>
  .hero-title {
    margin: 0 0 var(--space-2) 0;
    color: var(--color-text-inverse);
    font-weight: 600;
    font-size: 1.75rem;
  }

  .hero-sub {
    margin: 0;
    color: color-mix(in srgb, var(--color-text-inverse) 80%, transparent);
    font-size: 1rem;
  }

  .section-demo strong {
    display: block;
    margin-bottom: var(--space-2);
  }

  .section-demo p {
    margin: 0;
    font-size: 0.9rem;
  }

  .note {
    font-size: 0.9rem;
  }
</style>
