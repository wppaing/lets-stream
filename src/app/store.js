import { configureStore } from "@reduxjs/toolkit";
import layoutReducer from "../features/layout/mainSlice";
import audioReducer from "../features/audio/audioSlice";

export default configureStore({
  reducer: {
    layout: layoutReducer,
    audio: audioReducer,
  },
});
