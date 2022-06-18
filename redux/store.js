import mainReducer from './mainSlice';
import { configureStore } from '@reduxjs/toolkit'

export const store = configureStore({
  reducer: {
    main: mainReducer,
  },
});
