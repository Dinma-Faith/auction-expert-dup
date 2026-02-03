"use client";

import { useUser } from "@/context/user-context";
import { useWallet } from "@/context/wallet-context";

export default function ProfileSidebarHeader() {
  const user = useUser();
  const { balanceNgn, loading } = useWallet();

  return (
    <div className="border-b p-6 text-center">
      <div className="w-16 h-16 mx-auto rounded-full bg-gray-100 mb-2" />

      <p className="font-semibold">
        {user
          ? `${user.firstName} ${user.lastName}`
          : "—"}
      </p>

      <p className="text-sm text-gray-500">
        {user?.email}
      </p>

      <p className="mt-2 flex justify-center items-baseline gap-1">
        <span className="text-xs text-gray-500">
          Balance
        </span>

        {loading ? (
          <span className="h-4 w-20 bg-gray-200 rounded animate-pulse" />
        ) : (
          <span className="text-orange-700 font-bold">
            ₦{balanceNgn.toLocaleString()}
          </span>
        )}
      </p>
    </div>
  );
}
