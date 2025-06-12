import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  usdPlnData: {},
  gasOilData: {},
  nbpUsdPlnData: {},
  loading: false,
  error: null,
};

export const usdPlnDataThunk = createAsyncThunk(
  "/usd-pln-exchange",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch("http://localhost:3001/usd-pln-exchange", {
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

export const gasOilDataThunk = createAsyncThunk(
  "/gas-oil-price",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch("http://localhost:3001/gas-oil-price", {
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

export const nbpUsdPlnDataThunk = createAsyncThunk(
  "/nbp-usd-pln-exchange",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch("http://localhost:3001/nbp-usd-pln-exchange", {
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

export const quotesMarketDataSlice = createSlice({
  name: "quotesData",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(usdPlnDataThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(usdPlnDataThunk.fulfilled, (state, action) => {
        state.usdPlnData = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(usdPlnDataThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(gasOilDataThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(gasOilDataThunk.fulfilled, (state, action) => {
        state.gasOilData = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(gasOilDataThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(nbpUsdPlnDataThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(nbpUsdPlnDataThunk.fulfilled, (state, action) => {
        state.gasOilData = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(nbpUsdPlnDataThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});
