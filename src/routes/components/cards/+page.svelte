<script lang="ts">
  import ShowcaseContainer from "$lib/ShowcaseContainer.svelte";
  import ShowcaseSection from "$lib/ShowcaseSection.svelte";
  import ShowcaseSidebar from "$lib/ShowcaseSidebar.svelte";
  import {
    CardImage,
    CardImageHighlight,
    CardModel,
    CardPublication,
    CardPublicationMain,
    CardSoftware,
    CardSoftwareMain,
    CardSponsor,
    PageNav,
    Row,
  } from "$lib/index.js";
  const links = [
    { label: "CardImage", id: "cardimage" },
    { label: "CardImageHighlight", id: "cardimagehighlight" },
    { label: "CardModel", id: "cardmodel" },
    { label: "CardPerson", id: "cardperson" },
    { label: "CardPublication", id: "cardpublication" },
    { label: "CardPublicationMain", id: "cardpublicationmain" },
    { label: "CardSoftware", id: "cardsoftware" },
    { label: "CardSoftwareMain", id: "cardsoftwaremain" },
    { label: "CardSponsor", id: "cardsponsor" },
  ];
</script>

<svelte:head><title>Cards - CPBL Design</title></svelte:head>

<div class="showcase-page">
  <ShowcaseSidebar links={links} />
  <ShowcaseContainer>
    <ShowcaseSection
      id="cardimage"
      title="CardImage"
    >
      <h3>Image card with name and link</h3>
      <div class="preview">
        <Row
          gap="var(--space-4)"
          wrap
        >
          <CardImage
            name="Anna Müller"
            href="/"
          ></CardImage>
          <CardImage
            name="Jonas Weber"
            href="/"
          ></CardImage>
          <CardImage
            name="Lena Schmidt"
            href="/"
          ></CardImage>
        </Row>
      </div>
      <pre><code>{`<CardImage name="Anna Müller" href="/team/anna" />`}</code
        ></pre>
    </ShowcaseSection>

    <ShowcaseSection
      id="cardimagehighlight"
      title="CardImageHighlight"
    >
      <h3>Image card with name, description and link</h3>
      <div class="preview">
        <Row
          gap="var(--space-4)"
          wrap
        >
          <CardImageHighlight
            name="mxlweb"
            href="/"
            desc="ODE model explorer"
          />
          <CardImageHighlight
            name="comphot"
            href="/"
            desc="Photosynthesis education"
          />
        </Row>
      </div>
      <pre><code
          >{`<CardImageHighlight
  name="mxlweb"
  href="/mxl-web"
  desc="ODE model explorer"
/>`}</code
        ></pre>
    </ShowcaseSection>

    <ShowcaseSection
      id="cardmodel"
      title="CardModel"
    >
      <h3>Model card - with and without image</h3>
      <div class="preview">
        <Row
          gap="var(--space-4)"
          wrap
        >
          <CardModel
            name="Lotka–Volterra"
            href="/"
          />
          <CardModel
            name="FVCB Model"
            href="/"
          />
          <CardModel
            name="NPQ Model"
            href="/"
          />
        </Row>
      </div>
      <pre><code
          >{`<CardModel name="Lotka–Volterra" href="/lotka-volterra" />
<CardModel name="FVCB" href="/fvcb" image="/model-scheme.png" />`}</code
        ></pre>
    </ShowcaseSection>

    <ShowcaseSection
      id="cardperson"
      title="CardPerson"
    >
      <h3>
        Site-specific - loads images from <code
          >$lib/assets/people/{"{slug}"}.jpg</code
        >
      </h3>
      <div class="preview note">
        <p>
          <strong>CardPerson</strong> resolves images at build time using
          <code>import.meta.glob</code>
          against the consuming site's <code>src/lib/assets/people/</code> directory.
          It cannot be previewed here without those assets.
        </p>
      </div>
      <pre><code
          >{`<!-- In your site's src/lib/assets/people/anna.jpg -->
<CardPerson title="Anna Müller" slug="anna" />`}</code
        ></pre>
    </ShowcaseSection>

    <ShowcaseSection
      id="cardpublication"
      title="CardPublication"
    >
      <h3>Publication card - full and fixed format, link variants</h3>
      <div class="preview">
        <CardPublication
          title="A mathematical model of non-photochemical quenching"
          doi="https://doi.org/10.1016/j.bbabio.2016.09.003"
          color="light"
        >
          Matuszyńska et al. (2016) · <em>BBA Bioenergetics</em>
        </CardPublication>
        <CardPublication
          title="Stoichiometric modelling for media characterization"
          github="https://github.com/Computational-Biology-Aachen"
          color="light"
          format="fixed"
        >
          Schröder, M. Sc. (2025)
        </CardPublication>
      </div>
      <pre><code
          >{`<CardPublication
  title="A mathematical model of NPQ"
  doi="https://doi.org/10.1016/..."
  github="https://github.com/..."
  color="light"
>
  Author et al. (2024) · <em>Journal</em>
</CardPublication>`}</code
        ></pre>
    </ShowcaseSection>

    <ShowcaseSection
      id="cardpublicationmain"
      title="CardPublicationMain"
    >
      <h3>Hero publication card with background image</h3>
      <div class="preview">
        <Row
          gap="var(--space-4)"
          wrap
        >
          <CardPublicationMain
            title="Featured Paper"
            href="/"
          >
            Author et al. · Nature (2025)
          </CardPublicationMain>
          <CardPublicationMain
            title="Another Key Publication"
            href="/"
          >
            Author et al. · PNAS (2024)
          </CardPublicationMain>
        </Row>
      </div>
      <pre><code
          >{`<CardPublicationMain
  title="Featured Paper"
  href="/papers"
  img="/paper-cover.jpg"
>
  Author et al. · Nature (2025)
</CardPublicationMain>`}</code
        ></pre>
    </ShowcaseSection>

    <ShowcaseSection
      id="cardsoftware"
      title="CardSoftware"
    >
      <h3>Software card with optional links</h3>
      <div class="preview">
        <CardSoftware
          title="mxlpy"
          github="https://github.com/Computational-Biology-Aachen/mxlpy"
          color="light"
        >
          Python library for ODE model simulation and analysis.
        </CardSoftware>
        <CardSoftware
          title="mxlweb"
          href="https://computational-biology-aachen.github.io/mxl-web"
          color="light"
        >
          Browser-side ODE model explorer built with SvelteKit.
        </CardSoftware>
      </div>
      <pre><code
          >{`<CardSoftware
  title="mxlpy"
  github="https://github.com/..."
  color="light"
>
  Description of the software tool.
</CardSoftware>`}</code
        ></pre>
    </ShowcaseSection>

    <ShowcaseSection
      id="cardsoftwaremain"
      title="CardSoftwareMain"
    >
      <h3>Hero software card with background image</h3>
      <div class="preview">
        <Row
          gap="var(--space-4)"
          wrap
        >
          <CardSoftwareMain
            title="mxlpy"
            url="/"
          >
            ODE model library
          </CardSoftwareMain>
          <CardSoftwareMain
            title="mxlweb"
            url="/"
          >
            Browser model explorer
          </CardSoftwareMain>
        </Row>
      </div>
      <pre><code
          >{`<CardSoftwareMain
  title="mxlpy"
  url="/software/mxlpy"
  img="/software-cover.jpg"
>
  ODE model library
</CardSoftwareMain>`}</code
        ></pre>
    </ShowcaseSection>

    <ShowcaseSection
      id="cardsponsor"
      title="CardSponsor"
    >
      <h3>Sponsor logo card - links to sponsor site</h3>
      <div
        class="preview"
        style="max-width: 320px"
      >
        <CardSponsor
          name="RWTH Aachen"
          href="https://www.rwth-aachen.de"
          img="https://upload.wikimedia.org/wikipedia/commons/thumb/f/f8/RWTH_Aachen_University_Logo.svg/320px-RWTH_Aachen_University_Logo.svg.png"
        />
      </div>
      <pre><code
          >{`<CardSponsor
  name="RWTH Aachen"
  href="https://www.rwth-aachen.de"
  img="/logos/rwth.svg"
/>`}</code
        ></pre>
    </ShowcaseSection>

    <PageNav
      prev={{ href: "/components/typography", label: "Typography" }}
      next={{ href: "/components/layout", label: "Layout" }}
    />
  </ShowcaseContainer>
</div>

<style>
  .note {
    color: var(--color-text-muted);
    font-size: 0.9rem;
  }

  .note p {
    margin: 0;
  }
</style>
