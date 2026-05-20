<svelte:head><title>Components — CPBL Design</title></svelte:head>

<div class="index-page">
  <h1>Components</h1>
  <p class="subtitle">96 components across 11 groups</p>

  <div class="groups">
    {#each groups as g}
      <a href={g.href} class="group-card">
        <div class="count">{g.count}</div>
        <div class="name">{g.name}</div>
        <div class="desc">{g.desc}</div>
      </a>
    {/each}
  </div>
</div>

<script lang="ts">
  const groups = [
    { name: 'Typography',    href: '/components/typography',  count: 22, desc: 'Headings, text, inline elements, links' },
    { name: 'Cards',         href: '/components/cards',       count: 10, desc: 'Content cards for people, publications, software, models' },
    { name: 'Layout',        href: '/components/layout',      count: 11, desc: 'Grid, row, flex, spacing containers' },
    { name: 'Inputs',        href: '/components/inputs',      count: 7,  desc: 'Form controls: text, number, checkbox, select' },
    { name: 'Interactive',   href: '/components/interactive', count: 9,  desc: 'Accordion, popover, slider, toggles' },
    { name: 'Data & Science',href: '/components/data',        count: 8,  desc: 'Charts, tables, math rendering, model gallery' },
    { name: 'Navigation',    href: '/components/navigation',  count: 6,  desc: 'Navbar, sidebar, page navigation' },
    { name: 'Heroes',        href: '/components/heroes',      count: 6,  desc: 'Hero banners and section headers' },
    { name: 'Buttons',       href: '/components/buttons',     count: 5,  desc: 'Button variants: icon, menu, tab' },
    { name: 'Media',         href: '/components/media',       count: 4,  desc: 'Images and video embeds' },
    { name: 'Utilities',     href: '/components/utilities',   count: 3,  desc: 'Icon, info box, footer' },
  ];
</script>

<style>
  .index-page {
    max-width: 1100px;
    margin: 0 auto;
    padding: var(--space-12) var(--space-4);
  }

  h1 {
    font-size: 2rem;
    font-weight: 700;
    margin: 0 0 var(--space-2) 0;
  }

  .subtitle {
    color: var(--color-text-muted);
    font-size: 1rem;
    margin: 0 0 var(--space-10) 0;
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
    padding: var(--space-6);
    border: var(--border);
    border-radius: var(--radius-lg);
    text-decoration: none;
    color: var(--color-text);
    background-color: var(--color-bg);
    transition: border-color 0.15s, box-shadow 0.15s, transform 0.15s;
  }

  .group-card:hover {
    border-color: var(--color-primary);
    box-shadow: var(--shadow-md);
    transform: translateY(-2px);
  }

  .count {
    font-size: 1.75rem;
    font-weight: 700;
    color: var(--color-primary);
    font-variant-numeric: tabular-nums;
  }

  .name {
    font-size: 1rem;
    font-weight: 600;
  }

  .desc {
    font-size: 0.8125rem;
    color: var(--color-text-muted);
    margin-top: var(--space-1);
  }
</style>
