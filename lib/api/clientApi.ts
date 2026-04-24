import { User } from "@/types/user";
import { nextServer } from "./api";

export const checkSession = async () => {
  const { data } = await nextServer.post("/auth/refresh");
  return data.success;
};

export const getUser = async (): Promise<User> => {
  const { data } = await nextServer.get<User>("/users/current");
  return data;
};
