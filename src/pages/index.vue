<template>
  <main class="shop-page">
    <h1>This is the shop</h1>
    <product-list :products="shopItems" />
    <nuxt-link to="/stats">Bekijk de cijfers</nuxt-link>
  </main>
</template>

<script>
  import { mapState } from 'vuex'

  import ProductList from '~/components/product-list/product-list'

  export default {
    components: {
      ProductList
    },
    computed: {
      ...mapState({
        shopItems: state => state.shop.shopItems
      })
    }
  }
</script>
