// import { cookies } from 'next/headers';
// import { nextServer } from './api';

// export const checkSession = async () => {
//   const cookiesStore = await cookies();
//   const res = await nextServer.get('/auth/refresh', {
//     headers: { Cookie: cookiesStore.toString() },
//   });

//   return res;
// };

import { cookies } from 'next/headers';
import { nextServer } from './api';
import { Task, UpdatedTask, UpdateTask, GetAllTasks, TaskDone } from '@/types/task';
import { CreateDiaryDto, DiaryEntry } from '@/types/diary';
import { BabyState, MomState, WeekInfo } from '@/types/weeks';
import { UpdateUserPayload, User } from '@/types/user';
import { UseGoogleLoginOptionsAuthCodeFlow } from '@react-oauth/google';

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

interface UserGoogle extends User {
  isNewUser: boolean;
}

// ===========================================================================
export const cookieHeaders = async () => {
  const cookieStore = await cookies();
  return { Cookie: cookieStore.toString() };
};

// ---------------- AUTH ----------------
export const getServerUser = async (): Promise<User> => {
  const headers = await cookieHeaders();
  const { data } = await nextServer.get<User>('/users/me', { headers });
  return data;
};

// export const checkSession = async () => {
//   const headers = await cookieHeaders();
//   const { data } = await nextServer.get('/auth/refresh', { headers });
//   return data.success;
// };

export const checkSession = async () => {
  const res = await nextServer.get('/auth/refresh', {
    headers: await cookieHeaders(),
  });
  return res;
};


export const registerServerUser = async (user: UserRegCreds): Promise<User> => {
  const { data } = await nextServer.post<User>('/auth/register', user);
  return data;
};

export const loginServerUser = async (user: UserLogCreds): Promise<User> => {
  const { data } = await nextServer.post<User>('/auth/login', user);
  return data;
};

export const loginServerGoogle = async (
  googleResponse: UseGoogleLoginOptionsAuthCodeFlow
): Promise<UserGoogle> => {
  const { data } = await nextServer.post<UserGoogle>('/auth/google', googleResponse);
  return data;
};

export const logoutServerUser = async (): Promise<void> => {
  await nextServer.post('/auth/logout');
};

// ---------------- TASKS ----------------
export interface NewTask {
  name: string;
  date: string;
  isDone: boolean;
  _id?: string;
}

export const createServerTask = async (newTask: NewTask) => {
  const headers = await cookieHeaders();
  const { data } = await nextServer.post<Task>('/tasks', newTask, { headers });
  return data;
};

export const getServerAllTasks = async () => {
  const headers = await cookieHeaders();
  if (!headers.Cookie.includes('accessToken')) {
    return []; 
  }
  const { data } = await nextServer.get<GetAllTasks[]>('/tasks', { headers });
  return data;
};

export const updateServerTask = async (updated: UpdatedTask) => {
  const headers = await cookieHeaders();
  const { data } = await nextServer.patch<UpdateTask>(
    `/task/${updated.taskId}`,
    { update: updated.payload },
    { headers }
  );
  return data;
};

export const checkServerTask = async (status: TaskDone) => {
  const headers = await cookieHeaders();
  const { data } = await nextServer.patch<TaskDone>(
    `/tasks/${status.taskId}/status`,
    { isDone: status.isDone },
    { headers }
  );
  return data;
};

export const deleteServerTask = async (taskId: string) => {
  const headers = await cookieHeaders();
  await nextServer.delete(`/tasks/${taskId}`, { headers });
};

// ---------------- DIARIES ----------------
export const getServerDiaries = async (): Promise<DiaryEntry[]> => {
  const headers = await cookieHeaders();
  const { data } = await nextServer.get<DiaryEntry[]>('/diaries', { headers });
  return data;
};

export const getServerDiary = async (entryId: string): Promise<DiaryEntry> => {
  const headers = await cookieHeaders();
  const { data } = await nextServer.get<DiaryEntry>(`/diaries/${entryId}`, { headers });
  return data;
};

export const createServerDiary = async (payload: CreateDiaryDto): Promise<DiaryEntry> => {
  const headers = await cookieHeaders();
  const { data } = await nextServer.post<DiaryEntry>('/diaries', payload, { headers });
  return data;
};

export const updateServerDiary = async (entryId: string, payload: CreateDiaryDto): Promise<DiaryEntry> => {
  const headers = await cookieHeaders();
  const { data } = await nextServer.patch<DiaryEntry>(`/diaries/${entryId}`, payload, { headers });
  return data;
};

export const deleteServerDiary = async (entryId: string): Promise<void> => {
  const headers = await cookieHeaders();
  await nextServer.delete(`/diaries/${entryId}`, { headers });
};

// ---------------- WEEKS ----------------
export const getServerWeekInfo = async (): Promise<WeekInfo> => {
  const headers = await cookieHeaders();
  const { data } = await nextServer.get<WeekInfo>('/weeks', { headers });
  return data;
};

export const getServerWeekInfoPublic = async (): Promise<WeekInfo> => {
  const { data } = await nextServer.get<WeekInfo>('/weeks/demo');
  return data;
};

export const getServerBabyWeek = async (weekNumber: number): Promise<BabyState> => {
  const headers = await cookieHeaders();
  const { data } = await nextServer.get<BabyState>(`/weeks/baby/${weekNumber}`, { headers });
  return data;
};

export const getServerMomWeek = async (weekNumber: number): Promise<MomState> => {
  const headers = await cookieHeaders();
  const { data } = await nextServer.get<MomState>(`/weeks/mom/${weekNumber}`, { headers });
  return data;
};

// ---------------- EMOTIONS ----------------
export const getServerEmotions = async (): Promise<Emotions[]> => {
  const headers = await cookieHeaders();
  const { data } = await nextServer.get<Emotions[]>('/emotions', { headers });
  return data;
};

// ---------------- USER ----------------
export const updateServerUser = async (payload: UpdateUserPayload): Promise<User> => {
  const headers = await cookieHeaders();
  const { data } = await nextServer.patch<User>('/users/current', payload, { headers });
  return data;
};

export const updateServerAvatar = async (file: File): Promise<{ url: string }> => {
  const headers = await cookieHeaders();
  const formData = new FormData();
  formData.append('avatar', file);
  const { data } = await nextServer.patch<{ url: string }>('/users/me/avatar', formData, { headers });
  return data;
};
