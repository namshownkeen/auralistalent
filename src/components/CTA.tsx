import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Mail } from "lucide-react";

const CTA = () => {
  return (
    <section id="about" className="py-24 md:py-32 bg-background">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="relative max-w-4xl mx-auto"
        >
          <div className="relative bg-foreground rounded-3xl p-10 md:p-16 overflow-hidden">
            {/* Background gradient accent */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-accent/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
            
            <div className="relative z-10 text-center">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-background mb-6 text-balance">
                Ready to build something great?
              </h2>
              <p className="text-lg text-background/70 max-w-xl mx-auto mb-10 leading-relaxed">
                Whether you're hiring or looking for your next opportunity, 
                we'd love to hear from you. Let's start a conversation.
              </p>
              
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button 
                  size="xl" 
                  className="bg-background text-foreground hover:bg-background/90 rounded-2xl shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 group"
                >
                  <Mail className="w-5 h-5" />
                  Get in Touch
                  <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                </Button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTA;
