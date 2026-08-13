<!--
  @component

  A simple responsive image, centred and capped at 100% width.

  ### Props

  - `src: string`
    Image source URL.
  - `alt?: string`
    Alternative text. Defaults to `"profile"`.
  - `styleVars?: { [key: string]: string }`
    Optional CSS custom property overrides applied via inline style.

  ### Example

  ```svelte
  <Image src="/img/lab.jpg" alt="The lab building" />
  ```
-->
<script lang="ts">
  interface Props {
    src: string;
    alt?: string;
    styleVars?: { [key: string]: string };
  }

  let { src, alt = "profile", styleVars = {} }: Props = $props();

  let inlineStyle = $derived(
    Object.entries(styleVars)
      .map(([k, v]) => `${k}:${v}`)
      .join(";"),
  );
</script>

<img
  src={src}
  alt={alt}
  style={inlineStyle}
  loading="lazy"
  decoding="async"
/>

<style>
  img {
    display: block;
    margin: 0 auto;
    max-width: 100%;
  }
</style>
