import axios from "axios";

export const api = axios.create({
  baseURL: "project-1-back.onrender.com/api",
  withCredentials: true,
});
