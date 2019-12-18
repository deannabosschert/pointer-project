<template>
  <div class="layout">
    <app-header />
    <nuxt />
  </div>
</template>

<script>
  import AppHeader from '../components/app-header/app-header'

  export default {
    components: {
      AppHeader
    }
  }
</script>
