import api from "@/libs/axios-config";
import { ApiResponse } from "@/types";
import { ICategory, IPainting } from "@/types/implements/painting";

export const getCategories = async () => {
  try {
    const response = await api.get<ApiResponse<ICategory[]>>(`/categories`);
    console.log("categories", response);

    return response.data;
  } catch (error) {
    throw error;
  }
};
