"use client";

import { useEffect, useState, ReactNode } from "react";
import { useRouter } from "next/navigation";
import { getCurrentUser } from "@/services/auth";
import { OwnerLayoutWrapper } from "../../owner/layouts/OwnerLayoutWrapper";

export default function OwnerRouteLayout({ children }: { children: ReactNode }) {
  const router = useRouter();
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    const token = sessionStorage.getItem("access_token");

    if (!token) {
      router.replace("/login");
      return;
    }

    getCurrentUser()
      .then((data) => {
        // Validate it's a Platform Owner if needed, but since dashboard/page.tsx handles routing,
        // we mainly just verify the session is active.
        if (data?.account_type !== "PLATFORM_OWNER") {
           // Optionally, if they are not an owner, redirect them back to dashboard to be routed correctly.
           router.replace("/dashboard");
           return;
        }
        setIsAuthorized(true);
      })
      .catch(() => router.replace("/login"));
  }, [router]);

  if (!isAuthorized) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-slate-50">
        <div className="text-sm font-medium text-slate-500">Loading session...</div>
      </div>
    );
  }

  return <OwnerLayoutWrapper>{children}</OwnerLayoutWrapper>;
}
