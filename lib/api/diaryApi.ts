import axios from "axios";
import { env } from "process";

const api = axios.create({
  baseURL: `${env.BAZE_URL}`,
  headers: {
    "Content-Type": "application/json",
  },
});

export interface DiaryEntry {
  id: string;
  title: string;
  description: string;
  date: string;
  emotions: string[];
}

export interface CreateDiaryDto {
  title: string;
  description: string;
  date: string;
  emotions: string[];
}

export async function getDiaries(): Promise<DiaryEntry[]> {
  const { data } = await api.get<DiaryEntry[]>("/diaries");
  return data;
}

export async function getDiary(id: string): Promise<DiaryEntry> {
  const { data } = await api.get<DiaryEntry>(`/diaries/${id}`);
  return data;
}

export async function createDiary(payload: CreateDiaryDto): Promise<DiaryEntry> {
  const { data } = await api.post<DiaryEntry>("/diaries", payload);
  return data;
}

export async function updateDiary(id: string, payload: CreateDiaryDto): Promise<DiaryEntry> {
  const { data } = await api.patch<DiaryEntry>(`/diaries/${id}`, payload);
  return data;
}

export async function deleteDiary(id: string): Promise<void> {
  await api.delete(`/diaries/${id}`);
}