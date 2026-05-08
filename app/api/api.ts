import axios from "axios";

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_RENDER_API_URL,
  withCredentials: true,
});
