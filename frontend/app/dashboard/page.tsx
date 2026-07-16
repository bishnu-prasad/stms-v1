

"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getCurrentUser } from "@/services/auth";

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const token = sessionStorage.getItem("access_token");

    if (!token) {
      router.replace("/login");
    }

    getCurrentUser()
      .then((data) => setUser(data))
      .catch(() => router.replace("/login"));
  }, [router]);

  return (
    <main className="min-h-screen bg-gray-100 p-8">
      <div className="mx-auto max-w-4xl rounded-xl bg-white p-8 shadow">
        <h1 className="mb-6 text-3xl font-bold">STMS Platform Owner Dashboard</h1>

        <div className="space-y-2">
          <p><strong>Welcome:</strong> {user?.customer_name}</p>
          <p><strong>Username:</strong> {user?.username}</p>
          <p><strong>Role:</strong> {user?.account_type}</p>
          <p><strong>Customer:</strong> {user?.customer_name}</p>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-3">
          <button className="rounded-lg border p-4 text-left hover:bg-gray-50">
            Customers
          </button>
          <button className="rounded-lg border p-4 text-left hover:bg-gray-50">
            Super Admin
          </button>
          <button className="rounded-lg border p-4 text-left hover:bg-gray-50">
            Vendors
          </button>
        </div>

        <button className="mt-8 rounded-lg bg-red-600 px-4 py-2 text-white">
          Logout
        </button>
      </div>
    </main>
  );
}
