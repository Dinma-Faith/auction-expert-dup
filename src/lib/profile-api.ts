// lib/profile-api.ts
import { getAccessToken } from "./auth";

const API_BASE = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/profile`;

export const fetchProfile = async () => {
  const token = getAccessToken();

  const res = await fetch(API_BASE, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) throw new Error("Failed to fetch profile");
  return res.json();
};
