<script lang="ts">
  import {
    CompareCheckbox,
    InputCheckbox,
    InputChoice,
    InputNumber,
    InputNumberOptional,
    InputNumberStr,
    InputText,
    PageNav,
  } from "$lib/index.js";
  import ShowcaseSection from "$lib/ShowcaseSection.svelte";
  import ShowcaseSidebar from "$lib/ShowcaseSidebar.svelte";

  const links = [
    { label: "InputText", id: "inputtext" },
    { label: "InputNumber", id: "inputnumber" },
    { label: "InputNumberStr", id: "inputnumberstr" },
    { label: "InputNumberOptional", id: "inputnumberoptional" },
    { label: "InputCheckbox", id: "inputcheckbox" },
    { label: "InputChoice", id: "inputchoice" },
    { label: "CompareCheckbox", id: "comparecheckbox" },
  ];

  let textVal = $state("Space Grotesk");
  let numVal = $state(42);
  let numStrVal = $state("3.14");
  let optVal = $state(1.0);
  let optCond = $state(true);
  let checkVal = $state(true);
  let choiceVal = $state("rk45");
  let compareVal = $state(true);
</script>

<svelte:head><title>Inputs — CPBL Design</title></svelte:head>

<div class="showcase-page">
  <ShowcaseSidebar links={links} />
  <div>
    <ShowcaseSection
      id="inputtext"
      title="InputText"
    >
      <h3>Labeled text input — inline grid layout</h3>
      <div class="preview">
        <InputText
          id="demo-text"
          label="Font family"
          bind:value={textVal}
        />
        <p class="demo-label">Value: {textVal}</p>
      </div>
      <pre><code
          >{`<InputText
  id="font-family"
  label="Font family"
  bind:value={myString}
/>`}</code
        ></pre>
    </ShowcaseSection>

    <ShowcaseSection
      id="inputnumber"
      title="InputNumber"
    >
      <h3>Labeled number input — with and without label</h3>
      <div class="preview">
        <InputNumber
          id="demo-num"
          label="Step count"
          bind:value={numVal}
        />
        <p class="demo-label">Value: {numVal}</p>
      </div>
      <pre><code
          >{`<InputNumber
  id="step-count"
  label="Step count"
  bind:value={myNumber}
/>`}</code
        ></pre>
    </ShowcaseSection>

    <ShowcaseSection
      id="inputnumberstr"
      title="InputNumberStr"
    >
      <h3>Number input that binds to a string (for formula entry)</h3>
      <div class="preview">
        <InputNumberStr
          id="demo-numstr"
          label="Rate constant"
          bind:value={numStrVal}
        />
        <p class="demo-label">Value: "{numStrVal}" (string)</p>
      </div>
      <pre><code
          >{`<InputNumberStr
  id="rate-constant"
  label="Rate constant"
  bind:value={myString}  <!-- binds string, not number -->
/>`}</code
        ></pre>
    </ShowcaseSection>

    <ShowcaseSection
      id="inputnumberoptional"
      title="InputNumberOptional"
    >
      <h3>
        Number input with an enable/disable checkbox — for optional parameters
      </h3>
      <div class="preview">
        <InputNumberOptional
          id="demo-opt"
          valueLabel="Max time"
          condLabel="Override"
          bind:value={optVal}
          bind:condition={optCond}
        />
        <p class="demo-label">Value: {optVal}, enabled: {optCond}</p>
      </div>
      <pre><code
          >{`<InputNumberOptional
  id="max-time"
  valueLabel="Max time"
  condLabel="Override"
  bind:value={myVal}
  bind:condition={myBool}
/>`}</code
        ></pre>
    </ShowcaseSection>

    <ShowcaseSection
      id="inputcheckbox"
      title="InputCheckbox"
    >
      <h3>Labeled checkbox — solid or none border</h3>
      <div class="preview">
        <InputCheckbox
          id="demo-check"
          label="Enable logging"
          bind:checked={checkVal}
        />
        <InputCheckbox
          id="demo-check2"
          label="Show grid"
          bind:checked={checkVal}
          border="transparent"
        />
        <p class="demo-label">Checked: {checkVal}</p>
      </div>
      <pre><code
          >{`<InputCheckbox
  id="enable-log"
  label="Enable logging"
  bind:checked={myBool}
/>
<InputCheckbox ... border="transparent" />`}</code
        ></pre>
    </ShowcaseSection>

    <ShowcaseSection
      id="inputchoice"
      title="InputChoice"
    >
      <h3>Labeled select dropdown</h3>
      <div class="preview">
        <InputChoice
          id="demo-choice"
          label="Integrator"
          bind:value={choiceVal}
        >
          <option value="euler">Euler</option>
          <option value="rk45">RK45</option>
          <option value="tsit5">Tsit5</option>
          <option value="bosh3">BOSH3</option>
        </InputChoice>
        <p class="demo-label">Selected: {choiceVal}</p>
      </div>
      <pre><code
          >{`<InputChoice id="integrator" label="Integrator" bind:value={method}>
  <option value="euler">Euler</option>
  <option value="rk45">RK45</option>
  <option value="tsit5">Tsit5</option>
</InputChoice>`}</code
        ></pre>
    </ShowcaseSection>

    <ShowcaseSection
      id="comparecheckbox"
      title="CompareCheckbox"
    >
      <h3>Checkbox for toggling comparison with previous simulation run</h3>
      <div class="preview">
        <CompareCheckbox bind:checked={compareVal} />
        <CompareCheckbox
          bind:checked={compareVal}
          label="Show previous run overlay"
        />
        <p class="demo-label">Checked: {compareVal}</p>
      </div>
      <pre><code
          >{`<CompareCheckbox bind:checked={showComparison} />
<CompareCheckbox
  bind:checked={showComparison}
  label="Show previous run overlay"
  onchange={(v) => console.log(v)}
/>`}</code
        ></pre>
    </ShowcaseSection>

    <PageNav
      prev={{ href: "/components/layout", label: "Layout" }}
      next={{ href: "/components/interactive", label: "Interactive" }}
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
</style>
