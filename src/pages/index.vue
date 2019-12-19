<template>
  <main>
    <h1>Pointer! Homepage</h1>
    <company-search />
    <nuxt-link to="/shop">To the shop</nuxt-link>
  </main>
</template>

<script>
import CompanySearch from '~/components/company-search/company-search'

export default {
  components: {
    CompanySearch
  }
}
</script>

<style lang="scss">

</style>
