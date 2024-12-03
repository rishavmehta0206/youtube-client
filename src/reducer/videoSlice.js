import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentVideo: null,
  loading: false,
  error: false,
};

export const videoSlice = createSlice({
  name: "video",
  initialState,
  reducers: {
    fetchStart: function (state) {
      state.loading = true;
    },
    fetchSuccess: function (state, action) {
      state.loading = false;
      state.currentVideo = action.payload;
    },
    fetchFailure: function (state) {
      state.loading = false;
      state.error = true;
    },
    like: function (state, action) {
      if (!state.currentVideo.likes.includes(action.payload)) {
        state.currentVideo.likes.push(action.payload);
        state.currentVideo.dislikes.splice(
          state.currentVideo.dislikes.findIndex(
            (userId) => userId === action.payload
          ),
          1
        );
      }
    },
    dislike: function (state, action) {
      console.log(state.currentVideo);
      if (!state.currentVideo.dislikes.includes(action.payload)) {
        state.currentVideo.dislikes.push(action.payload);
        state.currentVideo.likes.splice(
          state.currentVideo.likes.findIndex(
            (userId) => userId === action.payload
          ),
          1
        );
      }
    },
    views: function (state, action) {
        state.currentVideo.views += 1;
    },
  },
});

export const { fetchStart, fetchSuccess, fetchFailure, like, dislike,views } =
  videoSlice.actions;
export default videoSlice.reducer;
