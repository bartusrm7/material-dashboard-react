import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  fuelData: {},
  loading: false,
  error: null,
};

export const getFuelPrices = createAsyncThunk("/fuel-data", async (_, { rejectWithValue }) => {
  try {
    const response = await fetch("https://mui-dashboard-backend-t9uw.onrender.com/fuel-data", {
      method: "GET",
      headers: {
        "Content-type": "application/json",
      },
    });
    if (!response.ok) {
      const errorData = await response.json();
      return rejectWithValue({ error: errorData.error });
    }
    return await response.json();
  } catch (error) {
    return rejectWithValue({ error: error.message });
  }
});

export const onlineSlice = createSlice({
  name: "online",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getFuelPrices.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getFuelPrices.fulfilled, (state, action) => {
        state.fuelData = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(getFuelPrices.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});
