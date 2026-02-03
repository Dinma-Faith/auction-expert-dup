"use client";

import { useState } from "react";
import { fundWallet } from "@/lib/wallet-api";
import { useWallet } from "@/context/wallet-context";

export default function TopUpPage() {
  const { balanceNgn, loading } = useWallet();
  const [amount, setAmount] = useState("");
  const [message, setMessage] = useState("");

  const handleTopUp = async () => {
    try {
      const amt = Number(amount);
      if (!amt || amt < 1) {
        setMessage("Enter a valid amount (minimum 1 NGN)");
        return;
      }

      const data = await fundWallet(amt);
      window.location.href = data.authorizationUrl;
    } catch (err: any) {
      setMessage(err.message || "Failed to initiate payment");
    }
  };

  return (
    <div className="max-w-xl mx-auto space-y-6">
      {/* Wallet balance */}
      <div className="bg-gray-100 rounded-xl p-5 flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-500">Wallet balance</p>
          <p className="text-2xl font-semibold">
            ₦
            <span className="text-lg">
              {loading ? "..." : balanceNgn.toLocaleString()}
            </span>
          </p>
        </div>
        <span className="text-xs text-gray-400">NGN</span>
      </div>

      <h1 className="text-xl font-semibold">Top Up Wallet</h1>

      {/* Amount input */}
      <div>
        <label className="block text-sm font-medium mb-1">
          Amount (NGN)
        </label>
        <input
          type="number"
          className="w-full border rounded-lg p-3"
          placeholder="e.g. 25,000"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
      </div>

      {/* <div className="bg-gray-50 border rounded-lg p-4 text-sm text-gray-600">
        You will be redirected to Paystack to complete your payment securely
        using card, bank transfer, or USSD.
      </div> */}

      {/* Submit */}
      <button
        onClick={handleTopUp}
        disabled={!amount}
        className="w-full bg-orange-600 text-white py-3 rounded-lg
          disabled:opacity-50 disabled:cursor-not-allowed hover:bg-orange-700"
      >
        Top Up
      </button>

      {message && <p className="text-sm text-red-600">{message}</p>}
    </div>
  );
}
