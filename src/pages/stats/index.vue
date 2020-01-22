<template>
  <main class="stats-page">
    <h1 class="h2 stats-page__title">Jouw zorginstelling</h1>

    <div class="stats-page__controls">
      <company-search />
      <year-selection
        :selected-company="selectedCareCompany"
        :dutch-data="dutchData"
      />
    </div>

    <app-charts
      v-if="selectedData && selectedDutchData"
      :selected-data="selectedData"
      :dutch-data="selectedDutchData"
      property="omzet"
      title="Charts toggle"
    />

    <nuxt-link
      to="/"
      class="button button--primary"
    >
      Opnieuw beginnen
    </nuxt-link>
    <nuxt-link
      to="/shop"
      class="button button--secondary"
    >
      Naar webshop
    </nuxt-link>
  </main>
</template>

<script>
import { mapGetters } from 'vuex'
import { SET_CARECOMPANIES, SET_DUTCH_DATA } from '~/store/mutation-types'
import dutchDataJson from '~/static/data/dutch-stats'
import CompanySearch from '~/components/company-search/company-search'
import YearSelection from '~/components/year-selection/year-selection'
import AppCharts from '~/components/app-charts/app-charts'

export default {
  components: {
    CompanySearch,
    YearSelection,
    AppCharts
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
    }
  },
  async mounted() {
    if (!this.careCompanies) {
      this.$store.commit(SET_CARECOMPANIES, {
        careCompanies: await this.rawCompanies
      })
    }
  }
}
</script>

<style lang="scss">
.stats-page {
  padding: $spacing-small $spacing-medium;
}

.stats-page__title,
.stats-page .company-search {
  margin-bottom: $spacing-small;
}

.stats-page__controls {
  margin-bottom: $spacing-large;
}

.stats-page .app-charts {
  margin-bottom: $spacing-large;
}

.stats-page .button--primary {
  margin-bottom: $spacing-small;
}

.stats-page .button--secondary {
  margin-bottom: $spacing-large;
}
</style>
