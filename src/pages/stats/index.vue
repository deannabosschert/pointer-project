<template>
  <main>
    <h1>Pointer! Homepage</h1>

    <company-search />
    <year-selection :selected-company="selectedCareCompany" />
    <bar-chart />

    <p>You selected this data:</p>
    <pre>{{ selectedData }}</pre>

    <nuxt-link to="/">To the shop</nuxt-link>
  </main>
</template>

<script>
import { mapGetters } from 'vuex'
import { SET_CARECOMPANIES } from '~/store/mutation-types'

import CompanySearch from '~/components/company-search/company-search'
import YearSelection from '~/components/year-selection/year-selection'
import BarChart from '../components/bar-chart/bar-chart'

export default {
  components: {
    CompanySearch,
    YearSelection,
    BarChart
  },
  computed: {
    ...mapGetters({
      careCompanies: 'careCompanies',
      selectedCareCompany: 'selectedCareCompany',
      selectedData: 'selectedData'
    }),
    async rawCompanies() {
      const module = await import('~/static/data/pointer-raw')

      return module.default
    }
  },
  async mounted() {
    if (!this.careCompanies) {
      this.$store.commit(SET_CARECOMPANIES, { careCompanies: await this.rawCompanies })
    }
  }
}
</script>

<style lang="scss">

</style>
