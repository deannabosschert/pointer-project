import * as types from './mutation-types'

// The default state
export const state = () => ({
  selectedCareCompany: null,
  shoppingBag: [],
  careCompanies: null,
  selectedData: null
})

// Things you want to get out of the state, you can also use
// ...mapState in a component to get something but okay.
export const getters = {
  selectedCareCompany(state) {
    return state.selectedCareCompany
  },
  shoppingBag(state) {
    return state.shoppingBag
  },
  careCompanies(state) {
    return state.careCompanies
  },
  selectedData(state) {
    return state.selectedData
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
  [types.REMOVE_FROM_SHOPPING_BAG](state, payload) {
    // Find payload's product

    // Set state to shoppingBag without that product
  },
  [types.CHANGE_AMOUNT_OF_PRODUCT](state, payload) {
    // Find product

    // Set amount to ++ or --
  },
  [types.SET_CARECOMPANIES](state, payload) {
    state.careCompanies = payload.careCompanies
  },
  [types.SET_SELECTED_DATA](state, payload) {
    state.selectedData = payload.selectedData
  }
}
