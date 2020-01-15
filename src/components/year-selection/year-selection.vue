<template>
  <form class="year-selection">
    <label
      for="year-selection"
      class="sr-only"
    >
      Kies een jaar
    </label>
    <select
      id="year-selection"
      @change="setSelectedData"
    >
      <option
        v-if="!hasYearResults"
        disabled
        selected
      >
        2019
      </option>

      <option
        v-else
        v-for="year in years"
        :key="year"
        :value="year"
        :selected="year === lastYear"
      >
        {{ year }}
      </option>
    </select>
  </form>
</template>

<script>
  import { mapGetters } from 'vuex'
  import { SET_SELECTED_DATA, SET_SELECTED_DUTCH_DATA } from '~/store/mutation-types'

  export default {
    props: {
      selectedCompany: {
        type: Object,
        default: null
      },
      dutchData: {
        type: Object,
        default: null
      }
    },
    computed: {
      years() {
        return this.hasYearResults
          && typeof this.selectedCompany.jaarVerslagen === 'object'
          && Object.keys(this.selectedCompany.jaarVerslagen)
      },
      hasYearResults() {
        return this.selectedCompany
          && this.selectedCompany.hasOwnProperty('jaarVerslagen')
      },
      lastYear() {
        return this.years[this.years.length - 1]
      }
    },
    methods: {
      setSelectedData(event) {
        const year = event.target.value

        this.$store.commit(SET_SELECTED_DATA, {
          selectedData: this.selectedCompany.jaarVerslagen[year]
        })

        this.$store.commit(SET_SELECTED_DUTCH_DATA, {
          data: this.dutchData[year]
        })
      }
    }
  }
</script>

<style lang="scss">

</style>
