import { motion } from "framer-motion";
import { Sparkles, Brain, Target, Users } from "lucide-react";

const approaches = [
  {
    icon: Sparkles,
    title: "Thoughtful Curation",
    description: "We don't do mass matching. Every candidate is carefully evaluated to ensure they're truly right for the role — and the role is right for them.",
  },
  {
    icon: Brain,
    title: "Deep Understanding",
    description: "We take the time to understand what great really looks like for your team. Context matters. Culture matters. We get it.",
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
    <section id="approach" className="py-24 md:py-32 bg-card">
      <div className="container mx-auto px-6">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl mx-auto text-center mb-16"
        >
          <span className="text-sm font-medium text-primary mb-4 block">Our Approach</span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-foreground mb-6 text-balance">
            How we find the right people
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            We believe hiring should feel considered, not transactional. 
            Here's what makes us different.
          </p>
        </motion.div>

        {/* Approach cards */}
        <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {approaches.map((approach, index) => (
            <motion.div
              key={approach.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative bg-background rounded-2xl p-8 border border-border/50 hover:border-primary/20 hover:shadow-lg transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-5 group-hover:bg-primary/15 transition-colors">
                <approach.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-3">{approach.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{approach.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Approach;
