import axios, {
  AxiosError,
  type AxiosResponse,
  type InternalAxiosRequestConfig,
} from "axios";
import { goto } from "$app/navigation";
import { getTokens, setTokens } from "./utils/localStorage";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const X_API_KEY = import.meta.env.VITE_API_KEY;

interface CustomAxiosRequestConfig extends InternalAxiosRequestConfig {
  _retry?: boolean;
}

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "x-api-key": X_API_KEY,
    "Content-Type": "application/json",
  },
});

// Add a request interceptor to include the access token in headers
api.interceptors.request.use((config) => {
  const { accessToken } = getTokens();
  if (accessToken) {
    config.headers["Authorization"] = `Bearer ${accessToken}`;
  }
  return config;
});

api.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as CustomAxiosRequestConfig;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const { refreshToken } = getTokens();
        const response = await axios.post(
          `${API_BASE_URL}/auth/refresh-token`,
          { refreshToken },
          {
            headers: {
              "x-api-key": X_API_KEY,
              "Content-Type": "application/json",
            },
          }
        );

        const { accessToken: newAccessToken, refreshToken: newRefreshToken } =
          response.data.tokens;
        setTokens(newAccessToken, newRefreshToken);

        return api(originalRequest);
      } catch (refreshError) {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        goto("/");
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);
