<!--
  @component

  A simple responsive image, centred and capped at 100% width.

  ### Props

  - `src: string`
    Image source URL.
  - `alt?: string`
    Alternative text. Defaults to `"profile"`.

  ### Example

  ```svelte
  <Image src="/img/lab.jpg" alt="The lab building" />
  ```
-->
<script lang="ts">
  let {
    src,
    alt = "profile",
  }: {
    src: string;
    alt?: string;
  } = $props();
</script>

<img
  src={src}
  alt={alt}
/>

<style>
  img {
    display: block;
    margin: 0 auto;
    max-width: 100%;
  }
</style>
