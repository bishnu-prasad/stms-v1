"use client";

import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard, HeartPulse, Users, Store, Globe,
  BarChart3, Wallet, FileText, Shield, Settings, LogOut,
  ChevronRight, ChevronLeft, Server
} from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

import api from "@/lib/axios";

interface NavItem {
  label: string;
  href: string;
  icon: React.ElementType;
}

const navItems: NavItem[] = [
  { label: "Overview", href: "/overview", icon: LayoutDashboard },
  { label: "Customers", href: "/customers", icon: Users },
  { label: "Vendors", href: "/vendors", icon: Store },
  { label: "Sites", href: "/sites", icon: Globe },
  { label: "Platform Health", href: "/platform-health", icon: HeartPulse },
  { label: "Analytics", href: "/analytics", icon: BarChart3 },
  { label: "Billing", href: "/billing", icon: Wallet },
  { label: "Reports", href: "/reports", icon: FileText },
  { label: "Users", href: "/users", icon: Shield },
  { label: "System", href: "/system", icon: Server },
  { label: "Settings", href: "/settings", icon: Settings },
];

export function OwnerSidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  function isActive(href: string) {
    return pathname === href || pathname.startsWith(href + "?");
  }

  const handleLogout = async () => {
    try {
      await api.post("/auth/logout");
    } finally {
      router.push("/login");
    }
  };

  return (
    <aside
      className={`flex flex-col h-screen shrink-0 z-50 overflow-hidden transition-all duration-300 ease-in-out ${collapsed ? "w-[64px]" : "w-[220px]"}`}
      style={{
        background: "#0F172A",
        borderRight: "1px solid rgba(255,255,255,0.05)",
      }}
    >
      {/* Brand */}
      <div
        className="flex items-center h-14 px-3 shrink-0"
        style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}
      >
        <div
          className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
          style={{ background: "rgba(255,255,255,0.08)" }}
        >
          <Server className="w-4 h-4" style={{ color: "#94A3B8" }} />
        </div>
        
        <div className={`overflow-hidden ml-2.5 whitespace-nowrap transition-all duration-300 ease-in-out ${collapsed ? "opacity-0 w-0" : "opacity-100 w-auto"}`}>
           <div className="text-[13px] font-bold text-slate-200 tracking-tight leading-none">
             Platform Owner
           </div>
        </div>
        
        <div className="flex-1" />
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="w-6 h-6 rounded flex items-center justify-center cursor-pointer transition-colors shrink-0 text-slate-500 hover:text-slate-400"
        >
          {collapsed ? (
            <ChevronRight className="w-3.5 h-3.5" />
          ) : (
            <ChevronLeft className="w-3.5 h-3.5" />
          )}
        </button>
      </div>

      {/* Nav Items */}
      <nav className="flex-1 overflow-y-auto overflow-x-hidden py-3 px-2 space-y-0.5">
        {navItems.map((item) => {
          const active = isActive(item.href);
          return (
            <TooltipProvider key={item.label} delayDuration={80}>
              <Tooltip open={collapsed ? undefined : false}>
                <TooltipTrigger asChild>
                  <button
                    onClick={() => router.push(item.href)}
                    className="w-full flex items-center h-9 px-2.5 rounded-lg transition-all duration-100 cursor-pointer text-left relative hover:bg-white/5 group"
                    style={{
                      background: active ? "rgba(255,255,255,0.07)" : "transparent",
                      color: active ? "#F1F5F9" : "#64748B",
                    }}
                  >
                    {active && (
                      <div
                        className="absolute left-0 top-2 bottom-2 w-0.5 rounded-r-full"
                        style={{ background: "#6366F1" }}
                      />
                    )}
                    <item.icon
                      className="w-4 h-4 shrink-0 group-hover:text-slate-400 transition-colors"
                      style={{ strokeWidth: active ? 2.5 : 1.75 }}
                    />
                    <span className={`ml-2.5 text-[13px] font-medium whitespace-nowrap overflow-hidden transition-all duration-300 ease-in-out group-hover:text-slate-400 ${collapsed ? "opacity-0 w-0" : "opacity-100 w-auto"}`}>
                      {item.label}
                    </span>
                  </button>
                </TooltipTrigger>
                <TooltipContent side="right" className="text-xs">{item.label}</TooltipContent>
              </Tooltip>
            </TooltipProvider>
          );
        })}
      </nav>

      {/* Footer — user */}
      <div
        className="p-2 shrink-0"
        style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}
      >
        <TooltipProvider delayDuration={80}>
          <Tooltip open={collapsed ? undefined : false}>
            <TooltipTrigger asChild>
              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-2.5 h-10 px-2.5 rounded-lg cursor-pointer transition-all duration-100 text-slate-500 hover:text-slate-300 hover:bg-white/5"
              >
                <div
                  className="w-7 h-7 rounded-lg flex items-center justify-center text-[10px] font-bold shrink-0"
                  style={{ background: "rgba(255,255,255,0.07)", color: "#94A3B8" }}
                >
                  ST
                </div>
                <div className={`flex-1 flex items-center justify-between overflow-hidden transition-all duration-300 ease-in-out ${collapsed ? "opacity-0 w-0" : "opacity-100 w-auto"}`}>
                   <div className="min-w-0">
                     <div className="text-[12px] font-semibold text-slate-300 truncate">Sign Out</div>
                   </div>
                   <LogOut className="w-3.5 h-3.5 shrink-0 ml-2" />
                </div>
              </button>
            </TooltipTrigger>
            <TooltipContent side="right" className="text-xs">Sign Out</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </aside>
  );
}
