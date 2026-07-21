import React from "react";

export interface OwnerSectionHeaderProps {
  children: React.ReactNode;
}

export function OwnerSectionHeader({ children }: OwnerSectionHeaderProps) {
  return (
    <div className="text-[11px] font-bold uppercase tracking-widest text-slate-400 mb-3">
      {children}
    </div>
  );
}
