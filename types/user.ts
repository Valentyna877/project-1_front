export interface User {
  email: string;
  username: string;
  avatar: string;
  date: Date;
  gender: "boy" | "girl" | null;
}
