import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentSong: null,
  currentIndex: 0,
  currentData: [],
  isPlaying: false,
  duration: 0,
  currenttime: 0,
  buffered: 0,
};

export const audioSlice = createSlice({
  name: "AudioSlice",
  initialState,
  reducers: {
    setcurrentsong: (state, action) => {
      state.currentSong = action.payload;
    },
    setcurrentindex: (state, action) => {
      state.currentIndex = action.payload;
    },
    setcurrentdata: (state, action) => {
      state.currentData = action.payload;
    },
    setisplaying: (state, action) => {
      state.isPlaying = action.payload;
    },
    setduration: (state, action) => {
      state.duration = action.payload;
    },
    setcurrenttime: (state, action) => {
      state.currenttime = action.payload;
    },
    setbuffered: (state, action) => {
      state.buffered = action.payload;
    },
  },
});

export const {
  setcurrentsong,
  setcurrentindex,
  setcurrentdata,
  setisplaying,
  setduration,
  setcurrenttime,
  setbuffered,
} = audioSlice.actions;

export default audioSlice.reducer;
