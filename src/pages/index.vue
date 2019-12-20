<template>
  <main>
    <h1>Pointer! Homepage</h1>
    <company-search />
    <p v-if="selectedCareCompany">Jij hebt {{ selectedCareCompany.naam }} geselecteed :D</p>
    <nuxt-link to="/shop">To the shop</nuxt-link>
  </main>
</template>

<script>
import { mapGetters } from 'vuex'
import { SET_CARECOMPANIES } from '~/store/mutation-types'

import CompanySearch from '~/components/company-search/company-search'

export default {
  components: {
    CompanySearch
  },
  async asyncData() {
    const module = await import('../static/data')
    const data = module.default

    return { data }
  },
  computed: {
    ...mapGetters({
      selectedCareCompany: 'selectedCareCompany'
    })
  },
  created() {
    this.$store.commit(SET_CARECOMPANIES, {
      careCompanies: this.data
    })
  }
}
</script>

<style lang="scss">

</style>
