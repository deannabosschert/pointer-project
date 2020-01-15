<template>
  <section class="bar-chart">
    <h2>{{ title }}</h2>
    <pre>
      {{dutchValue}}
      {{selectedDataValue}}
    </pre>
  </section>
</template>

<script>
  export default {
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
    computed: {
      dutchValue() {
        return this.dutchData[this.property]
      },
      selectedDataValue() {
        return this.selectedData[this.property]
      }
    }
  }
</script>

<style lang='scss'>
  .bar-chart {
    width: 100%;
  }
</style>
