import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: []
}

const basketSlice = createSlice({
  name: "basket",
  initialState,
  reducers: {
    addItems: (state, { payload }) => {state.items = [...state.items, ...payload.products] },
    addItem: (state, { payload }) => {
      // payload.quantity = 1;
      state.items = [...state.items, payload]
    },
    removeItem: (state, { payload }) => { state.items = state.items.filter(item => item.id !== payload); },
    addQuantity: (state, { payload }) => {
      const item = state.items.findIndex(item => item.id === payload);
      const quantity = state.items[item].quantity;

      state.items[item].quantity = quantity + 1;
    },
    subtractQuantity: (state, { payload }) => {
      const item = state.items.findIndex(item => item.id === payload);
      const quantity = state.items[item].quantity;

      if (quantity > 1)
        state.items[item].quantity = quantity - 1;
    }
  },
});

export const { addItems, addItem, removeItem, addQuantity, subtractQuantity } = basketSlice.actions;

export default basketSlice.reducer;

