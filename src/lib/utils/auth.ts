import axios from "axios";
import { redirect, type RequestEvent } from "@sveltejs/kit";

export const PUBLIC_ROUTES = ["/login", "/signup"];

export const isPublicRoute = (path: string) => {
  return PUBLIC_ROUTES.includes(path);
};

export const requireAuth = async (event: RequestEvent) => {
  const accessToken = event.cookies.get("accessToken");
  const refreshToken = event.cookies.get("refreshToken");

  if (!accessToken && !refreshToken) {
    throw redirect(302, "/login");
  }

  try {
    const response = await axios.post(
      `${import.meta.env.VITE_API_BASE_URL}/auth/refresh-token`,
      {},
      {
        headers: {
          "x-api-key": import.meta.env.VITE_API_KEY,
        },
        withCredentials: true,
      }
    );

    if (response.status !== 200) {
      throw redirect(302, "/login");
    }
  } catch (error) {
    throw redirect(302, "/login");
  }
};
