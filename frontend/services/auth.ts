import api from "@/lib/axios";

interface LoginRequest {
  identifier: string;
  password: string;
}

export async function login(data: LoginRequest) {
  const response = await api.post("/auth/login", data);
  return response.data;
}