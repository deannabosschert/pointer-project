<template>
  <aside class="app-cart">
    <header
      v-if="selectedCareCompany"
      class="app-cart__header"
    >
      <h2 class="app-cart__title">
        <span class="sr-only">Bonnetje van: </span>
        {{ selectedCareCompany.naam }}
      </h2>
      <p class="app-cart__place">{{  }}</p>
      <ul class="app-cart__caretypes">
        <li
          v-for="caretype in selectedCareCompany.soortenZorg"
          :key="caretype"
        >{{ careType }}</li>
      </ul>
    </header>

    <p class="app-cart__date">{{ formattedDate }}</p>
    <p
      v-if="selectedCareCompany"
      class="app-cart__payment-company"
    >{{ selectedCareCompany.naam }}</p>

    <app-table
      v-if="shoppingBagProducts.length"
      :products="shoppingBagProducts"
      :total="shoppingBagTotalPrice"
    />

    <h3 class="app-cart__title--special">Wow hiervan zou je ook...</h3>
    <app-table
      :products="substituteProducts"
      :total="totalSubstitutePrice"
    />
    <p class="app-cart__title--special">... kunnen betalen</p>

    <app-socials />
  </aside>
</template>

<script>
  import { mapState, mapGetters } from 'vuex'

  import AppTable from '../app-table/app-table'
  import AppSocials from '../app-socials/app-socials'

  export default {
    components: {
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
      // TODO: fix this:
      /**
       * We have to find a more valuable solution here,
       * right now we just divide the total by the number of
       * substitutes which is not ideal.
       *
       * For now it works but we have to find a more solid
       * solution for v2.0
       */

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
    }
  }

  function maybePrefixWithZero(num) {
    return num < 10 ? `0${num}` : num
  }
</script>

<style lang="scss">

</style>
