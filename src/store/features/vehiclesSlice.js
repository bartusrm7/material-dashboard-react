import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  vehiclesData: {},
  locationData: {},
  loading: false,
  error: null,
};

export const getVehiclesDataAPIThunk = createAsyncThunk(
  "/get-all-vehicles",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch("http://localhost:3001/get-all-vehicles", {
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

export const getVehiclesLocalizationByRegistrationThunk = createAsyncThunk(
  "/vehicle-localization",
  async (registration, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `http://localhost:3001/vehicle-localization?registration=${registration}`,
        {
          method: "GET",
          headers: {
            "Content-type": "application/json",
          },
        }
      );
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
      })

      .addCase(getVehiclesLocalizationByRegistrationThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getVehiclesLocalizationByRegistrationThunk.fulfilled, (state, action) => {
        state.locationData = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(getVehiclesLocalizationByRegistrationThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      }),
});
