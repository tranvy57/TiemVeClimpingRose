import { login } from "@/api/authApi";
import { IUser } from "@/types/implements";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

interface AuthState {
  user: IUser | null;
  accessToken: string | null;
  authenticated: boolean;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  accessToken: Cookies.get("accessToken") || null,
  authenticated: false,
  loading: false,
  error: null,
};

export const doLogin = createAsyncThunk<
  { user: IUser; accessToken: string; authenticated: boolean }, // kiểu trả về khi fulfilled
  { username: string; password: string }, // kiểu tham số truyền vào
  { rejectValue: string } // kiểu reject
>("auth/login", async (data, { rejectWithValue }) => {
  try {
    const response = await login(data);
    if (!response.data) {
      return rejectWithValue("Login failed. Invalid response from server.");
    }
    const { token, user } = response.data;

    localStorage.setItem("accessToken", token);
    // Cookies.set("accessToken", token);

    return {
      user,
      accessToken: token,
      authenticated: true,
    };
  } catch (error) {
    return rejectWithValue("Login failed. Please check your credentials.");
  }
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAccessToken(state, action: PayloadAction<string>) {
      state.accessToken = action.payload;
      //   Cookies.set("accessToken", action.payload);
      localStorage.setItem("accessToken", action.payload);
    },
    logout(state) {
      state.user = null;
      state.accessToken = null;
      state.authenticated = false;
      //   Cookies.remove("accessToken");
      localStorage.removeItem("accessToken");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(doLogin.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(doLogin.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.accessToken = action.payload.accessToken;
        state.authenticated = action.payload.authenticated;
      })
      .addCase(doLogin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Unknown error";
      });
  },
});

export const { setAccessToken, logout } = authSlice.actions;
export default authSlice.reducer;
