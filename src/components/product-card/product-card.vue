<template>
  <div class="product-card">
    <figure class="product-card__image-container">
      <fixed-ratio :height="1" :width="1">
        <img
          :src="product.mediaLink"
          :alt="product.naam"
          class="product-card__image"
        >
      </fixed-ratio>
      <figcaption class="product-card__price">
        <dl>
          <dt class="sr-only">Prijs:</dt>
          <dd>{{ formattedPrice }}</dd>
        </dl>
      </figcaption>
    </figure>
    <product-details :product="product" />
  </div>
</template>

<script>
  import FixedRatio from '../fixed-ratio/fixed-ratio'
  import ProductDetails from '../product-details/product-details'

  export default {
    components: {
      FixedRatio,
      ProductDetails
    },
    props: {
      product: {
        type: Object,
        required: true
      }
    },
    computed: {
      ...mapState({
        shoppingBag: state => state.shop.shoppingBag
      }),
      formattedPrice() {
        return `${this.product.prijs.toLocaleString()} EUR`
      },
      amount() {
        const foundProduct = this.shoppingBag.find(product => {
          return product.naam === this.product.naam
        })

        return foundProduct && foundProduct.amount
      }
    },
      }
    }
  }
</script>

<style lang="scss">
  .product-card__image-container {
    width: 100%;
    position: relative;
  }

  .product-card__image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    background: $color-gray;
  }

  .product-card__price {
    position: absolute;
    bottom: 0;
    right: 0;
    padding: 1rem 1.625rem;
  }
</style>
