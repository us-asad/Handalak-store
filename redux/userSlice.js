import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { auth } from 'firebaseconfig';
import { createUserWithEmailAndPassword, sendPasswordResetEmail, signInWithEmailAndPassword, signOut, updateProfile } from 'firebase/auth';
import axios from 'axios';

export const registerUser = createAsyncThunk(
  "user/register",
  async ({ name, email, password }) => {
    let rsp = await createUserWithEmailAndPassword(auth, email, password)
    rsp = await axios.post('/api/auth', JSON.stringify({ email, name }), {
      headers: {
        'Content-Type': 'application/json'
      }
    });

    return rsp.data.createUserData;
  }
);

export const signInUser = createAsyncThunk(
  "user/signIn",
  async ({ email, password }) => {
    const rsp = await signInWithEmailAndPassword(auth, email, password);
    rsp = await axios.get(`/api/auth?email=${email}`);

    return rsp?.data?.userData;
  }
);

export const resetPassword = createAsyncThunk(
  "user/reset-password",
  async email => {
    const rsp = await sendPasswordResetEmail(auth, email);
    return rsp;
  }
);

const initialState = {
  user: null,
  loading: true,
  error: "",
  message: ""
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    changeUserState: (state, { payload }) => {
      state.user = payload;
      state.loading = false;
    },
    signOutAccount: state => {
      signOut(auth)
      state.user = null;
      state.loading = false
    }
  },
  extraReducers: {
    [registerUser.fulfilled]: (state, { payload }) => {
      state.user = payload;
      state.error = "";
      state.loading = false;
    },
    [registerUser.pending]: state => { state.loading = true },
    [registerUser.rejected]: (state, action) => {
      state.error = action.error.message;
      state.loading = false;
    },
    [signInUser.fulfilled]: (state, { payload }) => {
      state.user = payload
      state.error = "";
      state.loading = false;
    },
    [signInUser.pending]: state => { state.loading = true },
    [signInUser.rejected]: (state, action) => {
      state.error = action.error.message;
      state.loading = false;
    },
    [resetPassword.fulfilled]: state => {
      state.error = "";
      state.message = "Parol muvafaqiyatli yuborildi!";
    },
    [resetPassword.rejected]: (state, action) => {
      state.error = action.error.message;
      state.message = "";
    }
  }
});

export const { changeUserState, signOutAccount } = userSlice.actions;

export default userSlice.reducer;

