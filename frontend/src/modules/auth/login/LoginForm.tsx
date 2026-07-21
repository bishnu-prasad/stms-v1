import AuthBrand from "@/modules/auth/components/AuthBrand";
import PasswordField from "@/modules/auth/components/PasswordField";
import Link from "next/link";
type LoginFormProps = {
  identifier: string;
  setIdentifier: React.Dispatch<React.SetStateAction<string>>;
  password: string;
  setPassword: React.Dispatch<React.SetStateAction<string>>;
  showPassword: boolean;
  setShowPassword: React.Dispatch<React.SetStateAction<boolean>>;
  rememberMe: boolean;
  setRememberMe: React.Dispatch<React.SetStateAction<boolean>>;
  handleLogin: () => void;
};

export default function LoginForm({
  identifier,
  setIdentifier,
  password,
  setPassword,
  showPassword,
  setShowPassword,
  rememberMe,
  setRememberMe,
  handleLogin,
}: LoginFormProps) {
  return (
    <div className="w-full flex flex-col justify-between p-8 sm:p-14 bg-[#F8FAFC] overflow-y-auto">
      {/* Top Header Logo for Mobile */}
      <AuthBrand className="flex lg:hidden items-center gap-3 mb-6" />

      {/* Center Area */}
      <div className="w-full max-w-md mx-auto my-auto space-y-6">
        <AuthBrand className="hidden lg:flex items-center gap-3 mb-2" />
        <div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Sign in to your account
          </h2>
          <p className="text-xs text-slate-400 mt-1.5 font-medium">
            Enter your credentials to continue to your workspace.
          </p>
        </div>

        {/* Login Card Form (Always bg-white, no dark mode override) */}
        <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200/80 shadow-sm space-y-5">
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-700">
              Email or Mobile Number
            </label>
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
                type="text"
                required
                placeholder="Enter your email or mobile"
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                className="w-full pl-10 h-11 text-xs rounded-xl border border-slate-200 bg-white text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-500/20 focus:border-slate-500 transition-all font-medium shadow-2xs"
              />
            </div>
          </div>
          <PasswordField
            password={password}
            setPassword={setPassword}
            showPassword={showPassword}
            setShowPassword={setShowPassword}
          />

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
            <Link
              href="/forgot-password"
              className="font-semibold text-slate-700 hover:underline"
            >
              Forgot password?
            </Link>
          </div>

          <button
            onClick={handleLogin}
            className="w-full h-11 font-bold text-sm rounded-xl text-white bg-slate-800 hover:bg-slate-900 cursor-pointer transition-all shadow-xs flex items-center justify-center gap-2"
          >
            <svg
              viewBox="0 0 24 24"
              className="w-4 h-4 fill-none stroke-current stroke-[2.5]"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
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
  );
}
