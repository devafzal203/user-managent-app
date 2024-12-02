import { api } from "./axios";

export async function signup(payload: {
  email: string;
  password: string;
  name: string;
}) {
  const response = await api.post(`/auth/signup`, payload);
  const { accessToken, refreshToken } = response.data.tokens;
  localStorage.setItem("accessToken", accessToken);
  localStorage.setItem("refreshToken", refreshToken);
  return response.data;
}

export async function login(email: string, password: string) {
  const response = await api.post(`/auth/login`, {
    email,
    password,
  });
  const { accessToken, refreshToken } = response.data.tokens;
  localStorage.setItem("accessToken", accessToken);
  localStorage.setItem("refreshToken", refreshToken);
  return response.data;
}

export const authStatus = async () => {
  try {
    const response = await api.get("/auth/status");
    return response.data;
  } catch (error) {
    return { authenticated: false };
  }
};

export async function logout() {
  const refreshToken = localStorage.getItem("refreshToken");
  const response = await api.post(`/auth/logout`, { refreshToken });
  if (response.status === 200) {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
  }
  return response.data;
}
