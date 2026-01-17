import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import FounderSection from "@/components/FounderSection";
import ImpactAccordion from "@/components/ImpactAccordion";
import Approach from "@/components/Approach";
import Services from "@/components/Services";
import Testimonial from "@/components/Testimonial";
import FinalCTA from "@/components/FinalCTA";
import Footer from "@/components/Footer";
import QuickContact from "@/components/QuickContact";

const Index = () => {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <Hero />
      <FounderSection />
      <ImpactAccordion />
      <Approach />
      <Services />
      <Testimonial />
      <FinalCTA />
      <Footer />
      <QuickContact />
    </main>
  );
};

export default Index;
