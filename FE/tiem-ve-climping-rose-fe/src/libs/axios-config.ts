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
  const token = localStorage.getItem("token");
  const parseToken: {
    token: string;
    expiry: number;
  } = token ? JSON.parse(token) : null;

  if (token) {
    config.headers.Authorization = `Bearer ${parseToken.token}`;
  }
  return config;
});

// api.interceptors.response.use(
//   (res) => res,
//   async (error) => {
//     const original = error.config;

//     if (error.response?.status === 401 && !original._retry) {
//       original._retry = true;
//       try {
//         const token = Cookies.get("accessToken");
//         const res = await axios.post(
//           `${process.env.NEXT_PUBLIC_API_URL}/api/auth/refresh`,
//           {
//             token,
//           }
//         );

//         const newToken = res.data.data.token;
//         Cookies.set("accessToken", newToken);
//         store.dispatch(setAccessToken(newToken));

//         original.headers.Authorization = `Bearer ${newToken}`;
//         return api(original);
//       } catch (e) {
//         store.dispatch(logout());
//         return Promise.reject(e);
//       }
//     }

//     return Promise.reject(error);
//   }
// );

export default api;
