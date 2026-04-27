import { User } from "@/types/user";
import { BabyState, MomState, WeekSummary } from "@/types/weeks";
import { nextServer } from "./api";

export interface UserRegCreds {
  name: string;
  email: string;
  password: string;
}

export type UserLogCreds = Omit<UserRegCreds, "name">;

export const getUser = async (): Promise<User> => {
  const { data } = await nextServer.get<User>("/users/me");
  return data;
};

export const checkSession = async () => {
  const { data } = await nextServer.get("/auth/refresh");

  return data.success;
};

export const registerUser = async (user: UserRegCreds): Promise<User> => {
  const { data } = await nextServer.post<User>("/auth/register", user);
  return data;
};

export const loginUser = async (user: UserLogCreds): Promise<User> => {
  const { data } = await nextServer.post<User>("/auth/login", user);
  return data;
};

export const logoutUser = async (): Promise<void> => {
  await nextServer.post("/auth/logout");
};

export const updateAvatar = async (file: File): Promise<{ url: string }> => {
  const formData = new FormData();
  formData.append("avatar", file);
  const { data } = await nextServer.patch<{ url: string }>(
    "/users/me/avatar",
    formData,
  );
  return data;
};

export const getWeekSummary = async (): Promise<WeekSummary> => {
  const { data } = await nextServer.get<WeekSummary>("/weeks");
  return data;
};

const isMissingWeekResponse = (data: unknown): boolean =>
  typeof data === "object" &&
  data !== null &&
  "error" in data &&
  !("_id" in data);

export class WeekDataMissingError extends Error {
  constructor(weekNumber: number) {
    super(`No week data for week ${weekNumber}`);
    this.name = "WeekDataMissingError";
  }
}

export const getBabyWeek = async (weekNumber: number): Promise<BabyState> => {
  const { data } = await nextServer.get<BabyState>(`/weeks/baby/${weekNumber}`);
  if (isMissingWeekResponse(data)) throw new WeekDataMissingError(weekNumber);
  return data;
};

export const getMomWeek = async (weekNumber: number): Promise<MomState> => {
  const { data } = await nextServer.get<MomState>(`/weeks/mom/${weekNumber}`);
  if (isMissingWeekResponse(data)) throw new WeekDataMissingError(weekNumber);
  return data;
};