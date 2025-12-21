import { motion } from "framer-motion";
import { FileText, Coins, EyeOff, Unlock } from "lucide-react";

const contractFeatures = [
  { icon: FileText, text: "Defined role scope" },
  { icon: Coins, text: "Agreed commission" },
  { icon: EyeOff, text: "No hidden fees" },
  { icon: Unlock, text: "No long-term obligation" },
];

const ContractSection = () => {
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
            Flexible. Transparent. No Lock-Ins.
          </h2>
          
          <p className="text-lg md:text-xl text-[hsl(var(--impact-text))]/80 mb-12 leading-relaxed">
            We work on a clear hiring contract:
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
            {contractFeatures.map((feature, index) => (
              <motion.div
                key={feature.text}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="p-6 rounded-2xl border border-[hsl(var(--impact-text))]/20 bg-[hsl(var(--impact-text))]/5 hover:bg-[hsl(var(--impact-text))]/10 transition-all duration-300"
              >
                <feature.icon className="w-8 h-8 text-[hsl(var(--impact-text))] mb-4 mx-auto" />
                <p className="text-[hsl(var(--impact-text))] text-sm font-medium">{feature.text}</p>
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
              You get clarity.
            </p>
            <p className="text-xl md:text-2xl text-[hsl(var(--impact-text))]/70">
              We earn trust.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default ContractSection;
