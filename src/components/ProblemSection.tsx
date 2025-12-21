import { motion } from "framer-motion";
import { DollarSign, Clock, Wrench, TrendingDown } from "lucide-react";

const painPoints = [
  { icon: DollarSign, text: "Fixed salaries" },
  { icon: Clock, text: "Long ramp-up time" },
  { icon: Wrench, text: "Tooling costs" },
  { icon: TrendingDown, text: "Unused capacity once roles are filled" },
];

const ProblemSection = () => {
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
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-[hsl(var(--impact-text))] mb-8 text-balance">
            Hiring shouldn't feel this heavy.
          </h2>
          
          <p className="text-lg md:text-xl text-[hsl(var(--impact-text))]/80 mb-12 leading-relaxed">
            When you're hiring for a limited number of critical roles, an in-house recruiter often means:
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
            {painPoints.map((point, index) => (
              <motion.div
                key={point.text}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="p-6 rounded-2xl border border-[hsl(var(--impact-border))] bg-[hsl(var(--impact-bg))]/50"
              >
                <point.icon className="w-8 h-8 text-[hsl(var(--impact-text))] mb-4 mx-auto" />
                <p className="text-[hsl(var(--impact-text))]/90 text-sm font-medium">{point.text}</p>
              </motion.div>
            ))}
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="text-lg text-[hsl(var(--impact-text))]/70 mb-4"
          >
            All that weight — for just a few hires.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="inline-block p-6 rounded-2xl border border-[hsl(var(--impact-border))] bg-[hsl(var(--impact-text))]/5"
          >
            <p className="text-[hsl(var(--impact-text))]/60 text-sm mb-2">💡</p>
            <p className="text-[hsl(var(--impact-text))] text-lg font-light">
              Companies hiring under 5–10 roles/year overspend by{" "}
              <span className="font-semibold">30–45%</span> with in-house recruiting.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default ProblemSection;
