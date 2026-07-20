import React from "react";
import { LucideIcon } from "lucide-react";

export interface OwnerMetricCardProps {
  title: string;
  value: React.ReactNode;
  subtext?: React.ReactNode;
  subtextColor?: string;
  valueColor?: string;
  
  // For standard Lucide icons
  icon?: LucideIcon;
  iconColor?: string;

  // For emoji or custom ReactNode icons
  customIcon?: React.ReactNode;

  // Styling overrides to match exact visual variants
  className?: string;
  titleClassName?: string;
  valueClassName?: string;
  subtextClassName?: string;
  align?: "left" | "center";
}

export function OwnerMetricCard({
  title,
  value,
  subtext,
  subtextColor,
  valueColor,
  icon: Icon,
  iconColor,
  customIcon,
  className = "bg-white rounded-xl px-5 py-5 shadow-[0_1px_3px_rgba(0,0,0,0.04)]",
  titleClassName = "text-xs font-semibold text-slate-400 uppercase tracking-wide",
  valueClassName = "text-2xl font-bold text-slate-900 tabular-nums tracking-tight",
  subtextClassName = "text-xs font-semibold mt-1",
  align = "left",
}: OwnerMetricCardProps) {
  return (
    <div
      className={`${className} flex flex-col`}
      style={{ border: "1px solid #E2E8F0" }}
    >
      {/* Top area: Icon (if centered) or Title + Icon (if left) */}
      {align === "center" ? (
        <>
          {customIcon && <div className="text-2xl">{customIcon}</div>}
          {Icon && (
            <div className="flex justify-center mb-2">
              <Icon className="w-6 h-6" style={{ color: iconColor }} />
            </div>
          )}
          <div className={valueClassName} style={valueColor ? { color: valueColor } : {}}>
            {value}
          </div>
          <div className={titleClassName}>
            {title}
          </div>
          {subtext && (
            <div className={subtextClassName} style={subtextColor ? { color: subtextColor } : {}}>
              {subtext}
            </div>
          )}
        </>
      ) : (
        <>
          <div className={`flex items-start justify-between ${Icon || customIcon ? "mb-4" : "mb-2"}`}>
            <span className={titleClassName}>
              {title}
            </span>
            {Icon && <Icon className="w-4 h-4 shrink-0" style={{ color: iconColor }} />}
            {customIcon && <div className="shrink-0">{customIcon}</div>}
          </div>
          <div className={valueClassName} style={valueColor ? { color: valueColor } : {}}>
            {value}
          </div>
          {subtext && (
            <div className={subtextClassName} style={subtextColor ? { color: subtextColor } : {}}>
              {subtext}
            </div>
          )}
        </>
      )}
    </div>
  );
}
