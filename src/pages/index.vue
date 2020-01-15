<template>
  <main class="home-page">
    <section class="home-page__intro">
      <h1>Shoppen met zorggeld</h1>
      <p>Zorgcoyboys zijn achterbakse ondernemers, gierige consultants en rijke managers. Dit zijn zorginstellingen die de afgelopen vijf jaar misbruik hebben gemaakt van het gebrek aan toezicht en de zorg alleen maar duurder maken.</p>
    </section>
    <section class="home-page__actions">
      <h2>Zoek jouw zorginstelling</h2>
      <form @submit.prevent="onSubmit">
        <company-search required />
        <year-selection
          required
          :selected-company="selectedCareCompany"
        />
        <div class="home-page__buttons">
          <button
            type="submit"
            :disabled="!selectedCareCompany"
            class="button"
          >
            Shop met de winst
          </button>
          <button
            @click="onNumbersButtonClick"
            :disabled="!selectedCareCompany"
            class="button button--secondary"
          >
            Check de cijfers
          </button>
        </div>
      </form>
    </section>
  </main>
</template>

<script>
  import { mapGetters } from 'vuex'
  import { SET_CARECOMPANIES } from '~/store/mutation-types'

  import CompanySearch from '~/components/company-search/company-search'
  import YearSelection from '~/components/year-selection/year-selection'

  export default {
    components: {
      CompanySearch,
      YearSelection
    },
    computed: {
      ...mapGetters({
        careCompanies: 'careCompanies',
        selectedCareCompany: 'selectedCareCompany',
        selectedData: 'selectedData'
      }),
      async rawCompanies() {
        const module = await import('~/static/data/pointer-raw')

        return module.default
      }
    },
    async mounted() {
      if (!this.careCompanies) {
        this.$store.commit(SET_CARECOMPANIES, { careCompanies: await this.rawCompanies })
      }
    },
    methods: {
      onSubmit() {
        return this.$router.push({
          path: '/shop'
        })
      },
      onNumbersButtonClick() {
        return this.$router.push({
          path: '/stats'
        })
      }
    }
  }
</script>

<style lang="scss">

</style>
