import api from "@/libs/axios-config";
import { ApiResponse } from "@/types";
import { IUser } from "@/types/implements";

export const getMyInfo = async () => {
  try {
    const response = await api.get<ApiResponse<IUser>>(`/users/my-info`);
    return response.data;
  } catch (error) {
    throw error;
  }
};


