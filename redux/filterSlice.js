import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  min_price: null,
  max_price: null,
  brands: [],
  varieties: {}
};

const dataSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    changeMinPrice: (state, { payload }) => { state.min_price = payload },
    changeMaxPrice: (state, { payload }) => { state.max_price = payload; },
    addBrand: (state, { payload }) => { state.brands = [...state.brands, payload] },
    removeBrand: (state, { payload }) => { state.brands = state.brands.filter(brd => brd !== payload) },
    addVariety: (state, { payload: { key, value } }) => { 
      
      state.varieties[key] = state.varieties[key] ? [...state.varieties[key], value] : [value]
     },
    removeVariety: (state, { payload: { key, value } }) => { state.varieties[key] = state.varieties[key].filter(vrt => vrt !== value); }
  }
});

export const { changeMinPrice, changeMaxPrice, addBrand, removeBrand, addVariety, removeVariety } = dataSlice.actions;

export default dataSlice.reducer;

