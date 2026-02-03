"use client";

import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

type Direction = "left" | "right";

interface CarouselArrowProps {
  direction: Direction;
  onClick: () => void;
  className?: string; // <-- make sure className is optional
}

export const CarouselArrow: React.FC<CarouselArrowProps> = ({
  direction,
  onClick,
  className, // <-- destructure className from props
}) => {
  const Icon = direction === "left" ? ChevronLeft : ChevronRight;

  return (
    <button
      onClick={onClick}
      aria-label={`${direction} slide`}
      className={`
        absolute top-1/2 z-20 -translate-y-1/2 rounded-full
        bg-white/40 p-3 hover:bg-white/60 transition
        ${direction === "left" ? "left-4" : "right-4"}
        ${className || ""}  /* <-- apply additional classes from parent */
      `}
    >
      <Icon className="h-5 w-5 text-gray-700" />
    </button>
  );
};
