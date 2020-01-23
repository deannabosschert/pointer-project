import { Bar } from 'vue-chartjs'
import ChartJSPluginDatalabels from 'chartjs-plugin-datalabels'

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
    },
    averageLabel: {
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
    const colorHighlightRed = '#F65645'

    // ugly fix because the annotations-plugin wouldn't work properly
    this.addPlugin({
      afterDraw: function(chart) {
        let lineAt = chart.config.options.lineAt
        let ctxPlugin = chart.chart.ctx
        let xAxe = chart.scales[chart.config.options.scales.xAxes[0].id]
        let yAxe = chart.scales[chart.config.options.scales.yAxes[0].id]

        ctxPlugin.strokeStyle = colorHighlightRed
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

    this.renderBarChart()
  },
  methods: {
    renderBarChart() {
      // lots of variables for better readability later on
      // has to be put in computed or methods..
      let dutch = this.dutchData
      let company = this.selectedData
      let average = this.average
      let selectedProperty = this.property

      let averageLabel = capitalize(this.averageLabel)
      let dutchLabel = capitalize(dutch.naam)
      let companyLabel_v1 = capitalize(company.naam)
      let companyLabel = companyLabel_v1.substring(0, 8) + '...'

      let dutchValue = dutch[selectedProperty]
      let companyValue = company[selectedProperty]

      const colorDarkest = '#1D2939'
      const colorHighlightGreen = '#1BEAAE'
      const colorHighlightPurple = '#6b38e8'
      const colorHighlightYellow = '#FAFF2E'
      const colorWhite = '#fff'

      const numberFont = 'Tenso'
      const labelFont = 'ZillaSlab'

      this.renderChart(
        {
          labels: [dutchLabel, ['Normale', averageLabel], companyLabel],
          datasets: [
            {
              data: [dutchValue, average, companyValue],
              label: this.title,
              backgroundColor: [colorHighlightPurple, 'rgb(246,86,69,0)', colorHighlightGreen],
              borderColor: ['', '', ''],
              borderWidth: [0, 0, 0]
            }
          ]
        },
        {
          plugins: {
            datalabels: {
              anchor: 'end',
              align: -90,
              // offset: 8,
              textAlign: 'top',
              font: {
                family: numberFont,
                weight: 900,
                size: 22,
                color: colorDarkest
              },
              formatter: (value) => {
                return checkProperty(value, selectedProperty)
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
                  fontColor: 'black',
                  fontFamily: labelFont,
                  fontSize: 13,
                  fontStyle: 600
                  // will remove these comments once the labels are 'fully' fixed
                  // callback: function(value, index, values) {
                  //     if (values[1] === ['Normale', 'bovengrens']){
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
          // TODO: add function at y-axis-options, stating that the min-height is Math.max([data]) + 5
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
  },
  watch: {
    selectedData() {
      this.renderBarChart()
    }
  }
}

function checkProperty(datalabel, selectedProperty) {
  if (selectedProperty === 'omzetPerFte') {
    const abbrNumberThousand = Math.round(datalabel / 1000)
    return '€' + abbrNumberThousand + 'K'
  } else {
    // multiplied by 100 to prevent Math.round from filtering out the decimals beforehand
    const roundedPercentage = Math.round(datalabel*100)/100
    const fixedPercentage = roundedPercentage.toFixed(1)
    return fixedPercentage + '%'
  }
}


// will move this funciton to libs (Deanna)
function capitalize(label) {
  return label.charAt(0).toUpperCase() + label.slice(1)
}
