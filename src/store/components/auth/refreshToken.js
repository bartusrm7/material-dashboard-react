import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  accessToken: "",
  loading: false,
  error: null,
};

export const refreshAccessTokenThunk = createAsyncThunk(
  "/refresh-token",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch("http://localhost:3001/refresh-token", {
        method: "POST",
        credentials: "include",
      });
      if (!response.ok) {
        const errorData = await response.json();
        return rejectWithValue({ error: errorData.error });
      }
      const data = await response.json();
      return { accessToken: data.accessToken };
    } catch (error) {
      return rejectWithValue({ error: error.message });
    }
  }
);

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(refreshAccessTokenThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(refreshAccessTokenThunk.fulfilled, (state, action) => {
        state.accessToken = action.payload.accessToken;
        state.loading = false;
        state.error = null;
      })
      .addCase(refreshAccessTokenThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});
