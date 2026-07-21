import AuthHero from "@/modules/auth/components/AuthHero";
import ResetPasswordForm from "@/modules/auth/reset-password/ResetPasswordForm";

export default function ResetPasswordPage() {
  return (
    <div className="min-h-screen bg-[#F8FAFC] flex">
      <AuthHero />
      <ResetPasswordForm />
    </div>
  );
}