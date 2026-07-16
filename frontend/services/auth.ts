/**
 * Authentication Service
 *
 * Responsibility: Communicate with the backend.
 *     login()
        │
        ▼
  POST /auth/login
        │
        ▼
  Return backend response

It does not:

* Store tokens
* Redirect users
* Update UI

It only calls the API.
---------------------------------------------
 * Purpose:
 * - Provides frontend functions for communicating with the backend authentication APIs.
 * - Keeps HTTP request logic separate from UI components.
 *
 * Responsibilities:
 * - login()            -> Sends user credentials to POST /auth/login.
 * - getCurrentUser()   -> Retrieves the authenticated user's profile from GET /auth/me.
 *
 * This file does NOT:
 * - Store tokens in sessionStorage.
 * - Handle redirects.
 * - Manage authentication state.
 *
 * Those responsibilities belong to the login page or a higher-level authentication/session layer.
 */
import api from "@/lib/axios";

interface LoginRequest {
  identifier: string;
  password: string;
}

export async function login(data: LoginRequest) {
  const response = await api.post("/auth/login", data);
  return response.data;
}


// Refresh Access Token
// Calls POST /auth/refresh using the stored refresh token.
// Returns a new access token from the backend.
// Used automatically by the Axios response interceptor when the access token expires.
export async function refreshAccessToken() {
  const refreshToken = sessionStorage.getItem("refresh_token");

  const response = await api.post("/auth/refresh", {
    refresh_token: refreshToken,
  });

  return response.data;
}

export async function getCurrentUser() {
  const response = await api.get("/auth/me");
  return response.data;
}