// Responsibility: Handle the login process from the user’s perspective.

// User clicks "Sign In"
//         │
//         ▼
// Read identifier & password
//         │
//         ▼
// Call login() service
//         │
//         ▼
// Receive backend response
//         │
//         ▼
// Backend sets HttpOnly access_token & refresh_token cookies
//         │
//         ▼
// Browser stores cookies automatically
//         │
//         ▼
// Redirect to /dashboard

// This file is responsible for the login workflow, because it controls what happens after the user submits the form.

"use client";

import { useState } from "react";
import { login } from "@/services/auth";
import { useRouter } from "next/navigation";
import AuthHero from "@/modules/auth/components/AuthHero";

import LoginForm from "@/modules/auth/login/LoginForm";

export default function LoginPage() {
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const router = useRouter();

  async function handleLogin() {
    try {
      const response = await login({ identifier, password });
      console.log(response);

     

      router.push("/dashboard");
    } catch (error) {
      console.error(error);
      alert("Login Failed!");
    }
  }

  return (
    <main className="min-h-screen w-full flex overflow-hidden bg-[#F8FAFC] font-sans">
      <div className="grid grid-cols-1 lg:grid-cols-2 w-full min-h-screen">
       <AuthHero />

        {/* ── RIGHT: Login Form (Locked to Light/White Mode) ─────────────────── */}
        <LoginForm

  identifier={identifier}

  setIdentifier={setIdentifier}

  password={password}

  setPassword={setPassword}

  showPassword={showPassword}

  setShowPassword={setShowPassword}

  rememberMe={rememberMe}

  setRememberMe={setRememberMe}

  handleLogin={handleLogin}

/>
        
      </div>
    </main>
  );
}