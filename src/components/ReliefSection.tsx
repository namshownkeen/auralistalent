import { motion } from "framer-motion";
import { Search, Filter, Calendar, MessageCircle, Handshake, FileCheck, Eye, CheckCircle, CreditCard } from "lucide-react";

const weHandle = [
  { icon: Search, text: "Sourcing & outreach" },
  { icon: Filter, text: "Screening & shortlisting" },
  { icon: Calendar, text: "Interview coordination" },
  { icon: MessageCircle, text: "Candidate follow-ups" },
  { icon: Handshake, text: "Negotiations" },
  { icon: FileCheck, text: "Compliance & contracts" },
];

const youDo = [
  { icon: Eye, text: "Review top candidates" },
  { icon: CheckCircle, text: "Make the final decision" },
  { icon: CreditCard, text: "Pay a simple commission" },
];

const ReliefSection = () => {
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
            You approve. We handle the rest.
          </h2>
          <p className="text-xl text-[hsl(var(--impact-text))]/60 text-center mb-16">
            This section should feel like exhaling.
          </p>

          <div className="grid md:grid-cols-2 gap-12">
            {/* What you don't have to worry about */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h3 className="text-xl font-semibold text-[hsl(var(--impact-text))]/70 mb-6">
                What You Don't Have to Worry About
              </h3>
              <div className="grid grid-cols-2 gap-4">
                {weHandle.map((item, index) => (
                  <motion.div
                    key={item.text}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    className="flex items-center gap-3 p-4 rounded-xl border border-[hsl(var(--impact-border))] bg-[hsl(var(--impact-bg))]/50"
                  >
                    <item.icon className="w-5 h-5 text-[hsl(var(--impact-text))]/50 flex-shrink-0" />
                    <span className="text-[hsl(var(--impact-text))]/70 text-sm">{item.text}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* What you do */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h3 className="text-xl font-semibold text-[hsl(var(--impact-text))] mb-6">
                What You Do
              </h3>
              <div className="space-y-4">
                {youDo.map((item, index) => (
                  <motion.div
                    key={item.text}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.15 }}
                    className="flex items-center gap-4 p-5 rounded-xl border border-[hsl(var(--impact-text))]/30 bg-[hsl(var(--impact-text))]/10"
                  >
                    <item.icon className="w-6 h-6 text-[hsl(var(--impact-text))] flex-shrink-0" />
                    <span className="text-[hsl(var(--impact-text))] font-medium">{item.text}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="text-2xl md:text-3xl text-[hsl(var(--impact-text))] font-semibold text-center mt-16"
          >
            That's it.
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
};

export default ReliefSection;
