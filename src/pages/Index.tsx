import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import ImpactAccordion from "@/components/ImpactAccordion";
import Approach from "@/components/Approach";
import Services from "@/components/Services";
import Testimonial from "@/components/Testimonial";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";
import QuickContact from "@/components/QuickContact";

const Index = () => {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <Hero />
      <ImpactAccordion />
      <Approach />
      <Services />
      <Testimonial />
      <CTA />
      <Footer />
      <QuickContact />
    </main>
  );
};

export default Index;
