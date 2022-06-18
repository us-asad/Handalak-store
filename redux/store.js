import { configureStore } from '@reduxjs/toolkit';
import mainReducer from './mainSlice';
import filterSlice from './filterSlice';

export const store = configureStore({
  reducer: {
    main: mainReducer,
    filter: filterSlice 
  },
})