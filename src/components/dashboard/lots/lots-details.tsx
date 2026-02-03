"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import { Container } from "../../wrapper/container"
import { CarouselArrow } from "../../ui/carousel-arrow";
import { Lot } from "../../../app/data/types";

const API_BASE = "http://45.55.38.185:3000/api/v1";

export default function LotDetails() {
  const { id } = useParams();
  const [lot, setLot] = useState<Lot | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [currentImg, setCurrentImg] = useState(0);

  useEffect(() => {
    const token = localStorage.getItem("jwt_token");
    if (!token || !id) return;

    setLoading(true);
    fetch(`${API_BASE}/lots/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(async (res) => {
        const data = await res.json();
        if (!res.ok) throw new Error(JSON.stringify(data));
        return data;
      })
      .then((data) => setLot(data.data))
      .catch((err) => {
        console.error("LOT FETCH ERROR:", err);
        setError("Failed to fetch lot details");
      })
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <p className="text-center py-20">Loading lot details...</p>;
  if (error) return <p className="text-center py-20 text-red-500">{error}</p>;
  if (!lot) return null;

  const nextImage = () => {
    if (!lot.images) return;
    setCurrentImg((prev) => (prev + 1) % lot.images.length);
  };

  const prevImage = () => {
    if (!lot.images) return;
    setCurrentImg((prev) => (prev - 1 + lot.images.length) % lot.images.length);
  };

  return (
    <section className="py-6">
      <Container>
        <h1 className="text-3xl font-bold mb-4">{lot.title}</h1>
        <p className="text-gray-500 mb-6">{lot.make} {lot.model} | {lot.year}</p>

        {/* Image Carousel */}
        {lot.images && lot.images.length > 0 && (
          <div className="relative w-full h-96 mb-6 rounded-2xl overflow-hidden shadow">
            <Image
              src={lot.images[currentImg]}
              alt={`${lot.title} image ${currentImg + 1}`}
              fill
              className="object-cover"
            />
            <CarouselArrow direction="left" onClick={prevImage} className="absolute top-1/2 left-2 -translate-y-1/2 z-20" />
            <CarouselArrow direction="right" onClick={nextImage} className="absolute top-1/2 right-2 -translate-y-1/2 z-20" />
          </div>
        )}

        {/* Auction Controls */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <button className="bg-green-600 text-white px-6 py-3 rounded hover:bg-green-700">
            Buy Now (${lot.buyNowPrice?.toLocaleString()})
          </button>
          <button className="bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700">
            Make Offer
          </button>
          <div className="flex items-center gap-2">
            <button className="bg-gray-200 px-3 py-1 rounded hover:bg-gray-300">-</button>
            <span className="font-semibold text-lg">${lot.currentBid?.toLocaleString()}</span>
            <button className="bg-gray-200 px-3 py-1 rounded hover:bg-gray-300">+</button>
          </div>
        </div>

        {/* Other Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <p><strong>Condition:</strong> {lot.condition}</p>
          <p><strong>Mileage:</strong> {lot.mileage?.toLocaleString()}</p>
          <p><strong>Primary Damage:</strong> {lot.primaryDamage}</p>
          <p><strong>Secondary Damage:</strong> {lot.secondaryDamage}</p>
          <p><strong>Location:</strong> {lot.location}</p>
          <p><strong>Drive:</strong> {lot.drive}</p>
          <p><strong>Transmission:</strong> {lot.transmission}</p>
          <p><strong>Cylinders:</strong> {lot.cylinders}</p>
          <p><strong>Color:</strong> {lot.color}</p>
          <p><strong>Sale State:</strong> {lot.saleState}</p>
          <p><strong>Has Keys:</strong> {lot.hasKeys ? "Yes" : "No"}</p>
        </div>
      </Container>
    </section>
  );
}
