import { motion } from "framer-motion";
import { Users, TrendingUp, Star, BarChart3 } from "lucide-react";

const criteria = [
  { icon: Users, text: "Quality-Critical Hires At Any Scale" },
  { icon: TrendingUp, text: "Scaling carefully" },
  { icon: Star, text: "Filling high-impact positions" },
  { icon: BarChart3, text: "Wanting quality over volume" },
];

const SweetSpotSection = () => {
  return (
    <section className="py-24 md:py-32 bg-[hsl(var(--impact-bg))]">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
          className="max-w-4xl mx-auto text-center"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-[hsl(var(--impact-text))] mb-6 text-balance">
            Built for Teams Hiring with Intention
          </h2>
          
          <p className="text-lg md:text-xl text-[hsl(var(--impact-text))]/80 mb-12 leading-relaxed">
            Our model works best for companies:
          </p>

          <div className="grid sm:grid-cols-2 gap-6 mb-16">
            {criteria.map((item, index) => (
              <motion.div
                key={item.text}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="flex items-center gap-4 p-6 rounded-2xl border border-[hsl(var(--impact-border))] bg-[hsl(var(--impact-text))]/5"
              >
                <item.icon className="w-8 h-8 text-[hsl(var(--impact-text))] flex-shrink-0" />
                <span className="text-[hsl(var(--impact-text))] text-lg font-medium text-left">{item.text}</span>
              </motion.div>
            ))}
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="text-xl md:text-2xl text-[hsl(var(--impact-text))] font-medium"
          >
            If hiring isn't constant, your recruiting shouldn't be either.
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
};

export default SweetSpotSection;
