import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
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
      <Approach />
      <Services />
      <Testimonial />
      <CTA />
      <Footer />
    </main>
  );
};

export default Index;
