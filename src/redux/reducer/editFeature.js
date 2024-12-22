import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "editFeature",
  initialState: {
    feature: null,
  },
  reducers: {
    setEditFeature: (state, action) => {
      state.feature = action.payload;
    },
  },
});

export const { setEditFeature } = authSlice.actions;
export default authSlice.reducer;
