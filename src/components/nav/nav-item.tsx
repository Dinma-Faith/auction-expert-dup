"use client";

import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { usePathname } from "next/navigation";

interface NavItemProps {
  label: string;
  href?: string;
  dropdown?: string[];
  mobile?: boolean;
  openDropdown?: string | null;
  setOpenDropdown?: (name: string | null) => void;
}

export default function NavItem({
  label,
  href = "#",
  dropdown,
  mobile,
  openDropdown,
  setOpenDropdown,
}: NavItemProps) {
  const pathname = usePathname();
  const isActive = pathname === href || pathname.startsWith(`${href}/`);

  if (mobile) {
    return (
      <div>
        {!dropdown ? (
          <Link
            href={href}
            className={`font-semibold block ${
              isActive ? "text-blue-600" : "text-gray-800"
            }`}
          >
            {label}
          </Link>
        ) : (
          <div>
            <button
              onClick={() =>
                setOpenDropdown?.(openDropdown === label ? null : label)
              }
              className="flex items-center justify-between w-full font-semibold text-gray-800"
            >
              {label}
              <ChevronDown
                size={16}
                className={openDropdown === label ? "rotate-180" : ""}
              />
            </button>
            {openDropdown === label && (
              <ul className="ml-4 mt-2 space-y-2">
                {dropdown.map((item) => (
                  <li key={item}>
                    <Link
                      href={`${href}/${item.toLowerCase().replace(/\s/g, "-")}`}
                      className="text-gray-600 hover:text-blue-600 block"
                      onClick={() => setOpenDropdown?.(null)}
                    >
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}
      </div>
    );
  }

  // Desktop
  if (!dropdown) {
    return (
      <Link
        href={href}
        className={`font-semibold ${
          isActive ? "text-blue-600" : "text-gray-700 hover:text-blue-600"
        }`}
      >
        {label}
      </Link>
    );
  }

  return (
    <div className="relative">
      <button
        onClick={() =>
          setOpenDropdown?.(openDropdown === label ? null : label)
        }
        className={`flex items-center gap-1 font-semibold transition-colors ${
          isActive ? "text-blue-600" : "text-gray-700 hover:text-blue-600"
        }`}
      >
        {label}
        <ChevronDown
          size={16}
          className={`transition-transform ${
            openDropdown === label ? "rotate-180" : ""
          }`}
        />
      </button>

      {openDropdown === label && (
        <div className="absolute left-0 top-full mt-3 w-52 bg-white border shadow-lg z-50">
          <ul className="py-2">
            {dropdown.map((item) => (
              <li key={item}>
                <Link
                  href={`${href}/${item.toLowerCase().replace(/\s/g, "-")}`}
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-blue-600"
                  onClick={() => setOpenDropdown?.(null)}
                >
                  {item}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
