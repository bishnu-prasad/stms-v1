type AuthBrandProps = {
  className?: string;
};

export default function AuthBrand({ className = "" }: AuthBrandProps) {
  return (
    <div className={className}>
        
             
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

    
  );
}