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
