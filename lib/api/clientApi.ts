import { User } from '@/types/user';
import { nextServer } from './api';
import { Task } from '@/types/task';

export interface UserCreds {
  name: string;
  email: string;
  password: string;
}

export const getUser = async (): Promise<User> => {
  const { data } = await nextServer.get<User>('/users/current');
  return data;
};

export const checkSession = async () => {
  const { data } = await nextServer.get('/auth/refresh');

  return data.success;
};

export const registerUser = async (user: UserCreds): Promise<User> => {
  const { data } = await nextServer.post<User>('/auth/register', user);
  return data;
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
