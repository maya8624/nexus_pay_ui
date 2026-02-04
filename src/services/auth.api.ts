// auth.api.ts
import type { User } from "../types/user";
import api from "./apiClient";

export const fetchMe = async (): Promise<User> => {
  const res = await api.get<User>("/me");
  return res.data;
};
