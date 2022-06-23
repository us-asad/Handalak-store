import main from './mainSlice';
import user from "./userSlice";
import product from "./productSlice";
import basket from "./basketSlice";
import { configureStore } from '@reduxjs/toolkit'

export const store = configureStore({
  reducer: {
    main,
    user,
    product,
    basket
  },
});
