<script lang="ts">
  import { base } from "$app/paths";

  const groups = [
    {
      name: "Typography",
      href: `${base}/components/typography`,
      count: 22,
      desc: "Headings, text, inline elements, links",
    },
    {
      name: "Cards",
      href: `${base}/components/cards`,
      count: 10,
      desc: "Content cards for people, publications, software, models",
    },
    {
      name: "Layout",
      href: `${base}/components/layout`,
      count: 11,
      desc: "Grid, row, flex, spacing containers",
    },
    {
      name: "Inputs",
      href: `${base}/components/inputs`,
      count: 7,
      desc: "Form controls: text, number, checkbox, select",
    },
    {
      name: "Interactive",
      href: "/components/interactive",
      count: 9,
      desc: "Accordion, popover, slider, toggles",
    },
    {
      name: "Data & Science",
      href: `${base}/components/data`,
      count: 8,
      desc: "Charts, tables, math rendering, model gallery",
    },
    {
      name: "Navigation",
      href: `${base}/components/navigation`,
      count: 6,
      desc: "Navbar, sidebar, page navigation",
    },
    {
      name: "Heroes",
      href: `${base}/components/heroes`,
      count: 6,
      desc: "Hero banners and section headers",
    },
    {
      name: "Buttons",
      href: `${base}/components/buttons`,
      count: 5,
      desc: "Button variants: icon, menu, tab",
    },
    {
      name: "Media",
      href: "/components/media",
      count: 4,
      desc: "Images and video embeds",
    },
    {
      name: "Utilities",
      href: `${base}/components/utilities`,
      count: 3,
      desc: "Icon, info box, footer",
    },
  ];
</script>

<svelte:head><title>Components - CPBL Design</title></svelte:head>

<div class="index-page">
  <h1>Components</h1>
  <p class="subtitle">96 components across 11 groups</p>

  <div class="groups">
    {#each groups as g}
      <a
        href={g.href}
        class="group-card"
      >
        <div class="count">{g.count}</div>
        <div class="name">{g.name}</div>
        <div class="desc">{g.desc}</div>
      </a>
    {/each}
  </div>
</div>

<style>
  .index-page {
    margin: 0 auto;
    padding: var(--space-12) var(--space-4);
    width: 100%;
    max-width: 1100px;
  }

  h1 {
    margin: 0 0 var(--space-2) 0;
    font-weight: 700;
    font-size: 2rem;
  }

  .subtitle {
    margin: 0 0 var(--space-10) 0;
    color: var(--color-text-muted);
    font-size: 1rem;
  }

  .groups {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
    gap: var(--space-4);
  }

  .group-card {
    display: flex;
    flex-direction: column;
    gap: var(--space-1);
    transition:
      border-color 0.15s,
      box-shadow 0.15s,
      transform 0.15s;
    border: var(--border);
    border-radius: var(--radius-lg);
    background-color: var(--color-bg);
    padding: var(--space-6);
    color: var(--color-text);
    text-decoration: none;
  }

  .group-card:hover {
    transform: translateY(-2px);
    box-shadow: var(--shadow-md);
    border-color: var(--color-primary);
  }

  .count {
    color: var(--color-primary);
    font-weight: 700;
    font-size: 1.75rem;
    font-variant-numeric: tabular-nums;
  }

  .name {
    font-weight: 600;
    font-size: 1rem;
  }

  .desc {
    margin-top: var(--space-1);
    color: var(--color-text-muted);
    font-size: 0.8125rem;
  }
</style>
