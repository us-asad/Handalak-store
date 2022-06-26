import main from 'redux/slices/main';
import user from "redux/slices/user";
import storeProduct from "redux/slices/storeProduct";
import basket from "redux/slices/basket";
import toggleModal from "redux/slices/toggleModal";
import { configureStore } from '@reduxjs/toolkit'

export const store = configureStore({
  reducer: {
    main,
    user,
    storeProduct,
    basket,
    toggleModal,
  },
});
