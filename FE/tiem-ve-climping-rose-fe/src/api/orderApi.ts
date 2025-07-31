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

export const getOrderById = async (orderId: string) => {
  try {
    const response = await api.get<ApiResponse<IOrder>>(`/orders/${orderId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export interface OrderUpdateRequest {
  deliveryCost: number;
  totalPaintingsPrice: number;
  status: string;
  note: string;
  paymentMethod: string;
  receiverName: string;
  phone: string;
  email: string;
  postalCode: string;
  contact: string;
  zipCode: string;
  prefecture: string;
  city: string;
  town: string;
  addressDetail: string;
  imagePayment: string;
}

export const updateOrder = async (
  orderId: string,
  body: OrderUpdateRequest
) => {
  try {
    const response = await api.put<ApiResponse<IOrder>>(
      `/orders/${orderId}`,
      body
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const cancelOrder = async (orderId: string) => {
  try {
    const response = await api.put<ApiResponse<void>>(
      `/orders/cancel/${orderId}`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};
