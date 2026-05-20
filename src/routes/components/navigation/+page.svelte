<script lang="ts">
  import {
    Navbar,
    NavGH,
    NavItem,
    PageNav,
    Sidebar,
    Text,
  } from "$lib/index.js";
  import ShowcaseSection from "$lib/ShowcaseSection.svelte";
  import ShowcaseSidebar from "$lib/ShowcaseSidebar.svelte";

  const links = [
    { label: "Navbar + NavItem", id: "navbar" },
    { label: "NavGH", id: "navgh" },
    { label: "Sidebar", id: "sidebar" },
    { label: "Sidebar2", id: "sidebar2" },
    { label: "PageNav", id: "pagenav" },
  ];
</script>

<svelte:head><title>Navigation — CPBL Design</title></svelte:head>

<div class="showcase-page">
  <ShowcaseSidebar links={links} />
  <div>
    <ShowcaseSection
      id="navbar"
      title="Navbar + NavItem"
    >
      <h3>Sticky top bar — responsive hamburger below 768px</h3>
      <div
        class="preview"
        style="padding: 0; overflow: hidden"
      >
        <Navbar>
          {#snippet brand()}
            <span class="brand-demo">Lab Name</span>
          {/snippet}
          <NavItem href="/">Home</NavItem>
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
      <h3>Left navigation — collapses to hamburger below 768px</h3>
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
          style="padding: var(--space-4); color: var(--color-text-muted); font-size: 0.875rem;"
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
      id="sidebar2"
      title="Sidebar2"
    >
      <h3>Sidebar with audience toggle — used in comphot</h3>
      <div class="preview note">
        <Text color="secondary">
          <strong>Sidebar2</strong> combines a navigation link list with a
          <code>ToggleAudience</code> widget. It requires <code>navLinks</code>,
          <code>audienceStore</code>, and <code>audienceOptions</code> props. It is
          site-specific to comphot.
        </Text>
      </div>
      <pre><code
          >{`<Sidebar2
  navLinks={[
    { href: "/home",          label: "Home" },
    { href: "/photosynthesis", label: "Photosynthesis" },
  ]}
  {audienceStore}
  audienceOptions={[
    { value: "4bio",  label: "Biology" },
    { value: "4math", label: "Mathematics" },
  ]}
/>`}</code
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

<!-- First page — no prev -->
<PageNav next={{ href: "/photosynthesis", label: "Photosynthesis" }} />

<!-- With base path (e.g. comphot) -->
<PageNav {base} prev={…} next={…} />`}</code
        ></pre>
    </ShowcaseSection>

    <PageNav
      prev={{ href: "/components/data", label: "Data & Science" }}
      next={{ href: "/components/heroes", label: "Heroes" }}
    />
  </div>
</div>

<style>
  .brand-demo {
    color: var(--color-primary);
    font-weight: 600;
  }

  .note {
    font-size: 0.9rem;
  }
</style>
