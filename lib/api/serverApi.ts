import { cookies } from "next/headers";
import { nextServer } from "./api";

export const checkSession = async () => {
  const cookiesStore = await cookies();
  const res = await nextServer.get("/auth/session", {
    headers: { Cookie: cookiesStore.toString() },
  });

  return res;
};
