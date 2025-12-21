import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowUpRight, X } from "lucide-react";

const avoids = [
  "Overhire internally",
  "Rush critical decisions",
  "Compromise on talent",
];

const EmotionalClose = () => {
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
            Hire like a growing company — not a stressed one.
          </h2>
          
          <p className="text-lg md:text-xl text-[hsl(var(--impact-text))]/80 mb-8 leading-relaxed">
            We exist so you don't have to:
          </p>

          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {avoids.map((item, index) => (
              <motion.div
                key={item}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="flex items-center gap-2 px-4 py-2 rounded-full border border-red-400/30 bg-red-400/10"
              >
                <X className="w-4 h-4 text-red-400" />
                <span className="text-[hsl(var(--impact-text))]/80 text-sm">{item}</span>
              </motion.div>
            ))}
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-xl md:text-2xl text-[hsl(var(--impact-text))] font-medium mb-12"
          >
            Just smart hiring, done with care.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="flex flex-wrap justify-center gap-4"
          >
            <Button 
              size="lg" 
              className="bg-[hsl(var(--impact-text))] text-[hsl(var(--impact-bg))] hover:bg-[hsl(var(--impact-text))]/90 group"
            >
              Start a Hiring Conversation
              <ArrowUpRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              className="border-[hsl(var(--impact-text))]/30 text-[hsl(var(--impact-text))] hover:bg-[hsl(var(--impact-text))]/10"
            >
              Talk to a Hiring Partner
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default EmotionalClose;
