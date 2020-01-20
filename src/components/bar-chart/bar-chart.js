import { Bar } from "vue-chartjs"
import ChartJSPluginDatalabels from "chartjs-plugin-datalabels"
import ChartJSPluginAnnotation from "chartjs-plugin-annotation"

export default {
  extends: Bar, ChartJSPluginDatalabels, ChartJSPluginAnnotation,
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
    Bar, ChartJSPluginDatalabels, ChartJSPluginAnnotation
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

    let nederland = this.dutchData.naam
    let bedrijf = this.selectedData.naam

    let nederlandV = this.dutchData[this.property]
    let gemiddeldV = 5
    let bedrijfV = this.selectedData[this.property]

    let selectedProperty = this.property


    function checkProperty(value) {
      if (selectedProperty === 'omzetPerFte'){
        return "€" + Math.round(value/1000) + "K"
      }
      else {
        return Math.round(value) +  "%"
      }

    }

    this.renderChart(
      {
        labels: [nederland, bedrijf],
        datasets: [
          {
            data: [nederlandV, bedrijfV],
            label: "Winstpercentage",
            backgroundColor: ["#6b38e8", "#1beaae"],
            borderColor: ["", ""],
            borderWidth: [0, 0]
          }
        ]
      },
      {
        plugins: {
          datalabels: {
            anchor: 'end',
            align: -90,
            // offset: 8,
            textAlign: "top",
            font: {
              family: "Tenso",
              weight: 900,
              size: 18,
              color: "black"
            },
            formatter: function(value) {
              return checkProperty(value)
            },
            color: "black"
          },
          annotation: {
       annotations: [{
           type: 'line',
           mode: 'horizontal',
           scaleID: 'y-axis-0',
           value: '2',
           borderColor: '#f65645',
           borderWidth: 1
       }],
       drawTime: "afterDraw" // (default)
   },
        },
        responsive: true,
        scales: {
          yAxes: [
            {
              display: false,
              gridLines: {
                display: false
              },
              ticks: {
                // max: Math.max(... [nederlandV, bedrijfV]) + 20,
                display: true,
                beginAtZero: true
              }
            }
          ],
          xAxes: [
            {
              gridLines: {
                display: false
              },
              ticks: {
                beginAtZero: true,
                display: true,
                maxRotation: 0

              }
            }
          ]
        },
        legend: {
          display: false
        },
        title:{
          display: true
        },
        tooltips: {
          enabled: true
        },
        maintainAspectRatio: true,
        height: 200
      }
    )
  }
}
