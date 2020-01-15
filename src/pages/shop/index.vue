<template>
  <main class="shop-page">
    <h1>This is the shop</h1>
    <app-cart />
    <product-list :products="shopItems" />
    <nuxt-link to="/stats">Bekijk de cijfers</nuxt-link>
  </main>
</template>

<script>
  import { mapState } from 'vuex'

  import AppCart from '~/components/app-cart/app-cart'
  import ProductList from '~/components/product-list/product-list'

  export default {
    components: {
      AppCart,
      ProductList
    },
    computed: {
      ...mapState({
        shopItems: state => state.shop.shopItems
      })
    }
  }
</script>
