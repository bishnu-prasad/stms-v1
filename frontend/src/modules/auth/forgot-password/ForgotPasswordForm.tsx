"use client";
import { useState } from "react";
import AuthBrand from "@/modules/auth/components/AuthBrand";
import Link from "next/link";
import { forgotPassword } from "@/services/auth";
import { toast } from "sonner";
import axios from "axios";

export default function ForgotPasswordForm() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

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

    if (isLoading) return;
    setIsLoading(true);

    try {
      const response = await forgotPassword({ email: trimmedEmail });
      toast.success(response.message || "Password reset link sent!");
      setEmail("");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data?.detail || "Failed to send reset link.");
      } else {
        toast.error("An unexpected error occurred.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center px-6 py-12">
      <div className="w-full max-w-md">
        <AuthBrand className="flex items-center gap-3 mb-8" />

        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Forgot Password</h1>
          <p className="mt-2 text-gray-600">
            Enter your email address and we'll send you a link to reset your
            password.
          </p>
        </div>
        <div className="space-y-1.5">
          <label className="text-sm font-medium text-gray-700">Email</label>

          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={isLoading}
            className="w-full h-12 px-4 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#0A4D68] focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed"
          />
        </div>

        <button
          type="button"
          onClick={handleForgotPassword}
          disabled={isLoading}
          className="mt-6 w-full h-12 rounded-xl bg-[#0A4D68] text-white font-semibold hover:bg-[#083C52] transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {isLoading ? "Sending..." : "Send Reset Link"}
        </button>
        <div className="mt-6 text-center">
          <Link
            href="/login"
            className="text-sm font-medium text-[#0A4D68] hover:underline"
          >
            Back to Login
          </Link>
        </div>
      </div>
    </div>
  );
}
