import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { 
  DollarSign, Clock, Wrench, TrendingDown,
  Zap, UserCheck, Ban,
  X, Check,
  Wallet, Receipt, Timer, Target,
  Search, Filter, Calendar, MessageCircle, Handshake, FileCheck, Eye, CheckCircle, CreditCard,
  Users, TrendingUp, Star, BarChart3,
  FileText, Coins, EyeOff, Unlock,
  Globe, Briefcase
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { ArrowUpRight } from "lucide-react";

interface AccordionItemData {
  id: string;
  title: string;
  subtitle?: string;
  content: React.ReactNode;
}

const ImpactAccordion = () => {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const accordionItems: AccordionItemData[] = [
    {
      id: "problem",
      title: "Hiring shouldn't feel this heavy.",
      subtitle: "The Problem",
      content: (
        <div className="space-y-8">
          <p className="text-lg text-[hsl(var(--impact-text))]/80 leading-relaxed">
            When you're hiring for a limited number of critical roles, an in-house recruiter often means:
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { icon: DollarSign, text: "Fixed salaries" },
              { icon: Clock, text: "Long ramp-up time" },
              { icon: Wrench, text: "Tooling costs" },
              { icon: TrendingDown, text: "Unused capacity" },
            ].map((point) => (
              <div key={point.text} className="p-4 rounded-xl border border-[hsl(var(--impact-border))] bg-[hsl(var(--impact-bg))]/50">
                <point.icon className="w-6 h-6 text-[hsl(var(--impact-text))] mb-3 mx-auto" />
                <p className="text-[hsl(var(--impact-text))]/90 text-sm text-center">{point.text}</p>
              </div>
            ))}
          </div>
          <div className="p-5 rounded-xl border border-[hsl(var(--impact-border))] bg-[hsl(var(--impact-text))]/5 inline-block">
            <p className="text-[hsl(var(--impact-text))] text-base">
              💡 Companies hiring under 5–10 roles/year overspend by <span className="font-semibold">30–45%</span>
            </p>
          </div>
        </div>
      ),
    },
    {
      id: "reframe",
      title: "What if you only paid for results?",
      subtitle: "The Solution",
      content: (
        <div className="space-y-8">
          <p className="text-lg text-[hsl(var(--impact-text))]/80 leading-relaxed">
            Instead of carrying the cost of a full-time recruiter, our model gives you:
          </p>
          <div className="grid md:grid-cols-3 gap-4">
            {[
              { icon: Zap, text: "On-demand hiring expertise" },
              { icon: UserCheck, text: "Senior-level screening from day one" },
              { icon: Ban, text: "Zero idle cost after roles are filled" },
            ].map((benefit) => (
              <div key={benefit.text} className="p-5 rounded-xl border border-[hsl(var(--impact-border))] bg-[hsl(var(--impact-text))]/5">
                <benefit.icon className="w-7 h-7 text-[hsl(var(--impact-text))] mb-3 mx-auto" />
                <p className="text-[hsl(var(--impact-text))] text-center font-medium">{benefit.text}</p>
              </div>
            ))}
          </div>
          <p className="text-xl text-[hsl(var(--impact-text))] font-medium text-center">
            You focus on growing. We handle the hiring.
          </p>
        </div>
      ),
    },
    {
      id: "comparison",
      title: "In-House Recruiter vs. Hiring Partner",
      subtitle: "The Comparison",
      content: (
        <div className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="p-5 rounded-xl border border-[hsl(var(--impact-border))] bg-[hsl(var(--impact-bg))]/50">
              <h4 className="text-lg font-semibold text-[hsl(var(--impact-text))]/60 mb-4">In-House Recruiter</h4>
              <ul className="space-y-3">
                {["$80K–$120K/year", "20–30% overhead", "2–4 months ramp-up", "Cost when not hiring"].map((text) => (
                  <li key={text} className="flex items-center gap-2">
                    <X className="w-4 h-4 text-red-400" />
                    <span className="text-[hsl(var(--impact-text))]/70 text-sm">{text}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="p-5 rounded-xl border border-[hsl(var(--impact-text))]/30 bg-[hsl(var(--impact-text))]/10">
              <h4 className="text-lg font-semibold text-[hsl(var(--impact-text))] mb-4">Our Model</h4>
              <ul className="space-y-3">
                {["Pay only when you hire", "15–25% per hire", "Immediate access", "No long-term cost"].map((text) => (
                  <li key={text} className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-[hsl(var(--impact-text))]" />
                    <span className="text-[hsl(var(--impact-text))] text-sm">{text}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <p className="text-lg text-[hsl(var(--impact-text))] text-center">
            Save <span className="font-bold">35–50%</span> on hiring costs
          </p>
        </div>
      ),
    },
    {
      id: "savings",
      title: "Where the Savings Come From",
      subtitle: "Cost Breakdown",
      content: (
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { icon: Wallet, title: "No Salary", desc: "You don't pay when not hiring" },
            { icon: Receipt, title: "No Overhead", desc: "We bring our own tools" },
            { icon: Timer, title: "Faster Hiring", desc: "20–40% reduced vacancy" },
            { icon: Target, title: "Better Quality", desc: "Fewer mis-hires" },
          ].map((item) => (
            <div key={item.title} className="p-4 rounded-xl border border-[hsl(var(--impact-border))] bg-[hsl(var(--impact-text))]/5 text-center">
              <item.icon className="w-8 h-8 text-[hsl(var(--impact-text))] mb-3 mx-auto" />
              <h4 className="text-[hsl(var(--impact-text))] font-semibold mb-1">{item.title}</h4>
              <p className="text-[hsl(var(--impact-text))]/60 text-sm">{item.desc}</p>
            </div>
          ))}
        </div>
      ),
    },
    {
      id: "relief",
      title: "You approve. We handle the rest.",
      subtitle: "What We Do",
      content: (
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h4 className="text-lg font-semibold text-[hsl(var(--impact-text))]/70 mb-4">We Handle</h4>
            <div className="grid grid-cols-2 gap-3">
              {["Sourcing", "Screening", "Interviews", "Follow-ups", "Negotiations", "Contracts"].map((text) => (
                <div key={text} className="flex items-center gap-2 p-3 rounded-lg border border-[hsl(var(--impact-border))] bg-[hsl(var(--impact-bg))]/50">
                  <span className="text-[hsl(var(--impact-text))]/70 text-sm">{text}</span>
                </div>
              ))}
            </div>
          </div>
          <div>
            <h4 className="text-lg font-semibold text-[hsl(var(--impact-text))] mb-4">You Do</h4>
            <div className="space-y-3">
              {[
                { icon: Eye, text: "Review candidates" },
                { icon: CheckCircle, text: "Final decision" },
                { icon: CreditCard, text: "Simple commission" },
              ].map((item) => (
                <div key={item.text} className="flex items-center gap-3 p-4 rounded-lg border border-[hsl(var(--impact-text))]/30 bg-[hsl(var(--impact-text))]/10">
                  <item.icon className="w-5 h-5 text-[hsl(var(--impact-text))]" />
                  <span className="text-[hsl(var(--impact-text))] font-medium">{item.text}</span>
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
      content: (
        <div className="grid sm:grid-cols-2 gap-4">
          {[
            { icon: Users, text: "Hiring 1–10 roles/year" },
            { icon: TrendingUp, text: "Scaling carefully" },
            { icon: Star, text: "High-impact positions" },
            { icon: BarChart3, text: "Quality over volume" },
          ].map((item) => (
            <div key={item.text} className="flex items-center gap-3 p-4 rounded-xl border border-[hsl(var(--impact-border))] bg-[hsl(var(--impact-text))]/5">
              <item.icon className="w-6 h-6 text-[hsl(var(--impact-text))]" />
              <span className="text-[hsl(var(--impact-text))] font-medium">{item.text}</span>
            </div>
          ))}
        </div>
      ),
    },
    {
      id: "contract",
      title: "Flexible. Transparent. No Lock-Ins.",
      subtitle: "How We Work",
      content: (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { icon: FileText, text: "Defined scope" },
            { icon: Coins, text: "Agreed commission" },
            { icon: EyeOff, text: "No hidden fees" },
            { icon: Unlock, text: "No lock-in" },
          ].map((feature) => (
            <div key={feature.text} className="p-4 rounded-xl border border-[hsl(var(--impact-text))]/20 bg-[hsl(var(--impact-text))]/5 text-center">
              <feature.icon className="w-6 h-6 text-[hsl(var(--impact-text))] mb-3 mx-auto" />
              <p className="text-[hsl(var(--impact-text))] text-sm font-medium">{feature.text}</p>
            </div>
          ))}
        </div>
      ),
    },
    {
      id: "whynow",
      title: "Why This Works Better Today",
      subtitle: "The Shift",
      content: (
        <div className="space-y-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { icon: Globe, text: "Remote talent pools" },
              { icon: Briefcase, text: "Specialized roles" },
              { icon: Clock, text: "Shorter windows" },
              { icon: TrendingDown, text: "Cost-conscious" },
            ].map((reason) => (
              <div key={reason.text} className="p-4 rounded-xl border border-[hsl(var(--impact-border))] bg-[hsl(var(--impact-text))]/5 text-center">
                <reason.icon className="w-6 h-6 text-[hsl(var(--impact-text))] mb-2 mx-auto" />
                <p className="text-[hsl(var(--impact-text))] text-sm">{reason.text}</p>
              </div>
            ))}
          </div>
          <p className="text-lg text-[hsl(var(--impact-text))] text-center">
            Hiring has changed. Your model should too.
          </p>
        </div>
      ),
    },
  ];

  return (
    <section className="py-16 md:py-24 bg-[hsl(var(--impact-bg))]">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto"
        >
          <div className="space-y-3">
            {accordionItems.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className={`
                  rounded-2xl border transition-all duration-500 overflow-hidden
                  ${expandedId === item.id 
                    ? 'border-[hsl(var(--impact-text))]/40 bg-[hsl(var(--impact-text))]/5' 
                    : 'border-[hsl(var(--impact-border))] bg-[hsl(var(--impact-bg))]/50 hover:border-[hsl(var(--impact-text))]/30 hover:bg-[hsl(var(--impact-text))]/5'
                  }
                `}
                onMouseEnter={() => setExpandedId(item.id)}
                onMouseLeave={() => setExpandedId(null)}
              >
                <div className="p-5 cursor-pointer">
                  <div className="flex items-center justify-between">
                    <div>
                      {item.subtitle && (
                        <span className="text-[hsl(var(--impact-text))]/50 text-xs uppercase tracking-wider mb-1 block">
                          {item.subtitle}
                        </span>
                      )}
                      <h3 className="text-lg md:text-xl font-semibold text-[hsl(var(--impact-text))]">
                        {item.title}
                      </h3>
                    </div>
                    <motion.div
                      animate={{ rotate: expandedId === item.id ? 45 : 0 }}
                      transition={{ duration: 0.3 }}
                      className="w-6 h-6 rounded-full border border-[hsl(var(--impact-text))]/30 flex items-center justify-center flex-shrink-0 ml-4"
                    >
                      <span className="text-[hsl(var(--impact-text))] text-sm">+</span>
                    </motion.div>
                  </div>
                </div>
                
                <AnimatePresence>
                  {expandedId === item.id && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.4, ease: "easeInOut" }}
                    >
                      <div className="px-5 pb-6 pt-2">
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
            className="mt-16 text-center"
          >
            <h2 className="text-2xl md:text-3xl font-semibold text-[hsl(var(--impact-text))] mb-6">
              Hire like a growing company — not a stressed one.
            </h2>
            <p className="text-lg text-[hsl(var(--impact-text))]/70 mb-8">
              Just smart hiring, done with care.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
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
                className="border-[hsl(var(--impact-text))]/30 text-[hsl(var(--impact-text))] hover:bg-[hsl(var(--impact-text))]/10 bg-transparent"
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
