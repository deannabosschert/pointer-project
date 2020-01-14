<template>
  <table class="app-table">
    <thead class="app-table__header">
      <tr>
        <th><abbr title="Aantal">Aant.</abbr></th>
        <th>Omschrijving</th>
        <th>Prijs</th>
      </tr>
    </thead>
    <tbody class="app-table__body">
      <tr
        v-for="product in products"
        :key="product.naam"
      >
        <td>{{ product.amount }}</td>
        <td>{{ product.naam }}</td>
        <td>{{ product.prijs }}</td>
      </tr>
    </tbody>
    <tfoot class="app-table__footer">
      <tr>
        <td>Totaal:</td>
        <td>{{ total }}</td>
      </tr>
    </tfoot>
  </table>
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

</style>
