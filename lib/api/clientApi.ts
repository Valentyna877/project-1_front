import { User } from "@/types/user";
import { nextServer } from "./api";
import { Task } from "@/types/task";
import { WeekInfo } from "@/types/weeks";
import { GetAllTasks, TaskDone } from "@/types/task";
import { CreateDiaryDto, DiaryEntry } from "@/types/diary";

export interface UserRegCreds {
  name: string;
  email: string;
  password: string;
}

export type UserLogCreds = Omit<UserRegCreds, 'name'>;

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

export interface NewTask {
  name: string;
  date: string;
  isDone: boolean;
}

export const createTask = async (newTask: NewTask) => {
  const response = await nextServer.post<Task>("/tasks", newTask);
  return response.data;
};

export const weekInfo = async () => {
  const { data } = await nextServer.get<WeekInfo>("/weeks");

  return data;
};

export const weekInfoPublic = async () => {
  const { data } = await nextServer.get<WeekInfo>("/weeks/demo");

  return data;
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

export const getAllTask = async () => {
  const { data } = await nextServer.get<GetAllTasks[]>("/tasks");

  return data;
}

export const checkedTask = async (status: TaskDone) => {
  const { data } = await nextServer.patch<TaskDone>('/tasks/status', status )
  
  return data
}

export async function getDiaries(): Promise<DiaryEntry[]> {
  const { data } = await nextServer.get<DiaryEntry[]>("/diaries");
  return data;
}

export async function getDiary(entryId: string): Promise<DiaryEntry> {
  const { data } = await nextServer.get<DiaryEntry>(`/diaries/${entryId}`);
  return data;
}

export async function createDiary(payload: CreateDiaryDto): Promise<DiaryEntry> {
  const { data } = await nextServer.post<DiaryEntry>("/diaries", payload);
  return data;
}

export async function updateDiary(entryId: string, payload: CreateDiaryDto): Promise<DiaryEntry> {
  const { data } = await nextServer.patch<DiaryEntry>(`/diaries/${entryId}`, payload);
  return data;
}

export async function deleteDiary(entryId: string): Promise<void> {
  const { data } = await nextServer.delete(`/diaries/${entryId}`);
  return data
  
}