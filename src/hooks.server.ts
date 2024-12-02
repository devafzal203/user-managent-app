import { redirect, type Handle } from "@sveltejs/kit";
import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const X_API_KEY = import.meta.env.VITE_API_KEY;

export const handle: Handle = async ({ event, resolve }) => {
  const isProtectedRoute = event.route.id?.startsWith("/(protected)");
  const isAuthRoute = ["/", "/signup", "/login"].includes(event.url.pathname);

  try {
    const response = await axios.get(`${API_BASE_URL}/auth/status`, {
      headers: {
        "x-api-key": X_API_KEY,
        Authorization: `Bearer ${
          event.request.headers.get("authorization")?.split(" ")[1]
        }`,
      },
    });

    const isAuthenticated = response.data.authenticated;
    if (isAuthenticated && isAuthRoute) {
      throw redirect(302, "/dashboard");
    }
    if (!isAuthenticated && isProtectedRoute) {
      throw redirect(302, "/");
    }

    return await resolve(event);
  } catch (error) {
    if (isProtectedRoute) {
      throw redirect(302, "/");
    }
    return await resolve(event);
  }
};
