<!--
  @component

  A button that toggles the visibility of a video transcript panel, with a
  rotating arrow indicator. Transcript text preserves whitespace.

  ### Props

  - `message: string`
    The toggle button label (e.g. "Show transcript").
  - `transcript: string`
    The transcript text revealed when expanded.

  ### Style Overrides

  - `styleVars.btnFontSize` → overrides `--transcript-btn-font-size`
  - `styleVars.contentFontSize` → overrides `--transcript-content-font-size`
  - `styleVars.contentMarginTop` → overrides `--transcript-content-margin-top`
  - `styleVars.contentPadding` → overrides `--transcript-content-padding`

  ### Example

  ```svelte
  <VideoTranscriptToggle message="Show transcript" transcript={text} />
  ```
-->
<script lang="ts">
  let {
    message,
    transcript,
    styleVars = {},
  }: {
    message: string;
    transcript: string;
    styleVars?: {
      btnFontSize?: string;
      contentFontSize?: string;
      contentMarginTop?: string;
      contentPadding?: string;
    };
  } = $props();

  let showTranscript = $state(false);

  let cssVars = $derived({
    ...(styleVars.btnFontSize
      ? { "--transcript-btn-font-size": styleVars.btnFontSize }
      : {}),
    ...(styleVars.contentFontSize
      ? { "--transcript-content-font-size": styleVars.contentFontSize }
      : {}),
    ...(styleVars.contentMarginTop
      ? { "--transcript-content-margin-top": styleVars.contentMarginTop }
      : {}),
    ...(styleVars.contentPadding
      ? { "--transcript-content-padding": styleVars.contentPadding }
      : {}),
  });
  let inlineStyle = $derived(
    Object.entries(cssVars)
      .map(([k, v]) => `${k}:${v}`)
      .join(";"),
  );
</script>

<div
  class="transcript-toggle"
  style={inlineStyle}
>
  <button
    type="button"
    class="transcript-btn"
    onclick={() => (showTranscript = !showTranscript)}
    aria-expanded={showTranscript}
  >
    {showTranscript ? "▼" : "▶"}
    {message}
  </button>
  {#if showTranscript}
    <div class="transcript-content">
      {transcript}
    </div>
  {/if}
</div>

<style>
  .transcript-toggle {
    --transcript-btn-font-size: 0.9rem;
    --transcript-content-font-size: 0.9rem;
    --transcript-content-margin-top: var(--space-3);
    --transcript-content-padding: var(--space-4);
  }

  .transcript-btn {
    display: flex;
    align-items: center;
    gap: var(--space-2);
    transition:
      background-color 0.15s,
      color 0.15s;
    cursor: pointer;
    border: 1px solid var(--color-border);
    border-radius: 6px;
    background: none;
    padding: var(--space-2) var(--space-4);
    color: var(--color-text-muted);
    font-size: var(--transcript-btn-font-size);
  }

  .transcript-btn:hover {
    background-color: var(--color-surface);
    color: var(--color-text);
  }

  .transcript-content {
    margin-top: var(--transcript-content-margin-top);
    border: 1px solid var(--color-border);
    border-radius: 6px;
    background: var(--color-surface);
    padding: var(--transcript-content-padding);
    font-size: var(--transcript-content-font-size);
    line-height: var(--line-height-base);
    white-space: pre-wrap;
  }
</style>
