<script lang="ts">
  import { resolve } from "$app/paths";
  import {
    Navbar,
    NavGH,
    NavItem,
    PageNav,
    Sidebar,
    Tabs,
  } from "#lib/index.js";
  import ShowcaseContainer from "#lib/ShowcaseContainer.svelte";
  import ShowcaseSection from "#lib/ShowcaseSection.svelte";
  import ShowcaseSidebar from "#lib/ShowcaseSidebar.svelte";

  const links = [
    { label: "Navbar + NavItem", id: "navbar" },
    { label: "NavGH", id: "navgh" },
    { label: "Sidebar", id: "sidebar" },
    { label: "PageNav", id: "pagenav" },
    { label: "Tabs", id: "tabs" },
  ];
</script>

<svelte:head><title>Navigation - CPBL Design</title></svelte:head>

<div class="showcase-page">
  <ShowcaseSidebar links={links} />
  <ShowcaseContainer>
    <ShowcaseSection
      id="navbar"
      title="Navbar + NavItem"
    >
      <h3>Sticky top bar - responsive hamburger below 768px</h3>
      <div
        class="preview"
        style="padding: 0; overflow: hidden"
      >
        <Navbar>
          {#snippet brand()}
            <span class="brand-demo">Lab Name</span>
          {/snippet}
          <NavItem href={resolve("/")}>Home</NavItem>
          <NavItem href="/research">Research</NavItem>
          <NavItem href="/team">Team</NavItem>
          <NavItem href="/publications">Publications</NavItem>
        </Navbar>
      </div>
      <pre><code
          >{`<Navbar>
  {#snippet brand()}
    <img src={logo} alt="Lab" />
  {/snippet}
  <NavItem href="/">Home</NavItem>
  <NavItem href="/team">Team</NavItem>
  <NavItem href="/publications">Publications</NavItem>
</Navbar>`}</code
        ></pre>
    </ShowcaseSection>

    <ShowcaseSection
      id="navgh"
      title="NavGH"
    >
      <h3>GitHub icon link for use inside Navbar</h3>
      <div
        class="preview"
        style="padding: 0; overflow: hidden"
      >
        <Navbar>
          {#snippet brand()}
            <span class="brand-demo">Lab Name</span>
          {/snippet}
          <NavItem href="/">Home</NavItem>
          <NavGH href="https://github.com/Computational-Biology-Aachen" />
        </Navbar>
      </div>
      <pre><code
          >{`<Navbar>
  {#snippet brand()}…{/snippet}
  <NavItem href="/">Home</NavItem>
  <NavGH href="https://github.com/your-org" />
</Navbar>`}</code
        ></pre>
    </ShowcaseSection>

    <ShowcaseSection
      id="sidebar"
      title="Sidebar"
    >
      <h3>Left navigation - collapses to hamburger below 768px</h3>
      <div
        class="preview"
        style="padding: 0; overflow: hidden; height: 200px; display: flex"
      >
        <Sidebar>
          <a
            href="/"
            class="active"
            aria-current="page">Introduction</a
          >
          <a href="/photosynthesis">Photosynthesis</a>
          <a href="/method">Method</a>
          <a href="/model">Model</a>
          <a href="/experiments">Experiments</a>
        </Sidebar>
        <div
          style="padding: var(--space-4); color: var(--color-text-muted); font-size: var(--text-sm);"
        >
          Page content goes here
        </div>
      </div>
      <pre><code
          >{`<Sidebar>
  <a href="/" aria-current="page">Introduction</a>
  <a href="/photosynthesis">Photosynthesis</a>
  <a href="/model">Model</a>
</Sidebar>`}</code
        ></pre>
    </ShowcaseSection>

    <ShowcaseSection
      id="pagenav"
      title="PageNav"
    >
      <h3>Previous / next navigation between pages</h3>
      <div class="preview">
        <PageNav
          prev={{ href: "/method", label: "Method" }}
          next={{ href: "/model", label: "Model" }}
        />
      </div>
      <div class="preview">
        <PageNav next={{ href: "/photosynthesis", label: "Photosynthesis" }} />
      </div>
      <pre><code
          >{`<!-- Both directions -->
<PageNav
  prev={{ href: "/method", label: "Method" }}
  next={{ href: "/model", label: "Model" }}
/>

<!-- First page - no prev -->
<PageNav next={{ href: "/photosynthesis", label: "Photosynthesis" }} />`}</code
        ></pre>
    </ShowcaseSection>

    <ShowcaseSection
      id="tabs"
      title="Tabs"
    >
      <h3>ARIA tabs: arrow keys, Home and End move and select</h3>
      <div class="preview">
        <Tabs
          label="Model views"
          tabs={[
            { key: "eqs", label: "Equations" },
            { key: "params", label: "Parameters" },
            { key: "plot", label: "Plot" },
          ]}
        >
          {#snippet children(key)}
            <p>Panel content for <code>{key}</code>.</p>
          {/snippet}
        </Tabs>
      </div>
      <pre><code
          >{`<Tabs label="Model views" tabs={[{ key: "eqs", label: "Equations" }, …]}>
  {#snippet children(key)}…{/snippet}
</Tabs>`}</code
        ></pre>
    </ShowcaseSection>

    <PageNav
      prev={{ href: "/components/data", label: "Data & Science" }}
      next={{ href: "/components/heroes", label: "Heroes" }}
    />
  </ShowcaseContainer>
</div>

<style>
  .brand-demo {
    color: var(--color-primary);
    font-weight: 600;
  }
</style>
