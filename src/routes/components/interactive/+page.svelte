<script lang="ts">
  import {
    Accordion,
    ButtonIcon,
    Icon,
    PageNav,
    Popover,
    Row,
    Slider,
    Slider2,
    Text,
  } from "#lib/index.js";
  import ShowcaseContainer from "#lib/ShowcaseContainer.svelte";
  import ShowcaseSection from "#lib/ShowcaseSection.svelte";
  import ShowcaseSidebar from "#lib/ShowcaseSidebar.svelte";

  const links = [
    { label: "Accordion", id: "accordion" },
    { label: "Accordion (plain)", id: "accordion-plain" },
    { label: "Popover", id: "popover" },
    { label: "Slider", id: "slider" },
    { label: "Slider2", id: "slider2" },
    { label: "ToggleLanguage", id: "togglelanguage" },
  ];

  let sliderVal = $state(42);
  let slider2Val = $state(1.5);
  let accordionPlainOpen = $state(false);
</script>

<svelte:head><title>Interactive - CPBL Design</title></svelte:head>

<div class="showcase-page">
  <ShowcaseSidebar links={links} />
  <ShowcaseContainer>
    <ShowcaseSection
      id="accordion"
      title="Accordion"
    >
      <h3>CSS-only disclosure - no JS required</h3>
      <div class="preview">
        <Accordion title="What is photosynthesis?">
          <p>
            Photosynthesis converts light energy into chemical energy stored in
            glucose.
          </p>
        </Accordion>
        <Accordion
          title="Open by default"
          open
        >
          <p>Pass <code>open</code> to expand on mount.</p>
        </Accordion>
      </div>
      <pre><code
          >{`<Accordion title="What is photosynthesis?">
  <p>Content…</p>
</Accordion>
<Accordion title="Open by default" open>
  <p>Content…</p>
</Accordion>`}</code
        ></pre>
    </ShowcaseSection>

    <ShowcaseSection
      id="accordion-plain"
      title="Accordion (plain)"
    >
      <h3>Borderless variant with custom header snippet and bindable state</h3>
      <div class="preview">
        <Accordion
          variant="plain"
          bind:open={accordionPlainOpen}
        >
          {#snippet header()}
            <Icon color="primary">settings</Icon>
            <h3>Advanced settings</h3>
          {/snippet}
          <p>
            The plain variant drops the card chrome, shows a round expand icon
            and caps the content height (<code>--acc-content-max-height</code>,
            default 40vh) with a scroll. Open: {accordionPlainOpen}.
          </p>
        </Accordion>
      </div>
      <pre><code
          >{`<Accordion variant="plain" bind:open>
  {#snippet header()}
    <Icon>settings</Icon>
    <h3>Advanced settings</h3>
  {/snippet}
  <p>Hidden content…</p>
</Accordion>`}</code
        ></pre>
    </ShowcaseSection>

    <ShowcaseSection
      id="popover"
      title="Popover"
    >
      <h3>Native popover API panel - anchored to a trigger button</h3>
      <div class="preview">
        <Row
          align="center"
          gap="var(--space-3)"
        >
          <ButtonIcon
            icon="info"
            popovertarget="demo-popover"
          />
          <Text color="secondary">Click the icon to open the popover</Text>
        </Row>
        <Popover
          size="sm"
          popovertarget="demo-popover"
        >
          <p><strong>About this model</strong></p>
          <p>
            This panel appears anchored to the trigger button using the native
            Popover API.
          </p>
        </Popover>
      </div>
      <pre><code
          >{`<ButtonIcon icon="info" popovertarget="my-popover" />
<Popover size="sm" popovertarget="my-popover">
  <p>Popover content</p>
</Popover>
<!-- size: "xs" | "sm" | "md" | "lg" -->`}</code
        ></pre>
    </ShowcaseSection>

    <ShowcaseSection
      id="slider"
      title="Slider"
    >
      <h3>Labeled range input with live value display</h3>
      <div class="preview">
        <Slider
          name="Light intensity"
          desc="μmol/m²/s"
          bind:value={sliderVal}
          min={0}
          max={200}
          step={1}
        />
        <p class="demo-label">Value: {sliderVal}</p>
      </div>
      <pre><code
          >{`<Slider
  name="Light intensity"
  desc="μmol/m²/s"
  bind:value={myVal}
  min={0} max={200} step={1}
/>`}</code
        ></pre>
    </ShowcaseSection>

    <ShowcaseSection
      id="slider2"
      title="Slider2"
    >
      <h3>Alternative slider - debounced callback, string min/max/step</h3>
      <div class="preview">
        <Slider2
          name="kcat"
          desc="s⁻¹"
          bind:val={slider2Val}
          min="0"
          max="10"
          step="0.1"
        />
        <p class="demo-label">Value: {slider2Val}</p>
      </div>
      <pre><code
          >{`<Slider2
  name="kcat"
  desc="s⁻¹"
  bind:val={myVal}
  min="0" max="10" step="0.1"
  callback={() => runSimulation()}
/>`}</code
        ></pre>
    </ShowcaseSection>

    <PageNav
      prev={{ href: "/components/inputs", label: "Inputs" }}
      next={{ href: "/components/data", label: "Data & Science" }}
    />
  </ShowcaseContainer>
</div>

<style>
  .demo-label {
    margin: var(--space-2) 0 0;
    color: var(--color-text-muted);
    font-size: var(--text-callout);
    font-family: var(--font-mono);
  }
</style>
