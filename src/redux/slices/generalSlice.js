import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: 0,
  error: null,
};

const generalSlice = createSlice({
  name: "general",
  initialState,
  reducers: {
    setLoading(state, action) {
      state.isLoading = action.payload;
    },
    setError(state, action) {
      state.error = action.payload;
    },
  },
});

export const { setLoading, setError, setCacheData } = generalSlice.actions;

export default generalSlice;
