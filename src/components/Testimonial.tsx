import { motion } from "framer-motion";
import { Quote } from "lucide-react";

const Testimonial = () => {
  return (
    <section className="py-24 md:py-32 bg-primary/5">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto text-center"
        >
          <Quote className="w-12 h-12 text-primary/30 mx-auto mb-8" />
          
          <blockquote className="text-2xl sm:text-3xl md:text-4xl font-medium text-foreground leading-relaxed mb-8 text-balance">
            "Working with TalentMatch felt different from day one. They didn't just send resumes — 
            they understood what we were really looking for. Our last three hires have been exceptional."
          </blockquote>
          
          <div className="flex items-center justify-center gap-4">
            <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center">
              <span className="text-lg font-semibold text-foreground">SL</span>
            </div>
            <div className="text-left">
              <p className="font-medium text-foreground">Sarah Lin</p>
              <p className="text-sm text-muted-foreground">VP of Engineering, Vertex</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonial;
