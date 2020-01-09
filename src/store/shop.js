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
  shoppingBagItemsQuantity(state) {
    return state.shoppingBag.length
  },
  shoppingBagTotalPrice(state) {
    return state.shoppingBag.reduce((total, currentItem) => {
      return total + currentItem.prijs
    }, 0)
  }
}

export const actions = {
  addToShoppingBag(store, payload) {
    if (payload.amount === 0) {
      return store.commit(types.ADD_TO_SHOPPING_BAG, payload)
    }

    return store.commit(types.INCREMENT_ITEM_AMOUNT, payload)
  },
  removeFromShoppingBag(store, payload) {
    if (payload.amount === 1) {
      return store.commit(types.REMOVE_FROM_SHOPPING_BAG, payload)
    }

    return store.commit(types.DECREMENT_ITEM_AMOUNT, payload)
  }
}

export const mutations = {
  [types.ADD_TO_SHOPPING_BAG](state, payload) {
    state.shoppingBag = [...state.shoppingBag, { ...payload.item, amount: payload.amount }]
  },
  [types.REMOVE_FROM_SHOPPING_BAG](state, payload) {
    state.shoppingBag = state.shoppingBag.filter(item => item.naam === payload.item.naam)
  },
  [types.INCREMENT_ITEM_AMOUNT](state, payload) {
    state.shoppingBag = state.shoppingBag.map(item => {
      if (item.naam === payload.item.naam) {
        return { ...item, amount: item.amount++ }
      }

      return item
    })
  },
  [types.DECREMENT_ITEM_AMOUNT](state, payload) {
    state.shoppingBag = state.shoppingBag.map(item => {
      if (item.naam === payload.item.naam) {
        return { ...item, amount: item.amount-- }
      }

      return item
    })
  }
}
