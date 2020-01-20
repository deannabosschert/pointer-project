<template>
  <main class="shop-page">
    <h1 class="sr-only">Shop met de winst</h1>
    <p
      v-if="selectedData"
      class="shop-page__intro-text"
    >
      Wat koop jij met de winst van <span>{{ selectedData.naam }}</span>?
    </p>
    <p class="shop-page__budget" v-if="selectedData">
      <span class="shop-page__budget-intro">Jouw budget:</span>
      <span class="shop-page__budget-budget">€{{ formattedBudget }}</span>
    </p>
    <product-list :products="shopItems" />
    <nuxt-link
      to="/shopping-bag"
      class="button"
    >
      Naar winkelmandje
    </nuxt-link>
    <button
      @click="redirectToCart"
      class="button button--secondary"
      :disabled="!shoppingBagItemsQuantity"
    >
      Afrekenen
    </button>
  </main>
</template>

<script>
  import { SET_SUBSTITUTE_ITEMS } from '~/store/mutation-types'
  import { mapState, mapGetters } from 'vuex'

  import AppCart from '~/components/app-cart/app-cart'
  import ProductList from '~/components/product-list/product-list'

  export default {
    components: {
      AppCart,
      ProductList
    },
    data() {
      return {
        cartIsOpen: false
      }
    },
    computed: {
      ...mapGetters({
        selectedData: 'selectedData',
        shoppingBagItemsQuantity: 'shop/shoppingBagItemsQuantity',
        shoppingBagTotalPrice: 'shop/shoppingBagTotalPrice',
        budget: 'budget'
      }),
      ...mapState({
        shopItems: state => state.shop.shopItems
      }),
      formattedBudget() {
        return this.budget.toLocaleString()
      }
    },
    methods: {
      redirectToCart() {
        this.$store.commit(`shop/${SET_SUBSTITUTE_ITEMS}`, { total: this.shoppingBagTotalPrice })

        this.$router.push({
          path: '/cart'
        })
      }
    },
    head() {
      /*
        We have to swap around the icons in the header,
        therefore we add a `is-shop-page` to the html and
        fix it in the scss.
      */
      return {
        htmlAttrs: {
          class: 'is-shop-page'
        }
      }
    }
  }
</script>

<style lang="scss">
  .shop-page {
    padding: $spacing-small $spacing-medium;
  }

  .shop-page__intro-text {
    margin-bottom: $spacing-small;
    text-align: center;

    & > span {
      text-transform: capitalize;
    }
  }

  .shop-page__budget {
    display: flex;
    flex-direction: column;
    margin-bottom: $spacing-default;
    text-align: center;
    font-family: $font-stack-headings;
  }

  .shop-page__budget-intro {
    font-size: $font-size-medium;
  }

  .shop-page__budget-budget {
    font-size: $font-size-large;
    font-weight: $font-weight-bold;
  }

  .shop-page .product-list {
    margin-bottom: $spacing-large;
  }

  .shop-page .button {
    margin-bottom: $spacing-small;
  }

  // Swap search icon with shop icon with counter
  .is-shop-page .app-header__button--search {
    display: none;
  }

  .is-shop-page .app-header__button--shop {
    display: block;
  }
</style>
