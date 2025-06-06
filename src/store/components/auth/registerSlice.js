import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  isLoading: false,
  error: null,
};

export const userRegister = createAsyncThunk(
  "user/register",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await fetch("http://localhost:3001/register", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(userData),
        credentials: "include",
      });
      if (!response.ok) {
        const errorData = await response.json();
        return rejectWithValue({ error: errorData.error });
      }
      return await response.json();
    } catch (error) {
      return rejectWithValue({ error: error.message });
    }
  }
);

export const registerSlice = createSlice({
  name: "register",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(userRegister.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(userRegister.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isLoading = false;
        state.isLoggedIn = true;
      })
      .addCase(userRegister.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});
