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
        ├── Attach JWT
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
 * - Automatically attaches the JWT access token to protected requests.
 * - Handles global HTTP responses.
 * - Redirects the user to the login page when the backend returns 401 Unauthorized.
 *
 * Request Interceptor:
 * - Runs before every HTTP request.
 * - Reads the access token from sessionStorage.
 * - If a token exists, it adds:
 *     Authorization: Bearer <access_token>
 * - This removes the need to manually attach the Authorization header in every service.
 *
 * Response Interceptor:
 * - Runs after every HTTP response.
 * - Watches for 401 Unauthorized responses.
 * - If a 401 is received:
 *     1. Removes the access token from sessionStorage.
 *     2. Redirects the user to /login.
 * - Later, this interceptor will be extended to refresh expired access tokens automatically.
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
  baseURL: "http://127.0.0.1:8000",
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  (config) => {
    const token = sessionStorage.getItem("access_token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

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
    if (error.response?.status === 401) {
      try {
        const response = await refreshAccessToken();

        sessionStorage.setItem(
          "access_token",
          response.access_token
        );

        // Update the Authorization header with the new access token.
        error.config.headers.Authorization = `Bearer ${response.access_token}`;

        // Retry the original request that failed.
        return api(error.config);
      } catch {
        sessionStorage.removeItem("access_token");
        sessionStorage.removeItem("refresh_token");

        if (window.location.pathname !== "/login") {
          window.location.href = "/login";
        }
      }
    }

    return Promise.reject(error);
  }
);

export default api;