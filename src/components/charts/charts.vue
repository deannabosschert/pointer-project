<template>
  <main>
    <app-toggle
      @compare-click="choice = 'compare'"
      @see-click="choice = 'see'"
    />
    <div v-if="choice === 'compare'">
      <h2 class="chart-title">Percentage winst</h2>
      <bar-chart
        v-if="selectedData && selectedDutchData"
        :selected-data="selectedData"
        :dutch-data="selectedDutchData"
        property="percentageWinst"
        title="Percentage winst"
        gemiddelde = '4'
      />

      <h2 class="chart-title">Percentage loon </h2>
      <bar-chart
        v-if="selectedData && selectedDutchData"
        :selected-data="selectedData"
        :dutch-data="selectedDutchData"
        property="percentageLoon"
        title="Percentage loon"
        gemiddelde = '40'

      />

      <h2 class="chart-title">Omzet per FTE</h2>
      <bar-chart
        v-if="selectedData && selectedDutchData"
        :selected-data="selectedData"
        :dutch-data="selectedDutchData"
        property="omzetPerFte"
        title="Omzet per FTE"
        gemiddelde = '125000'
      />
    </div>

    <div v-else-if="choice === 'see'">
      <stacked-bar-chart
        v-if="selectedData && selectedDutchData"
        :selected-data="selectedData"
        :dutch-data="selectedDutchData"
        property="omzet"
        title="Stacken met die barzz"
      />
    </div>
  </main>
</template>

<script>
import { mapGetters } from 'vuex'
import { SET_CARECOMPANIES, SET_DUTCH_DATA } from '~/store/mutation-types'

import AppToggle from '~/components/app-toggle/app-toggle'
import BarChart from '~/components/bar-chart/bar-chart'
import StackedBarChart from '~/components/stacked-bar-chart/stacked-bar-chart'


export default {
  components: {
    AppToggle,
    BarChart,
    StackedBarChart
  },
  data() {
    return {
      choice: 'compare'
    }
  },
  computed: {
    ...mapGetters({
      selectedData: 'selectedData',
      selectedDutchData: 'selectedDutchData'
    }),
  },
  async mounted() {
  }
}
</script>

<style lang="scss">
.chart-title{
  margin-top: $spacing-large;
}

bar-chart {
  overflow: hidden;
}
canvas {
  overflow: hidden;
}

</style>
