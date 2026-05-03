// export type childGender = "boy" | "girl" | "unknown";

// export interface User {
//   _id: string;
//   email: string;
//   name: string;
//   avatar: string;
//   dueDate?: string;
//   gender?: childGender | null;
//   createdAt: string;
//   updatedAt: string;
// }
// export interface UpdateUserPayload {
//   dueDate?: string;
//   gender?: "boy" | "girl" | "unknown";
// }

import { GenderValue } from '@/components/common/GenderSelect/gender-select.types';

export interface User {
  _id: string;
  email: string;
  name: string;
  avatar: string;
  date: string | null;
  gender: GenderValue | null;
  createdAt: string;
  updatedAt: string;
}

export interface UpdateUserPayload {
  name?: string;
  email?: string;
  date?: string | null; 
  gender?: GenderValue | null;
}
