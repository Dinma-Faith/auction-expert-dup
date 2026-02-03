import RegisterHero from "../../components/auth/register/register-hero";
import RegistrationInfo from "../../components/auth/register/register-info";
import RegisterForm from "../../components/auth/register/register-form";
import { BuyCarSection } from "@/components/dashboard/dashboard-sections/buy-car-section";
import LatestNews from "../../components/auth/register/latest-news";
import AboutUs from "../../components/auth/register/about-us";

export default function RegisterPage() {
  return (
    <main>
      {" "}
      <RegisterHero />{" "}
      <section className="bg-gray-50 py-14 px-4">
        {" "}
        <div className="max-w-4xl mx-auto space-y-6">
          {" "}
          <RegistrationInfo /> <RegisterForm />{" "}
        </div>{" "}
      </section>{" "}
      <BuyCarSection /> <LatestNews /> <AboutUs />{" "}
    </main>
  );
}
