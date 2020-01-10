<template>
  <div class="product-details">
    <component :is="nameTag">{{ product.naam }}</component>
    <button
      @click="$emit('add-to-cart-click')"
      class="product-details__button"
    >
      <span class="sr-only">Voeg toe aan winkelmandje</span>
      <app-icon name="plus" />
    </button>

    <div
      v-if="amountIsActive"
      class="product-details__amount"
    >
      <button
        @click="$emit('remove-from-cart-click')"
        class="product-details__button"
      >
        <span class="sr-only">Verwijder één uit winkelmandje</span>
        <app-icon name="min" />
      </button>
      <p>{{ amount }}</p>
      <button
        @click="$emit('add-to-cart-click')"
        class="product-details__button"
      >
        <span class="sr-only">Voeg één toe aan winkelmandje</span>
        <app-icon name="plus" />
      </button>
    </div>
  </div>
</template>

<script>
  import { mapState } from 'vuex'

  import AppIcon from '../app-icon/app-icon'

  export default {
    props: {
      product: {
        type: Object,
        required: true
      },
      nameTag: {
        type: String,
        default: 'h2'
      }
    },
    computed: {
      ...mapState({
        shoppingBag: state => state.shop.shoppingBag
      }),
      amount() {
        const foundProduct = this.shoppingBag
          .find(product => product.naam === this.product.naam)

        return foundProduct.amount
      },
    }
  }
</script>

<style lang="scss">
  .product-details,
  .product-details__amount {
    display: flex;
  }
</style>
