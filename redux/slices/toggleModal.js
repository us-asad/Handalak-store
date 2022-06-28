import { createSlice } from '@reduxjs/toolkit'
import { hideBodyOverflow } from 'data/functions';

const initialState = {
  loginModal: false,
  categoriesBar: false,
  callModal: false,
  cabinetDropDown: false,
  commentModal: false,
  replyModal: false,
  product: {
    state: false,
    data: {}
  },
  reply: {
    state: false,
    data: {}
  }
};

const toggleModalSlice = createSlice({
  name: "toggle-modal",
  initialState,
  reducers: {
    toggleModal: (state, { payload }) => {
      state[payload[0]] = payload[1];
      hideBodyOverflow(payload[1]);
    },
    toggleDynamicModal: (state, { payload }) => {
      state[payload[0]].state = payload[1];
      state[payload[0]].data = payload[2] || {};
      hideBodyOverflow(payload[1]);
    }
  }
});

export const { toggleModal, toggleDynamicModal } = toggleModalSlice.actions;

export default toggleModalSlice.reducer;

