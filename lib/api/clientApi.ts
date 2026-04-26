import { User } from "@/types/user";
import { nextServer } from "./api";

export interface UserCreds {
  name: string;
  email: string;
  password: string;
}

export const getUser = async (): Promise<User> => {
  const { data } = await nextServer.get<User>("/users/current", {
    headers: {
      Authorization: 'UF00fu1z1zC4vNxL5Wi8RrI1IvvT%2B8AMcoLxf%2B7N; Path=/; Secure; HttpOnly; Expires=Sun, 26 Apr 2026 21:02:08 GMT'
    }
  }
  );
  return data;
};

export const checkSession = async () => {
  const { data } = await nextServer.get("/auth/refresh");

  return data.success;
};

export const registerUser = async (user: UserCreds): Promise<User> => {
  const { data } = await nextServer.post<User>("/auth/register", user);
  return data;
};
