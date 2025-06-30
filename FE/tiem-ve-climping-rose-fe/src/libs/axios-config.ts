import axios from "axios";
import Cookies from "js-cookie";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000,
});

api.interceptors.request.use((config) => {
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("accessToken");
    console.log("Token:", token);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

api.interceptors.response.use(
  (res) => res,
  async (error) => {
    const original = error.config;

    if (error.response?.status === 401 && !original._retry) {
      original._retry = true;

      try {
        const oldToken = localStorage.getItem("accessToken");
        if (!oldToken) throw new Error("No token");

        const res = await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}/auth/refresh`,
          {
            token: oldToken,
          }
        );

        const newToken = res.data?.token;
        if (newToken) {
          localStorage.setItem("accessToken", newToken);

          original.headers.Authorization = `Bearer ${newToken}`;
          return api(original); // retry
        } else {
          localStorage.removeItem("accessToken");
        }
      } catch (err) {
        localStorage.removeItem("accessToken");
      }
    }

    return Promise.reject(error);
  }
);

export default api;
