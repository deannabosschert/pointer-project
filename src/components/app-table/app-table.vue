<template>
  <section class="app-table">
    <header class="app-table__header">
      <div class="app-table__row">
        <p class="app-table__cell"><abbr title="Aantal">Aant.</abbr></p>
        <p class="app-table__cell">Omschrijving</p>
        <p class="app-table__cell app-table__cell--right">Prijs</p>
      </div>
    </header>
    <div class="app-table__body">
      <div
        class="app-table__row"
        v-for="product in products"
        :key="product.naam"
      >
        <p class="app-table__cell app-table__cell--right">{{ product.amount }}</p>
        <p class="app-table__cell">{{ product.naam }}</p>
        <p class="app-table__cell app-table__cell--right">€{{ product.prijs.toLocaleString() }}</p>
      </div>
    </div>
    <footer
      v-if="total"
      class="app-table__footer"
    >
      <div class="app-table__row app-table__row--highlighted">
        <p class="app-table__cell">Totaal:</p>
        <p class="app-table__cell app-table__cell--right">€{{ total.toLocaleString() }}</p>
      </div>
    </footer>
  </section>
</template>

<script>
  export default {
    props: {
      products: {
        type: Array,
        required: true
      },
      total: {
        type: Number,
        required: true
      }
    },
  }
</script>

<style lang="scss">
  .app-table {
    display: block;
  }

  .app-table__header {
    border-bottom: 2px dashed $color-darkest;
  }

  .app-table__row {
    display: flex;
    justify-content: space-between;
  }

  .app-table__row--highlighted {
    background: rgba($color-highlight-yellow, .67);
    padding: 0 $spacing-default;
    text-transform: uppercase;
    font-weight: $font-weight-bold;
  }

  .app-table__cell + .app-table__cell {
    margin-top: 0;
  }

  .app-table__cell {
    display: flex;
    width: 50%;
    padding: $spacing-tiny 0;
    margin-right: $spacing-small;
  }

  .app-table__row .app-table__cell:last-child {
    margin-right: 0;
  }

  .app-table__row .app-table__cell:first-child {
    width: 25%;
  }

  .app-table__cell--right {
    justify-content: flex-end;
  }
</style>
