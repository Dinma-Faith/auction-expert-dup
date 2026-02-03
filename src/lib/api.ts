// lib/api.ts
import { getAccessToken, getRefreshToken, setAuthTokens, clearAuthTokens } from "./auth";

export const API_BASE = "http://45.55.38.185:3000/api/v1";

// --- Types ---
export interface User {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  address?: string;
  city?: string;
  country?: string;
  [key: string]: any;
}

export interface AuthResponse {
  accessToken: string;
  refreshToken: string;
  user: User;
}

// ---  fetch function with token handling ---
export async function apiFetch<T>(url: string, options: RequestInit = {}): Promise<T> {
  const accessToken = getAccessToken();

  const res = await fetch(`${API_BASE}${url}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(accessToken && { Authorization: `Bearer ${accessToken}` }),
      ...options.headers,
    },
  });

  // If access token expired
  if (res.status === 401) {
    const refreshToken = getRefreshToken();

    if (!refreshToken) {
      clearAuthTokens();
      window.location.href = "/login";
      throw new Error("Session expired");
    }

    // Refresh token request
    const refreshRes = await fetch(`${API_BASE}/auth/refresh`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ refreshToken }),
    });

    if (!refreshRes.ok) {
      clearAuthTokens();
      window.location.href = "/login";
      throw new Error("Refresh failed");
    }

    const data = await refreshRes.json();
    setAuthTokens(data.accessToken, data.refreshToken);

    // Retry original request with new token
    return apiFetch<T>(url, options);
  }

  // Check for other errors
  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.message || `API request failed with status ${res.status}`);
  }

  // Return typed JSON
  return res.json() as Promise<T>;
}

// --- Auth functions ---
export async function login(email: string, password: string): Promise<AuthResponse> {
  return apiFetch<AuthResponse>("/auth/login", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });
}

export async function register(
  firstName: string,
  lastName: string,
  email: string,
  phone: string,
  address: string,
  city: string,
  country: string,
  password: string
): Promise<AuthResponse> {
  return apiFetch<AuthResponse>("/auth/register", {
    method: "POST",
    body: JSON.stringify({
      firstName,
      lastName,
      email,
      phone,
      address,
      city,
      country,
      password,
    }),
  });
}
