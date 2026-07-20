/**
 * Axios HTTP Client
 *
 * 
 * Responsibility: Configure the HTTP client.
 * 
 * All API Requests
        │
        ▼
  Axios Instance
        │
        ├── Browser sends HttpOnly cookies
        ├── Handle 401
        └── Send Request

It manages all HTTP communication for the application.
------------------------------------------

 * Purpose:
 * This file creates and configures a single Axios instance used throughout the frontend.
 * Every API request should use this instance instead of calling axios directly.
 *
 * Responsibilities:
 * - Defines the backend base URL.
 * - Sets default request headers.
 * - Sends HttpOnly authentication cookies automatically using withCredentials.
 * - Handles global HTTP responses.
 * - Redirects the user to the login page when the backend returns 401 Unauthorized.
 *
 * Request Interceptor:
 * - Runs before every HTTP request.
 * - The browser automatically includes the HttpOnly access_token cookie.
 * - No Authorization header is added manually.
 * - withCredentials ensures authentication cookies are sent to the backend.
 *
 * Response Interceptor:
 * - Runs after every HTTP response.
 * - Watches for 401 Unauthorized responses.
 * - If the access token has expired, it calls /auth/refresh.
 * - The backend issues a new HttpOnly access_token cookie.
 * - The original request is retried automatically.
 * - If refresh fails, the user is redirected to /login.
 *
 * Benefits:
 * - Centralized authentication logic.
 * - Eliminates duplicate code.
 * - Keeps services focused only on calling APIs.
 * - Makes the application easier to maintain and scale.
 */
import axios from "axios";
import { refreshAccessToken } from "@/services/auth";



const api = axios.create({
  baseURL: "http://localhost:8000",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      !originalRequest.url?.includes("/auth/refresh")
    ) {
      originalRequest._retry = true;
      try {
        const response = await refreshAccessToken();

        // Retry the original request that failed.
        return api(originalRequest);
      } catch {
        if (window.location.pathname !== "/login") {
          window.location.href = "/login";
        }
      }
    }

    return Promise.reject(error);
  }
);

export default api;