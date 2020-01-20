<template>
  <div class="product-details">
    <h2 class="product-details__title">{{ product.naam }}</h2>
    <button
      :disabled="!hasEnoughBudget"
      @click="$emit('add-to-cart-click')"
      class="product-details__button"
    >
      <span class="sr-only">Voeg toe aan winkelmandje</span>
      <app-icon :name="addToCartIcon" />
    </button>

    <div
      v-if="amount > 0"
      class="product-details__controls"
    >
      <button
        @click="$emit('remove-from-cart-click')"
        class="product-details__button"
      >
        <span class="sr-only">Verwijder één uit winkelmandje</span>
        <app-icon name="min_white" />
      </button>
      <p class="product-details__amount">{{ amount || 'onbekend' }}</p>
      <button
        @click="$emit('add-to-cart-click')"
        class="product-details__button"
        :disabled="!hasEnoughBudget"
      >
        <span class="sr-only">Voeg één toe aan winkelmandje</span>
        <app-icon :name="addToCartIcon" />
      </button>
    </div>
  </div>
</template>

<script>
  import AppIcon from '../app-icon/app-icon'

  export default {
    components: {
      AppIcon
    },
    props: {
      product: {
        type: Object,
        required: true
      },
      amount: {
        type: Number,
        default: 0
      },
      budget: {
        type: Number,
        required: true
      }
    },
    computed: {
      hasEnoughBudget() {
        return this.budget > this.product.prijs
      },
      addToCartIcon() {
        return this.hasEnoughBudget ? 'plus_white' : 'cross_white'
      }
    }
  }
</script>

<style lang="scss">
  $product-details-height: 36px;

  .product-details,
  .product-details__controls {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: $spacing-small;
    background: $color-white;
    color: $color-darkest;
  }

  .product-details {
    position: relative;
  }

  .product-details__controls {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: rgba($color-white, .8);
  }

  .product-details__amount {
    background: $color-gray;
    color: $color-darkest;
    height: 100%;
    min-width: 45px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .product-details__title {
    font-family: $font-stack-body;
    font-size: $font-size-default;
    font-weight: $font-weight-default;
  }

  .product-details__button {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 1.5em;
    width: 1.5em;
    border-radius: 50%;
    font-size: $font-size-default;
    background: $color-darkest;
  }
</style>
