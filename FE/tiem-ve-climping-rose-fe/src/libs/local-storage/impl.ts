import { IUser } from "@/types/implements";

export const saveAuth = (token: string, user: IUser) => {
  localStorage.setItem("accessToken", token);
  localStorage.setItem("user", JSON.stringify(user));
};

export const clearAuth = () => {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("user");
};

export const getToken = () => localStorage.getItem("accessToken");
export const getUser = (): IUser | null => {
  const user = localStorage.getItem("user");
  return user ? JSON.parse(user) : null;
};
