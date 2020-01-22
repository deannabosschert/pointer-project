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
    const dutch = this.dutchData
    const company = this.selectedData
    const average = this.average
    const selectedProperty = this.property

    const companyLabel_v1 = uppercaseFirstLetter(company.naam)
    const companyLabel = companyLabel_v1.substring(0, 8) + '...'
    const DUTCH_LABEL = 'Hoe hoort het?'

    const dutchOmzet = dutch.omzet
    const companyOmzet = company.omzet

    const dutchProfit = dutch.winst
    const companyProfit = company.winst

    const dutchstaffCosts = dutch.personeelskosten
    const companystaffCosts = company.personeelskosten

    const dutchProfitPercentage = dutch.percentageWinst
    const companyProfitPercentage = company.percentageWinst

    const dutchStaffCostsP = dutch.percentageLoon
    const companyStaffCostsP = company.percentageLoon

    const dutchOverigP = 100 - dutchStaffCostsP - dutchProfitPercentage
    const companyOverigP = 100 - companyStaffCostsP - companyProfitPercentage

    const colorDarkest = '#1D2939'
    const colorHighlightYellow = '#FAFF2E'
    const colorHighlightRed = '#F65645'
    const colorHighlightGreen = '#1BEAAE'
    const colorWhite = '#fff'

    const numberFont = 'Tenso'
    const labelFont = 'ZillaSlab'

    this.renderChart(
      {
        labels:[DUTCH_LABEL, companyLabel],
        datasets: [
          {
            type: 'bar',
            label: 'Winst',
            backgroundColor: colorHighlightYellow,
            borderWidth: 7,
            borderColor: colorWhite,
            data: [dutchProfitPercentage, companyProfitPercentage]
          },
          {
            type: 'bar',
            label: 'Overige kosten',
            backgroundColor: colorHighlightGreen,
            borderWidth: 7,
            borderColor: colorWhite,
            datalabels: {
            },
            data: [dutchOverigP, companyOverigP]
          },
          {
            type: 'bar',
            label: 'Personeelskosten',
            backgroundColor: '#d8cedb',
            borderWidth: 7,
            borderColor: colorWhite,
            // datalabels: {
            //   label:{
            //    // color: ['#FFCE56', '#d8cedb'],
            //    formatter: function(value) {
            //      return Math.round(value) + 'yeet'
            //    }
            //  }},
            data: [dutchStaffCostsP, companyStaffCostsP]
          }
        ]
      },
      {
        plugins: {
          datalabels: {
            textAlign: 'center',
            font: {
              family: numberFont,
              weight: 900,
              size: 18,
              color: colorDarkest
            },
            formatter: value => {
              return Math.round(value) + '%'
            }
          }
        },
        responsive: true,
        scales: {
          yAxes: [
            {
              display: false,
              stacked: true,
              margin: 30,
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
              position: 'top',
              stacked: true,
              gridLines: {
              display: false,
              fontFamily: labelFont,
              fontSize: 16,
              fontStyle: 600
              },
              ticks: {
                beginAtZero: true,
                display: true,
                maxRotation: 0
              }
            }
          ]
        },
        // trying to have them displayed as columns
        legend: {
          display: true,
          position: 'bottom',
          fullWidth: true,
          fontFamily: 'labelFont',
          fontSize: 16,
          fontStyle: 600
          // type: 'column',
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

    function uppercaseFirstLetter(label) {
      return label.charAt(0).toUpperCase() + label.slice(1)
    }
  }
}
