import api from "@/libs/axios-config";
import { ApiResponse } from "@/types";
import { ICartItem } from "@/types/implements/cart-item";

interface CartItemRequest {
  paintingId: string;
  quantity: number;
}

export const getCart = async () => {
  try {
    const response = await api.get<ApiResponse<ICartItem[]>>(`/cart`);
    return response.data;
  } catch (error) {
    console.error("Error fetching cart:", error);
    throw error;
  }
};

export const caddCartItem = async (body: CartItemRequest) => {
  try {
    const response = await api.post<ApiResponse<ICartItem>>(
      `/cart/create`,
      body
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching cart:", error);
    throw error;
  }
};

export const deleteCartItem = async (cartItemId: string) => {
  try {
    const response = await api.delete<ApiResponse<void>>(
      `/cart/delete/${cartItemId}`
    );
    return response.data;
  } catch (error) {
    console.error("Error deleting cart item:", error);
    throw error;
  }
};
