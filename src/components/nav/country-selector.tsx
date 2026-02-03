"use client";

import { ChevronDown } from "lucide-react";
import { useState } from "react";

const countries = [
  { code: "NG", flag: "🇳🇬" },
  { code: "US", flag: "🇺🇸" },
  { code: "GH", flag: "🇬🇭" },
];

export default function CountrySelector() {
  const [selected, setSelected] = useState(countries[0]);

  return (
    <div className="relative group cursor-pointer">
      <div className="flex items-center gap-1">
        <span>{selected.flag}</span>
        <ChevronDown size={14} />
      </div>

      <div className="
        absolute mt-2 bg-white border shadow
        opacity-0 invisible group-hover:opacity-100 group-hover:visible
        transition-all
      ">
        {countries.map((c) => (
          <button
            key={c.code}
            onClick={() => setSelected(c)}
            className="block px-4 py-2 hover:bg-gray-100 w-full text-left"
          >
            {c.flag} {c.code}
          </button>
        ))}
      </div>
    </div>
  );
}
