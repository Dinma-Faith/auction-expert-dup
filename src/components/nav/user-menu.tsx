"use client";

import { ChevronDown, User } from "lucide-react";
import Link from "next/link";

interface UserMenuProps {
  user: {
    name: string;
    avatar?: string;
  };
  mobile?: boolean;
}

export default function UserMenu({ user, mobile }: UserMenuProps) {
  if (mobile) {
    return <p className="font-semibold">{user.name}</p>;
  }

  return (
    <div className="relative group cursor-pointer">
      <div className="flex items-center gap-2">
        <User />
        <span className="font-semibold">{user.name}</span>
        <ChevronDown size={16} />
      </div>

      <div className="
        absolute right-0 mt-3 w-40 bg-white shadow-lg border
        opacity-0 invisible group-hover:opacity-100 group-hover:visible
        transition-all duration-200
      ">
        <Link href="/profile" className="block px-4 py-2 hover:bg-gray-100">
          Profile
        </Link>
        <Link href="/logout" className="block px-4 py-2 hover:bg-gray-100">
          Logout
        </Link>
      </div>
    </div>
  );
}
