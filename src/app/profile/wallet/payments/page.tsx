"use client";

import { useEffect, useState } from "react";
import { fetchWalletBalance } from "@/lib/wallet-api";

type Payment = {
  id: string;
  amount: number;
  date: string;
  status: string;
};

export default function PaymentsPage() {
  const [payments, setPayments] = useState<Payment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchWalletBalance()
      .then(setPayments)
      .finally(() => setLoading(false));
  }, []);

  return (
    <div>
      <h1 className="text-xl font-semibold mb-6">My payments</h1>

      {loading && <p>Loading payments...</p>}

      {!loading && payments.length === 0 && (
        <p className="text-gray-500">No payments yet.</p>
      )}

      {!loading && payments.length > 0 && (
        <div className="space-y-4">
          {payments.map((payment) => (
            <div
              key={payment.id}
              className="border rounded-lg p-4 flex justify-between items-center"
            >
              <div>
                <p className="font-medium">
                  ₦{payment.amount.toLocaleString()}
                </p>
                <p className="text-xs text-gray-500">
                  {new Date(payment.date).toLocaleString()}
                </p>
              </div>

              <span
                className={`text-sm font-medium ${
                  payment.status === "SUCCESS"
                    ? "text-green-600"
                    : payment.status === "PENDING"
                    ? "text-orange-600"
                    : "text-red-600"
                }`}
              >
                {payment.status}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
