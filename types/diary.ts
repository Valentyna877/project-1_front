export interface DiaryEntry {
  id: string
  _id?: string
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