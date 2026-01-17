import { motion } from "framer-motion";
import { Sparkles, Brain, Target, Users } from "lucide-react";
import { useInView } from "@/hooks/useInView";
import ImpactBubble from "./ImpactBubble";

const approaches = [
  {
    icon: Sparkles,
    title: "Thoughtful Curation",
    description: "No mass matching. Every candidate carefully evaluated.",
    microcopy: "Handpicked, not scraped",
  },
  {
    icon: Brain,
    title: "Deep Understanding",
    description: "Context matters. Culture matters. We take the time.",
    microcopy: "One conversation, full picture",
  },
  {
    icon: Target,
    title: "Signal Over Noise",
    description: "Quality wins. We filter to find who moves the needle.",
    microcopy: "Less resumes, better fits",
  },
  {
    icon: Users,
    title: "Long-Term Thinking",
    description: "Teams that last. Relationships that grow.",
    microcopy: "Not quick fixes",
  },
];

const ApproachCard = ({ approach, index }: { approach: typeof approaches[0]; index: number }) => {
  const { ref, isInView } = useInView(0.2);
  
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className={`group relative bg-background rounded-xl p-6 border border-border/50 interactive-tile teal-glow-hover cursor-pointer wave-highlight ${isInView ? 'in-view' : ''}`}
      style={{ animationDelay: `${index * 100}ms` }}
    >
      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors duration-300">
        <approach.icon className="w-5 h-5 text-primary" />
      </div>
      <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors duration-300">{approach.title}</h3>
      <p className="text-muted-foreground text-sm leading-relaxed mb-3">{approach.description}</p>
      <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <ImpactBubble text={approach.microcopy} size="sm" delay={0} />
      </div>
    </motion.div>
  );
};

const Approach = () => {
  return (
    <section id="approach" className="py-20 md:py-28 bg-card">
      <div className="container mx-auto px-6">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl mx-auto text-center mb-12"
        >
          <span className="text-sm font-medium text-primary mb-4 block">Our Approach</span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4">
            How we find the right people
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-6">
            Considered, not transactional.
          </p>
          <ImpactBubble text="Hiring with empathy, not volume" delay={0.3} />
        </motion.div>

        {/* Approach cards */}
        <div className="grid md:grid-cols-2 gap-4 max-w-5xl mx-auto">
          {approaches.map((approach, index) => (
            <ApproachCard key={approach.title} approach={approach} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Approach;
