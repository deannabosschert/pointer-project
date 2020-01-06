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
        return Object.values(this.careCompanies)
          .filter(item => {
            return item.naam.includes(this.input)
          })
          .slice(0, 10)
      }
    },
    methods: {
      onCompanyClick(company) {
        this.input = company.naam

        /*
          We also add the selectedCompany to localStorage. If a user refreshes
          the page the selected company won't be lost this way.
        */
        addToLocalStorage('careCompany', company)
        this.$store.commit(SET_CURRENT_CARECOMPANY, { careCompany: company })
      },
      enableAutocomplete() {
        this.autocompleteIsEnabled = true
      },
      disableAutocomplete() {
        this.autocompleteIsEnabled = false
      }
    }
  }

  function addToLocalStorage(key, data) {
    const storage = window.localStorage
    const dataIsRightType = typeof data === 'object' || typeof data === 'array'

    if (!dataIsRightType) {
      throw new Error('Data should be of type object or array')
    }

    return storage.setItem(key, JSON.stringify(data))
  }
</script>

<style lang="scss">

</style>
