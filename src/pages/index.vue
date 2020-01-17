<template>
  <main class="home-page">
    <section class="home-page__intro">
      <h1 class="home-page__title">Shoppen met zorggeld</h1>
      <p>Zorgcowboys zijn achterbakse ondernemers, gierige consultants en rijke managers. Dit zijn zorginstellingen die de afgelopen vijf jaar misbruik hebben gemaakt van het gebrek aan toezicht en de zorg alleen maar duurder maken.</p>
    </section>
    <section class="home-page__actions">
      <h2 class="home-page__actions-title">Zoek jouw zorginstelling</h2>
      <form @submit.prevent="onSubmit">
        <company-search
          required
          class="home-page__input"
        />
        <year-selection
          required
          :selected-company="selectedCareCompany"
          :dutch-data="dutchData"
          class="home-page__input"
        />
        <p
          v-if="selectedData"
          class="home-page__budget"
        >Jouw budget: <span>€{{ selectedData.winst.toLocaleString() }}</span></p>
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
  import dutchDataJson from '~/static/data/dutch-stats'

  import { mapGetters } from 'vuex'
  import { SET_CARECOMPANIES } from '~/store/mutation-types'

  import CompanySearch from '~/components/company-search/company-search'
  import YearSelection from '~/components/year-selection/year-selection'

  export default {
    components: {
      CompanySearch,
      YearSelection
    },
    data() {
      return {
        dutchData: dutchDataJson
      }
    },
    computed: {
      ...mapGetters({
        careCompanies: 'careCompanies',
        selectedCareCompany: 'selectedCareCompany',
        selectedData: 'selectedData',
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
  .home-page {
    padding: $spacing-default $spacing-medium;
    background-image: url('~static/images/money-bag.png');
    background-repeat: no-repeat;
    background-position: 120% #{-$spacing-default};
  }

  .home-page__intro {
    margin-bottom: $spacing-large;
  }

  .home-page__title {
    margin-bottom: $spacing-large;
  }

  .home-page__actions-title {
    margin-bottom: $spacing-default;
  }

  .home-page__input + .home-page__input {
    margin-top: $spacing-small;
  }

  .home-page__budget {
    width: 100%;
    margin-top: $spacing-medium;
    font-family: $font-stack-headings;
    font-size: $font-size-default;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-weight: $font-weight-bold;
    font-size: $font-size-medium;

    & > span {
      margin-left: $spacing-tiny;
      font-weight: $font-weight-bold;
      font-size: $font-size-large;
    }
  }

  .home-page__buttons {
    margin-top: $spacing-large;
  }

  .home-page .button {
    margin-bottom: $spacing-small;
  }

  .home-page .button:last-child {
    margin-bottom: 0;
  }
</style>
