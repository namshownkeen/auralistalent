import { motion, useScroll, useTransform, useMotionValueEvent } from "framer-motion";
import { useState, useRef } from "react";
import ImpactBubble from "./ImpactBubble";
import {
  DollarSign, Clock, Wrench, TrendingDown,
  Zap, UserCheck, Ban,
  X, Check,
  Wallet, Receipt, Timer, Target,
  Eye, CheckCircle, CreditCard,
  Users, TrendingUp, Star, BarChart3,
  FileText, Coins, EyeOff, Unlock,
  Globe, Briefcase, ChevronDown, LucideIcon
} from "lucide-react";

/* ── Journey Station Data ─────────────────────────────────── */

interface BubbleData {
  icon: LucideIcon;
  text: string;
}

interface JourneyStation {
  id: string;
  title: string;
  subtitle: string;
  tagline: string;
  bubbles: BubbleData[];
}

const stations: JourneyStation[] = [
  {
    id: "problem",
    title: "Hiring shouldn't feel this heavy.",
    subtitle: "The Problem",
    tagline: "Weight lifted, not added",
    bubbles: [
      { icon: DollarSign, text: "Fixed salaries" },
      { icon: Clock, text: "Long ramp-up time" },
      { icon: Wrench, text: "Tooling costs" },
      { icon: TrendingDown, text: "Unused capacity" },
    ],
  },
  {
    id: "reframe",
    title: "What if you only paid for results?",
    subtitle: "The Solution",
    tagline: "Outcomes, not overhead",
    bubbles: [
      { icon: Zap, text: "On-demand expertise" },
      { icon: UserCheck, text: "Senior-level screening" },
      { icon: Ban, text: "Zero idle cost" },
    ],
  },
  {
    id: "comparison",
    title: "In-House vs. Hiring Partner",
    subtitle: "The Comparison",
    tagline: "Same talent, smarter spend",
    bubbles: [
      { icon: X, text: "$80K–$120K/year salary" },
      { icon: Check, text: "Pay only when you hire" },
      { icon: X, text: "2–4 months ramp-up" },
      { icon: Check, text: "Immediate access" },
    ],
  },
  {
    id: "savings",
    title: "Where the Savings Come From",
    subtitle: "Cost Breakdown",
    tagline: "Efficiency without compromise",
    bubbles: [
      { icon: Wallet, text: "No Salary" },
      { icon: Receipt, text: "No Overhead" },
      { icon: Timer, text: "20–40% Faster" },
      { icon: Target, text: "Better Fit" },
    ],
  },
  {
    id: "relief",
    title: "You approve. We handle the rest.",
    subtitle: "What We Do",
    tagline: "Your time is precious",
    bubbles: [
      { icon: Eye, text: "Review candidates" },
      { icon: CheckCircle, text: "Final decision" },
      { icon: CreditCard, text: "Simple commission" },
    ],
  },
  {
    id: "sweetspot",
    title: "Built for Teams Hiring with Intention",
    subtitle: "Our Sweet Spot",
    tagline: "Intentional growth",
    bubbles: [
      { icon: Users, text: "1–10 roles/year" },
      { icon: TrendingUp, text: "Scaling carefully" },
      { icon: Star, text: "High-impact positions" },
      { icon: BarChart3, text: "Quality over volume" },
    ],
  },
  {
    id: "contract",
    title: "Flexible. Transparent. No Lock-Ins.",
    subtitle: "How We Work",
    tagline: "Clear terms, clean exit",
    bubbles: [
      { icon: FileText, text: "Defined scope" },
      { icon: Coins, text: "Agreed commission" },
      { icon: EyeOff, text: "No hidden fees" },
      { icon: Unlock, text: "No lock-in" },
    ],
  },
  {
    id: "whynow",
    title: "Why This Works Better Today",
    subtitle: "The Shift",
    tagline: "The world changed",
    bubbles: [
      { icon: Globe, text: "Remote talent" },
      { icon: Briefcase, text: "Specialized roles" },
      { icon: Clock, text: "Shorter windows" },
      { icon: TrendingDown, text: "Cost-conscious" },
    ],
  },
];

/* ── Car SVG ──────────────────────────────────────────────── */

const CarIcon = () => (
  <svg width="48" height="24" viewBox="0 0 48 24" fill="none" className="drop-shadow-lg">
    <rect x="4" y="8" width="40" height="12" rx="4" fill="hsl(168 100% 37%)" />
    <rect x="10" y="4" width="22" height="8" rx="3" fill="hsl(168 76% 42%)" />
    <circle cx="14" cy="20" r="3" fill="hsl(220 15% 15%)" stroke="hsl(168 100% 37%)" strokeWidth="1" />
    <circle cx="36" cy="20" r="3" fill="hsl(220 15% 15%)" stroke="hsl(168 100% 37%)" strokeWidth="1" />
    <rect x="12" y="6" width="6" height="4" rx="1" fill="hsl(168 100% 37% / 0.4)" />
    <rect x="20" y="6" width="6" height="4" rx="1" fill="hsl(168 100% 37% / 0.4)" />
  </svg>
);

