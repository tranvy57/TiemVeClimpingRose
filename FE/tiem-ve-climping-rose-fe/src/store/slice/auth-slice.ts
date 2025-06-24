import { checkToken, login } from "@/api/authApi";
import { clearAuth, getToken, saveAuth } from "@/libs/local-storage";
import { IUser } from "@/types/implements";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { clear } from "console";
import { get } from "http";
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

//Login
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

    saveAuth(token, user);
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

//Check token
export const doCheckToken = createAsyncThunk<
  { valid: boolean }, // kiểu dữ liệu khi fulfilled
  void, // không cần tham số
  { rejectValue: string } // kiểu dữ liệu khi bị reject
>("auth/checkToken", async (_, { rejectWithValue }) => {
  const token = getToken(); // lấy token từ localStorage
  if (!token) return rejectWithValue("No token");

  try {
    const res = await checkToken({ token });
    const valid = res.data?.valid;

    if (!valid) {
      clearAuth();
      return rejectWithValue("Token invalid");
    }

    return {
      valid: valid,
    };
  } catch {
    clearAuth();
    return rejectWithValue("Token invalid");
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
      clearAuth();
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
      })
      .addCase(doCheckToken.fulfilled, (state, action) => {
        state.authenticated = action.payload.valid;
        const savedUser = localStorage.getItem("user");
        if (savedUser) {
          state.user = JSON.parse(savedUser);
        }
      })
      .addCase(doCheckToken.rejected, (state) => {
        state.accessToken = null;
        state.user = null;
        state.authenticated = false;
      });
  },
});

export const { setAccessToken, logout } = authSlice.actions;
export default authSlice.reducer;
