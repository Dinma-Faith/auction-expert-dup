"use client";

import { HeroSection } from "@/components/dashboard/dashboard-sections/hero-section";
import { SearchForm } from "@/components/dashboard/dashboard-sections/search-form";
import { LotsSection } from "@/components/dashboard/dashboard-sections/lots-section";
import { WhyChooseUs } from "@/components/dashboard/dashboard-sections/why-choose-us";
import { BuyCarSection } from "@/components/dashboard/dashboard-sections/buy-car-section";
import { CustomerReviews } from "@/components/dashboard/dashboard-sections/customer-reviews";

export default function DashboardPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <HeroSection />
      <SearchForm />

      <LotsSection
        title="Hot Lots"
        items={[1, 2, 3, 4, 5, 6, 7, 8]}
        slidesPerView={4}
      />

      <WhyChooseUs />
      <BuyCarSection />
      <CustomerReviews />
    </div>
  );
}
