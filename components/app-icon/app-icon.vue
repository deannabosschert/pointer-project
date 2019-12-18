<template>
  <img
    :src="`/assets/icons/${name}.svg`"
    alt=""
    class="app-icon"
  />
</template>

<script>
  export default {
    props: {
      name: {
        type: String,
        required: true
      }
    },
  }
</script>

<style>
  .app-icon {
    height: 1em;
    width: 1em;
  }
</style>
