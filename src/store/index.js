import * as types from './mutation-types'

// The default state
export const state = () => ({
  selectedCareCompany: null,
  careCompanies: null,
  selectedData: null,
  autoCompleteIsEnabled: false,
  selectedDutchData: null
})

// Things you want to get out of the state, you can also use
// ...mapState in a component to get something but okay.
export const getters = {
  selectedCareCompany(state) {
    return state.selectedCareCompany
  },
  careCompanies(state) {
    return state.careCompanies
  },
  selectedData(state) {
    return state.selectedData
  },
  selectedDutchData(state) {
    return state.selectedDutchData
  },
  budget(state, getters) {
    return state.selectedData && state.selectedData.winst
      ? state.selectedData.winst - getters['shop/shoppingBagTotalPrice']
      : 0
  },
  autoCompleteIsEnabled(state) {
    return state.autoCompleteIsEnabled
  }
}

// State you want to change (mostly something async here)
export const actions = {}

// State you want to change (synchronously)
export const mutations = {
  [types.SET_CURRENT_CARECOMPANY](state, payload) {
    state.selectedCareCompany = payload.careCompany
  },
  [types.ADD_TO_SHOPPING_BAG](state, payload) {
    state.shoppingBag = [...state.shoppingBag, payload.product]
  },
  [types.SET_CARECOMPANIES](state, payload) {
    state.careCompanies = payload.careCompanies
  },
  [types.SET_SELECTED_DATA](state, payload) {
    state.selectedData = payload.selectedData
  },
  [types.TOGGLE_AUTOCOMPLETE](state, payload) {
    state.autoCompleteIsEnabled = payload.autoCompleteIsEnabled
  },
  [types.SET_SELECTED_DUTCH_DATA](state, payload) {
    state.selectedDutchData = payload.data
  }
}
