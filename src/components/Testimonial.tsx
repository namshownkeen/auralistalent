import { motion } from "framer-motion";
import { Quote } from "lucide-react";
import { useInView } from "@/hooks/useInView";
import ImpactBubble from "./ImpactBubble";

const Testimonial = () => {
  const { ref, isInView } = useInView(0.3);
  
  return (
    <section className="py-20 md:py-28 bg-primary/5 border-y border-primary/10">
      <div className="container mx-auto px-6">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className={`max-w-4xl mx-auto text-center interactive-tile rounded-2xl p-8 md:p-12 border border-transparent teal-glow-hover wave-highlight ${isInView ? 'in-view' : ''}`}
        >
          <Quote className="w-10 h-10 text-primary/40 mx-auto mb-6" />
          
          <blockquote className="text-xl sm:text-2xl md:text-3xl font-medium text-foreground leading-relaxed mb-6">
            "They didn't just send resumes — they understood what we were really looking for. 
            Our last three hires have been exceptional."
          </blockquote>
          
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
              <span className="text-sm font-semibold text-primary">SL</span>
            </div>
            <div className="text-left">
              <p className="font-medium text-foreground text-sm">Sarah Lin</p>
              <p className="text-xs text-muted-foreground">VP of Engineering, Vertex</p>
            </div>
          </div>

          <ImpactBubble text="Trust builds over time" delay={0.4} size="sm" />
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonial;
