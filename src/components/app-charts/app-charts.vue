<template>
  <div class='app-charts'>
    <app-toggle
      @compare-click='choice = 'compare''
      @see-click='choice = 'see''
    />
    <h2 class='app-charts_companyName'>{{ selectedData.naam }}</h2>
    <div class='app-charts__companyInfo'>
      <p>
        <app-icon name='location_black' />
        {{ selectedData.plaats }}
      </p>
      <p>
        <app-icon name='thuiszorg_black' />
        {{ selectedData.soortenZorg[0] }}
        {{ selectedData.soortenZorg[1] }}
        {{ selectedData.soortenZorg[2] }}
      </p>
    </div>

    <div v-if='choice === 'compare''>
      <section class='app-charts__bar'>
      <h2 class='app-charts__title'>Percentage winst</h2>
      <p>Het winstpercentage is de omzet gedeeld door de winst, keer honderd. Dit percentage maakt een zorginstelling verdacht wanneer het boven de 4% is.</p>
      <bar-chart
        v-if='selectedData && selectedDutchData'
        :selected-data='selectedData'
        :dutch-data='selectedDutchData'
        property='percentageWinst'
        title='Percentage winst'
        average='4'
      />
    </section>
    <section class='app-charts__bar'>
      <h2 class='app-charts__title'>Percentage loon</h2>
      <p>Het percentage loon is het totale aantal personeelskosten, gedeeld door
        de omzet. Een normaal percentage ligt rond de 40%.</p>
      <bar-chart
        v-if='selectedData && selectedDutchData'
        :selected-data='selectedData'
        :dutch-data='selectedDutchData'
        property='percentageLoon'
        title='Percentage loon'
        average='40'
      />
    </section>
    <section class='app-charts__bar'>
      <h2 class='app-charts__title'>Omzet per FTE</h2>
      <p>Omzet per FTE geeft aan hoeveel € omzet een full-time medewerker de zorginstelling per jaar oplevert. Het is verdacht als een zorgbedrijf een hoge FTE heeft
        aangezien de werkzaamheden in de zorgsector vaak arbeidsintensief zijn en dit proces dan ook niet veel efficiënter zal worden.</p>
      <bar-chart
        v-if='selectedData && selectedDutchData.omzetPerFte'
        :selected-data='selectedData'
        :dutch-data='selectedDutchData'
        property='omzetPerFte'
        title='Omzet per FTE'
        average='125000'
      />
      <p v-else>De omzet per FTE is alleen beschikbaar voor sommige bedrijven, in de jaren 2017 en 2018.</p>
    </section>
    </div>

    <div class ='app-charts-stacked' v-else-if='choice === 'see''>
      <h2 class='app-charts__title'>Verdeling van de omzet</h2>
      <stacked-bar-chart
        v-if='selectedData && selectedDutchData'
        :selected-data='selectedData'
        :dutch-data='selectedDutchData'
        property='omzet'
        title='Stacken met die barzz'
      />
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { SET_CARECOMPANIES, SET_DUTCH_DATA } from '~/store/mutation-types'

import AppIcon from '../app-icon/app-icon'
import AppToggle from '~/components/app-toggle/app-toggle'
import BarChart from '~/components/bar-chart/bar-chart'
import StackedBarChart from '~/components/stacked-bar-chart/stacked-bar-chart'

export default {
  components: {
    AppIcon,
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
    })
  },
}
</script>

<style lang='scss'>
.app-charts__companyName {
  margin-top: $spacing-large;
}

.app-charts__companyInfo {
  display: flex;
  padding: $spacing-tiny;
}

.app-charts__title {
}

.app-charts__bar {
  background-color: $color-white;
}

.app-charts-stacked {
 background-color: $color-white;
}
</style>
