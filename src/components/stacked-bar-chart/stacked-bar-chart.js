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

    let dutchOmzet = dutch.omzet
    let companyOmzet = company.omzet

    let dutchProfit = dutch.winst
    let companyProfit = company.winst

    let dutchstaffCosts = dutch.personeelskosten
    let companystaffCosts = company.personeelskosten

    let dutchProfitP = dutch.percentageWinst
    let companyProfitP = company.percentageWinst

    let dutchStaffCostsP = dutch.percentageLoon
    let companyStaffCostsP = company.percentageLoon

    let dutchOverig = dutchOmzet - dutchstaffCosts - dutchProfit
    let companyOverig = companyOmzet - companystaffCosts - companyProfit

    let dutchOverigP = 100 - dutchStaffCostsP - dutchProfitP
    let companyOverigP = 100 - companyStaffCostsP - companyProfitP

    Chart.defaults.global.defaultFontColor = "#1d2939"
    Chart.defaults.global.defaultFontFamily = "ZillaSlab"
    Chart.defaults.global.defaultFontSize = 16
    Chart.defaults.global.defaultFontWeight = 600

    function capitalize(label) {
      return label.charAt(0).toUpperCase() + label.slice(1)
    }

    this.renderChart(
      {
        labels: [dutchLabel, companyLabel],
        datasets: [
          {
            type: "bar",
            label: "Winst",
            backgroundColor: "#faff2e",
            borderWidth: 5,
            borderColor: "#F2F2F2",
            data: [dutchProfitP, companyProfitP]
          },
          {
            type: "bar",
            label: "Overige kosten",
            backgroundColor: "#1beaae",
            borderWidth: 5,
            borderColor: "#F2F2F2",
            datalabels: {
              // color: ['#FFCE56', '#d8cedb'],
            },
            data: [dutchOverigP, companyOverigP]
          },
          {
            type: "bar",
            label: "Personeelskosten",
            backgroundColor: "#d8cedb",
            borderWidth: 5,
            borderColor: "#F2F2F2",
            // datalabels: {
            //   label:{
            //    // color: ['#FFCE56', '#d8cedb'],
            //    formatter: function(value) {
            //      return Math.round(value) + "yeet"
            //    }
            //  }},
            data: [dutchStaffCostsP, companyStaffCostsP]
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
              size: 18,
              color: "black"
            },
            formatter: function(value) {
              return Math.round(value) + "%"
            }
          }
        },
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
                display: true,
                maxRotation: 0
              }
            }
          ]
        },
        legend: {
          display: true
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
        maintainAspectRatio: true,
      }
    )
  }
}
