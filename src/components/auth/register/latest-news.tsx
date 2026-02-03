"use client";

import { Button } from "@/components/ui/button";

const BLUE = "#0946B1";
const BLUE_HOVER = "#07328B";

export default function LatestNews() {
  return (
    <section className="bg-gray-50 py-16 px-4">
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-semibold">Latest News</h2>
          <Button
            variant="link"
            className="font-semibold"
            style={{ color: BLUE }}
            onMouseOver={(e) => (e.currentTarget.style.color = BLUE_HOVER)}
            onMouseOut={(e) => (e.currentTarget.style.color = BLUE)}
          >
            View More
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-white border rounded-xl p-6 space-y-3">
              <h3 className="font-semibold">Lorem ipsum dolor sit amet</h3>
              <p className="text-sm text-gray-600">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
