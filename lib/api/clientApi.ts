import { nextServer } from './api';
import { Task, UpdatedTask, UpdateTask } from '@/types/task';
import { GetAllTasks, TaskDone } from '@/types/task';
import { CreateDiaryDto, DiaryEntry } from '@/types/diary';
import { BabyState, MomState, WeekInfo } from '@/types/weeks';
import { UpdateUserPayload, User } from '@/types/user';

export interface UserRegCreds {
  name: string;
  email: string;
  password: string;
}

export interface Emotions {
  title: string;
  _id: string;
  isActive?: boolean;
}

export type UserLogCreds = Omit<UserRegCreds, 'name'>;

export const getUser = async (): Promise<User> => {
  const { data } = await nextServer.get<User>('/users/me');
  return data;
};

export const checkSession = async () => {
  const { data } = await nextServer.get('/auth/refresh');
  return data.success;
};

export const registerUser = async (user: UserRegCreds): Promise<User> => {
  const { data } = await nextServer.post<User>('/auth/register', user);
  return data;
};

export const loginUser = async (user: UserLogCreds): Promise<User> => {
  const { data } = await nextServer.post<User>('/auth/login', user);
  return data;
};

export const logoutUser = async (): Promise<void> => {
  await nextServer.post('/auth/logout');
};

export interface NewTask {
  name: string;
  date: string;
  isDone: boolean;
  _id?: string;
}

export const createTask = async (newTask: NewTask) => {
  const response = await nextServer.post<Task>('/tasks', newTask);
  return response.data;
};

export const weekInfo = async () => {
  const { data } = await nextServer.get<WeekInfo>('/weeks');
  return data;
};

export const weekInfoPublic = async () => {
  const { data } = await nextServer.get<WeekInfo>('/weeks/demo');
  return data;
};
export const updateUser = async (payload: UpdateUserPayload): Promise<User> => {
  const { data } = await nextServer.patch<User>('/users/current', payload);
  return data;
};

export const updateAvatar = async (file: File): Promise<{ url: string }> => {
  const formData = new FormData();
  formData.append('avatar', file);
  const { data } = await nextServer.patch<{ url: string }>(
    '/users/me/avatar',
    formData
  );
  return data;
};

export const getAllTask = async () => {
  const { data } = await nextServer.get<GetAllTasks[]>('/tasks');

  return data;
};

export const updateTask = async (updated: UpdatedTask) => {
  const update = updated.payload;
  const payload = { update };

  const { data } = await nextServer.patch<UpdateTask>(`/task/${updated.taskId}`, payload);

  return data
}

export const checkedTask = async (status: TaskDone) => {
  const isDone = status.isDone;
  const payload = { isDone };

  const { data } = await nextServer.patch<TaskDone>(
    `/tasks/${status.taskId}/status`,
    payload
  );
  return data;
};


export const deleteTask = async (taskId: string) => {
  const { data } = await nextServer.delete(`/tasks/${taskId}`);

  return data;
}

export async function getDiaries(): Promise<DiaryEntry[]> {
  const { data } = await nextServer.get<DiaryEntry[]>('/diaries');
  return data;
}

export async function getDiary(entryId: string): Promise<DiaryEntry> {
  const { data } = await nextServer.get<DiaryEntry>(`/diaries/${entryId}`);
  return data;
}

export async function createDiary(
  payload: CreateDiaryDto
): Promise<DiaryEntry> {
  const { data } = await nextServer.post<DiaryEntry>('/diaries', payload);
  return data;
}

export async function updateDiary(
  entryId: string,
  payload: CreateDiaryDto
): Promise<DiaryEntry> {
  const { data } = await nextServer.patch<DiaryEntry>(
    `/diaries/${entryId}`,
    payload
  );
  return data;
}

export async function deleteDiary(entryId: string): Promise<void> {
  const { data } = await nextServer.delete(`/diaries/${entryId}`);
  return data;
}

export const getBabyWeek = async (weekNumber: number): Promise<BabyState> => {
  const { data } = await nextServer.get<BabyState>(`/weeks/baby/${weekNumber}`);
  return data;
};

export const getMomWeek = async (weekNumber: number): Promise<MomState> => {
  const { data } = await nextServer.get<MomState>(`/weeks/mom/${weekNumber}`);
  return data;
};

export const getAllEmotions = async () => {
  const { data } = await nextServer.get<Emotions[]>('/emotions');

  return data;
};
