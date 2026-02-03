"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactNode, useState } from "react";

export interface SidebarItem {
  label: string;
  href: string;
}

interface SidebarProps {
  items: SidebarItem[];
  header?: ReactNode;
  onItemClick?: () => void;
}

export default function Sidebar({ items, header, onItemClick }: SidebarProps) {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Mobile toggle button */}
      <div className="md:hidden flex justify-end p-4">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="text-gray-700 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {isOpen ? "Close" : "Menu"}
        </button>
      </div>

      {/* Sidebar */}
      <aside
        className={`
          fixed inset-y-0 left-0 z-50 w-64 bg-white rounded-xl shadow-sm overflow-hidden
          transform transition-transform duration-300
          md:relative md:translate-x-0
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        {/* Header */}
        {header && <div className="p-6 border-b">{header}</div>}

        {/* Nav */}
        <nav className="p-4 space-y-1">
          {items.map((item) => {
            const isActive = pathname === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => {
                  if (onItemClick) onItemClick();
                  setIsOpen(false); // close sidebar on mobile after click
                }}
                className={`block px-4 py-3 rounded-lg text-sm font-medium transition
                  ${
                    isActive
                      ? "bg-blue-50 text-[#0946B1]"
                      : "text-gray-600 hover:bg-gray-100 hover:text-[#0946B1]"
                  }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
      </aside>

      {/* Overlay for mobile when sidebar is open */}
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 bg-black bg-opacity-20 md:hidden z-40"
        />
      )}
    </>
  );
}
