import main from 'redux/slices/main';
import user from "redux/slices/user";
import storeProduct from "redux/slices/storeProduct";
import basket from "redux/slices/basket";
import product from "redux/slices/product";
import toggleModal from "redux/slices/toggleModal";
import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { createWrapper, HYDRATE } from 'next-redux-wrapper';

const combinedReducers = combineReducers({
  main,
  user,
  storeProduct,
  basket,
  toggleModal,
  product
});

const masterReducer = (state, action) => {
  if (action.type === HYDRATE) {
    const nextState = {
      ...state,
      main: {
        categories: action.payload.main.categories,
        mainCategory: action.payload.main.categories[0],
      },
      product: action.payload?.product?.id ? action.payload?.product : state.product
    }

    return nextState;
  } else return combinedReducers(state, action);
}

export const makeStore = () => configureStore({
  reducer: masterReducer
});

export const wrapper = createWrapper(makeStore);
