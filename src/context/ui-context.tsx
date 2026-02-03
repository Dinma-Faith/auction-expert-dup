"use client";

import { createContext, useContext, useState } from "react";

interface UIContextType {
  loginOpen: boolean;
  openLogin: () => void;
  closeLogin: () => void;
  forgotPasswordOpen: boolean;
  openForgotPassword: () => void;
  closeForgotPassword: () => void;
}

const UIContext = createContext<UIContextType | null>(null);

export function UIProvider({ children }: { children: React.ReactNode }) {
  const [loginOpen, setLoginOpen] = useState(false);
  const [forgotPasswordOpen, setForgotPasswordOpen] = useState(false);

  return (
    <UIContext.Provider
      value={{
        loginOpen,
        openLogin: () => setLoginOpen(true),
        closeLogin: () => setLoginOpen(false),
        forgotPasswordOpen,
        openForgotPassword: () => setForgotPasswordOpen(true),
        closeForgotPassword: () => setForgotPasswordOpen(false),
      }}
    >
      {children}
    </UIContext.Provider>
  );
}

export function useUI() {
  const context = useContext(UIContext);
  if (!context) throw new Error("useUI must be used within a UIProvider");
  return context;
}
