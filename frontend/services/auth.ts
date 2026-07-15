import api from "@/lib/axios";

interface LoginRequest {
  identifier: string;
  password: string;
}

export async function login(data: LoginRequest) {
  const response = await api.post("/auth/login", data);
  return response.data;
}

export async function getCurrentUser() {
  const token = sessionStorage.getItem("access_token");

  const response = await api.get("/auth/me", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
}