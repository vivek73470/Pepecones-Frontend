import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "blogProduct",
  initialState: {
    data: null,
  },
  reducers: {
    setProductdata: (state, action) => {
      state.data = action.payload;
    },
  },
});

export const { setProductdata } = authSlice.actions;
export default authSlice.reducer;
