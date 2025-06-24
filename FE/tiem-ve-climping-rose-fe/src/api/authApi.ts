import api from "@/libs/axios-config";
import { showError } from "@/libs/toast";
import { ApiResponse } from "@/types";
import { IUser } from "@/types/implements";
import { log } from "console";

export interface LoginRequest {
  username: string;
  password: string;
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

export interface LoginRequest {
  username: string;
  password: string;
}
