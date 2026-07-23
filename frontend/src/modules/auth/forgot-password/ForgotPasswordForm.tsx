"use client";
import { useState } from "react";
import AuthBrand from "@/modules/auth/components/AuthBrand";
import Link from "next/link";
import { forgotPassword } from "@/services/auth";
import { toast } from "sonner";
import axios from "axios";
import { useCountdown } from "@/hooks/useCountdown";

export default function ForgotPasswordForm() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { secondsLeft, isCountingDown, startCountdown } = useCountdown(60);

  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const handleForgotPassword = async () => {
    const trimmedEmail = email.trim();

    if (!trimmedEmail) {
      toast.warning("Please enter your email address.");
      return;
    }

    if (!validateEmail(trimmedEmail)) {
      toast.warning("Please enter a valid email address.");
      return;
    }

    if (isLoading || isCountingDown) return;
    setIsLoading(true);

    try {
      const response = await forgotPassword({ email: trimmedEmail });
      toast.success(response.message || "Password reset link sent!");
      startCountdown(60);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 429) {
          toast.error("Please wait 60 seconds before requesting another reset link.");
          if (!isCountingDown) {
            startCountdown(60);
          }
        } else {
          toast.error(error.response?.data?.detail || "Failed to send reset link.");
        }
      } else {
        toast.error("An unexpected error occurred.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full h-full flex flex-col justify-between p-8 sm:p-14 bg-[#F8FAFC] overflow-y-auto">
      {/* Top Header Logo for Mobile */}
      <AuthBrand className="flex lg:hidden items-center gap-3 mb-6" />

      {/* Center Area */}
      <div className="w-full max-w-md mx-auto my-auto space-y-6">
        <AuthBrand className="hidden lg:flex items-center gap-3 mb-2" />
        <div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Forgot Password
          </h2>
          <p className="text-xs text-slate-400 mt-1.5 font-medium">
            Enter your email address and we'll send you a link to reset your
            password.
          </p>
        </div>

        <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200/80 shadow-sm space-y-5">
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-700">Email</label>
            <div className="relative">
              <div className="absolute left-3.5 top-3.5 text-slate-400">
                <svg
                  className="w-4.5 h-4.5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isLoading}
                className="w-full pl-10 h-11 text-xs rounded-xl border border-slate-200 bg-white text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-500/20 focus:border-slate-500 transition-all font-medium shadow-2xs disabled:opacity-50 disabled:cursor-not-allowed"
              />
            </div>
          </div>

          <button
            type="button"
            onClick={handleForgotPassword}
            disabled={isLoading || isCountingDown}
            className="w-full h-11 font-bold text-sm rounded-xl text-white bg-slate-800 hover:bg-slate-900 cursor-pointer transition-all shadow-xs flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isLoading
              ? "Sending..."
              : isCountingDown
              ? `Resend in ${secondsLeft}s`
              : "Send Reset Link"}
          </button>
          <div className="mt-1 text-center">
            <Link
              href="/login"
              className="text-xs font-semibold text-slate-700 hover:underline"
            >
              Back to Login
            </Link>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between text-xs text-slate-400 pt-6 border-t border-slate-100 mt-6 lg:mt-0">
        <div>RMS by Indio Networks</div>
        <div>© 2026 Indio Networks</div>
      </div>
    </div>
  );
}
