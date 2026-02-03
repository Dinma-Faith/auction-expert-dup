"use client";

import React, { useState } from "react";
import { Container } from "../../wrapper/container";
import { CarouselArrow } from "../../ui/carousel-arrow";

interface LotsSectionProps {
  title: string;
  items: number[];
  slidesPerView?: number;
}

export const LotsSection: React.FC<LotsSectionProps> = ({
  title,
  items,
  slidesPerView = 3,
}) => {
  const [startIdx, setStartIdx] = useState(0);

  const prevSlide = () => {
    setStartIdx((prev) => (prev - 1 < 0 ? 0 : prev - 1));
  };

  const nextSlide = () => {
    setStartIdx((prev) =>
      prev + slidesPerView >= items.length
        ? items.length - slidesPerView
        : prev + 1,
    );
  };

  const visibleItems = items.slice(startIdx, startIdx + slidesPerView);

  return (
    <section className="py-6 relative">
      <Container>
        <h2 className="text-2xl font-semibold mb-4">{title}</h2>

        <div className="flex gap-4 overflow-hidden">
          {visibleItems.map((item) => (
            <div
              key={item}
              className="bg-gray-300 h-80 flex items-center justify-center rounded w-full flex-1">
              <span className="text-[#0946B1] font-semibold">
                {title} {item}
              </span>
            </div>
          ))}
        </div>

        {/* Carousel Arrows */}
        <CarouselArrow
          direction="left"
          onClick={prevSlide}
          className="absolute top-1/2 left-0 -translate-y-1/2"
        />

        <CarouselArrow
          direction="right"
          onClick={nextSlide}
          className="absolute top-1/2 right-0 -translate-y-1/2"
        />
      </Container>
    </section>
  );
};
