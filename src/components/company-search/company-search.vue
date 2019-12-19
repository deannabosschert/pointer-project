<template>
  <form class="company-search">
    <label for="company-search-input" class="company-search__label">Zoek je zorgstichting</label>
    <input
      type="search"
      id="company-search-input"
      class="company-search__input"
      @focus="enableAutocomplete"
      v-model="input"
    />
    <div
      v-if="autocompleteIsEnabled"
      class="company-search__autocomplete"
    >
      <button
        type="button"
        class="company-search__matching-company"
        v-for="(company, i) in matchingCompanies"
        :key="`${company.id}-${i}`"
        @click="onCompanyClick(company)"
      >
        {{ company.naam }}
      </button>
    </div>
  </form>
</template>

<script>
  import { mapGetters } from 'vuex'
  import { SET_CURRENT_CARECOMPANY } from '~/store/mutation-types'

  export default {
    data() {
      return {
        input: '',
        autocompleteIsEnabled: false,
        selectedCarecompany: {}
      }
    },
    computed: {
      ...mapGetters({
        careCompanies: 'careCompanies'
      }),
      matchingCompanies() {
        return this.careCompanies
          .filter(company => {
            return company.naam.includes(this.input)
          })
          .slice(0, 10)
      }
    },
    methods: {
      onCompanyClick(company) {
        this.$store.commit(SET_CURRENT_CARECOMPANY, { careCompany: company })
        this.autocompleteIsEnabled = false
      },
      enableAutocomplete() {
        this.autocompleteIsEnabled = true
      },
      disableAutocomplete() {
        this.autocompleteIsEnabled = false
      }
    }
  }
</script>

<style lang="scss">

</style>
