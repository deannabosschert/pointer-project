<template>
  <main class="shopping-bag-page">
    <h1 class="shopping-bag-page__title">Jouw winkelmandje</h1>

    <product-list
      v-if="correctedShoppingBag.length"
      :products="correctedShoppingBag"
    />

    <div
      v-else
      class="shopping-bag-page__sad-message"
    >
      <p>Je hebt nog geen producten in je winkelmandje :(</p>
      <p>Ga naar de webshop om producten in je winkelmandje te stoppen</p>
    </div>

    <nuxt-link
      to="/cart"
      class="button"
      :disabled="!correctedShoppingBag.length"
      @click="openCart"
    >
      Afrekenen
    </nuxt-link>
    <nuxt-link
      to="/shop"
      class="button button--secondary"
    >
      Naar webshop
    </nuxt-link>
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
        shoppingBag: state => state.shop.shoppingBag
      }),
      correctedShoppingBag() {
        return Object.entries(this.shoppingBag).map(([key, value]) => {
          return { naam: key, ...value }
        })
      }
    }
  }
</script>

<style lang="scss">
  .shopping-bag-page {
    padding: $spacing-small $spacing-medium;
  }

  .shopping-bag-page__title {
    text-align: center;
    font-size: $font-size-large;
    margin-bottom: $spacing-medium;
  }

  .shopping-bag-page__sad-message {
    text-align: center;
    margin-bottom: $spacing-medium;
  }
</style>
