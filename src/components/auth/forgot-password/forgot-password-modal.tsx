"use client";

import { X } from "lucide-react";
import { useUI } from "@/context/ui-context";
import ForgotPasswordForm from "./forgot-password-form";

export default function ForgotPasswordModal() {
  const { forgotPasswordOpen, closeForgotPassword } = useUI();

  if (!forgotPasswordOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* ================= BACKDROP ================= */}
      <div
        className="absolute inset-0 bg-black/50"
        onClick={closeForgotPassword}
      />

      {/* ================= MODAL CARD ================= */}
      <div className="relative z-50 w-full max-w-lg bg-white p-6 rounded-lg shadow-lg">
        <button
          onClick={closeForgotPassword}
          className="absolute top-1 right-1 text-gray-500 hover:text-gray-700"
        >
          <X size={22} />
        </button>

        <ForgotPasswordForm />
      </div>
    </div>
  );
}
