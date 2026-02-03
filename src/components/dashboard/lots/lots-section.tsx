"use client";

import React, { useEffect, useState } from "react";
import { Container } from "../../wrapper/container";
import { LotCard } from "../lots/lots-card";
import { CarouselArrow } from "../../ui/carousel-arrow";
import { Lot } from "../../../app/data/types";

const API_BASE = "http://45.55.38.185:3000/api/v1";

export const LotsSection: React.FC = () => {
  const [lots, setLots] = useState<Lot[]>([]);
  const [current, setCurrent] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const slidesPerView = 3;
  const total = lots.length;

  // Fetch lots
  useEffect(() => {
    const token = localStorage.getItem("jwt_token");
    if (!token) return;

    setLoading(true);
    fetch(`${API_BASE}/lots?page=1&paginate=10`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(async (res) => {
        const data = await res.json();
        if (!res.ok) throw new Error(JSON.stringify(data));
        return data;
      })
      .then((data) => setLots(data.data?.data || data.data?.lots || []))
      .catch((err) => {
        console.error("LOTS FETCH ERROR:", err);
        setError("Failed to fetch lots");
      })
      .finally(() => setLoading(false));
  }, []);

  // Auto-slide
  useEffect(() => {
    if (total <= 1) return;

    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % total);
    }, 6000);

    return () => clearInterval(interval);
  }, [total]);

  const prevSlide = () => {
    setCurrent((prev) => (prev - 1 + total) % total);
  };

  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % total);
  };

  // Visible lots
  const visibleLots = [];
  for (let i = 0; i < slidesPerView; i++) {
    visibleLots.push(lots[(current + i) % total]);
  }

  return (
    <section className="py-6">
      <Container>
        <h2 className="text-2xl font-semibold mb-6">Auction Lots</h2>

        {error && <p className="text-red-500 mb-4">{error}</p>}
        {loading && <p>Loading lots...</p>}

        <div className="relative flex gap-4 overflow-hidden">
          {visibleLots.map((lot) =>
            lot ? <LotCard key={lot.id} lot={lot} /> : null,
          )}

          {total > 0 && (
            <>
              <CarouselArrow
                direction="left"
                onClick={prevSlide}
                className="absolute top-1/2 left-0 -translate-y-1/2 z-20"
              />
              <CarouselArrow
                direction="right"
                onClick={nextSlide}
                className="absolute top-1/2 right-0 -translate-y-1/2 z-20"
              />
            </>
          )}
        </div>
      </Container>
    </section>
  );
};
