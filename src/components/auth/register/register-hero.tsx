import Image from "next/image";
import { Container } from "../../wrapper/container";

export default function RegisterHero() {
  return (
    <section className="hidden lg:flex relative h-96 w-full">
      <Image
        src="/images/registration-img.jpg"
        alt="Register"
        fill
        className="object-cover"
        priority
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50 flex items-center">
        <Container>
          <h1 className="text-white text-4xl font-bold max-w-xl">
            Register with Us and start buying today
          </h1>
        </Container>
      </div>
    </section>
  );
}
