import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { 
  DollarSign, Clock, Wrench, TrendingDown,
  Zap, UserCheck, Ban,
  X, Check,
  Wallet, Receipt, Timer, Target,
  Eye, CheckCircle, CreditCard,
  Users, TrendingUp, Star, BarChart3,
  FileText, Coins, EyeOff, Unlock,
  Globe, Briefcase, ChevronRight
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { ArrowUpRight } from "lucide-react";

interface AccordionItemData {
  id: string;
  title: string;
  subtitle?: string;
  summary: string;
  content: React.ReactNode;
}

const ImpactAccordion = () => {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const accordionItems: AccordionItemData[] = [
    {
      id: "problem",
      title: "Hiring shouldn't feel this heavy.",
      subtitle: "The Problem",
      summary: "In-house recruiting often means fixed salaries, long ramp-up time, and unused capacity.",
      content: (
        <div className="space-y-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              { icon: DollarSign, text: "Fixed salaries" },
              { icon: Clock, text: "Long ramp-up time" },
              { icon: Wrench, text: "Tooling costs" },
              { icon: TrendingDown, text: "Unused capacity" },
            ].map((point) => (
              <div key={point.text} className="p-3 rounded-xl border border-border bg-card/50">
                <point.icon className="w-5 h-5 text-primary mb-2 mx-auto" />
                <p className="text-foreground/90 text-xs text-center">{point.text}</p>
              </div>
            ))}
          </div>
          <div className="p-4 rounded-xl border border-primary/30 bg-primary/5 inline-block">
            <p className="text-foreground text-sm">
              💡 Companies hiring under 5–10 roles/year overspend by <span className="font-semibold text-primary">30–45%</span>
            </p>
          </div>
        </div>
      ),
    },
    {
      id: "reframe",
      title: "What if you only paid for results?",
      subtitle: "The Solution",
      summary: "On-demand expertise, senior-level screening, zero idle cost after roles are filled.",
      content: (
        <div className="space-y-6">
          <div className="grid md:grid-cols-3 gap-3">
            {[
              { icon: Zap, text: "On-demand expertise" },
              { icon: UserCheck, text: "Senior-level screening" },
              { icon: Ban, text: "Zero idle cost" },
            ].map((benefit) => (
              <div key={benefit.text} className="p-4 rounded-xl border border-primary/20 bg-primary/5">
                <benefit.icon className="w-6 h-6 text-primary mb-2 mx-auto" />
                <p className="text-foreground text-center font-medium text-sm">{benefit.text}</p>
              </div>
            ))}
          </div>
          <p className="text-lg text-primary font-medium text-center">
            You focus on growing. We handle the hiring.
          </p>
        </div>
      ),
    },
    {
      id: "comparison",
      title: "In-House Recruiter vs. Hiring Partner",
      subtitle: "The Comparison",
      summary: "Save 35–50% on hiring costs when recruiting is project-based.",
      content: (
        <div className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl border border-border bg-card/50">
              <h4 className="text-sm font-semibold text-muted-foreground mb-3">In-House Recruiter</h4>
              <ul className="space-y-2">
                {["$80K–$120K/year", "20–30% overhead", "2–4 months ramp-up", "Cost when not hiring"].map((text) => (
                  <li key={text} className="flex items-center gap-2">
                    <X className="w-3 h-3 text-red-400 flex-shrink-0" />
                    <span className="text-muted-foreground text-xs">{text}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="p-4 rounded-xl border border-primary/30 bg-primary/10">
              <h4 className="text-sm font-semibold text-primary mb-3">Our Model</h4>
              <ul className="space-y-2">
                {["Pay only when you hire", "15–25% per hire", "Immediate access", "No long-term cost"].map((text) => (
                  <li key={text} className="flex items-center gap-2">
                    <Check className="w-3 h-3 text-primary flex-shrink-0" />
                    <span className="text-foreground text-xs">{text}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: "savings",
      title: "Where the Savings Come From",
      subtitle: "Cost Breakdown",
      summary: "No salary commitment, no overhead, faster hiring, better quality.",
      content: (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          {[
            { icon: Wallet, title: "No Salary", desc: "Pay when hiring" },
            { icon: Receipt, title: "No Overhead", desc: "Our own tools" },
            { icon: Timer, title: "Faster Hire", desc: "20–40% quicker" },
            { icon: Target, title: "Better Fit", desc: "Fewer mis-hires" },
          ].map((item) => (
            <div key={item.title} className="p-3 rounded-xl border border-border bg-primary/5 text-center">
              <item.icon className="w-6 h-6 text-primary mb-2 mx-auto" />
              <h4 className="text-foreground font-semibold text-sm mb-1">{item.title}</h4>
              <p className="text-muted-foreground text-xs">{item.desc}</p>
            </div>
          ))}
        </div>
      ),
    },
    {
      id: "relief",
      title: "You approve. We handle the rest.",
      subtitle: "What We Do",
      summary: "We handle sourcing, screening, interviews, negotiations — you make the final decision.",
      content: (
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h4 className="text-sm font-semibold text-muted-foreground mb-3">We Handle</h4>
            <div className="grid grid-cols-2 gap-2">
              {["Sourcing", "Screening", "Interviews", "Follow-ups", "Negotiations", "Contracts"].map((text) => (
                <div key={text} className="flex items-center gap-2 p-2 rounded-lg border border-border bg-card/50">
                  <span className="text-muted-foreground text-xs">{text}</span>
                </div>
              ))}
            </div>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-primary mb-3">You Do</h4>
            <div className="space-y-2">
              {[
                { icon: Eye, text: "Review candidates" },
                { icon: CheckCircle, text: "Final decision" },
                { icon: CreditCard, text: "Simple commission" },
              ].map((item) => (
                <div key={item.text} className="flex items-center gap-2 p-3 rounded-lg border border-primary/30 bg-primary/10">
                  <item.icon className="w-4 h-4 text-primary flex-shrink-0" />
                  <span className="text-foreground font-medium text-xs">{item.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      ),
    },
    {
      id: "sweetspot",
      title: "Built for Teams Hiring with Intention",
      subtitle: "Our Sweet Spot",
      summary: "Ideal for companies hiring 1–10 roles per year, scaling carefully with quality focus.",
      content: (
        <div className="grid sm:grid-cols-2 gap-3">
          {[
            { icon: Users, text: "Hiring 1–10 roles/year" },
            { icon: TrendingUp, text: "Scaling carefully" },
            { icon: Star, text: "High-impact positions" },
            { icon: BarChart3, text: "Quality over volume" },
          ].map((item) => (
            <div key={item.text} className="flex items-center gap-3 p-3 rounded-xl border border-border bg-primary/5">
              <item.icon className="w-5 h-5 text-primary flex-shrink-0" />
              <span className="text-foreground font-medium text-sm">{item.text}</span>
            </div>
          ))}
        </div>
      ),
    },
    {
      id: "contract",
      title: "Flexible. Transparent. No Lock-Ins.",
      subtitle: "How We Work",
      summary: "Defined scope, agreed commission, no hidden fees, no long-term obligation.",
      content: (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            { icon: FileText, text: "Defined scope" },
            { icon: Coins, text: "Agreed commission" },
            { icon: EyeOff, text: "No hidden fees" },
            { icon: Unlock, text: "No lock-in" },
          ].map((feature) => (
            <div key={feature.text} className="p-3 rounded-xl border border-primary/20 bg-primary/5 text-center">
              <feature.icon className="w-5 h-5 text-primary mb-2 mx-auto" />
              <p className="text-foreground text-xs font-medium">{feature.text}</p>
            </div>
          ))}
        </div>
      ),
    },
    {
      id: "whynow",
      title: "Why This Works Better Today",
      subtitle: "The Shift",
      summary: "Remote talent pools, specialized roles, shorter windows, cost-conscious growth.",
      content: (
        <div className="space-y-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              { icon: Globe, text: "Remote talent" },
              { icon: Briefcase, text: "Specialized roles" },
              { icon: Clock, text: "Shorter windows" },
              { icon: TrendingDown, text: "Cost-conscious" },
            ].map((reason) => (
              <div key={reason.text} className="p-3 rounded-xl border border-border bg-primary/5 text-center">
                <reason.icon className="w-5 h-5 text-primary mb-2 mx-auto" />
                <p className="text-foreground text-xs">{reason.text}</p>
              </div>
            ))}
          </div>
          <p className="text-sm text-primary text-center font-medium">
            Hiring has changed. Your model should too.
          </p>
        </div>
      ),
    },
  ];

  return (
    <section id="why-auralis" className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="text-sm font-medium text-primary mb-4 block">Why Auralis</span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4">
            A smarter way to hire
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Hover over each section to learn more about our approach
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto"
        >
          <div className="space-y-2">
            {accordionItems.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: index * 0.03 }}
                className={`
                  rounded-xl border transition-all duration-300 overflow-hidden cursor-pointer
                  ${expandedId === item.id 
                    ? 'border-primary/50 bg-card shadow-lg shadow-primary/5' 
                    : 'border-border/50 bg-card/30 hover:border-primary/30 hover:bg-card/60'
                  }
                `}
                onMouseEnter={() => setExpandedId(item.id)}
                onMouseLeave={() => setExpandedId(null)}
                onClick={() => setExpandedId(expandedId === item.id ? null : item.id)}
              >
                <div className="p-4 md:p-5">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      {item.subtitle && (
                        <span className="text-primary/70 text-xs uppercase tracking-wider mb-1 block font-medium">
                          {item.subtitle}
                        </span>
                      )}
                      <h3 className="text-base md:text-lg font-semibold text-foreground mb-1">
                        {item.title}
                      </h3>
                      {expandedId !== item.id && (
                        <p className="text-sm text-muted-foreground line-clamp-1">
                          {item.summary}
                        </p>
                      )}
                    </div>
                    <motion.div
                      animate={{ rotate: expandedId === item.id ? 90 : 0 }}
                      transition={{ duration: 0.2 }}
                      className="w-6 h-6 rounded-full border border-primary/30 flex items-center justify-center flex-shrink-0 mt-1"
                    >
                      <ChevronRight className="w-3 h-3 text-primary" />
                    </motion.div>
                  </div>
                </div>
                
                <AnimatePresence>
                  {expandedId === item.id && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                      <div className="px-4 md:px-5 pb-5 pt-2 border-t border-border/30">
                        {item.content}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>

          {/* Emotional Close CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-12 text-center"
          >
            <h2 className="text-xl md:text-2xl font-semibold text-foreground mb-4">
              Hire like a growing company — not a stressed one.
            </h2>
            <p className="text-muted-foreground mb-6">
              Just smart hiring, done with care.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <Button 
                size="lg" 
                className="bg-primary text-primary-foreground hover:bg-primary/90 group"
                asChild
              >
                <a href="mailto:alek@auralistalent.com">
                  Start a Hiring Conversation
                  <ArrowUpRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                className="border-primary/50 text-primary hover:bg-primary/10 hover:border-primary"
              >
                Talk to a Hiring Partner
              </Button>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default ImpactAccordion;
