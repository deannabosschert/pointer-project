import * as types from './mutation-types'

export const state = () => ({
  shoppingBag: [],
  shopItems: [
    {
      mediaLink: '/static/images/aston-martin.jpg',
      naam: 'Aston Martin',
      prijs: 228000.00
    },
    {
      mediaLink: '/static/images/moet.jpg',
      naam: 'Moët',
      prijs: 349.00
    },
    {
      mediaLink: '/static/images/prive-jet.jpg',
      naam: 'Privé jet',
      prijs: 12750000.00
    },
    {
      mediaLink: '/static/images/balenciaga.jpg',
      naam: 'Balenciaga',
      prijs: 795.00
    },
    {
      mediaLink: '/static/images/diamantring.jpg',
      naam: 'Diamantring',
      prijs: 55600.00
    },
    {
      mediaLink: '/static/images/luxe-jacht.jpg',
      naam: 'Luxe jacht',
      prijs: 2000000.00
    }
  ]
})

export const getters = {
  amountOfItemsInShoppingBag(state) {
    return state.shoppingBag.length
  }
}

export const mutations = {
  [types.ADD_TO_SHOPPING_BAG](state, payload) {
    state.shoppingBag = [...state.shoppingBag, { ...payload.item, amount: 1 }]
  },
  [types.REMOVE_FROM_SHOPPING_BAG](state, payload) {

  },
  [types.INCREMENT_ITEM_AMOUNT](state, payload) {

  }
}
