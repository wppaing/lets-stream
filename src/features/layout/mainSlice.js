import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isNavOpen: false,
  navHeight: "0",
  theme: "",
  showlrc: false,
};

export const mainSlice = createSlice({
  name: "main",
  initialState,
  reducers: {
    setnavopen: (state) => {
      state.isNavOpen = !state.isNavOpen;
    },
    setnavheight: (state, action) => {
      state.navHeight = action.payload;
    },
    settheme: (state, action) => {
      state.theme = action.payload;
    },
    setshowlrc: (state, action) => {
      state.showlrc = action.payload;
    },
  },
});

export const { setnavopen, setnavheight, settheme, setshowlrc } =
  mainSlice.actions;

export default mainSlice.reducer;
