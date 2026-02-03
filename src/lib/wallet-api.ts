import { getAccessToken } from "./auth";

const API_BASE = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/wallets`;

console.log("API BASE:", API_BASE);

export const fetchWalletBalance = async () => {
  const token = getAccessToken();

  const res = await fetch(`${API_BASE}/balance`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch wallet balance");
  }

  return res.json();
};

export const fundWallet = async (amount: number) => {
  const token = getAccessToken();

  const res = await fetch(`${API_BASE}/fund`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ amount }),
  });

  if (!res.ok) {
    throw new Error("Failed to fund wallet");
  }

  return res.json();
};
