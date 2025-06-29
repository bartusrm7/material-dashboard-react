import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  vehiclesData: {},
  locationData: {},
  curiousData: {},
  loading: false,
  error: null,
};

export const getVehiclesDataAPIThunk = createAsyncThunk(
  "/get-all-vehicles",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(
        "https://mui-dashboard-backend-t9uw.onrender.com/get-all-vehicles",
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

export const getVehiclesLocalizationByRegistrationThunk = createAsyncThunk(
  "/vehicle-localization",
  async (registration, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `https://mui-dashboard-backend-t9uw.onrender.com/vehicle-localization?registration=${registration}`,
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

export const getVehiclesLocalizationByRegistrationAndDateThunk = createAsyncThunk(
  "/vehicle-date-localization",
  async ({ registration, start_timestamp, end_timestamp }, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `https://mui-dashboard-backend-t9uw.onrender.com/vehicle-date-localization?registration=${registration}&start_timestamp=${start_timestamp}&end_timestamp=${end_timestamp}`,
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

export const getVehiclesCuriousDataThunk = createAsyncThunk(
  "/vehicle-curious-data",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `https://mui-dashboard-backend-t9uw.onrender.com/vehicles-curious-data`,
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
      })

      .addCase(getVehiclesLocalizationByRegistrationAndDateThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getVehiclesLocalizationByRegistrationAndDateThunk.fulfilled, (state, action) => {
        state.locationData = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(getVehiclesLocalizationByRegistrationAndDateThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(getVehiclesCuriousDataThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getVehiclesCuriousDataThunk.fulfilled, (state, action) => {
        state.curiousData = action.payload.map((vehicle) => ({
          registration: vehicle.registration,
          odometer: vehicle.odometer,
          road_speed: vehicle.road_speed,
        }));
        state.loading = false;
        state.error = null;
      })
      .addCase(getVehiclesCuriousDataThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      }),
});
