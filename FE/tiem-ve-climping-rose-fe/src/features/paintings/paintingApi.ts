import api from "@/libs/axios-config";
import { ApiResponse } from "@/types";
import { IPainting } from "@/types/implements/painting";
import { PageResponse } from "@/types/page-response";
import axios from "axios";

export const getPaintings = async (page: number, size: number) => {
  try {
    const response = await api.get<ApiResponse<PageResponse<IPainting>>>(
      `/paintings?page=${page}&size=${size}`
    );

    return response.data;
  } catch (error) {
    throw error;
  }
};
