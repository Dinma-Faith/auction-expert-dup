"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, Search } from "lucide-react";

import NavItem from "../nav/nav-item";
import CountrySelector from "../nav/country-selector";
import { useAuth } from "@/context/auth-context";
import { useUI } from "@/context/ui-context";

export default function NavBar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const { isAuthenticated, logout } = useAuth();
  const { openLogin } = useUI();

  const navLinks = [
    { label: "Home", href: "/dashboard" },
    { label: "Auctions", href: "/auction" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
  ];

  return (
    <>
      {/* ================= MOBILE HEADER ================= */}
      <nav className="fixed top-0 left-0 right-0 w-full bg-white border-b shadow-sm z-50 lg:hidden">
        <div className="flex items-center justify-between max-w-7xl mx-auto px-4 h-16">
          <Link href="/dashboard" className="flex items-center">
            <Image
              src="/logo/luztow_logo.png"
              alt="Logo"
              width={56}
              height={56}
              className="w-14 h-auto object-contain"
            />
          </Link>

          <button
            type="button"
            onClick={() => setMobileOpen(true)}
            className="ml-auto"
          >
            <Menu size={26} />
          </button>
        </div>
      </nav>

      {/* ================= MOBILE OVERLAY ================= */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* ================= MOBILE DRAWER ================= */}
      <aside
        className={`fixed top-0 right-0 h-screen w-3/4 max-w-xs bg-white z-50 transform transition-transform duration-300
        ${mobileOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        <div className="flex items-center justify-between px-4 py-4 border-b">
          <Image
            src="/logo/luztow_logo.png"
            alt="Logo"
            width={56}
            height={56}
            className="w-14 h-auto"
          />
          <button type="button" onClick={() => setMobileOpen(false)}>
            <X size={24} />
          </button>
        </div>

        <div className="px-4 py-2 border-b">
          <div className="flex items-center gap-2 border rounded-full px-3 py-1">
            <input
              placeholder="Search..."
              className="w-full text-sm outline-none"
            />
            <Search size={16} className="text-gray-400" />
          </div>
        </div>

        <nav className="px-6 py-4 space-y-4 font-medium">
          {navLinks.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              onClick={() => setMobileOpen(false)}
              className="block hover:text-[#0946B1]"
            >
              {item.label}
            </Link>
          ))}

          {isAuthenticated ? (
            <>
              <Link href="/profile" onClick={() => setMobileOpen(false)}>
                Profile
              </Link>

              <button
                type="button"
                onClick={() => {
                  logout();
                  setMobileOpen(false);
                }}
                className="text-left hover:text-red-600"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <button
                type="button"
                onClick={() => {
                  openLogin();
                  setMobileOpen(false);
                }}
                className="block w-full border rounded-full py-2 text-center"
              >
                Log in
              </button>

              <Link
                href="/register"
                onClick={() => setMobileOpen(false)}
                className="block rounded-full py-2 bg-[#0946B1] text-white text-center"
              >
                Register
              </Link>
            </>
          )}
        </nav>
      </aside>

      {/* ================= DESKTOP NAV ================= */}
      <nav className="hidden lg:flex fixed top-0 left-0 right-0 w-full bg-white border-b shadow-sm z-50">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center w-full">
          <Link href="/dashboard" className="flex items-center">
            <Image
              src="/logo/luztow_logo.png"
              alt="Logo"
              width={56}
              height={56}
              className="w-14 h-auto object-contain"
            />
          </Link>

          <div className="flex-1" />

          <div className="flex items-center space-x-16">
            {navLinks.map((item) => (
              <NavItem
                key={item.label}
                {...item}
                openDropdown={openDropdown}
                setOpenDropdown={setOpenDropdown}
              />
            ))}
          </div>

          <div className="h-6 border-l border-gray-300 mx-6" />

          <div className="flex items-center space-x-4">
            {isAuthenticated ? (
              <>
                <CountrySelector />

                <Link
                  href="/profile"
                  className="font-semibold text-gray-700 hover:text-[#0946B1]"
                >
                  Profile
                </Link>

                <button
                  type="button"
                  onClick={logout}
                  className="font-semibold text-gray-700 hover:text-red-600"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <button
                  type="button"
                  onClick={openLogin}
                  className="font-semibold text-gray-700 hover:text-[#0946B1]"
                >
                  Log in
                </button>

                <Link
                  href="/register"
                  className="bg-[#0946B1] text-white px-4 py-2 rounded font-semibold hover:bg-[#07328B]"
                >
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      </nav>
    </>
  );
}
