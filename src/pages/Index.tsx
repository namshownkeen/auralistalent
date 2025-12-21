import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import ProblemSection from "@/components/ProblemSection";
import ReframeSection from "@/components/ReframeSection";
import ComparisonSection from "@/components/ComparisonSection";
import CostBreakdown from "@/components/CostBreakdown";
import ReliefSection from "@/components/ReliefSection";
import SweetSpotSection from "@/components/SweetSpotSection";
import ContractSection from "@/components/ContractSection";
import EmotionalClose from "@/components/EmotionalClose";
import WhyNowSection from "@/components/WhyNowSection";
import Approach from "@/components/Approach";
import Services from "@/components/Services";
import Testimonial from "@/components/Testimonial";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <Hero />
      <ProblemSection />
      <ReframeSection />
      <ComparisonSection />
      <CostBreakdown />
      <ReliefSection />
      <SweetSpotSection />
      <ContractSection />
      <EmotionalClose />
      <WhyNowSection />
      <Approach />
      <Services />
      <Testimonial />
      <CTA />
      <Footer />
    </main>
  );
};

export default Index;
