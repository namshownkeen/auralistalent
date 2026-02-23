import { motion } from "framer-motion";
import ImpactBubble from "./ImpactBubble";

const FounderSection = () => {
  return (
    <section id="founder" className="py-20 md:py-28 bg-card relative overflow-hidden">
      {/* Subtle background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/4 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-primary/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-12"
          >
            <span className="text-sm font-medium text-primary mb-4 block">A Note From Alek</span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-2">
              Why I started Auralis
            </h2>
          </motion.div>

          {/* Conversational content with impact bubbles */}
          <div className="space-y-8">
            {/* Block 1 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="flex flex-col gap-3"
            >
              <p className="text-lg text-muted-foreground leading-relaxed">
                Years of conversations. Both sides of the table. Candidates searching for meaning. 
                Companies searching for the right <em className="text-primary not-italic font-medium">human</em>, not just a resume.
              </p>
              <ImpactBubble text="Understanding people, not resumes" delay={0.2} position="left" />
            </motion.div>

            {/* Block 2 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex flex-col gap-3"
            >
              <p className="text-lg text-muted-foreground leading-relaxed">
                Hiring got harder. Great talent hesitates when the name's unfamiliar, 
                the story unclear, or the risk feels too high.
              </p>
              <ImpactBubble text="One conversation is often enough" delay={0.3} position="right" />
            </motion.div>

            {/* Block 3 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-col gap-3"
            >
              <p className="text-lg text-muted-foreground leading-relaxed">
                Backed by FAANG-level experience, candidate evaluation goes beyond resumes, uncovering <em className="text-primary not-italic font-medium">intent, values, and growth trajectory</em> in a single conversation. Strong alignment is surfaced naturally, enabling confident and informed hiring decisions.
              </p>
              <ImpactBubble text="Turning unknown startups into compelling stories" delay={0.4} position="left" size="lg" />
            </motion.div>

            {/* Block 4 - Bridge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="flex flex-col gap-3 pt-4"
            >
              <p className="text-lg text-muted-foreground leading-relaxed">
                Immigration challenges. Global mobility. Uneven access to opportunity. 
                Auralis becomes the bridge.
              </p>
              <div className="flex flex-wrap gap-2">
                <ImpactBubble text="Talent → Trust" delay={0.5} size="sm" />
                <ImpactBubble text="Ambition → Belonging" delay={0.6} size="sm" />
                <ImpactBubble text="Potential → Growth" delay={0.7} size="sm" />
              </div>
            </motion.div>

            {/* Signature */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="pt-8 border-t border-border/30"
            >
              <p className="text-primary font-semibold text-lg mb-1">Alek Lekic</p>
              <p className="text-muted-foreground text-sm">Founder, Auralis Talent Xplore</p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FounderSection;