/* ── Single Station Component ─────────────────────────────── */

const StationCard = ({ station, index }: { station: JourneyStation; index: number }) => (
  <motion.div
    initial={{ opacity: 0, x: index % 2 === 0 ? -40 : 40 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true, margin: "-80px" }}
    transition={{ duration: 0.6, ease: "easeOut" }}
    className="relative"
  >
    {/* Station header */}
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: 0.1 }}
      className="mb-6"
    >
      <span className="text-xs uppercase tracking-wider text-primary/70 font-medium block mb-1">
        {station.subtitle}
      </span>
      <h3 className="text-xl md:text-2xl font-semibold text-foreground mb-2 text-balance">
        {station.title}
      </h3>
      <ImpactBubble text={station.tagline} delay={0.2} size="sm" position="left" />
    </motion.div>

    {/* Bubbles grid */}
    <div className="flex flex-wrap gap-3">
      {station.bubbles.map((bubble, bIdx) => (
        <motion.div
          key={bubble.text}
          initial={{ opacity: 0, scale: 0.7, y: 20 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{
            duration: 0.5,
            delay: 0.15 + bIdx * 0.12,
            ease: [0.21, 0.47, 0.32, 0.98],
          }}
          whileHover={{ scale: 1.06, y: -3 }}
          className="
            flex items-center gap-2.5 px-4 py-3 rounded-2xl
            border border-primary/20 bg-card/60 backdrop-blur-sm
            shadow-sm hover:border-primary/50
            hover:shadow-[0_0_24px_hsl(168_100%_37%/0.2)]
            transition-all duration-300 cursor-default
          "
        >
          <bubble.icon className="w-4 h-4 text-primary flex-shrink-0" />
          <span className="text-sm text-foreground/90 font-medium">{bubble.text}</span>
        </motion.div>
      ))}
    </div>
  </motion.div>
);

/* ── Main Component ───────────────────────────────────────── */

const ImpactAccordion = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [showArrow, setShowArrow] = useState(false);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Car travels down the timeline track
  const carY = useTransform(scrollYProgress, [0, 1], ["0%", "92%"]);

  // Show scroll arrow once user has seen most stations
  useMotionValueEvent(scrollYProgress, "change", (v) => {
    setShowArrow(v > 0.75);
  });

  return (
    <section id="why-auralis" className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-6">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-sm font-medium text-primary mb-4 block">The Auralis Difference</span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4">
            How we think about hiring
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-6">
            Less process, more conversation. Less guessing, more knowing.
          </p>
          <div className="flex flex-wrap justify-center gap-2">
            <ImpactBubble text="Bridging talent across borders" delay={0.2} size="sm" />
            <ImpactBubble text="Signal over noise" delay={0.4} size="sm" />
          </div>
        </motion.div>

        {/* Journey timeline */}
        <div ref={containerRef} className="relative max-w-3xl mx-auto">
          {/* Vertical track line */}
          <div className="absolute left-6 md:left-8 top-0 bottom-0 w-px bg-gradient-to-b from-primary/40 via-primary/20 to-primary/5" />

          {/* Moving car */}
          <motion.div
            style={{ top: carY }}
            className="absolute left-1 md:left-2 z-20 pointer-events-none"
          >
            <motion.div
              animate={{ rotate: 90 }}
              className="origin-center"
            >
              <CarIcon />
            </motion.div>
          </motion.div>

          {/* Stations */}
          <div className="space-y-20 pl-16 md:pl-20">
            {stations.map((station, index) => (
              <div key={station.id} className="relative">
                {/* Dot on the track */}
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.1 }}
                  className="absolute -left-[calc(2.5rem+5px)] md:-left-[calc(3rem+5px)] top-1 w-3 h-3 rounded-full bg-primary shadow-[0_0_12px_hsl(168_100%_37%/0.5)]"
                />
                <StationCard station={station} index={index} />
              </div>
            ))}
          </div>
        </div>

        {/* Scroll-down arrow */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: showArrow ? 1 : 0 }}
          transition={{ duration: 0.6 }}
          className="flex justify-center mt-16"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="flex flex-col items-center gap-2 text-primary/60"
          >
            <span className="text-xs uppercase tracking-wider font-medium">Continue the journey</span>
            <ChevronDown className="w-5 h-5" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default ImpactAccordion;
