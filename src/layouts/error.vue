<template>
  <main class="error-page">
    <h1
      v-if="error.statusCode === 404"
      class="error-page__title"
    >
      Oops, je zoekt een pagina die niet bestaat :(
    </h1>
    <h1
      v-else
      class="error-page__title"
    >
      Oops, er ging iets fout... :(
    </h1>
    <nuxt-link to="/" class="button button--secondary">Terug naar home</nuxt-link>
  </main>
</template>

<script>
  import FixedRatio from '~/components/fixed-ratio/fixed-ratio'

  export default {
    components: {
      FixedRatio
    },
    props: {
      error: {
        type: Object,
        default: {}
      }
    },
    layout: 'default'
  }
</script>

<style lang="scss">
  .error-page {
    padding: $spacing-default $spacing-medium;
  }

  .error-page__title {
    margin-bottom: $spacing-large;
  }

  .error-page__image {
    height: 100%;
    width: 100%;
    object-fit: cover;
  }
</style>
