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
    let nederland = this.dutchData.naam
    let bedrijf = this.selectedData.naam

    let nederlandWinst = this.dutchData.percentageWinst
    let bedrijfWinst = this.selectedData.percentageWinst

    let nederlandPercentageLoon = this.dutchData.percentageLoon
    let bedrijfPercentageLoon = this.selectedData.percentageLoon

    

    this.renderChart(
      {
        labels: [nederland, bedrijf],
        datasets: [
          {
            type: 'bar',
            label: 'Winstpercentage',
            backgroundColor: '#faff2e',
            data: [nederlandWinst, bedrijfWinst]
          },
          {
            type: 'bar',
            label: 'Personeelskosten',
            backgroundColor: '#d8cedb',
            data: [nederlandPercentageLoon, bedrijfPercentageLoon]
          }
        ]



      },
      {
        hover: {
          animationDuration: 1
        },
        animation: {
          duration: 1,
          onComplete: function() {
            var chartInstance = this.chart,
              ctx = chartInstance.ctx
            ctx.textAlign = "center"
            ctx.fillStyle = "rgba(0, 0, 0, 1)"
            ctx.textBaseline = "bottom"

            this.data.datasets.forEach(function(dataset, i) {
              var meta = chartInstance.controller.getDatasetMeta(i)
              meta.data.forEach(function(bar, index) {
                var data = dataset.data[index]
                ctx.fillText(data, bar._model.x, bar._model.y - 5)
              })
            })
          }
        },
        responsive: true,
        scales: {
          yAxes: [
            {
              display: true,
              stacked: true,
              gridLines: {
                display: true
              },
              ticks: {
                // max: Math.max(... datasets[0].data) + 10,
                display: true,
                beginAtZero: true
              }
            }
          ],
          xAxes: [
            {
              stacked: true,
              gridLines: {
                display: false
              },
              ticks: {
                beginAtZero: true,
                display: true
              }
            }
          ]
        },
        legend: {
          display: false
        },
        tooltips: {
          enabled: true
        },
        maintainAspectRatio: false,
        height: 200
      }
    )
  }
}
