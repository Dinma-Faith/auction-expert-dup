"use client";

import { Search } from "lucide-react";
import { useState } from "react";

export default function SearchDropdown({ mobile }: { mobile?: boolean }) {
  const [open, setOpen] = useState(false);

  if (mobile) {
    return <p className="font-semibold">Search</p>;
  }

  return (
    <div className="relative">
      <Search
        className="cursor-pointer"
        onClick={() => setOpen(!open)}
      />

      {open && (
        <div className="absolute right-0 mt-3 bg-white shadow border p-3 w-64">
          <input
            placeholder="Search vehicles..."
            className="w-full border px-3 py-2 rounded outline-none"
          />
        </div>
      )}
    </div>
  );
}
