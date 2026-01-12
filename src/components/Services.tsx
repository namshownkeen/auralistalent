import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useInView } from "@/hooks/useInView";

const services = [
  {
    number: "01",
    title: "Executive Search",
    description: "Finding leaders who shape culture and drive results. We go beyond credentials to find executives who truly fit.",
  },
  {
    number: "02",
    title: "Technical Hiring",
    description: "Engineers, designers, product people — we understand the nuances of building great tech teams.",
  },
  {
    number: "03",
    title: "Growth Roles",
    description: "Marketing, sales, operations. The people who scale what's working and fix what isn't.",
  },
];

const ServiceCard = ({ service, index }: { service: typeof services[0]; index: number }) => {
  const { ref, isInView } = useInView(0.2);
  
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className={`group p-6 rounded-xl border border-border/50 interactive-tile teal-glow-hover cursor-pointer wave-highlight ${isInView ? 'in-view' : ''}`}
      style={{ animationDelay: `${index * 100}ms` }}
    >
      <div className="flex items-start gap-5">
        <span className="text-3xl font-light text-primary/30 group-hover:text-primary/60 transition-colors duration-300">
          {service.number}
        </span>
        <div>
          <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors duration-300">
            {service.title}
          </h3>
          <p className="text-muted-foreground text-sm leading-relaxed">{service.description}</p>
        </div>
      </div>
    </motion.div>
  );
};

const Services = () => {
  return (
    <section id="services" className="py-20 md:py-28 bg-background">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left column - sticky header */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="lg:sticky lg:top-24"
          >
            <span className="text-sm font-medium text-primary mb-4 block">What We Do</span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4">
              Hiring expertise, across the board
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-6">
              Whether you're building your first team or your hundredth, 
              we bring the same care and precision to every search.
            </p>
            <Button 
              size="lg" 
              className="bg-primary text-primary-foreground hover:bg-primary/90 group"
              asChild
            >
              <a href="mailto:alek@auralistalent.com">
                Start a Conversation
                <ArrowUpRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            </Button>
          </motion.div>

          {/* Right column - service cards */}
          <div className="space-y-4">
            {services.map((service, index) => (
              <ServiceCard key={service.number} service={service} index={index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
