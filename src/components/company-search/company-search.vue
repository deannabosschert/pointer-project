<template>
  <div class="company-search">
    <label for="company-search-input" class="sr-only">Zoek je zorgstichting</label>
    <input
      type="search"
      id="company-search-input"
      class="company-search__input"
      placeholder="Vul een zorginstelling in..."
      @focus="enableAutocomplete"
      v-model="input"
      :required="required"
    />
    <div
      v-if="autocompleteIsEnabled"
      class="company-search__autocomplete"
    >
      <button
        type="button"
        class="company-search__autocomplete-item"
        v-for="(company, i) in matchingCompanies"
        :key="`${company.id}-${i}`"
        @click="onCompanyClick(company)"
      >
        {{ company.naam }}
      </button>
    </div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import { SET_CURRENT_CARECOMPANY } from '~/store/mutation-types'

  export default {
    props: {
      required: {
        type: Boolean,
        default: false
      }
    },
    data() {
      const selectedCompanyName = this.$store.getters.selectedCareCompany &&
        this.$store.getters.selectedCareCompany.naam

      return {
        input: selectedCompanyName || '',
        autocompleteIsEnabled: false,
      }
    },
    computed: {
      ...mapGetters({
        careCompanies: 'careCompanies',
      }),
      matchingCompanies() {
        return this.careCompanies &&
          typeof this.careCompanies === 'object' &&
          Object.values(this.careCompanies)
              .filter(item => {
                return item.naam.includes(this.input)
              })
              .slice(0, 5)
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

        this.disableAutocomplete()
      },
      enableAutocomplete() {
        this.autocompleteIsEnabled = true
      },
      disableAutocomplete() {
        this.autocompleteIsEnabled = false
      }
    },
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
  $company-search-height: 43px;

  .company-search {
    position: relative;
  }

  .company-search__autocomplete {
    position: absolute;
    top: $company-search-height;
    left: 0;
    right: 0;
    background: $color-white;
    box-shadow: 0px 0px 3px rgba($color-darkest, .6)
  }

  .company-search__autocomplete-item {
    display: block;
    width: 100%;
    padding: $spacing-small;
    border-bottom: 1px solid $color-gray;
    font-size: $font-size-default;
    font-family: $font-stack-body;
    text-align: left;
  }
</style>
