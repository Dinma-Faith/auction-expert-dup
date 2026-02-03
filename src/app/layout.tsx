import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import NavBar from "../components/nav/navbar";
import Footer from "../components/footer/footer";
import { AuthProvider } from "@/context/auth-context";
import { UIProvider } from "@/context/ui-context";
import LoginModal from "@/components/auth/login/login-modal";
import ForgotPasswordModal from "@/components/auth/forgot-password/forgot-password-modal";

import "./style/globals.css";
import "keen-slider/keen-slider.min.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Auction Expert",
  description: "Smart auction insights and expert bidding tools",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased flex min-h-screen flex-col`}
      >
        <AuthProvider>
          <UIProvider>
            <NavBar />

            <main className="flex-1 pt-20">{children}</main>

            <Footer />

            {/* 🔐 Global Login Modal */}
            <LoginModal />
            <ForgotPasswordModal />
          </UIProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
