"use client";

import { useContext } from "react";
import ProfileSidebarHeader from "@/app/profile/profile-sidebar-header";
import { UserContext } from "@/context/user-context";
import { WalletContext } from "@/context/wallet-context";

export default function ProfilePage() {
  const user = useContext(UserContext);
  const { balanceNgn, loading } = useContext(WalletContext);

  if (!user) return null;

  return (
    <>
      <h1 className="text-2xl font-bold text-[#0946B1] mb-6">My Profile</h1>
      <ProfileSidebarHeader />
      <div className="space-y-6">
        <div className="bg-white rounded-lg shadow p-6 space-y-4">
          <p>
            <strong>Name:</strong> {user.firstName} {user.lastName}
          </p>

          <p>
            <strong>Email:</strong> {user.email}
          </p>
        </div>

        <div className="p-4 rounded bg-blue-50">
          <p className="text-sm text-gray-600">Wallet Balance</p>

          {loading ? (
            <div className="h-6 w-24 bg-gray-200 animate-pulse rounded" />
          ) : (
            <p className="text-2xl font-bold text-[#0946B1]">
              ₦{balanceNgn.toLocaleString()}
            </p>
          )}
        </div>
      </div>
    </>
  );
}
