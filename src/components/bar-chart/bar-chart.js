import { Bar } from "vue-chartjs"
import ChartJSPluginDatalabels from "chartjs-plugin-datalabels"

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
    },
    average: {
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
    // lots of variables for better readability later on
    // has to be put in computed or methods..
    let dutch = this.dutchData
    let company = this.selectedData
    let average = this.average
    let selectedProperty = this.property

    let dutchLabel = capitalize(dutch.naam)
    let companyLabel_v1 = capitalize(company.naam)
    let companyLabel = companyLabel_v1.substring(0, 8) + "..."

    let dutchValue = dutch[selectedProperty]
    let companyValue = company[selectedProperty]

    // will move this funciton to libs
    function capitalize(label) {
      return label.charAt(0).toUpperCase() + label.slice(1)
    }

    function checkProperty(datalabel) {
      if (selectedProperty === "omzetPerFte") {
        return "€" + Math.round(datalabel / 1000) + "K"
      } else {
        return Math.round(datalabel) + "%"
      }
    }

    // ugly fix because the annotations-plugin wouldn't work properly
    this.addPlugin({
      afterDraw: function(chart) {
        let lineAt = chart.config.options.lineAt
        let ctxPlugin = chart.chart.ctx
        let xAxe = chart.scales[chart.config.options.scales.xAxes[0].id]
        let yAxe = chart.scales[chart.config.options.scales.yAxes[0].id]

        ctxPlugin.strokeStyle = "#f65645"
        ctxPlugin.lineWidth = 2
        ctxPlugin.setLineDash([5, 3])

        ctxPlugin.beginPath()
        lineAt = (lineAt - yAxe.min) * (100 / yAxe.max)
        lineAt = ((100 - lineAt) / 100) * yAxe.height + yAxe.top
        ctxPlugin.moveTo(xAxe.left, lineAt)
        ctxPlugin.lineTo(xAxe.right, lineAt)
        ctxPlugin.stroke()
      }
    })

    this.renderChart(
      {
        labels: [dutchLabel, ["Normale", "bovengrens"], companyLabel],
        datasets: [
          {
            data: [dutchValue, average, companyValue],
            label: this.title,
            backgroundColor: ["#6b38e8", "rgb(246,86,69,0)", "#1beaae"],
            borderColor: ["", "", ""],
            borderWidth: [0, 0, 0]
          }
        ]
      },
      {
        plugins: {
          datalabels: {
            anchor: "end",
            align: -90,
            // offset: 8,
            textAlign: "top",
            font: {
              family: "Tenso",
              weight: 900,
              size: 22,
              color: "#1d2939"
            },
            formatter: function(value) {
              return checkProperty(value)
            }
          }
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
                display: true,
                beginAtZero: true,
                min: 0
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
                maxRotation: 0,
                fontColor: "black",
                fontFamily: "ZillaSlab",
                fontSize: 13,
                fontStyle: 600
                // will remove these comments once the labels are 'fully' fixed
                // callback: function(value, index, values) {
                //     if (values[1] === ["Normale", "bovengrens"]){
                //     }
                //
                // },
              }
            }
          ]
        },
        legend: {
          display: false
        },
        // workaround to prevent the datalabels from being cut off at y-max
        title: {
          display: true
        },
        tooltips: {
          enabled: true
        },
        maintainAspectRatio: true,
        lineAt: average
      }
    )
  }
}
