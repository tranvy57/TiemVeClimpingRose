import api from "@/libs/axios-config";
import { ApiResponse } from "@/types";

interface IMessage {
  resutl: string;
}

interface ChatRequest {
  chat_id: string;
  user_input: string;
  user_id: string;
}

export const chat = async (body: ChatRequest) => {
  try {
    const response = await api.post<ApiResponse<IMessage>>(`/chat`, body);
    return response.data;
  } catch (error) {
    throw error;
  }
};
