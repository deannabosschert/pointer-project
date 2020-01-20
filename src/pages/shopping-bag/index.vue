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

    <button
      @click="redirectToCart"
      class="button"
      :disabled="!correctedShoppingBag.length"
    >
      Afrekenen
    </button>
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
    },
    methods: {
      redirectToCart() {
        return this.$router.push({
          path: '/cart'
        })
      }
    },
    head() {
      return {
        htmlAttrs: {
          class: 'is-shopping-bag-page'
        }
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

  .shopping-bag-page .button + .button {
    margin-top: $spacing-small;
  }

  // Don't look disabled when in the shopping bag
  .shopping-bag-page .product-card--is-disabled .product-card__image {
    filter: blur(0);
  }

  .shopping-bag-page .product-card--is-disabled .product-card__price {
    opacity: 1;
  }

  .is-shopping-bag-page .app-header__button--search {
    display: none;
  }

  .is-shopping-bag-page .app-header__button--shop {
    display: block;
  }
</style>
