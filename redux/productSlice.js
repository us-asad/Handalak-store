import { createSlice } from '@reduxjs/toolkit';
import { checkCookies, getCookie, setCookies } from 'cookies-next';

const savedPrds = checkCookies("savedPrds") && JSON.parse(getCookie("savedPrds"));
const comparedPrds = checkCookies("comparedPrds") && JSON.parse(getCookie("comparedPrds"));
const basket = checkCookies("basket") && JSON.parse(getCookie("basket"));

const initialState = {
  savedPrds: savedPrds || [],
  comparedPrds: comparedPrds || [],
  basket: basket || [],
};

const handleLocalStorage = (payload, name, type) => {
  const items = checkCookies(name) ? JSON.parse(getCookie(name)) : [];

  if (type === "add")
    items.push(payload);
  else {
    const i = items.indexOf(payload);
    items.splice(i, i > -1 ? 1 : 0 );
  }

  setCookies(name, items.filter(Boolean));
  return items;
}

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    addSavedPrd: (state, { payload }) => {
      state.savedPrds = handleLocalStorage(payload, "savedPrds", "add");
    },
    removeSavedPrd: (state, { payload }) => {
      state.savedPrds = handleLocalStorage(payload, "savedPrds");
    },
    addComparedPrd: (state, { payload }) => {
      state.comparedPrds = handleLocalStorage(payload, "comparedPrds", "add");
    },
    removeComparedPrd: (state, { payload }) => {
      state.comparedPrds = handleLocalStorage(payload, "comparedPrds");
    },
    addBasketPrd: (state, { payload }) => {
      state.basket = handleLocalStorage(payload, "basket", "add");
    },
    removeBasketPrd: (state, { payload }) => {
      state.basket = handleLocalStorage(payload, "basket");
    }
  },
});

export const { addSavedPrd, removeSavedPrd, addComparedPrd, removeComparedPrd, addBasketPrd, removeBasketPrd } = productSlice.actions;

export default productSlice.reducer;

