<!--
  @component

  The primary call-to-action button. Renders a `<button>` by default, or an
  `<a>` styled identically when `href` is supplied. Supports a loading spinner,
  disabled state, and the native popover attributes for toggling [[Popover]]s.

  ### Props

  - `variant?: "primary" | "secondary"`
    Filled (`"primary"`) vs. outlined (`"secondary"`). Defaults to `"primary"`.
  - `type?: "button" | "submit" | "reset"`
    Native button type (ignored when rendered as a link). Defaults to `"button"`.
  - `disabled?: boolean`
    Disables interaction and dims the button. Defaults to `false`.
  - `loading?: boolean`
    Shows a spinner and disables the button. Defaults to `false`.
  - `fullWidth?: boolean`
    Forces 100% width even on desktop. Defaults to `false`.
  - `href?: string`
    When set, renders an anchor instead of a button.
  - `popovertarget?: string`, `popovertargetaction?: "hide" | "show" | "toggle"`
    Native popover controls, e.g. to open a [[Popover]].
  - `onclick?: (e: MouseEvent) => void`
    Click handler (button variant only).
  - `children: Snippet`
    The button label.
  - `styleVars?: { fontSize?: string; padding?: string; borderRadius?: string; lineHeight?: string }`
    Override the button's default CSS values.

  ### Example

  ```svelte
  <Button variant="primary" onclick={save}>Save</Button>
  <Button href="/signup" variant="secondary">Sign up</Button>
  ```
-->
<script lang="ts">
  import type { Snippet } from "svelte";

  interface Props {
    variant?: "primary" | "secondary" | "inverted";
    type?: "button" | "submit" | "reset";
    disabled?: boolean;
    loading?: boolean;
    fullWidth?: boolean;
    href?: string;
    popovertarget?: string;
    popovertargetaction?: "hide" | "show" | "toggle";
    onclick?: (e: MouseEvent) => void;
    children: Snippet;
    styleVars?: {
      fontSize?: string;
      padding?: string;
      borderRadius?: string;
      lineHeight?: string;
    };
  }

  let {
    variant = "primary",
    type = "button",
    disabled = false,
    loading = false,
    fullWidth = false,
    href,
    popovertarget,
    popovertargetaction,
    onclick,
    children,
    styleVars = {},
  }: Props = $props();

  let cssVars = $derived({
    ...(styleVars.fontSize ? { "--btn-font-size": styleVars.fontSize } : {}),
    ...(styleVars.padding ? { "--btn-padding": styleVars.padding } : {}),
    ...(styleVars.borderRadius ? { "--btn-border-radius": styleVars.borderRadius } : {}),
    ...(styleVars.lineHeight ? { "--btn-line-height": styleVars.lineHeight } : {}),
  });
  let inlineStyle = $derived(
    Object.entries(cssVars)
      .map(([k, v]) => `${k}:${v}`)
      .join(";"),
  );
</script>

{#if href}
  <a
    href={href}
    class={variant}
    class:disabled={disabled}
    class:full-width={fullWidth}
    style={inlineStyle}
  >
    {#if loading}<span
        class="spinner"
        aria-hidden="true"
      ></span>{/if}
    {@render children()}
  </a>
{:else}
  <button
    type={type}
    disabled={disabled || loading}
    onclick={onclick}
    popovertarget={popovertarget}
    popovertargetaction={popovertargetaction}
    class={variant}
    class:full-width={fullWidth}
    style={inlineStyle}
  >
    {#if loading}<span
        class="spinner"
        aria-hidden="true"
      ></span>{/if}
    {@render children()}
  </button>
{/if}

<style>
  button,
  a {
    --btn-font-size: 0.9375rem;
    --btn-line-height: 1.5;
    --btn-padding: var(--space-2) var(--space-6);
    --btn-border-radius: var(--radius-md);
    display: inline-flex;
    justify-content: center;
    align-items: center;
    gap: var(--space-2);
    transition: var(--transition);
    cursor: pointer;
    outline: none;
    border: none;
    border-radius: var(--btn-border-radius);
    padding: var(--btn-padding);
    width: 100%;
    font-weight: 500;
    font-size: var(--btn-font-size);
    line-height: var(--btn-line-height);
    font-family: var(--font-sans);
    text-decoration: none;
    white-space: nowrap;

    @media (min-width: 768px) {
      width: auto;
    }
  }

  .full-width {
    width: 100%;
  }

  button:disabled,
  a.disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  .primary {
    box-shadow: var(--shadow-primary);
    background-color: var(--color-primary);
    color: var(--color-text-inverse);
  }

  .primary:hover:not(:disabled):not(.disabled) {
    box-shadow: inset 0 0 0 10em rgba(0, 0, 0, 0.1);
  }

  .secondary {
    border: 1px solid var(--color-primary);
    background-color: transparent;
    color: var(--color-primary);
  }

  .secondary:hover:not(:disabled):not(.disabled) {
    background-color: var(--color-surface);
  }

  .inverted {
    background-color: var(--color-surface);
    color: var(--color-primary);
  }

  .inverted:hover:not(:disabled):not(.disabled) {
    background-color: var(--color-surface);
  }

  .spinner {
    flex-shrink: 0;
    animation: spin 0.7s linear infinite;
    border: 2px solid color-mix(in srgb, currentColor 30%, transparent);
    border-top-color: currentColor;
    border-radius: 50%;
    width: 0.875em;
    height: 0.875em;
  }

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
</style>
