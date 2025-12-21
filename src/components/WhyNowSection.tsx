import { motion } from "framer-motion";
import { Globe, Briefcase, Clock, TrendingDown } from "lucide-react";

const reasons = [
  { icon: Globe, text: "Remote-first talent pools" },
  { icon: Briefcase, text: "Specialized roles" },
  { icon: Clock, text: "Shorter hiring windows" },
  { icon: TrendingDown, text: "Cost-conscious growth" },
];

const WhyNowSection = () => {
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
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-[hsl(var(--impact-text))] mb-12 text-balance">
            Why This Works Better Today
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
            {reasons.map((reason, index) => (
              <motion.div
                key={reason.text}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="p-6 rounded-2xl border border-[hsl(var(--impact-border))] bg-[hsl(var(--impact-text))]/5"
              >
                <reason.icon className="w-8 h-8 text-[hsl(var(--impact-text))] mb-4 mx-auto" />
                <p className="text-[hsl(var(--impact-text))] text-sm font-medium">{reason.text}</p>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="space-y-2"
          >
            <p className="text-xl md:text-2xl text-[hsl(var(--impact-text))] font-medium">
              Hiring has changed.
            </p>
            <p className="text-xl md:text-2xl text-[hsl(var(--impact-text))]/70">
              Your recruiting model should too.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default WhyNowSection;
