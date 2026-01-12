import { motion } from "framer-motion";
import { ArrowUpRight, Mail } from "lucide-react";

const FinalCTA = () => {
  return (
    <section className="py-20 md:py-28 bg-background">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl mx-auto"
        >
          <a
            href="mailto:alek@auralistalent.com"
            className="final-cta block rounded-2xl p-8 md:p-12 text-center cursor-pointer group"
          >
            <motion.div
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6 group-hover:bg-primary/20 transition-colors duration-300">
                <Mail className="w-7 h-7 text-primary" />
              </div>
              
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-primary mb-4 transition-colors duration-300 group-hover:text-primary-foreground group-hover:drop-shadow-[0_0_10px_hsl(168_100%_37%)]">
                Start a Hiring Conversation
              </h2>
              
              <p className="text-muted-foreground mb-6 group-hover:text-foreground transition-colors duration-300">
                Ready to find the right people? Let's talk.
              </p>
              
              <div className="inline-flex items-center gap-2 text-primary font-semibold group-hover:gap-3 transition-all duration-300">
                <span>alek@auralistalent.com</span>
                <ArrowUpRight className="w-5 h-5 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
              </div>
            </motion.div>
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default FinalCTA;
