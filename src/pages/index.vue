<template>
  <main>
    <h1>Pointer! Homepage</h1>

    <company-search />
    <year-selection :selected-company="selectedCareCompany" />

    <p>You selected this data:</p>
    <pre>{{ selectedData }}</pre>

    <nuxt-link to="/shop">To the shop</nuxt-link>
  </main>
</template>

<script>
import { mapGetters } from 'vuex'
import { SET_CARECOMPANIES } from '~/store/mutation-types'

import CompanySearch from '~/components/company-search/company-search'
import YearSelection from '~/components/year-selection/year-selection'

export default {
  components: {
    CompanySearch,
    YearSelection
  },
  data() {
    return {
      rawCompanies: require('../static/data')
    }
  },
  computed: {
    ...mapGetters({
      careCompanies: 'careCompanies',
      selectedCareCompany: 'selectedCareCompany',
      selectedData: 'selectedData'
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
