import HeroSection from "../components/HeroSection";
import WhyChooseUs from "../components/WhyChooseUs";
import Image from "next/image";
import Services from "../components/Services";
import Valuation from "../components/Valuation";
import Aboutus from "../components/Aboutus";
import Footer from "../components/Footer";

export default function Home() {
  return (
    <main className="flex flex-col min-h-screen bg-black/[0.20] antialiased bg-grid-white/[0.02]">
      <HeroSection />
      <Services />
      <WhyChooseUs />
      <Valuation />
      <Aboutus />
      <Footer />
    </main>
  );
}
