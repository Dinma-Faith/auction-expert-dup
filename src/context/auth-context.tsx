"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { clearAuthTokens, getAccessToken } from "@/lib/auth";

type AuthContextType = {
  isAuthenticated: boolean;
  setIsAuthenticated: (value: boolean) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setIsAuthenticated(!!getAccessToken());
    setMounted(true);
  }, []);

  const logout = () => {
    clearAuthTokens();
    setIsAuthenticated(false);
    window.location.href = "/login";
  };

  if (!mounted) return null;

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, setIsAuthenticated, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used inside AuthProvider");
  }
  return ctx;
};
