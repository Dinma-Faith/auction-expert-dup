"use client";

import React, { FC } from "react";
import {
  Search,
  Car,
  Hammer,
  Zap,
  Tag,
  Settings,
  DollarSign,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface Category {
  label: string;
  icon: React.ElementType;
  slug: string; // For API or page link
}

const categories: Category[] = [
  { label: "Clean cars", icon: Car, slug: "clean-cars" },
  { label: "Salvage", icon: Car, slug: "salvage" },
  { label: "Live auction", icon: Hammer, slug: "live-auction" },
  { label: "Electric vehicles", icon: Zap, slug: "electric-vehicles" },
  { label: "Repo sale", icon: Tag, slug: "repo-sale" },
  { label: "Vehicles under $1000", icon: DollarSign, slug: "under-1000" },
  { label: "Order parts", icon: Settings, slug: "order-parts" },
];

const BLUE = "#0946B1";
const BLUE_HOVER = "#07328B"; // Slightly darker hover

export const SearchForm: FC = () => {
  return (
    <section className="w-full">
      {/* ================= SEARCH FORM ================= */}
      <div className="max-w-360 mx-auto px-8 lg:px-12 mt-6">
        <div className="bg-[#f3f6fb] rounded-2xl px-6 lg:px-8 py-6">
          <form className="space-y-5">
            {/* ================= ROW 1 ================= */}
            <div className="grid grid-cols-12 gap-5 items-center">
              {/* Keywords */}
              <div className="col-span-12 lg:col-span-5 relative">
                <input
                  type="text"
                  placeholder="Enter lot, VIN, keywords"
                  className="w-full h-12 rounded-full bg-white border border-gray-200 pl-5 pr-14 text-sm text-gray-500 outline-none focus:ring-2 focus:ring-blue-500"
                />
                <Search
                  size={18}
                  className="absolute right-6 top-1/2 -translate-y-1/2 text-gray-400"
                />
              </div>

              {/* Any Make | Any Model */}
              <div className="col-span-12 lg:col-span-5 flex h-12 rounded-full border border-gray-200 bg-white overflow-hidden">
                <select className="flex-1 px-5 text-sm text-gray-500 bg-white outline-none">
                  <option>Any Make</option>
                </select>
                <div className="w-px bg-gray-200 mx-2" />
                <select className="flex-1 px-5 text-sm text-gray-500 bg-white outline-none">
                  <option>Any Model</option>
                </select>
              </div>

              {/* Advanced Search */}
              <div className="col-span-12 lg:col-span-2">
                <button
                  type="button"
                  className={`h-12 px-6 text-sm font-semibold text-[${BLUE}] hover:text-[${BLUE_HOVER}] whitespace-nowrap`}
                  style={{ color: BLUE }}
                >
                  Advanced Search
                </button>
              </div>
            </div>

            {/* ================= ROW 2 ================= */}
            <div className="grid grid-cols-12 gap-5 items-center">
              {/* From | To */}
              <div className="col-span-12 lg:col-span-5 flex h-12 rounded-full border border-gray-200 bg-white overflow-hidden">
                <select className="flex-1 px-5 text-sm text-gray-500 bg-white outline-none">
                  <option>From</option>
                </select>
                <div className="w-px bg-gray-200 mx-2" />
                <select className="flex-1 px-5 text-sm text-gray-500 bg-white outline-none">
                  <option>To</option>
                </select>
              </div>

              {/* Min Price | Max Price */}
              <div className="col-span-12 lg:col-span-5 flex h-12 rounded-full border border-gray-200 bg-white overflow-hidden">
                <select className="flex-1 px-5 text-sm text-gray-500 bg-white outline-none">
                  <option>Min Price</option>
                </select>
                <div className="w-px bg-gray-200 mx-2" />
                <select className="flex-1 px-5 text-sm text-gray-500 bg-white outline-none">
                  <option>Max Price</option>
                </select>
              </div>

              {/* Search Button */}
              <div className="col-span-12 lg:col-span-2">
                <Button
                  className="w-45 h-12 rounded-full font-semibold text-white"
                  style={{ backgroundColor: BLUE }}
                  onMouseOver={(e) =>
                    (e.currentTarget.style.backgroundColor = BLUE_HOVER)
                  }
                  onMouseOut={(e) =>
                    (e.currentTarget.style.backgroundColor = BLUE)
                  }
                >
                  Search
                </Button>
              </div>
            </div>
          </form>
        </div>
      </div>

      {/* ================= CATEGORIES ================= */}
      <div className="max-w-360 mx-auto px-8 lg:px-12 mt-6">
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-4">
          {categories.map(({ label, icon: Icon, slug }) => (
            <Link key={slug} href={`/category/${slug}`}  className="flex flex-col items-center justify-center gap-2 bg-[#f3f6fb] rounded-xl py-4 hover:bg-blue-50 transition"
>
                <Icon size={28} stroke={BLUE} fill={BLUE} />
                <span className="text-sm font-medium text-center text-[#0946B1]">
                  {label}
                </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};
