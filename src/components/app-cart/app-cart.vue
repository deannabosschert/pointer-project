<template>
  <section class="app-cart">
    <header
      v-if="selectedCareCompany"
      class="app-cart__header"
    >
      <h2 class="app-cart__title correct-casing">
        <span class="sr-only">Bonnetje van: </span>
        {{ selectedCareCompany.naam }}
      </h2>
      <p class="app-cart__place correct-casing">{{ selectedCareCompany.plaatsen[0] }}</p>
      <ul class="app-cart__caretypes">
        <li
          class="app-cart__caretype correct-casing"
          v-for="careType in selectedCareCompany.soortenZorg"
          :key="careType"
        >{{ careType }}</li>
      </ul>
      <button
        class="app-cart__close-button"
        @click="redirectToPreviousPage"
      >
        <span class="sr-only">Terug naar vorige pagina</span>
        <app-icon name="cross_black" />
      </button>
    </header>

    <div class="app-cart__payment-data">
      <p class="app-cart__date">Datum: {{ formattedDate }}</p>
      <p
        v-if="selectedCareCompany"
        class="app-cart__payment-company"
      >
        Betaling: <span class="correct-casing">{{ selectedCareCompany.naam }}</span>
      </p>
    </div>

    <app-table
      v-if="shoppingBagProducts.length"
      :products="shoppingBagProducts"
      :total="shoppingBagTotalPrice"
      has-highlighted-total
    />

    <h3 class="app-cart__title--special">Wow! Hiervan zou je ook...</h3>
    <app-table
      :products="substituteProducts"
      :total="totalSubstitutePrice"
    />
    <p class="app-cart__title--special pull-right">... kunnen betalen</p>

    <app-socials />
  </section>
</template>

<script>
  import { mapState, mapGetters } from 'vuex'

  import AppIcon from '../app-icon/app-icon'
  import AppTable from '../app-table/app-table'
  import AppSocials from '../app-socials/app-socials'

  export default {
    components: {
      AppIcon,
      AppTable,
      AppSocials
    },
    computed: {
      ...mapState({
        selectedCareCompany: state => state.selectedCareCompany,
        shoppingBag: state => state.shop.shoppingBag,
        substituteItems: state => state.shop.substituteItems
      }),
      ...mapGetters({
        shoppingBagTotalPrice: 'shop/shoppingBagTotalPrice'
      }),
      shoppingBagProducts() {
        return Object.entries(this.shoppingBag)
          .map(([name, object]) => {
            const itemTotal = object.amount * object.prijs

            return {
              amount: object.amount,
              naam: name,
              prijs: itemTotal
            }
          })
      },
      substituteProducts() {
        return this.substituteItems.map((item, index, self) => {
          const part = this.shoppingBagTotalPrice / self.length

          return {
            ...item,
            amount: Math.floor(part / item.prijs)
          }
        })
      },
      totalSubstitutePrice() {
        return this.substituteProducts.reduce((total, current) => {
          return total + (current.amount * current.prijs)
        }, 0)
      },
      formattedDate() {
        const today = new Date
        const day = maybePrefixWithZero(today.getDay())
        const month = maybePrefixWithZero(today.getMonth() + 1)
        const year = today.getFullYear()

        return `${day}-${month}-${year}`
      }
    },
    methods: {
      redirectToPreviousPage() {
        return this.$router.back()
      }
    }
  }

  function maybePrefixWithZero(num) {
    return num < 10 ? `0${num}` : num
  }
</script>

<style lang="scss">
  .app-cart {
    background: $color-white;
    padding: $spacing-large $spacing-medium;
    position: relative;
  }

  .app-cart__header {
    position: relative;
    border-bottom: 2px dashed $color-darkest;
    padding: $spacing-medium 0;
    padding-top: $spacing-small;
    margin-bottom: $spacing-medium;
  }

  .app-cart__title,
  .app-cart__place,
  .app-cart__caretype {
    margin-bottom: $spacing-tiny;
    line-height: 1;
  }

  .app-cart__title {
    font-size: $font-size-medium;
    line-height: 1.10;
    padding-right: $font-size-medium;
  }

  .app-cart__title--special {
    color: $color-highlight-purple;
    font-weight: $font-weight-bold;
    font-size: $font-size-medium;
    margin-bottom: $spacing-small;
  }

  .app-cart__close-button {
    position: absolute;
    top: 0;
    right: 0;
    font-size: $font-size-medium;
  }

  .app-cart__payment-data {
    margin-bottom: $spacing-medium;
  }

  .app-cart__date + p {
    margin-top: 0;
  }

  .app-cart .app-table {
    margin-bottom: $spacing-large;
  }

  .app-cart .app-table:last-child {
    margin-bottom: $spacing-default;
  }
</style>
