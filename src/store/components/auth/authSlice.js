import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  accessToken: "",
  isLogged: false,
  loading: false,
  error: null,
};

export const userLogin = createAsyncThunk("/login", async (userData, { rejectWithValue }) => {
  try {
    const response = await fetch("https://mui-dashboard-backend-t9uw.onrender.com/login", {
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
});

export const authUserExternalGPSApi = createAsyncThunk(
  "/gps-auth-api",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch("https://mui-dashboard-backend-t9uw.onrender.com/gps-auth-api", {
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

export const refreshAccessTokenThunk = createAsyncThunk(
  "/refresh-token",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(
        "https://mui-dashboard-backend-t9uw.onrender.com/refresh-token",
        {
          method: "POST",
          credentials: "include",
        }
      );
      if (!response.ok) {
        const errorData = await response.json();
        return rejectWithValue({ error: errorData.error });
      }
      const data = await response.json();
      console.log(data);
      console.log({ accessToken: data.accessToken });
      return { accessToken: data.accessToken };
    } catch (error) {
      return rejectWithValue({ error: error.message });
    }
  }
);

export const userLogout = createAsyncThunk("/logout", async (_, { rejectWithValue }) => {
  try {
    const response = await fetch("https://mui-dashboard-backend-t9uw.onrender.com/logout", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      credentials: "include",
    });
    if (!response.ok) {
      const errorData = await response.json();
      return rejectWithValue({ error: errorData.error });
    }
    return { isLogged: false };
  } catch (error) {
    return rejectWithValue({ error: error.message });
  }
});

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(userLogin.pending, (state) => {
        state.isLogged = false;
        state.loading = true;
        state.error = null;
      })
      .addCase(userLogin.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isLogged = true;
        state.loading = false;
        state.error = null;
      })
      .addCase(userLogin.rejected, (state, action) => {
        state.isLogged = false;
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(authUserExternalGPSApi.pending, (state) => {
        state.isLogged = false;
        state.loading = true;
        state.error = null;
      })
      .addCase(authUserExternalGPSApi.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isLogged = true;
        state.loading = false;
        state.error = null;
      })
      .addCase(authUserExternalGPSApi.rejected, (state, action) => {
        state.isLogged = false;
        state.loading = false;
        state.error = action.payload;
      })

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
      })

      .addCase(userLogout.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(userLogout.fulfilled, (state, action) => {
        state.isLogged = action.payload.isLogged;
        state.accessToken = "";
        state.loading = false;
        state.error = null;
      })
      .addCase(userLogout.rejected, (state, action) => {
        state.isLogged = true;
        state.loading = false;
        state.error = action.payload;
      });
  },
});
