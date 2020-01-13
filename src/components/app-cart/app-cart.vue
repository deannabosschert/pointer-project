<template>
  <aside class="app-cart">
    <header class="app-cart__header">
      <h2 class="app-cart__title">
        <span class="sr-only">Bonnetje van: </span>
        Selected company name
      </h2>
      <p class="app-cart__place">Plaats</p>
      <ul class="app-cart__caretypes">
        <li>Soort zorg</li>
      </ul>
    </header>

    <p class="app-cart__date">{{ formattedDate }}</p>
    <p class="app-cart__payment-company">Company name</p>

    <app-table
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
        selectedCompany: state => state.selectedCompany,
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
    }
  }

  function maybePrefixWithZero(num) {
    return num < 10 ? `0${num}` : num
  }
</script>

<style lang="scss">

</style>
