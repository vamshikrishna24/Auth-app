import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: null,
  error: false,
  loading: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    signInStart: (state) => {
      state.loading = true;
    },
    signInSuccess: (state, action) => {
      state.currentUser = action.payload;
      state.loading = false;
      state.error = false;
    },
    signInFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    updateUserStart: (state) => {
      state.loading = true;
    },
    updateUserFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    updateUserSuccess: (state, action) => {
      state.loading = false;
      state.error = false;
      state.currentUser = action.payload;
    },
    deleteUserStart: (state) => {
      state.loading = true;
    },
    deleteUserFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    deleteUserSuccess: (state) => {
      state.loading = false;
      state.error = false;
      state.currentUser = null;
    },
    signOut: (state) => {
      state.loading = false;
      state.error = false;
      state.currentUser = null;
    },
  },
});

export const {
  signInStart,
  signInFailure,
  signInSuccess,
  updateUserFailure,
  updateUserStart,
  updateUserSuccess,
  deleteUserFailure,
  deleteUserStart,
  deleteUserSuccess,
  signOut,
} = userSlice.actions;
export default userSlice.reducer;
