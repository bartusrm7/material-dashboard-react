import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  vehiclesData: {},
  loading: false,
  error: null,
};

export const getVehiclesDataAPIThunk = createAsyncThunk(
  "/get-vehicles",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch("http://localhost:3001/get-vehicles", {
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
  }
);

export const vehiclesSlice = createSlice({
  name: "vehicles",
  initialState,
  reducers: {},
  extraReducers: (builder) =>
    builder
      .addCase(getVehiclesDataAPIThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getVehiclesDataAPIThunk.fulfilled, (state, action) => {
        state.vehiclesData = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(getVehiclesDataAPIThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      }),
});
