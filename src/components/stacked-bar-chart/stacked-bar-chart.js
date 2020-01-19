import { Bar } from "vue-chartjs";
// import { Chart } from 'chart.js'
import ChartJSPluginDatalabels from "chartjs-plugin-datalabels";

export default {
  extends: Bar,
  ChartJSPluginDatalabels,
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
    Bar,
    ChartJSPluginDatalabels
  },
  computed: {
    dutchValue() {
      return this.dutchData[this.property];
    },
    selectedDataValue() {
      return this.selectedData[this.property];
    }
  },
  mounted() {
    let nederland = this.dutchData.naam;
    let bedrijf = this.selectedData.naam;

    let nederlandOmzet = this.dutchData.omzet;
    let bedrijfOmzet = this.selectedData.omzet;
    let nederlandWinst = this.dutchData.winst;
    let bedrijfWinst = this.selectedData.winst;
    let nederlandPersKosten = this.dutchData.personeelskosten;
    let bedrijfPersKosten = this.selectedData.personeelskosten;

    let nederlandPercWinst = this.dutchData.percentageWinst;
    let bedrijfPercWinst = this.selectedData.percentageWinst;

    let nederlandPercLoon = this.dutchData.percentageLoon;
    let bedrijfPercLoon = this.selectedData.percentageLoon;

    let nederlandOverig = nederlandOmzet - nederlandPersKosten - nederlandWinst;
    let bedrijfOverig = bedrijfOmzet - bedrijfPersKosten - bedrijfWinst;

    console.log(this.selectedData);
    console.log(this.dutchData);

    let nederlandO = "test";

    let nederlandPercOverig = 100 - nederlandPercLoon - nederlandPercWinst;
    let bedrijfPercOverig = 100 - bedrijfPercLoon - bedrijfPercWinst;

    Chart.defaults.global.defaultFontColor = "#1d2939";
    Chart.defaults.global.defaultFontFamily = "ZillaSlab";
    Chart.defaults.global.defaultFontSize = 16;
    Chart.defaults.global.defaultFontWeight = 600;

    this.renderChart(
      {
        labels: [nederland, bedrijf],
        datasets: [
          {
            type: "bar",
            label: "Winstpercentage",
            backgroundColor: "#faff2e",
            data: [nederlandPercWinst, bedrijfPercWinst]
          },
          {
            type: "bar",
            label: "Overige kosten",
            backgroundColor: "#1beaae",
            datalabels: {
              // color: ['#FFCE56', '#d8cedb'],
              formatter: function(value) {
                return Math.round(value) + "%";
              }
            },
            data: [nederlandPercOverig, bedrijfPercOverig]
          },
          {
            type: "bar",
            label: "Personeelskosten",
            backgroundColor: "#d8cedb",
            // datalabels: {
            //   label:{
            //    // color: ['#FFCE56', '#d8cedb'],
            //    formatter: function(value) {
            //      return Math.round(value) + "yeet"
            //    }
            //  }},
            data: [nederlandPercLoon, bedrijfPercLoon]
          }
        ]
      },
      {
        plugins: {
          datalabels: {
            textAlign: "center",
            font: {
              family: "Tenso",
              weight: 900,
              size: 18
            },
            labels: [
              {
                render: nederland,

              },
              {
                render: bedrijf
              }
            ]
          }
        },
        // hover: {
        //   animationDuration: 1
        // },
        // animation: {
        //   duration: 1,
        //   onComplete: function() {
        //     var chartInstance = this.chart,
        //     ctx = chartInstance.ctx
        //     ctx.textAlign = "center"
        //     ctx.fillStyle = "rgba(29,41,57,1)"
        //     ctx.textBaseline = "bottom"
        //     ctx.font = "900 18px Tenso"
        //
        //
        //     this.data.datasets.forEach(function(dataset, i) {
        //       var meta = chartInstance.controller.getDatasetMeta(i)
        //       meta.data.forEach(function(bar, index) {
        //         var data = dataset.data[index]
        //         ctx.fillText(data, bar._model.x, bar._model.y - 5)
        //       })
        //     })
        //   }
        // },
        responsive: true,
        scales: {
          yAxes: [
            {
              display: false,
              stacked: true,
              gridLines: {
                display: false
              },
              ticks: {
                // max: Math.max(... data) + 10,
                display: false,
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
        //        layout: {
        //    padding: {
        //        left: 0,
        //        right: 0,
        //        top: 100,
        //        bottom: 0
        //    }
        // },
        tooltips: {
          enabled: true
        },
        maintainAspectRatio: false,
        height: 200
      }
    );
  }
};
