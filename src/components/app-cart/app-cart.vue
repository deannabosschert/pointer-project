<template>
  <aside class="app-cart">
    <header class="app-cart__header">
      <h2 class="app-cart__title">
        <span class="sr-only">Bonnetje van: </span>
        Selected company name
      </h2>
      <p class="app-cart__place">Plaats</p>
      <ul class="app-cart__caretypes">
        <li>Soort zorg</li>
      </ul>
    </header>

    <p class="app-cart__date">{{ formattedDate }}</p>
    <p class="app-cart__payment-company">Company name</p>

    <app-table :products="shoppingBagProducts" />

    <h3 class="app-cart__title--special">Wow hiervan zou je ook...</h3>
    <app-table :products="substituteProducts" />

    <p class="app-cart__title--special">... kunnen betalen</p>

    <app-socials />
  </aside>
</template>

<script>
  import { mapState } from 'vuex'

  import CartTable from '../cart-table/cart-table'
  import AppSocials from '../app-socials/app-socials'

  export default {
    components: {
      CartTable,
      AppSocials
    },
    computed: {
      ...mapState({
        selectedCompany: state => state.selectedCompany
      })
    }
  }
</script>

<style lang="scss">

</style>
