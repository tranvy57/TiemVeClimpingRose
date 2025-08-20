import { get } from 'http';
import api from "@/libs/axios-config";
import { ApiResponse } from "@/types";
import axios from "axios";

interface IMessage {
  result: string;
}

export interface IChatHistory {
  role: "USER" | "AI";
  content: string
}

interface ChatRequest {
  chat_id: string;
  user_input: string;
  user_id: string;
}

export const chat = async (body: ChatRequest) => {
  try {
    const response = await axios.post<ApiResponse<IMessage>>(
      "https://climpingrose.com/ai/chat",
      body
    );

    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getChatHistory = async (page: number, size?: number) => {
  try {
    const response = await api.get<ApiResponse<IChatHistory[]>>(
      "/chat/my-chat-messages",
      {
        params: {
          page,
          size,
        },
      }
    );

    return response.data;
  } catch (error) {
    throw error;
  }
};

