export interface Emotion {
  _id: string;
  title: string;
  description: string;
  isActive: boolean;
}

export interface DiaryEntry {
  _id: string;
  title: string;
  description: string;
  date: string;
  emotions: Emotion[];
  userId: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateDiaryDto {
  title: string;
  description: string;
  date: string;
  emotions: string[]; // відправляємо масив _id
}