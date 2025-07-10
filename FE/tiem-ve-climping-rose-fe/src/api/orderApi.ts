import api from "@/libs/axios-config";
import { ApiResponse } from "@/types";
import { IOrder } from "@/types/implements/order";

export const getMyOrders = async () => {
  try {
    const response = await api.get<ApiResponse<IOrder[]>>("/orders/my-orders");
    return response.data;
  } catch (error) {
    throw error;
  }
};
