<script lang="ts">
  interface Props {
    videoId: string;
    title?: string;
  }

  let { videoId, title = "YouTube video" }: Props = $props();
</script>

<div class="youtube-container">
  <iframe
    src="https://www.youtube-nocookie.com/embed/{videoId}"
    title={title}
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
    allowfullscreen
    loading="lazy"
  ></iframe>
</div>

<style>
  .youtube-container {
    position: relative;
    border-radius: var(--radius-md);
    background: #000;
    padding-bottom: 56.25%;
    width: 100%;
    overflow: hidden;
  }

  iframe {
    position: absolute;
    top: 0;
    left: 0;
    border: 0;
    width: 100%;
    height: 100%;
  }
</style>
