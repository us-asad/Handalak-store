import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { auth } from 'firebaseconfig';
import { createUserWithEmailAndPassword, sendPasswordResetEmail, signInWithEmailAndPassword, signOut, updateProfile } from 'firebase/auth';

export const registerUser = createAsyncThunk(
  "user/register",
  async ({ name, email, password }) => {
    let rsp = await createUserWithEmailAndPassword(auth, email, password)
    rsp = await fetch("/api/auth", {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: { email, name }
    });

    return rsp;
  }
);

export const signInUser = createAsyncThunk(
  "user/signIn",
  async ({ email, password }) => {
    const rsp = await signInWithEmailAndPassword(auth, email, password);

    return rsp;
  }
);

export const resetPassword = createAsyncThunk(
  "user/reset-password",
  async email => {
    const rsp = await sendPasswordResetEmail(auth, email);
    return rsp;
  }
)

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
      state.user = {
        email: payload.user.email,
        displayName: payload.user.displayName,
        uid: payload.user.uid
      };
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

