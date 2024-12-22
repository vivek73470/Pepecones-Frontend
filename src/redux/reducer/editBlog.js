import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "editBlog",
  initialState: {
    blog: null,
  },
  reducers: {
    setEditBlog: (state, action) => {
      state.blog = action.payload;
    },
  },
});

export const { setEditBlog } = authSlice.actions;
export default authSlice.reducer;
