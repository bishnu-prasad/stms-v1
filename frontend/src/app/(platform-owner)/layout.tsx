// This file does not decide where to go.

// It assumes the user is already trying to access a Platform Owner page.

// Its job is:

// * Check the token.
// * Verify the session.
// * Verify the role is PLATFORM_OWNER.
// * Wrap the page with the common layout (sidebar, header, etc.).
"use client";

import { useEffect, useState, ReactNode } from "react";
import { useRouter } from "next/navigation";
import { getCurrentUser } from "@/services/auth";
import { OwnerLayoutWrapper } from "@/modules/platform-owner/layouts/OwnerLayoutWrapper";

export default function OwnerRouteLayout({ children }: { children: ReactNode }) {
  const router = useRouter();
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
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
