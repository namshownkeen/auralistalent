import { motion } from "framer-motion";
import { Wallet, Receipt, Timer, Target } from "lucide-react";

const savings = [
  {
    icon: Wallet,
    title: "No Salary Commitment",
    description: "You don't pay when you're not hiring.",
  },
  {
    icon: Receipt,
    title: "No Benefits, Taxes, or Tools",
    description: "We bring our own systems, sourcing, and screening.",
  },
  {
    icon: Timer,
    title: "Faster Time-to-Hire",
    description: "Reduced vacancy cost by 20–40%.",
  },
  {
    icon: Target,
    title: "Higher Quality Hires",
    description: "Fewer mis-hires, better retention.",
  },
];

const CostBreakdown = () => {
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
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-[hsl(var(--impact-text))] mb-6 text-center text-balance">
            Where the Savings Actually Come From
          </h2>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-16">
            {savings.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="p-6 rounded-2xl border border-[hsl(var(--impact-border))] bg-[hsl(var(--impact-text))]/5 hover:bg-[hsl(var(--impact-text))]/10 transition-all duration-300 text-center"
              >
                <div className="w-14 h-14 rounded-xl bg-[hsl(var(--impact-text))]/10 flex items-center justify-center mx-auto mb-4">
                  <item.icon className="w-7 h-7 text-[hsl(var(--impact-text))]" />
                </div>
                <h3 className="text-[hsl(var(--impact-text))] font-semibold text-lg mb-2">
                  {item.title}
                </h3>
                <p className="text-[hsl(var(--impact-text))]/70 text-sm leading-relaxed">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="text-xl md:text-2xl text-[hsl(var(--impact-text))] font-medium text-center mt-16"
          >
            One great hire costs less than one bad one — <span className="text-[hsl(var(--impact-text))]/60">by a lot.</span>
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
};

export default CostBreakdown;
