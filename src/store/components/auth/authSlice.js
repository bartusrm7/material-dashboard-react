const initialState = {
  user: null,
  isLogged: false,
  isLoading: false,
  error: null,
};

export const userLogin = createAsyncThunk("user/login", async (userData, { rejectWithValue }) => {
  try {
    const response = await fetch("http://localhost:3001/login", {
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

export const registerSlice = createSlice({
  name: "register",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(userRegister.pending, (state) => {
        state.isLogged = false;
        state.loading = true;
        state.error = null;
      })
      .addCase(userRegister.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isLogged = true;
        state.loading = false;
        state.isLoggedIn = true;
      })
      .addCase(userRegister.rejected, (state, action) => {
        state.isLogged = false;
        state.loading = false;
        state.error = action.payload;
      });
  },
});
