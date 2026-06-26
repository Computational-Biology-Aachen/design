<!--
 @component

  Heavily compiler-assisted, but very unflexible

  Calling conventions
  <Element />                  // default width
  <Element choice="wide" />    // custom width

-->

<script lang="ts">
  let { choice = "normal" }: { choice?: "normal" | "wide" } = $props();
</script>

<div class="choice-{choice}"></div>

<style>
  .choice-normal {
    width: 100px;
  }
  .choice-wide {
    width: 200px;
  }
</style>
