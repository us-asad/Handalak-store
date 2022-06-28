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

const storeProduct = payload => {
  const items = checkCookies(payload[0]) ? JSON.parse(getCookie(payload[0])) : [];

  if (!items.includes(payload[1]))
    items.push(payload[1]);
  else {
    const i = items.indexOf(payload[1]);
    items.splice(i, i > -1 ? 1 : 0 );
  }

  setCookies(payload[0], items.filter(Boolean));
  return items;
}

const storeProductSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    changeStoredProductState: (state, { payload }) => {
      state[payload[0]] = storeProduct(payload)
    }
  },
});

export const { changeStoredProductState } = storeProductSlice.actions;

export default storeProductSlice.reducer;

