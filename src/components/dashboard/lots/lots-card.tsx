"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import type { Lot } from "@/app/data/types";
import { CarouselArrow } from "../../ui/carousel-arrow";

interface LotCardProps {
  lot: Lot;
}

const PLACEHOLDER_IMAGES = [
  "/placeholder-car.png",
  "/placeholder-car.png",
  "/placeholder-car.png",
];

export const LotCard: React.FC<LotCardProps> = ({ lot }) => {
  const images =
    lot.images && lot.images.length > 0 ? lot.images : PLACEHOLDER_IMAGES;

  const [currentImg, setCurrentImg] = React.useState(0);

  const nextImage = () => {
    setCurrentImg((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImg((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <Link
      href={`/dashboard/lots/${lot.id}`}
      className="relative flex-1 h-80 bg-gray-200 rounded-2xl overflow-hidden shadow hover:shadow-lg transition-shadow"
    >
      <div className="relative h-full w-full">
        <Image
          src={images[currentImg]}
          alt={lot.title}
          fill
          className="object-cover"
        />

        <CarouselArrow
          direction="left"
          onClick={prevImage}
          className="absolute top-1/2 left-2 -translate-y-1/2 z-20"
        />

        <CarouselArrow
          direction="right"
          onClick={nextImage}
          className="absolute top-1/2 right-2 -translate-y-1/2 z-20"
        />
      </div>

      <div className="absolute bottom-0 left-0 right-0 bg-black/40 p-4 flex flex-col gap-2">
        <span className="text-white font-semibold text-lg">
          ${lot.buyNowPrice?.toLocaleString()}
        </span>

        <button
          onClick={(e) => {
            e.preventDefault();
          }}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Buy Now
        </button>
      </div>
    </Link>
  );
};
