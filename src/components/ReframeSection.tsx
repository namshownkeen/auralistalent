import { motion } from "framer-motion";
import { Zap, UserCheck, Ban } from "lucide-react";

const benefits = [
  { icon: Zap, text: "On-demand hiring expertise" },
  { icon: UserCheck, text: "Senior-level screening from day one" },
  { icon: Ban, text: "Zero idle cost after roles are filled" },
];

const ReframeSection = () => {
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
            What if you only paid for results?
          </h2>
          
          <p className="text-lg md:text-xl text-[hsl(var(--impact-text))]/80 mb-12 leading-relaxed max-w-2xl mx-auto">
            Instead of carrying the cost of a full-time recruiter, our model gives you:
          </p>

          <div className="grid md:grid-cols-3 gap-6 mb-16">
            {benefits.map((benefit, index) => (
              <motion.div
                key={benefit.text}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                className="p-8 rounded-2xl border border-[hsl(var(--impact-border))] bg-[hsl(var(--impact-text))]/5 hover:bg-[hsl(var(--impact-text))]/10 transition-all duration-300"
              >
                <benefit.icon className="w-10 h-10 text-[hsl(var(--impact-text))] mb-4 mx-auto" />
                <p className="text-[hsl(var(--impact-text))] text-lg font-medium">{benefit.text}</p>
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
              You focus on growing the business.
            </p>
            <p className="text-xl md:text-2xl text-[hsl(var(--impact-text))]/70">
              We handle the hiring — end to end.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default ReframeSection;
