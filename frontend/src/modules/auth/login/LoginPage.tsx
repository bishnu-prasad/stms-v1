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
        <div className="w-full flex flex-col justify-between p-8 sm:p-14 bg-[#F8FAFC] overflow-y-auto">
          {/* Top Header Logo for Mobile */}
          <div className="flex lg:hidden items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-2xl bg-white border border-slate-200/80 shadow-sm flex items-center justify-center p-2">
              <svg viewBox="0 0 24 24" className="w-6 h-6 text-amber-500">
                <circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" strokeWidth="2" opacity="0.3" />
                <circle cx="12" cy="12" r="6" fill="none" stroke="currentColor" strokeWidth="2.5" opacity="0.6" />
                <circle cx="12" cy="12" r="2.5" fill="currentColor" />
              </svg>
            </div>
            <div>
              <h3 className="font-extrabold text-slate-900 text-sm tracking-tight leading-none">RMS</h3>
              <p className="text-[11px] text-slate-400 mt-1">By Indio Networks</p>
            </div>
          </div>

          {/* Center Area */}
          <div className="w-full max-w-md mx-auto my-auto space-y-6">
            {/* RMS Header Logo for Desktop */}
            <div className="hidden lg:flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-2xl bg-white border border-slate-200/80 shadow-sm flex items-center justify-center p-2">
                <svg viewBox="0 0 24 24" className="w-6 h-6 text-amber-500">
                  <circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" strokeWidth="2" opacity="0.3" />
                  <circle cx="12" cy="12" r="6" fill="none" stroke="currentColor" strokeWidth="2.5" opacity="0.6" />
                  <circle cx="12" cy="12" r="2.5" fill="currentColor" />
                </svg>
              </div>
              <div>
                <h3 className="font-extrabold text-slate-900 text-sm tracking-tight leading-none">RMS</h3>
                <p className="text-[11px] text-slate-400 mt-1">By Indio Networks</p>
              </div>
            </div>

            <div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">Sign in to your account</h2>
              <p className="text-xs text-slate-400 mt-1.5 font-medium">Enter your credentials to continue to your workspace.</p>
            </div>

            {/* Login Card Form (Always bg-white, no dark mode override) */}
            <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200/80 shadow-sm space-y-5">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-700">Email or Mobile Number</label>
                <div className="relative">
                  <div className="absolute left-3.5 top-3.5 text-slate-400">
                    <svg className="w-4.5 h-4.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <input
                    type="text"
                    required
                    placeholder="Enter your email or mobile"
                    value={identifier}
                    onChange={(e) => setIdentifier(e.target.value)}
                    className="w-full pl-10 h-11 text-xs rounded-xl border border-slate-200 bg-white text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-500/20 focus:border-slate-500 transition-all font-medium shadow-2xs"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-700">Password</label>
                <div className="relative">
                  <div className="absolute left-3.5 top-3.5 text-slate-400">
                    <svg className="w-4.5 h-4.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                  </div>
                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-10 pr-10 h-11 text-xs rounded-xl border border-slate-200 bg-white text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-500/20 focus:border-slate-500 transition-all font-medium shadow-2xs"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-3.5 text-slate-400 hover:text-slate-600 cursor-pointer"
                  >
                    {showPassword ? (
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88L8.687 8.687M3 3l18 18" />
                      </svg>
                    ) : (
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    )}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between text-xs pt-1">
                <label className="flex items-center gap-2 cursor-pointer text-slate-600">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="w-4 h-4 rounded border-slate-300 text-slate-900 focus:ring-slate-500 cursor-pointer"
                  />
                  Remember login
                </label>
                <a href="#" className="font-semibold text-slate-700 hover:underline">Forgot password?</a>
              </div>

              <button
                onClick={handleLogin}
                className="w-full h-11 font-bold text-sm rounded-xl text-white bg-slate-800 hover:bg-slate-900 cursor-pointer transition-all shadow-xs flex items-center justify-center gap-2"
              >
                <svg viewBox="0 0 24 24" className="w-4 h-4 fill-none stroke-current stroke-[2.5]" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                Sign In
              </button>
            </div>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between text-xs text-slate-400 pt-6 border-t border-slate-100">
            <div>RMS by Indio Networks</div>
            <div>© 2026 Indio Networks</div>
          </div>
        </div>
      </div>
    </main>
  );
}