import api from "@/libs/axios-config";
import { showError } from "@/libs/toast";
import { ApiResponse } from "@/types";
import { IUser } from "@/types/implements";
import { log } from "console";

export interface LoginRequest {
  username: string;
  password: string;
}

export interface LogoutRequest {
  token: string;
}

export interface CheckTokenRequest {
  token: string;
}

export const login = async (body: LoginRequest) => {
  try {
    const response = await api.post<
      ApiResponse<{ token: string; user: IUser }>
    >(`/auth/login`, body);

    console.log("Login response at api:", response);

    return response.data;
  } catch (error) {
    // console.log("Login error at api:", error);
    throw error;
  }
};

export const logout = async (body: LogoutRequest) => {
  try {
    const response = await api.post<ApiResponse<void>>(`/auth/logout`, body);
    console.log("Logout response at api:", response);
    return response.data;
  } catch (error) {
    console.log("Logout error at api:", error);
    showError("Logout failed. Please try again.");
    throw error;
  }
};

export const checkToken = async (body: CheckTokenRequest) => {
  try {
    const response = await api.post<ApiResponse<{ valid: boolean }>>(
      `/auth/introspect`,
      body
    );
    console.log("Check token response at api:", response);
    return response.data;
  } catch (error) {
    console.log("Check token error at api:", error);
    showError("Token validation failed. Please log in again.");
    throw error;
  }
};
