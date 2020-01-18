import * as types from './mutation-types'

export const state = () => ({
  shoppingBag: {},
  shopItems: [
    {
      mediaLink: '/images/aston-martin.jpg',
      naam: 'Aston Martin',
      prijs: 228000.00
    },
    {
      mediaLink: '/images/moet.jpg',
      naam: 'Moët',
      prijs: 349.00
    },
    {
      mediaLink: '/images/prive-jet.jpg',
      naam: 'Privé jet',
      prijs: 12750000.00
    },
    {
      mediaLink: '/images/balenciaga.jpg',
      naam: 'Balenciaga',
      prijs: 795.00
    },
    {
      mediaLink: '/images/diamantring.jpg',
      naam: 'Diamantring',
      prijs: 55600.00
    },
    {
      mediaLink: '/images/luxe-jacht.jpg',
      naam: 'Luxe jacht',
      prijs: 2000000.00
    }
  ],
  substituteItems: [
    {
      naam: 'Uur persoonlijke verzorging',
      prijs: 39.68,
      amount: 0
    },
    {
      naam: 'Uur verpleging',
      prijs: 59.12,
      amount: 0
    },
    {
      naam: 'Uur maaltijd verzorging',
      prijs: 7.51,
      amount: 0
    },
    {
      naam: 'Uur psychologische ondersteuning',
      prijs: 95,
      amount: 0
    },
    {
      naam: 'Uur huishoudelijke hulp',
      prijs: 21.62,
      amount: 0
    },
  ]
})

export const getters = {
  shoppingBagItemsQuantity(state) {
    return Object.values(state.shoppingBag).reduce((total, current) => {
      return total + current.amount
    }, 0)
  },
  shoppingBagTotalPrice(state) {
    return Object.values(state.shoppingBag).reduce((total, current) => {
      const { prijs, amount } = current

      return total + (prijs * amount)
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
    const items = state.shoppingBag
    items[payload.item.naam] = {
      amount: 1,
      prijs: payload.item.prijs,
      mediaLink: payload.item.mediaLink
    }

    state.shoppingBag = { ...items }
  },
  [types.REMOVE_FROM_SHOPPING_BAG](state, payload) {
    const items = state.shoppingBag
    delete items[payload.item.naam]

    state.shoppingBag = { ...items }
  },
  [types.INCREMENT_ITEM_AMOUNT](state, payload) {
    const items = state.shoppingBag
    const currentItem = items[payload.item.naam]
    const { amount } = currentItem
    items[payload.item.naam] = { ...currentItem, amount: amount + 1 }

    state.shoppingBag = { ...items }
  },
  [types.DECREMENT_ITEM_AMOUNT](state, payload) {
    const items = state.shoppingBag
    const currentItem = items[payload.item.naam]
    const { amount } = currentItem
    items[payload.item.naam] = { ...currentItem, amount: amount - 1 }

    state.shoppingBag = { ...items }
  }
}
