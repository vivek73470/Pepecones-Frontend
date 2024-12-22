import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "editSubCategory",
  initialState: {
    subCategory: null,
  },
  reducers: {
    setEditSubCategory: (state, action) => {
      state.subCategory = action.payload;
    },
  },
});

export const { setEditSubCategory } = authSlice.actions;
export default authSlice.reducer;
