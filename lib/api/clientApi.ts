import { User } from '@/types/user';
import { nextServer } from './api';
import { Task } from '@/types/task';

export interface UserRegCreds {
  name: string;
  email: string;
  password: string;
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
}

export const createTask = async (newTask: NewTask) => {
  const response = await nextServer.post<Task>('/tasks', newTask);
  return response.data;
};
