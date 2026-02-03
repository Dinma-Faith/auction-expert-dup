"use client";

import React from "react";
import { Container } from "../../wrapper/container";
import {
  TruckIcon,
  ShieldCheckIcon,
  GlobeAltIcon,
  ClockIcon,
} from "@heroicons/react/24/outline"; // Heroicons

interface Feature {
  icon: React.ReactNode;
  title: string;
  description: string;
}

export const WhyChooseUs = () => {
  const features: Feature[] = [
    {
      icon: <TruckIcon className="w-16 h-16 text-[#0946B1]" />,
      title: "Thousands of Vehicles",
      description:
        "Wide selection of vehicles available for bidding and purchase.",
    },
    {
      icon: <GlobeAltIcon className="w-16 h-16 text-[#0946B1]" />,
      title: "Worldwide Shipping",
      description:
        "We ship vehicles to multiple countries safely and reliably.",
    },
    {
      icon: <ShieldCheckIcon className="w-16 h-16 text-[#0946B1]" />,
      title: "Secure Transactions",
      description: "Your payments and purchases are fully protected.",
    },
    {
      icon: <ClockIcon className="w-16 h-16 text-[#0946B1]" />,
      title: "24/7 Support",
      description: "Our team is available around the clock to assist you.",
    },
  ];

  return (
    <section className="py-12 bg-gray-50">
      <Container>
        <h2 className="text-2xl font-semibold mb-4">Why Choose Us?</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="flex items-center bg-[#F3F6FB] p-6 rounded-lg shadow hover:shadow-lg transition-shadow duration-300">
              <div className="shrink-0 mr-4 flex items-center justify-center w-20 h-20 rounded-full bg-white">
                {feature.icon}
              </div>
              <div>
                <h3 className="text-xl font-semibold text-[#0946B1] mb-1">
                  {feature.title}
                </h3>
                <p className="text-[#0946B1] text-sm">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
};
