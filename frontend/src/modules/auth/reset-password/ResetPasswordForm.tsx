"use client";
import { useState, Suspense } from "react";
import AuthBrand from "@/modules/auth/components/AuthBrand";
import PasswordField from "@/modules/auth/components/PasswordField";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { resetPassword } from "@/services/auth";
import { toast } from "sonner";
import axios from "axios";

function ResetPasswordContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const [newPassword, setNewPassword] = useState("");
  const [showNewPassword, setShowNewPassword] = useState(false);

  const [confirmPassword, setConfirmPassword] = useState("");
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

  const handleResetPassword = async () => {
    if (!token) {
      toast.error("Invalid or missing reset token.");
      return;
    }

    if (!newPassword) {
      toast.warning("Please enter a new password.");
      return;
    }

    if (newPassword.length < 8) {
      toast.warning("Password must be at least 8 characters long.");
      return;
    }

    if (newPassword !== confirmPassword) {
      toast.warning("Passwords do not match.");
      return;
    }

    if (isLoading) return;
    setIsLoading(true);

    try {
      const response = await resetPassword({ token, new_password: newPassword });
      toast.success(response.message || "Password has been reset successfully!");
      router.push("/login");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data?.detail || "Failed to reset password.");
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
            Reset Password
          </h2>
          <p className="text-xs text-slate-400 mt-1.5 font-medium">
            Enter your new password below.
          </p>
        </div>

        <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200/80 shadow-sm space-y-5">
          <PasswordField
            label="New Password"
            password={newPassword}
            setPassword={setNewPassword}
            showPassword={showNewPassword}
            setShowPassword={setShowNewPassword}
          />

          <PasswordField
            label="Confirm Password"
            password={confirmPassword}
            setPassword={setConfirmPassword}
            showPassword={showConfirmPassword}
            setShowPassword={setShowConfirmPassword}
          />

          <button
            type="button"
            onClick={handleResetPassword}
            disabled={isLoading}
            className="w-full h-11 font-bold text-sm rounded-xl text-white bg-slate-800 hover:bg-slate-900 cursor-pointer transition-all shadow-xs flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed mt-2"
          >
            {isLoading ? "Resetting..." : "Reset Password"}
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

export default function ResetPasswordForm() {
  return (
    <Suspense fallback={<div className="w-full h-full flex items-center justify-center">Loading...</div>}>
      <ResetPasswordContent />
    </Suspense>
  );
}