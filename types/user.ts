export interface User {
  email: string;
  name: string;
  avatar: string;
  date: Date;
  gender: "boy" | "girl" | null;
}
