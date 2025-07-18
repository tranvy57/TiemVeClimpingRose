import api from "@/libs/axios-config";
import { ApiResponse } from "@/types";
import { ICoupon } from "@/types/implements/coupon";

export const getCoupons = async () => {
  try {
    const response = await api.get<ApiResponse<ICoupon[]>>(`/coupons`);
    console.log("Coupons", response);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getCouponByCode = async (code: string) => {
  try {
    const response = await api.get<ApiResponse<ICoupon>>(`/coupons/${code}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
