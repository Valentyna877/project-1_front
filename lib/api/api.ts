// import axios from "axios";

// export const nextServer = axios.create({
//   baseURL: process.env.NEXT_PUBLIC_API_URL + "/api",
//   withCredentials: true,
// });

import axios, { AxiosError, InternalAxiosRequestConfig } from "axios";

export const nextServer = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL + "/api",
  withCredentials: true,
});

interface RequestConfigWithRetry extends InternalAxiosRequestConfig {
  alreadyRetried?: boolean;
}

interface RefreshResult {
  success: boolean;
}

const skipRefreshEndpoints = [
  "/auth/login",
  "/auth/register",
  "/auth/logout",
  "/auth/refresh",
];

let ongoingRefresh: Promise<void> | null = null;

function isRefreshNotNeeded(url?: string) {
  if (!url) return false;
  return skipRefreshEndpoints.some((endpoint) => url.includes(endpoint));
}

async function performTokenRefresh() {
  const { data } = await nextServer.get<RefreshResult>("/auth/refresh");
  if (!data.success) {
    throw new Error("Token refresh failed");
  }
}

function triggerSessionExpiredEvent() {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new Event("auth:session-expired"));
}

nextServer.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as RequestConfigWithRetry | undefined;

    if (
      typeof window === "undefined" || 
      error.response?.status !== 401 || 
      !originalRequest ||               
      originalRequest.alreadyRetried ||         
      isRefreshNotNeeded(originalRequest.url) 
    ) {
      return Promise.reject(error);
    }

    originalRequest.alreadyRetried = true;

    try {
      ongoingRefresh ??= performTokenRefresh().finally(() => {
        ongoingRefresh = null;
      });

      await ongoingRefresh;

      return nextServer.request(originalRequest);
    } catch (refreshError) {
      triggerSessionExpiredEvent();
      return Promise.reject(refreshError);
    }
  }
);
