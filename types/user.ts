// export interface User {
//   email: string;
//   name: string;
//   avatar: string;
//   date: Date;
//   gender: "boy" | "girl" | null;
// }
export type childGender = "boy" | "girl" | "unknown";

export interface User {
  _id: string;
  email: string;
  name: string;
  avatar: string;
  dueDate?: string | null;
  gender?: childGender;
  createdAt: string;
  updatedAt: string;
}
export interface UpdateUserPayload {
  dueDate?: string;
  gender?: "boy" | "girl" | "unknown";
}
