<template>
  <section class="yeet">
    <h2>{{ title }}</h2>
    <pre>
      {{dutchValue}}
      {{selectedDataValue}}
    </pre>
    <bar-chart></bar-chart>
  </section>
</template>

<script>
import { Bar } from 'vue-chartjs'

  export default {
    extends: Bar,
    props: {
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
    mounted () {
      // Overwriting base render method with actual data.
      this.renderChart({
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
        datasets: [
          {
            label: 'GitHub Commits',
            backgroundColor: '#f87979',
            data: [40, 20, 12, 39, 10, 40, 39, 80, 40, 20, 12, 11]
          }
        ]
      })
    }
  }
</script>

<style lang='scss'>
  .yeet {
    width: 100%;
  }
</style>
