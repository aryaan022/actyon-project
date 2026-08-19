import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import ProductShowcase from "@/components/ProductShowcase";
import HowItWorks from "@/components/HowItWorks";
import FeatureInteraction from "@/components/FeatureInteraction";
import TrustSection from "@/components/TrustSection";
import FinalCTA from "@/components/FinalCTA";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="overflow-x-hidden">
      <Nav />
      <Hero />
      <ProductShowcase />
      <HowItWorks />
      <FeatureInteraction />
      <TrustSection />
      <FinalCTA />
      <Footer />
    </main>
  );
}
