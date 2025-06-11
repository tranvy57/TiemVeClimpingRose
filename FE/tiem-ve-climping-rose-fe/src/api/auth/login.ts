import { BaseResponse } from "@/types";
import { IUser } from "@/types/implements";
import axios from "axios";

export interface LoginRequest {
  username: string;
  password: string;
}

export const login = async (body: LoginRequest) => {
  try {
    const response = await axios.post<
      BaseResponse<{ token: string; user: IUser }>
    >(
      `${process.env.NEXT_PUBLIC_API_URL}${process.env.NEXT_PUBLIC_API_URL_USER_SERVICE}/auth/token`,
      body
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};
