import { Bar } from "vue-chartjs"

export default {
  extends: Bar,
  props: {
    data: ["data", "options"],
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

    console.log(this.selectedData)

    this.renderChart({
      labels: [nederlandL, "gemiddeld", bedrijfL],
      datasets: [
        {
          label: "Winstpercentage",
          backgroundColor: ["#1beaae", "rgba(255, 255, 255, 0)", "#6b38e8"],
          borderColor: [
        '',
        '#f65645',
        ''
      ],
    borderWidth: [0, 2, 0],
          data: [nederlandV, gemiddeldV, bedrijfV]
        }
      ],

    })
  }
}
