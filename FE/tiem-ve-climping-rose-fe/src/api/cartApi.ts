import api from "@/libs/axios-config";
import { ApiResponse } from "@/types";
import { ICartItem } from "@/types/implements/cart-item";

export const getCart = async () => {
  try {
    const response = await api.get<ApiResponse<ICartItem[]>>(`/cart`);
    return response.data;
  } catch (error) {
    console.error("Error fetching cart:", error);
    throw error;
  }
};
