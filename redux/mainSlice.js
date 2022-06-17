import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  categories: [],
  showCategoriesBar: false,
  mainCategory: [],
  promosDiscounts: [],
};

const dataSlice = createSlice({
  name: "data",
  initialState,
  reducers: {
    addCategories: (state, { payload }) => {
      state.categories =  payload;
      state.mainCategory = payload[0];
    },
    toggleShowCategoriesBar: (state, { payload }) => { state.showCategoriesBar = payload ?? !state.showCategoriesBar; },
    changeMainCategory: (state, { payload }) => { state.mainCategory = payload; },
    addPromosDiscounts: (state, { payload }) => { state.promosDiscounts = payload; }
  }
});

export const { addCategories, toggleShowCategoriesBar, changeMainCategory, addPromosDiscounts } = dataSlice.actions;

export default dataSlice.reducer;

