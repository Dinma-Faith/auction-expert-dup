"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { heroSlides } from "../../../app/data/hero-data";
import { CarouselArrow } from "../../ui/carousel-arrow";
import { Container } from "../../wrapper/container";

export const HeroSection: React.FC = () => {
  const [current, setCurrent] = useState(0);
  const [autoSlideActive, setAutoSlideActive] = useState(true);

  const total = heroSlides.length;

  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % total);
    setAutoSlideActive(false);
  };

  const prevSlide = () => {
    setCurrent((prev) => (prev - 1 + total) % total);
    setAutoSlideActive(false);
  };

  useEffect(() => {
    if (!autoSlideActive || total <= 1) return;

    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % total);
    }, 6000);

    return () => clearInterval(interval);
  }, [autoSlideActive, total]);

  return (
    <section className="w-full py-6">
      <Container>
        <div className="relative h-105 md:h-130 overflow-hidden rounded-2xl">
          {heroSlides.map((slide, index) => {
            const offset = index - current;

            let positionClass = "opacity-0 z-0";

            if (offset === 0) {
              positionClass = "opacity-100 translate-x-0 z-10";
            } else if (offset === 1 || offset === -(total - 1)) {
              positionClass = "opacity-0 translate-x-full";
            } else if (offset === -1 || offset === total - 1) {
              positionClass = "opacity-0 -translate-x-full";
            }

            return (
              <Link
                key={slide.id}
                href={slide.href}
                className={`absolute inset-0 transition-all duration-700 ease-in-out ${positionClass}`}>
                <Image
                  src={slide.image}
                  alt={slide.title}
                  fill
                  priority={index === 0}
                  className="object-cover"
                />

                <div className="absolute inset-0 bg-black/40" />

                <div className="absolute inset-0 flex items-center justify-center text-center">
                  <div className="max-w-3xl px-6 text-white">
                    <h1 className="text-3xl md:text-5xl font-bold mb-4">
                      {slide.title}
                    </h1>
                    <p className="text-base md:text-lg text-white/90">
                      {slide.description}
                    </p>
                  </div>
                </div>
              </Link>
            );
          })}

          <CarouselArrow direction="left" onClick={prevSlide} />
          <CarouselArrow direction="right" onClick={nextSlide} />
        </div>
      </Container>
    </section>
  );
};
