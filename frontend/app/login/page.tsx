

"use client";

import { useState } from "react";
import { login } from "@/services/auth";

export default function LoginPage() {
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");

  async function handleLogin() {
    try {
      const response = await login({ identifier, password });
      console.log(response);
      alert("Login Successful!");
    } catch (error) {
      console.error(error);
      alert("Login Failed!");
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center">
      <div className="w-full max-w-sm space-y-4 rounded-lg border p-6">
        <h1 className="text-2xl font-bold">STMS Login</h1>

        <input
          className="w-full rounded border p-2"
          placeholder="Email or Mobile Number"
          value={identifier}
          onChange={(e) => setIdentifier(e.target.value)}
        />

        <input
          type="password"
          className="w-full rounded border p-2"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={handleLogin}
          className="w-full rounded bg-black p-2 text-white"
        >
          Login
        </button>
      </div>
    </main>
  );
}