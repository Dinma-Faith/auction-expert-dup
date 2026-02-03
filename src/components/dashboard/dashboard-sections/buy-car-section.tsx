"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { Container } from "../../wrapper/container";
import Link from "next/link";
// import { StarIcon, BoltIcon, HomeIcon } from "@heroicons/react/24/solid";
import { SiToyota, SiHonda, SiFord, SiMercedes, SiJeep } from "react-icons/si";

interface CarType {
  icon: React.ReactNode;
  label: string;
  link: string;
}

export const BuyCarSection: React.FC = () => {
  const carTypes: CarType[] = [
    { icon: <SiToyota className="w-15 h-15 text-black" />, label: "Toyota", link: "/cars/toyota" },
    { icon: <SiHonda className="w-15 h-15 text-black" />, label: "Honda", link: "/cars/sedans" },
    { icon: <SiFord className="w-15 h-15 text-black" />, label: "Ford", link: "/cars/suvs" },
    { icon: <SiJeep className="w-15 h-15 text-black" />, label: "Jeep", link: "/cars/jeep"  },
    { icon: <SiMercedes className="w-15 h-15 text-black" />, label: "Mercedes Benz", link: "/cars/electric" },
  ];

  return (
    <section>
      <Container className="py-12 text-center">
        {/* Heading */}
        <h2 className="text-2xl font-semibold mb-4 text-[#0946B1]">
          Ready to Buy Your Car?
        </h2>
        <p className="mb-6 text-[#0946B1]">
          Browse our inventory and find your dream car today.
        </p>

        {/* Clickable car type icons */}
        <div className="mt-6 flex flex-wrap justify-center gap-4">
          {carTypes.map((car, index) => (
            <Link
              key={index}
              href={car.link}
              className="flex flex-col items-center cursor-pointer px-2 py-1 transition-transform duration-200 hover:scale-110"
            >
              {/* Icon only, larger size */}
              <div className="mb-1">{car.icon}</div>
              {/* Label */}
              <span className="text-sm font-medium text-black">{car.label}</span>
            </Link>
          ))}
        </div>

        {/* Browse Cars button */}
        <Button variant="default" size="default" className="mb-8">
          Browse Cars
        </Button>
      </Container>
    </section>
  );
};
