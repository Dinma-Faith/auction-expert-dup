"use client";

import { X } from "lucide-react";
import { useUI } from "@/context/ui-context";
import LoginForm from "./login-form";

export default function LoginModal() {
  const { loginOpen, closeLogin } = useUI();

  if (!loginOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* ================= MOBILE-FIRST BACKDROP ================= */}
      <div
        className="absolute inset-0 bg-black/50"
        onClick={closeLogin}
      />

      {/* ================= MODAL CARD ================= */}
      <div className="relative z-50 w-full max-w-md rounded-lg bg-white p-6 shadow-lg">
        <button
          type="button"
          onClick={closeLogin}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
          aria-label="Close login modal"
        >
          <X size={24} />
        </button>

        <LoginForm />
      </div>
    </div>
  );
}
