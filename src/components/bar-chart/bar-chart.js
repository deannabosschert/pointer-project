import { Bar } from 'vue-chartjs'

export default {
  extends: Bar,
  props: {
    data: ['data', 'options'],
    selectedData: {
      type: Object,
      required: true
    },
    dutchData: {
      type: Object,
      required: true
    },
    property: {
      type: String,
      required: true
    },
    title: {
      type: String,
      required: true
    }
  },
  components: {
    Bar
  },
  computed: {
    dutchValue() {
      return this.dutchData[this.property]
    },
    selectedDataValue() {
      return this.selectedData[this.property]
    }
  },
  mounted() {
    let nederlandL = this.dutchData.naam
    let bedrijfL = this.selectedData.naam


    let nederlandV = this.dutchData.percentageWinst
    let gemiddeldV = 5
    let bedrijfV = this.selectedData.percentageWinst

    this.renderChart({
      labels: [nederlandL, 'gemiddeld', bedrijfL],
      datasets: [
        {
          label: 'GitHub Commits',
          backgroundColor: '#f87979',
          data: [nederlandV, gemiddeldV, bedrijfV]
        }
      ]
    })
  }
}
