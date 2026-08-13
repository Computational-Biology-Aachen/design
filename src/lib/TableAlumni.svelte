<!--
  @component

  Renders the lab's alumni/thesis list as a table on wider screens and as a
  stack of cards below 800px. The data (semester, name, degree, thesis title) is
  hard-coded in the component, so it takes no props. Cell content may contain
  inline HTML (rendered via `{@html}`).

  ### Style Overrides

  - `styleVars.tableTdPadding` → overrides `--table-alumni-td-padding`
  - `styleVars.tableCardPadding` → overrides `--table-alumni-card-padding`

  ### Example

  ```svelte
  <TableAlumni />
  ```
-->
<script lang="ts">
  import Bold from "./Bold.svelte";
  import Text from "./Text.svelte";
  import { MediaQuery } from "svelte/reactivity";

  let {
    styleVars = {},
  }: { styleVars?: { tableTdPadding?: string; tableCardPadding?: string } } =
    $props();

  const small = new MediaQuery("max-width: 800px");
  let header = ["Semester", "Name", "Degree", "Work"];
  let rows = [
    [
      "SoSe 2025",
      "Manuel Schroder",
      "M. Sc.",
      "Stoichiometric modelling for media characterization of a CHO-based process. <em>External: Sabine Arnold, Dr.-Ing, Boehringer Ingelheim Pharma GmbH & Co. KG</em>",
    ],
    [
      "SoSe 2025",
      "Li Ina",
      "M. Sc.",
      "Investigating temporal dynamics of genetic diversityin RSV subgroups during an epidemic cycle in Germany, 2014-2023. <em>External: Daniel Weinberger, PhD, Yale School of Public Health, USA</em>",
    ],
    [
      "SoSe 2024",
      "Mohamed Wehbe",
      "B. Sc.",
      "Developing a Machine Learning Pipeline to Extract Information from Literature for the Validation and Improvement of Computational Photosynthesis Models",
    ],
    [
      "WiSe 2022/23",
      "Sarah Philipps",
      "B. Sc.",
      "Developing of Graphical Interface for Interactive Simulations in Green Biology",
    ],
    [
      "SoSe 2022",
      "Theresa Zimmermann",
      "B. Sc.",
      "Modelling nutrient-driven population dynamics of Microorganisms",
    ],
    [
      "SoSe 2022",
      "Elouën Corvest",
      "B. Sc.",
      "Computational Study of Photosynthetic CO2 Assimilation Rate",
    ],
    [
      "SoSe 2022",
      "Pia Falter",
      "B. Sc.",
      "Modelling the effect of climate change and nutrient saturation on dinoflagellate blooms in the Baltic Sea",
    ],
  ];

  let cssVars = $derived({
    ...(styleVars.tableTdPadding
      ? { "--table-alumni-td-padding": styleVars.tableTdPadding }
      : {}),
    ...(styleVars.tableCardPadding
      ? { "--table-alumni-card-padding": styleVars.tableCardPadding }
      : {}),
  });
  let inlineStyle = $derived(
    Object.entries(cssVars)
      .map(([k, v]) => `${k}:${v}`)
      .join(";"),
  );
</script>

{#if small.current}
  {#each rows as row, i (i)}
    <div class="card">
      <Text><Bold>{row[1]}</Bold>, {row[2]} - {row[0]}</Text>
      <Text>{row[3]}</Text>
    </div>
  {/each}
{:else}
  <table style={inlineStyle}>
    <thead>
      <tr>
        {#each header as cell (cell)}
          <!-- trusted, component-internal table data -->
          <!-- eslint-disable-next-line svelte/no-at-html-tags -->
          <td>{@html cell}</td>
        {/each}
      </tr>
    </thead>
    <tbody>
      {#each rows as row, i (i)}
        <tr>
          {#each row as cell, j (j)}
            <!-- trusted, component-internal table data -->
            <!-- eslint-disable-next-line svelte/no-at-html-tags -->
            <td>{@html cell}</td>
          {/each}
        </tr>
      {/each}
    </tbody>
  </table>
{/if}

<style>
  table {
    --table-alumni-td-padding: 0.5rem;
    --table-alumni-card-padding: 1rem;
    width: 100%;
    font-family: var(--font-sans);
  }
  thead {
    font-weight: 700;
  }
  td {
    padding: var(--table-alumni-td-padding);
  }
  .card {
    box-shadow: 0px 18px 36px -18px rgba(0, 0, 0, 0.1);
    border: 1px solid var(--color-border);
    border-radius: 8px;
    padding: var(--table-alumni-card-padding);
  }
</style>
