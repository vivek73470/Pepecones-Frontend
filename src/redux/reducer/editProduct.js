import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "editProduct",
  initialState: {
    product: null,
  },
  reducers: {
    setEditProducts: (state, action) => {
      state.product = action.payload;
    },
  },
});

export const { setEditProducts } = authSlice.actions;
export default authSlice.reducer;
