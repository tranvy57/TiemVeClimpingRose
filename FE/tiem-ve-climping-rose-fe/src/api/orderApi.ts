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

export interface OrderRequest {
  orderDate: Date;
  deliveryCost: number;
  totalPaintingsPrice: number;
  note?: string;
  paymentMethod: string;
  receiverName: string;
  phone: string;
  email: string;
  postalCode: string;
  contact: string;
  cartItemIds: string[];
  couponCode?: string;
  zipCode: string;
  prefecture: string; // tỉnh/thành phố
  city: string; // thành phố hoặc quận
  town: string; // thị trấn
  addressDetail: string;
}

export const createOrder = async (body: OrderRequest) => {
  try {
    const response = await api.post<ApiResponse<IOrder>>(
      `/orders/create`,
      body
    );

    return response.data;
  } catch (error) {
    throw error;
  }
};
