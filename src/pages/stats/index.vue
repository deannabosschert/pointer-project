<template>
  <main>
    <h1>Pointer! Homepage</h1>

    <company-search />
    <year-selection
      :selected-company="selectedCareCompany"
      :dutch-data="dutchData"
    />

    <bar-chart
      v-if="selectedData && selectedDutchData"
      :selected-data="selectedData"
      :dutch-data="selectedDutchData"
      property="omzet"
      title="My awesome bar chart"
    />

    <nuxt-link to="/">To the shop</nuxt-link>
  </main>
</template>

<script>
import { mapGetters } from 'vuex'
import { SET_CARECOMPANIES, SET_DUTCH_DATA } from '~/store/mutation-types'
import dutchDataJson from '~/static/data/dutch-stats'
import CompanySearch from '~/components/company-search/company-search'
import YearSelection from '~/components/year-selection/year-selection'
import BarChart from '~/components/bar-chart/bar-chart'
export default {
  components: {
    CompanySearch,
    YearSelection,
    BarChart
  },
  data() {
    return {
      dutchData: dutchDataJson
    }
  },
  computed: {
    ...mapGetters({
      careCompanies: 'careCompanies',
      selectedCareCompany: 'selectedCareCompany',
      selectedData: 'selectedData',
      selectedDutchData: 'selectedDutchData'
    }),
    async rawCompanies() {
      const module = await import('~/static/data/pointer-raw')
      return module.default
    },
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
