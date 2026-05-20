<script lang="ts">
  import {
    Footer,
    Icon,
    InfoBox,
    Link,
    PageNav,
    Row,
  } from "@computational-biology-aachen/design";
  import ShowcaseSidebar from "$lib/ShowcaseSidebar.svelte";
  import ShowcaseSection from "$lib/ShowcaseSection.svelte";

  const links = [
    { label: "Icon", id: "icon" },
    { label: "InfoBox", id: "infobox" },
    { label: "Footer", id: "footer" },
  ];
</script>

<svelte:head><title>Utilities — CPBL Design</title></svelte:head>

<div class="showcase-page">
  <ShowcaseSidebar {links} />
  <div>
    <ShowcaseSection id="icon" title="Icon">
      <h3>Material Symbols icon — color and size variants</h3>
      <div class="preview">
        <Row gap="var(--space-4)" wrap align="center">
          <Icon color="primary">interactive_space</Icon>
          <Icon color="c1">group</Icon>
          <Icon color="c2">genetics</Icon>
          <Icon color="c3">open_in_browser</Icon>
          <Icon color="c4">science</Icon>
          <Icon color="inherit">settings</Icon>
        </Row>
        <div style="margin-top: var(--space-4)"><Row gap="var(--space-4)" wrap align="center">
          <Icon color="primary" fontSize="sm">star</Icon>
          <Icon color="primary" fontSize="md">star</Icon>
          <Icon color="primary" fontSize="lg">star</Icon>
        </Row></div>
      </div>
      <pre><code>{`<Icon color="primary">interactive_space</Icon>
<Icon color="c1">group</Icon>
<Icon color="inherit">settings</Icon>

<!-- fontSize: "sm" | "md" | "lg" | "inherit" (default) -->
<Icon color="primary" fontSize="lg">star</Icon>`}</code></pre>
    </ShowcaseSection>

    <ShowcaseSection id="infobox" title="InfoBox">
      <h3>Contextual callouts — four semantic variants</h3>
      <div class="preview">
        <InfoBox variant="info">This is an <strong>info</strong> callout. Use for general notes.</InfoBox>
        <InfoBox variant="warning">This is a <strong>warning</strong> callout. Something needs attention.</InfoBox>
        <InfoBox variant="success">This is a <strong>success</strong> callout. Operation completed.</InfoBox>
        <InfoBox variant="error">This is an <strong>error</strong> callout. Something went wrong.</InfoBox>
      </div>
      <pre><code>{`<InfoBox variant="info">A general note.</InfoBox>
<InfoBox variant="warning">Something needs attention.</InfoBox>
<InfoBox variant="success">Operation completed successfully.</InfoBox>
<InfoBox variant="error">Something went wrong.</InfoBox>`}</code></pre>
    </ShowcaseSection>

    <ShowcaseSection id="footer" title="Footer">
      <h3>Full-width dark footer — slot-based content</h3>
      <div class="preview" style="padding: 0; overflow: hidden">
        <Footer>
          <Row justify="between" align="center">
            <span>© 2026 Computational Biology Lab, RWTH Aachen</span>
            <Row gap="var(--space-4)">
              <Link href="https://github.com/Computational-Biology-Aachen" color="light">GitHub</Link>
              <Link href="/imprint" color="light">Imprint</Link>
            </Row>
          </Row>
        </Footer>
      </div>
      <pre><code>{`<Footer>
  <Row justify="between" align="center">
    <span>© 2026 CPBL, RWTH Aachen</span>
    <Row gap="var(--space-4)">
      <Link href="https://github.com/…" color="light">GitHub</Link>
      <Link href="/imprint" color="light">Imprint</Link>
    </Row>
  </Row>
</Footer>`}</code></pre>
    </ShowcaseSection>

    <PageNav prev={{ href: '/components/media', label: 'Media' }} />
  </div>
</div>
