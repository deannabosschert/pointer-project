<template>
  <main>
    <bar-chart
      v-if="selectedData && selectedDutchData"
      :selected-data="selectedData"
      :dutch-data="selectedDutchData"
      property="percentageWinst"
      title="Percentage winst"
    />
    <bar-chart
      v-if="selectedData && selectedDutchData"
      :selected-data="selectedData"
      :dutch-data="selectedDutchData"
      property="percentageLoon"
      title="Percentage loon"
    />
    <bar-chart
      v-if="selectedData && selectedDutchData"
      :selected-data="selectedData"
      :dutch-data="selectedDutchData"
      property="omzetPerFte"
      title="Omzet per FTE"
    />

    <stacked-bar-chart
      v-if="selectedData && selectedDutchData"
      :selected-data="selectedData"
      :dutch-data="selectedDutchData"
      property="omzet"
      title="Stacken met die barzz"
    />
  </main>
</template>

<script>
import { mapGetters } from 'vuex'
import { SET_CARECOMPANIES, SET_DUTCH_DATA } from '~/store/mutation-types'
import BarChart from '~/components/bar-chart/bar-chart'
import StackedBarChart from '~/components/stacked-bar-chart/stacked-bar-chart'


export default {
  components: {
    BarChart,
    StackedBarChart
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
</style>
