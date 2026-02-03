"use client";

import { useEffect, useState } from "react";
import Sidebar from "@/components/wrapper/sidebar/sidebar";
import { profileSidebarItems } from "./sidebar-config";
import { fetchWalletBalance } from "@/lib/wallet-api";
import { apiFetch } from "@/lib/api";
import { WalletContext } from "@/context/wallet-context";
import { UserContext } from "@/context/user-context";

interface User {
  firstName: string;
  lastName: string;
  email: string;
}

export default function ProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [balanceNgn, setBalanceNgn] = useState(0);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      apiFetch<User>("/users/me"),
      fetchWalletBalance(),
    ])
      .then(([userData, walletData]) => {
        setUser(userData);
        setBalanceNgn(walletData.balanceNgn);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  return (
    <UserContext.Provider value={user}>
      <WalletContext.Provider value={{ balanceNgn, loading }}>
        <section className="max-w-7xl mx-auto px-4 pt-24 pb-32">
          <div className="flex flex-col md:flex-row gap-6">
            <Sidebar items={profileSidebarItems} />

            <main className="flex-1 bg-white rounded-xl border p-6">
              {children}
            </main>
          </div>
        </section>
      </WalletContext.Provider>
    </UserContext.Provider>
  );
}
