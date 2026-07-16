"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { getCurrentUser } from "@/services/auth";

export default function DashboardRedirectController() {
  const router = useRouter();

  useEffect(() => {
    const token = sessionStorage.getItem("access_token");

    if (!token) {
      router.replace("/login");
      return;
    }

    getCurrentUser()
      .then((user) => {
        if (!user || !user.account_type) {
           router.replace("/login");
           return;
        }

        // Map backend account_type exactly to the corresponding feature dashboards
        switch (user.account_type) {
          case "PLATFORM_OWNER":
            router.replace("/overview");
            break;
          case "SUPER_ADMIN":
            router.replace("/super-admin/dashboard");
            break;
          case "CUSTOMER_ADMIN":
            router.replace("/customer/dashboard");
            break;
          case "VENDOR":
            router.replace("/vendor/dashboard");
            break;
          case "ENGINEER":
            router.replace("/engineer/dashboard");
            break;
          default:
            router.replace("/login");
            break;
        }
      })
      .catch(() => router.replace("/login"));
  }, [router]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <div className="text-sm font-medium text-gray-500">Routing to dashboard...</div>
    </div>
  );
}
