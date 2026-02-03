"use client";
import React from "react";
import { Button } from "@/components/ui/button";

export const CustomerReviews: React.FC = () => (
  <section className="p-6">
    <h2 className="text-2xl font-semibold mb-4">Customer Reviews</h2>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {[1, 2, 3].map((item) => (
        <div
          key={item}
          className="bg-gray-100 p-4 rounded shadow flex flex-col items-center"
        >
          <p className="mb-2">
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Review {item}"
          </p>
          <span className="text-sm text-gray-500">Customer {item}</span>
        </div>
      ))}
    </div>
    <div className="mt-4 text-center">
      <Button variant="default" size="default">
        View More Reviews
      </Button>
    </div>
  </section>
);
