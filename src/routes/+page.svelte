<script lang="ts">
  import { base } from "$app/paths";
  import { Button, Imprint, Row, Section } from "$lib/index.js";
</script>

<svelte:head>
  <title>CPBL Design System</title>
</svelte:head>

<Section variant="primary">
  <h1>CPBL Design System</h1>
  <p>Shared tokens and components for CPBL lab websites.</p>
  <div style="margin-top: var(--space-6)">
    <Row gap="var(--space-3)">
      <a href="{base}/tokens"><Button>Browse tokens</Button></a>
      <a href="{base}/components"
        ><Button variant="secondary">Browse components</Button></a
      >
    </Row>
  </div>
</Section>

<Section>
  <div class="grid">
    <div class="card">
      <h3>Design tokens</h3>
      <p>
        CSS custom properties for color, typography, spacing, shadows, and
        borders - all anchored to the RWTH institutional palette.
      </p>
      <a href="{base}/tokens">View tokens →</a>
    </div>
    <div class="card">
      <h3>Svelte components</h3>
      <p>
        Six layout primitives: <code>Navbar</code>, <code>NavItem</code>,
        <code>Button</code>, <code>Section</code>, <code>Row</code>,
        <code>Footer</code>.
      </p>
      <a href="{base}/components">View components →</a>
    </div>
    <div class="card">
      <h3>Package</h3>
      <p>
        Published to GitHub Packages as <code
          >@computational-biology-aachen/design</code
        >. Built with <code>@sveltejs/package</code>.
      </p>
      <a href="https://github.com/Computational-Biology-Aachen/design"
        >GitHub →</a
      >
    </div>
  </div>
</Section>

<Imprint github="https://github.com/Computational-Biology-Aachen/design" />

<style>
  h1 {
    margin-bottom: var(--space-3);
    color: var(--color-text-inverse);
    font-weight: 700;
    font-size: 2.5rem;
  }

  p {
    opacity: 0.85;
    color: var(--color-text-inverse);
    font-size: 1.125rem;
  }

  .grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
    gap: var(--space-6);
  }

  .card {
    display: flex;
    flex-direction: column;
    gap: var(--space-3);
    border: var(--border);
    border-radius: var(--radius-lg);
    background-color: var(--color-surface);
    padding: var(--space-6);
  }

  .card h3 {
    margin: 0;
    font-weight: 600;
    font-size: 1rem;
  }

  .card p {
    margin: 0;
    color: var(--color-text-muted);
    font-size: 0.9rem;
  }

  .card a {
    font-weight: 500;
    font-size: 0.9rem;
  }

  a {
    text-decoration: none;
  }
</style>
