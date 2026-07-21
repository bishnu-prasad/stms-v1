export default function AuthHero() {
  return (

      <div className="hidden lg:flex relative bg-[#090D16] text-white flex-col justify-between p-12 overflow-hidden select-none">
          {/* Subtle grid pattern overlay */}
          <div
            className="absolute inset-0 opacity-[0.03] pointer-events-none"
            style={{
              backgroundImage: "radial-gradient(#ffffff 1px, transparent 1px)",
              backgroundSize: "24px 24px"
            }}
          />

          {/* Ambient glow effects */}
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-indigo-600/10 rounded-full blur-[120px] pointer-events-none" />

          {/* Tower Background Graphic Silhouette replaced with custom user photo */}
          <div className="absolute inset-0 pointer-events-none z-0">
            <img
              src="/login-bg.png"
              alt="Telecom Tower Background"
              className="w-full h-full object-cover opacity-55"
              style={{ objectPosition: "70% center" }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#090D16]/80 via-[#090D16]/20 to-[#090D16]/50" />
          </div>

          {/* Top Header Logo */}
          <div className="relative z-10 flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-white border border-slate-200/80 shadow-sm flex items-center justify-center p-2">
              <svg viewBox="0 0 24 24" className="w-6 h-6 text-amber-500">
                <circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" strokeWidth="2" opacity="0.3" />
                <circle cx="12" cy="12" r="6" fill="none" stroke="currentColor" strokeWidth="2.5" opacity="0.6" />
                <circle cx="12" cy="12" r="2.5" fill="currentColor" />
              </svg>
            </div>
            <div>
              <h3 className="font-extrabold text-white text-base tracking-tight leading-none">RMS</h3>
              <p className="text-[11px] text-slate-400 mt-1">By Indio Networks</p>
            </div>
          </div>

          {/* Center Hero Content */}
          <div className="relative z-10 space-y-4 my-auto max-w-lg">
            <h1 className="text-5xl font-black text-white tracking-tight leading-none">
              RMS
            </h1>
            <h2 className="text-xl font-bold text-slate-200">
              Remote Monitoring System
            </h2>

            <p className="text-slate-400 text-sm leading-relaxed pt-2">
              Real-time monitoring of telecom infrastructure — towers, batteries, DGs, SMPS, energy meters, and alarms across thousands of remote sites.
            </p>

            <div className="flex flex-wrap gap-2.5 pt-4">
              <div className="flex items-center gap-2 px-3.5 py-2 rounded-full text-xs font-semibold text-white bg-slate-800/80 border border-slate-700/60">
                <span className="w-4 h-4 rounded-full bg-emerald-500 flex items-center justify-center text-[9px] font-bold">✓</span>
                Live Monitoring
              </div>
              <div className="flex items-center gap-2 px-3.5 py-2 rounded-full text-xs font-semibold text-white bg-slate-800/80 border border-slate-700/60">
                <span className="w-4 h-4 rounded-full bg-emerald-500 flex items-center justify-center text-[9px] font-bold">✓</span>
                Smart Alerts
              </div>
              <div className="flex items-center gap-2 px-3.5 py-2 rounded-full text-xs font-semibold text-white bg-slate-800/80 border border-slate-700/60">
                <span className="w-4 h-4 rounded-full bg-emerald-500 flex items-center justify-center text-[9px] font-bold">✓</span>
                Real-time Analytics
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="relative z-10 text-xs text-slate-500">
            © 2026 STMS Infrastructure Inc. All rights reserved.
          </div>
        </div>
    
  );
}