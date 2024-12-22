import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "blogData",
  initialState: {
    data: null,
  },
  reducers: {
    setBlogdata: (state, action) => {
      state.data = action.payload;
    },
  },
});

export const { setBlogdata } = authSlice.actions;
export default authSlice.reducer;
