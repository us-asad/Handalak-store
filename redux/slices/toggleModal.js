import { createSlice } from '@reduxjs/toolkit'
import { hideBodyOverflow } from 'data/functions';

const initialState = {
  loginModal: false,
  categoriesBar: false,
  callModal: false,
  cabinetDropDown: false,
  commentModal: false,
  replyModal: false
};

const toggleModalSlice = createSlice({
  name: "toggle-modal",
  initialState,
  reducers: {
    toggleModal: (state, { payload }) => {
      state[payload[0]] = payload[1];
      hideBodyOverflow(payload[1]);
    }
  }
});

export const { toggleModal } = toggleModalSlice.actions;

export default toggleModalSlice.reducer;

