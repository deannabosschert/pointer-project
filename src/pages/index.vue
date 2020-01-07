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
  data() {
    return {
      rawCompanies: require('../static/data')
    }
  },
  computed: {
    ...mapGetters({
      careCompanies: 'careCompanies',
      selectedCareCompany: 'selectedCareCompany'
    })
  },
  mounted() {
    if (!this.careCompanies) {
      this.$store.commit(SET_CARECOMPANIES, { careCompanies: this.rawCompanies })
    }
  }
}
</script>

<style lang="scss">

</style>
