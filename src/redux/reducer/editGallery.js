import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "editGallery",
  initialState: {
    gallery: null,
  },
  reducers: {
    setEditGallery: (state, action) => {
      state.gallery = action.payload;
    },
  },
});

export const { setEditGallery } = authSlice.actions;
export default authSlice.reducer;
