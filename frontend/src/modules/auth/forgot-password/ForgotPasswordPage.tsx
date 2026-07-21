"use client";

import AuthHero from "@/modules/auth/components/AuthHero";
import ForgotPasswordForm from "@/modules/auth/forgot-password/ForgotPasswordForm";

export default function ForgotPasswordPage() {
  return (
    <main className="min-h-screen w-full flex overflow-hidden bg-[#F8FAFC] font-sans">
      <div className="grid grid-cols-1 lg:grid-cols-2 w-full min-h-screen">
        <AuthHero />
        <ForgotPasswordForm />
      </div>
    </main>
  );
}