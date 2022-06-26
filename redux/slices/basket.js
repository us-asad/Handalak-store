import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: []
}

const basketSlice = createSlice({
  name: "basket",
  initialState,
  reducers: {
    addItems: (state, { payload }) => { state.items = payload.map(item => ({...item, purchaseQty: 1})) },
    addItem: (state, { payload }) => {
      payload.purchaseQty = 1;
      state.items = [...state.items, payload]
    },
    removeItem: (state, { payload }) => { state.items = state.items.filter(item => item.id !== payload); },
    changeQty: (state, { payload }) => {
      const item = state.items.findIndex(item => item.id === payload.id);
      const quantity = state.items[item].purchaseQty;

      if (payload.add && state.items[item].quantity > quantity) {
        state.items[item].purchaseQty = quantity + 1;
      } else if (quantity > 1 && !payload.add) {
        state.items[item].purchaseQty = quantity - 1;
      }
    }
  },
});

export const { addItems, addItem, removeItem, changeQty } = basketSlice.actions;

export default basketSlice.reducer;

