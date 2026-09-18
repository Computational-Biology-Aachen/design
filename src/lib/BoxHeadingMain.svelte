<!--
  @component

  A centred main heading block that renders an uppercased title as a heading,
  adapting its layout direction below/above 800px.

  ### Props

  - `n: string`
    A section number/identifier associated with the heading.
  - `title: string`
    The heading text (rendered uppercased).
  - `level?: 1 | 2 | 3 | 4 | 5 | 6`
    Semantic heading level to render (`<h1>`–`<h6>`). Defaults to `2`, since a
    page normally has exactly one true `<h1>` elsewhere; pass `1` only for
    that title. Visual size is fixed regardless of level — this only changes
    the semantic tag, so a page repeating this component across sibling
    sections doesn't end up with multiple `<h1>`s.
  - `color?: "dark" | "light" | "primary" | "secondary"`
    Heading colour. Defaults to `"dark"`.
  - `styleVars?: { [key: string]: string }`
    Optional CSS custom property overrides applied via inline style.

  ### Example

  ```svelte
  <BoxHeadingMain n="01" title="Research" />
  <BoxHeadingMain n="02" title="Team" level={3} />
  ```
-->
<script lang="ts">
  import { toStyleString } from "./utils";

  interface Props {
    n: string;
    title: string;
    level?: 1 | 2 | 3 | 4 | 5 | 6;
    color?: "dark" | "light" | "primary" | "secondary";
    styleVars?: { [key: string]: string };
  }

  let {
    // public prop, documented but not yet rendered
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    n,
    title,
    level = 2,
    color = "dark",
    styleVars = {},
  }: Props = $props();

  let inlineStyle = $derived(toStyleString(styleVars));
  let tag = $derived(`h${level}` as const);
</script>

<div
  class="box"
  style={inlineStyle}
>
  <svelte:element
    this={tag}
    class={`heading ${color}`}
  >
    {title.toUpperCase()}
  </svelte:element>
</div>

<style>
  .box {
    display: flex;
    flex-direction: row;
  }

  @media screen and (min-width: 800px) {
    .box {
      flex-direction: column;
      align-items: center;
    }
  }

  .heading {
    margin: 0;
    padding: 0;
    font-size: 2rem;
    font-family: var(--font-sans);
  }
  .dark {
    color: var(--color-text);
  }
  .light {
    color: var(--color-bg);
  }
  .primary {
    color: var(--color-primary);
  }
  .secondary {
    color: var(--color-accent);
  }
</style>
