<script lang="ts">
  import {
    Button,
    ButtonIcon,
    ButtonMenu,
    ButtonMenuItem,
    ButtonTab,
    PageNav,
    Row,
  } from "$lib/index.js";
  import ShowcaseSection from "$lib/ShowcaseSection.svelte";
  import ShowcaseSidebar from "$lib/ShowcaseSidebar.svelte";

  const links = [
    { label: "Button", id: "button" },
    { label: "ButtonIcon", id: "buttonicon" },
    { label: "ButtonMenu", id: "buttonmenu" },
    { label: "ButtonTab", id: "buttontab" },
  ];

  let activeTab = $state(0);
  const tabs = ["Euler", "RK45", "Tsit5"];
</script>

<svelte:head><title>Buttons — CPBL Design</title></svelte:head>

<div class="showcase-page">
  <ShowcaseSidebar links={links} />
  <div>
    <ShowcaseSection
      id="button"
      title="Button"
    >
      <h3>Variants</h3>
      <div class="preview">
        <Row
          gap="var(--space-3)"
          wrap
        >
          <Button variant="primary">Primary</Button>
          <Button variant="secondary">Secondary</Button>
          <Button
            variant="primary"
            disabled>Disabled</Button
          >
        </Row>
      </div>
      <pre><code
          >{`<Button variant="primary">Primary</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="primary" disabled>Disabled</Button>
<Button variant="primary" href="/path">Link button</Button>`}</code
        ></pre>
    </ShowcaseSection>

    <ShowcaseSection
      id="buttonicon"
      title="ButtonIcon"
    >
      <h3>Icon-only button — used to trigger popovers or actions</h3>
      <div class="preview">
        <Row
          gap="var(--space-3)"
          align="center"
          wrap
        >
          <ButtonIcon
            icon="settings"
            onclick={() => alert("settings")}
          />
          <ButtonIcon
            icon="info"
            onclick={() => alert("info")}
          />
          <ButtonIcon
            icon="delete"
            onclick={() => alert("delete")}
          />
          <ButtonIcon
            icon="add"
            onclick={() => alert("add")}
          />
        </Row>
      </div>
      <pre><code
          >{`<ButtonIcon icon="settings" onclick={openSettings} />
<ButtonIcon icon="info" popovertarget="my-popover" />`}</code
        ></pre>
    </ShowcaseSection>

    <ShowcaseSection
      id="buttonmenu"
      title="ButtonMenu + ButtonMenuItem"
    >
      <h3>Dropdown menu — open on hover/focus, closes on item click</h3>
      <div class="preview">
        <Row
          gap="var(--space-4)"
          wrap
        >
          <ButtonMenu
            label="Export"
            variant="primary"
          >
            <ButtonMenuItem onclick={() => alert("CSV")}
              >Export as CSV</ButtonMenuItem
            >
            <ButtonMenuItem onclick={() => alert("JSON")}
              >Export as JSON</ButtonMenuItem
            >
            <ButtonMenuItem onclick={() => alert("SVG")}
              >Export as SVG</ButtonMenuItem
            >
          </ButtonMenu>

          <ButtonMenu
            label="Actions"
            variant="secondary"
          >
            <ButtonMenuItem onclick={() => alert("run")}
              >Run simulation</ButtonMenuItem
            >
            <ButtonMenuItem onclick={() => alert("reset")}
              >Reset parameters</ButtonMenuItem
            >
          </ButtonMenu>
        </Row>
      </div>
      <pre><code
          >{`<ButtonMenu label="Export" variant="primary">
  <ButtonMenuItem onclick={exportCsv}>Export as CSV</ButtonMenuItem>
  <ButtonMenuItem onclick={exportJson}>Export as JSON</ButtonMenuItem>
</ButtonMenu>

<ButtonMenu label="Actions" variant="secondary">
  <ButtonMenuItem onclick={run}>Run simulation</ButtonMenuItem>
  <ButtonMenuItem onclick={reset}>Reset</ButtonMenuItem>
</ButtonMenu>`}</code
        ></pre>
    </ShowcaseSection>

    <ShowcaseSection
      id="buttontab"
      title="ButtonTab"
    >
      <h3>Tab-style toggle button — use with a selected state</h3>
      <div class="preview">
        <Row gap="var(--space-1)">
          {#each tabs as tab, i}
            <ButtonTab
              selected={activeTab === i}
              onclick={() => (activeTab = i)}
            >
              {tab}
            </ButtonTab>
          {/each}
        </Row>
        <p
          class="demo-label"
          style="margin-top: var(--space-3)"
        >
          Selected: {tabs[activeTab]}
        </p>
      </div>
      <pre><code
          >{`let activeTab = $state(0);
const tabs = ["Euler", "RK45", "Tsit5"];

<Row gap="var(--space-1)">
  {#each tabs as tab, i}
    <ButtonTab
      selected={activeTab === i}
      onclick={() => activeTab = i}
    >
      {tab}
    </ButtonTab>
  {/each}
</Row>`}</code
        ></pre>
    </ShowcaseSection>

    <PageNav
      prev={{ href: "/components/heroes", label: "Heroes" }}
      next={{ href: "/components/media", label: "Media" }}
    />
  </div>
</div>

<style>
  .demo-label {
    margin: 0;
    color: var(--color-text-muted);
    font-size: 0.75rem;
    font-family: var(--font-mono);
  }
</style>
