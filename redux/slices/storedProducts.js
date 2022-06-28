import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  basket: [],
  comparedProducts: [],
  savedProducts: []
}

const basketSlice = createSlice({
  name: "basket",
  initialState,
  reducers: {
    addItems: (state, { payload }) => { state[payload[0]] = payload[1].map(item => ({...item, purchaseQty: 1})) },
    removeItem: (state, { payload }) => { state[payload[0]] = state[payload[0]].filter(item => item.id !== payload[1]); },
    changeQty: (state, { payload }) => {
      const itemIdx = state.basket.findIndex(item => item.id === payload.id);
      const quantity = state.basket[itemIdx].purchaseQty;

      if (payload.add && state.basket[itemIdx].quantity > quantity) {
        state.basket[itemIdx].purchaseQty = quantity + 1;
      } else if (quantity > 1 && !payload.add) {
        state.basket[itemIdx].purchaseQty = quantity - 1;
      }
    }
  },
});

export const { addItems, removeItem, changeQty } = basketSlice.actions;

export default basketSlice.reducer;

