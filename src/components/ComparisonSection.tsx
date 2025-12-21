import { motion } from "framer-motion";
import { X, Check } from "lucide-react";

const inHouseItems = [
  { text: "Salary: $80K–$120K/year", negative: true },
  { text: "Benefits & overhead: 20–30%", negative: true },
  { text: "Ramp-up time: 2–4 months", negative: true },
  { text: "Limited industry exposure", negative: true },
  { text: "Cost continues even when not hiring", negative: true },
];

const ourModelItems = [
  { text: "Pay only when you hire", positive: true },
  { text: "Commission-based (15–25% per hire)", positive: true },
  { text: "Immediate access to vetted talent", positive: true },
  { text: "No HR overhead", positive: true },
  { text: "No long-term commitment", positive: true },
];

const ComparisonSection = () => {
  return (
    <section className="py-24 md:py-32 bg-[hsl(var(--impact-bg))]">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
          className="max-w-5xl mx-auto"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-[hsl(var(--impact-text))] mb-16 text-center text-balance">
            In-House Recruiter vs. Hiring Partner
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            {/* In-House Column */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="p-8 rounded-2xl border border-[hsl(var(--impact-border))] bg-[hsl(var(--impact-bg))]/50"
            >
              <h3 className="text-xl font-semibold text-[hsl(var(--impact-text))]/60 mb-6">
                In-House Recruiter
              </h3>
              <ul className="space-y-4">
                {inHouseItems.map((item, index) => (
                  <motion.li
                    key={item.text}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    className="flex items-center gap-3"
                  >
                    <X className="w-5 h-5 text-red-400 flex-shrink-0" />
                    <span className="text-[hsl(var(--impact-text))]/70">{item.text}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            {/* Our Model Column */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="p-8 rounded-2xl border border-[hsl(var(--impact-text))]/30 bg-[hsl(var(--impact-text))]/10"
            >
              <h3 className="text-xl font-semibold text-[hsl(var(--impact-text))] mb-6">
                Our Recruiting Model
              </h3>
              <ul className="space-y-4">
                {ourModelItems.map((item, index) => (
                  <motion.li
                    key={item.text}
                    initial={{ opacity: 0, x: 10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    className="flex items-center gap-3"
                  >
                    <Check className="w-5 h-5 text-[hsl(var(--impact-text))] flex-shrink-0" />
                    <span className="text-[hsl(var(--impact-text))]">{item.text}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-12 text-center"
          >
            <p className="text-xl md:text-2xl text-[hsl(var(--impact-text))] font-medium">
              Save <span className="text-[hsl(var(--impact-text))] font-bold">35–50%</span> on hiring costs when recruiting is project-based.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default ComparisonSection;
