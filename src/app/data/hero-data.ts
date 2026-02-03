// import heroAuction from "../../assets/images/hero-1.jpg";
// import heroBidding from "../../assets/images/hero-2.jpg";
// import heroShipping from "../../assets/images/hero-3.jpg";
// import heroDeal from "../../assets/images/hero-4.jpg";

export interface HeroSlide {
  id: number;
  image: string;
  title: string;
  description: string;
  href: string;
}

export const heroSlides: HeroSlide[] = [
  {
    id: 1,
    image: "/images/hero-1.jpg",
    title: "Your Trusted Global Auto Auction Partner",
    description:
      "Auction Expert provides a complete end-to-end auto auction service. We bid, ship, clear, and deliver vehicles directly to you in Nigeria.",
    href: "/about-us",
  },
  {
    id: 2,
    image: "/images/hero-2.jpg",
    title: "We Bid For You",
    description:
      "No auction account needed. Our team handles bidding and purchases on your behalf through our secure admin dashboard.",
    href: "/services/bidding",
  },
  {
    id: 3,
    image: "/images/hero-3.jpg",
    title: "We Ship, Clear & Deliver",
    description:
      "From auction yard to your doorstep — shipping, customs clearance, and delivery are fully handled for you.",
    href: "/services/shipping",
  },
  {
    id: 4,
    image: "/images/hero-4.jpg",
    title: "Deal of the Day",
    description:
      "Discover hand-picked vehicles from trusted global auctions at competitive prices.",
    href: "/hot-lots",
  },
];
