<!--
 @component

  Here the compiler gives very little help

  Calling conventions
  <Element />                  // default width
  <Element width="200px" />  // custom width

-->

<script lang="ts">
  let {
    width = "100px",
  }: {
    width?: string;
  } = $props();
</script>

<div style:width={width}></div>

<style>
</style>
