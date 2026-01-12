import { motion } from "framer-motion";
import { Sparkles, Brain, Target, Users } from "lucide-react";

const approaches = [
  {
    icon: Sparkles,
    title: "Thoughtful Curation",
    description: "We don't do mass matching. Every candidate is carefully evaluated to ensure they're truly right for the role.",
  },
  {
    icon: Brain,
    title: "Deep Understanding",
    description: "We take the time to understand what great really looks like for your team. Context matters. Culture matters.",
  },
  {
    icon: Target,
    title: "Signal Over Noise",
    description: "Quality always wins. We filter through the noise to surface candidates who genuinely move the needle.",
  },
  {
    icon: Users,
    title: "Long-Term Thinking",
    description: "We're not about quick fixes. We build teams that last — relationships that grow into something meaningful.",
  },
];

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
          <p className="text-muted-foreground leading-relaxed">
            We believe hiring should feel considered, not transactional.
          </p>
        </motion.div>

        {/* Approach cards */}
        <div className="grid md:grid-cols-2 gap-4 max-w-5xl mx-auto">
          {approaches.map((approach, index) => (
            <motion.div
              key={approach.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative bg-background rounded-xl p-6 border border-border/50 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300"
            >
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                <approach.icon className="w-5 h-5 text-primary" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">{approach.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{approach.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Approach;
