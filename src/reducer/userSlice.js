import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: JSON.parse(localStorage.getItem("user")) || null,
  loading: false,
  error: false,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginStart: function (state) {
      state.loading = true;
    },
    loginSuccess: function (state, action) {
      state.loading = false;
      state.currentUser = action.payload;
    },
    loginFailure: function (state) {
      state.loading = false;
      state.error = true;
    },
    logout: function (state) {
      return initialState;
    },
    subscription: (state, action) => {
      if (state.currentUser.subscribedUsers.includes(action.payload)) {
        state.currentUser.subscribedUsers.splice(
          state.currentUser.subscribedUsers.findIndex(
            (channelId) => channelId === action.payload
          ),
          1
        );
      } else {
        state.currentUser.subscribedUsers.push(action.payload);
      }
      localStorage.setItem("user", JSON.stringify(state.currentUser));
    },
  },
});

export const { loginStart, loginSuccess, loginFailure, logout, subscription } =
  userSlice.actions;
export default userSlice.reducer;
