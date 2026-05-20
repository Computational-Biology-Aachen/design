<script lang="ts">
  import {
    Accordion,
    Accordion2,
    ActivationSliders,
    AudienceToggle,
    ButtonIcon,
    Icon,
    PageNav,
    Popover,
    Row,
    Slider,
    Slider2,
    Text,
    VideoTranscriptToggle,
  } from "$lib/index.js";
  import ShowcaseSection from "$lib/ShowcaseSection.svelte";
  import ShowcaseSidebar from "$lib/ShowcaseSidebar.svelte";

  const links = [
    { label: "Accordion", id: "accordion" },
    { label: "Accordion2", id: "accordion2" },
    { label: "Popover", id: "popover" },
    { label: "Slider", id: "slider" },
    { label: "Slider2", id: "slider2" },
    { label: "SliderActivation", id: "slideractivation" },
    { label: "ToggleAudience", id: "toggleaudience" },
    { label: "ToggleLanguage", id: "togglelanguage" },
    { label: "VideoTranscriptToggle", id: "videotranscripttoggle" },
  ];

  let sliderVal = $state(42);
  let slider2Val = $state(1.5);
  let accordion2Open = $state(false);

  let actIdx = $state(10);
  let deactIdx = $state(10);

  const activationMultipliers = [
    0, 0.25, 0.5, 0.75, 1, 1.25, 1.5, 1.75, 2, 2.5, 3, 4, 5, 6, 8, 10, 15, 20,
    30, 50, 100,
  ];
  const actMul = $derived(activationMultipliers[actIdx] ?? 1);
  const deactMul = $derived(activationMultipliers[deactIdx] ?? 1);

  type Audience = "4bio" | "4math";
  let audience = $state<Audience>("4bio");
  const audienceStore = {
    get audience() {
      return audience;
    },
    setAudience(v: Audience) {
      audience = v;
    },
  };
  const audienceOptions = [
    { value: "4bio" as Audience, label: "Biology" },
    { value: "4math" as Audience, label: "Mathematics" },
  ];
</script>

<svelte:head><title>Interactive — CPBL Design</title></svelte:head>

<div class="showcase-page">
  <ShowcaseSidebar links={links} />
  <div>
    <ShowcaseSection
      id="accordion"
      title="Accordion"
    >
      <h3>CSS-only disclosure — no JS required</h3>
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
      id="accordion2"
      title="Accordion2"
    >
      <h3>JS-powered accordion with custom header snippet</h3>
      <div class="preview">
        <Accordion2 bind:open={accordion2Open}>
          {#snippet header()}
            <Row
              align="center"
              gap="var(--space-2)"
            >
              <Icon color="primary">settings</Icon>
              <strong>Advanced settings</strong>
            </Row>
          {/snippet}
          <p style="padding: var(--space-4) 0 0">
            Unlike <code>Accordion</code>, this variant accepts a full snippet
            as its header — useful for icons, badges, or complex trigger
            layouts.
          </p>
        </Accordion2>
      </div>
      <pre><code
          >{`<Accordion2 bind:open>
  {#snippet header()}
    <Icon>settings</Icon>
    <strong>Advanced settings</strong>
  {/snippet}
  <p>Hidden content…</p>
</Accordion2>`}</code
        ></pre>
    </ShowcaseSection>

    <ShowcaseSection
      id="popover"
      title="Popover"
    >
      <h3>Native popover API panel — anchored to a trigger button</h3>
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
      <h3>Alternative slider — debounced callback, string min/max/step</h3>
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

    <ShowcaseSection
      id="slideractivation"
      title="SliderActivation"
    >
      <h3>Paired activation / deactivation sliders for kinetic parameters</h3>
      <div class="preview">
        <ActivationSliders
          bind:activationIdx={actIdx}
          bind:deactivationIdx={deactIdx}
          activationLabel="Activation"
          deactivationLabel="Deactivation"
          activationMultiplier={actMul}
          deactivationMultiplier={deactMul}
        />
        <p class="demo-label">act: ×{actMul} / deact: ×{deactMul}</p>
      </div>
      <pre><code
          >{`<ActivationSliders
  bind:activationIdx
  bind:deactivationIdx
  activationLabel="Activation"
  deactivationLabel="Deactivation"
  activationMultiplier={multipliers[activationIdx]}
  deactivationMultiplier={multipliers[deactivationIdx]}
/>`}</code
        ></pre>
    </ShowcaseSection>

    <ShowcaseSection
      id="toggleaudience"
      title="ToggleAudience"
    >
      <h3>Segmented button toggle for audience selection</h3>
      <div class="preview">
        <AudienceToggle
          audienceStore={audienceStore}
          options={audienceOptions}
        />
        <p class="demo-label">Selected: {audience}</p>
      </div>
      <pre><code
          >{`<!-- Create a store with audience state -->
let audience = $state<"4bio" | "4math">("4bio");
const audienceStore = {
  get audience() { return audience; },
  setAudience(v) { audience = v; }
};

<ToggleAudience
  {audienceStore}
  options={[
    { value: "4bio",  label: "Biology" },
    { value: "4math", label: "Mathematics" },
  ]}
/>`}</code
        ></pre>
    </ShowcaseSection>

    <ShowcaseSection
      id="togglelanguage"
      title="ToggleLanguage"
    >
      <h3>Locale switcher — requires paraglide-js i18n setup</h3>
      <div class="preview note">
        <Text color="secondary">
          <strong>ToggleLanguage</strong> reads and sets the active locale via
          <code>getLocale()</code> / <code>setLocale()</code> from
          <code>$lib/paraglide/runtime</code>. It is used in comphot (EN/DE/FR)
          and requires the paraglide-js adapter to be configured in the
          consuming site.
        </Text>
      </div>
      <pre><code
          >{`<!-- Requires @inlang/paraglide-js in the consuming site -->
<ToggleLanguage
  locales={[
    { code: "en", label: "EN" },
    { code: "de", label: "DE" },
    { code: "fr", label: "FR" },
  ]}
/>`}</code
        ></pre>
    </ShowcaseSection>

    <ShowcaseSection
      id="videotranscripttoggle"
      title="VideoTranscriptToggle"
    >
      <h3>Expandable transcript panel below a video</h3>
      <div class="preview">
        <VideoTranscriptToggle
          message="Show transcript"
          transcript="In this video, we explore how plants regulate photosynthesis in response to changing light conditions. The NPQ mechanism acts as a photoprotective valve, dissipating excess energy as heat when light is too intense..."
        />
      </div>
      <pre><code
          >{`<VideoTranscriptToggle
  message="Show transcript"
  transcript="Full transcript text here…"
/>`}</code
        ></pre>
    </ShowcaseSection>

    <PageNav
      prev={{ href: "/components/inputs", label: "Inputs" }}
      next={{ href: "/components/data", label: "Data & Science" }}
    />
  </div>
</div>

<style>
  .demo-label {
    margin: var(--space-2) 0 0;
    color: var(--color-text-muted);
    font-size: 0.75rem;
    font-family: var(--font-mono);
  }

  .note {
    font-size: 0.9rem;
  }
</style>
