import mainReducer from './mainSlice';
import userReducer from "./userSlice";
import { configureStore } from '@reduxjs/toolkit'

export const store = configureStore({
  reducer: {
    main: mainReducer,
    user: userReducer
  },
});
