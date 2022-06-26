import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  categories: [],
  mainCategory: [],
  promosDiscounts: []
};

const dataSlice = createSlice({
  name: "main",
  initialState,
  reducers: {
    addCategories: (state, { payload }) => {
      state.categories =  payload;
      state.mainCategory = payload[0];
    },
    changeMainCategory: (state, { payload }) => { state.mainCategory = payload; },
    addPromosDiscounts: (state, { payload }) => { state.promosDiscounts = payload; }
  }
});

export const { addCategories, toggleShowCategoriesBar, changeMainCategory, addPromosDiscounts } = dataSlice.actions;

export default dataSlice.reducer;

