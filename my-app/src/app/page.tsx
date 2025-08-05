import Image from "next/image";
import heroImage from "../assets/img/Intro1.png";
import DealsCarousel from "./components/DealsCarousel";
import Restaurants from "./components/Restaurants";
import Categories from "./components/Categories";
import HeroSection from "./components/HeroSection";
import FAQSection from "./components/FAQ";
import Stats from "./components/Stats";

export default function Home() {
  return (
    <main>
      <section>
        <HeroSection />
      </section>
      <section>
        <DealsCarousel />
      </section>
      <section>
        <Restaurants />
      </section>
      <section>
        <Categories />
      </section>
      <section>
        <FAQSection />
      </section>
      <section>
        <Stats />
      </section>
    </main>
  );
}
