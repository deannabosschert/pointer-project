import { Bar } from "vue-chartjs"
import ChartJSPluginDatalabels from "chartjs-plugin-datalabels"
import ChartJSPluginAnnotation from "chartjs-plugin-annotation"

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
    gemiddelde: {
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
    // this.addPlugin toevoegen voor plugin met de annotations
    this.addPlugin({
      id: "horizontalLine",
      afterDraw: function(chart) {
        if (typeof chart.config.options.lineAt != "undefined") {
          var lineAt = chart.config.options.lineAt
          var ctxPlugin = chart.chart.ctx
          var xAxe = chart.scales[chart.config.options.scales.xAxes[0].id]
          var yAxe = chart.scales[chart.config.options.scales.yAxes[0].id]

          if (yAxe.min != 0) return

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
      }
    })

    let nederland = this.dutchData.naam
    let bedrijf = this.selectedData.naam

    let nederlandV = this.dutchData[this.property]
    let gemiddeldV = 5
    let bedrijfV = this.selectedData[this.property]

    let selectedProperty = this.property
    let gemiddelde = this.gemiddelde

    function checkProperty(value) {
      if (selectedProperty === "omzetPerFte") {
        return "€" + Math.round(value / 1000) + "K"
      } else {
        return Math.round(value) + "%"
      }
    }

    this.renderChart(
      {
        labels: [nederland, bedrijf],
        datasets: [
          {
            data: [nederlandV, bedrijfV],
            label: this.title,
            backgroundColor: ["#6b38e8", "#1beaae"],
            borderColor: ["", ""],
            borderWidth: [0, 0]
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
              size: 18,
              color: "black"
            },
            formatter: function(value) {
              return checkProperty(value)
            },
            color: "black"
          }
          // annotation: {
          //   annotations: [
          //     {
          //       drawTime: "afterDatasetsDraw",
          //       id: "hline",
          //       type: "line",
          //       mode: "horizontal",
          //       scaleID: "y-axis-0",
          //       value: 45,
          //       borderColor: "red",
          //       borderWidth: 2,
          //       borderDash: [2, 2],
          //       label: {
          //         fontColor: "red",
          //         content: "Normale bovengrens",
          //         enabled: true
          //       },
          //     },
          //   ]
          // }
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
                maxRotation: 0
              }
            }
          ]
        },
        legend: {
          display: false
        },
        title: {
          display: true
        },
        tooltips: {
          enabled: true
          // mode: 'index',
          // intersect: true
        },
        maintainAspectRatio: true,
        lineAt: gemiddelde,
        height: 200
      }
    )
  }
}
