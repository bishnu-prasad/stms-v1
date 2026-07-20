import React from "react";

export type StatusVariant = "success" | "warning" | "error" | "neutral" | "info";

export interface OwnerStatusBadgeProps {
  status: string;
  variant?: StatusVariant;
  className?: string;
}

export function OwnerStatusBadge({ status, variant, className = "" }: OwnerStatusBadgeProps) {
  let colorClasses = "bg-slate-100 text-slate-700"; // default neutral

  // Auto-resolve variant if not explicitly provided
  const resolvedVariant = variant || resolveStatusVariant(status);

  switch (resolvedVariant) {
    case "success":
      colorClasses = "bg-emerald-50 text-emerald-700";
      break;
    case "warning":
      colorClasses = "bg-amber-50 text-amber-700";
      break;
    case "error":
      colorClasses = "bg-rose-50 text-rose-700";
      break;
    case "info":
      colorClasses = "bg-blue-50 text-blue-700";
      break;
    default:
      colorClasses = "bg-slate-100 text-slate-700";
  }

  return (
    <span className={`px-2 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider ${colorClasses} ${className}`}>
      {status}
    </span>
  );
}

// Utility to guess the variant based on the string if not provided
function resolveStatusVariant(status: string): StatusVariant {
  const lower = status.toLowerCase();
  if (["online", "healthy", "active", "paid", "success"].includes(lower)) return "success";
  if (["warning", "degraded", "pending", "draft"].includes(lower)) return "warning";
  if (["offline", "critical", "down", "overdue", "failed"].includes(lower)) return "error";
  return "neutral";
}
