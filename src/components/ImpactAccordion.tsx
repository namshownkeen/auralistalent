import { motion, useScroll, useTransform, useMotionValueEvent } from "framer-motion";
import { useState, useRef, useEffect } from "react";
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
    title: "Hiring Shouldn't Feel This Heavy.",
    subtitle: "The Problem",
    tagline: "Weight Lifted, Not Added",
    bubbles: [
      { icon: DollarSign, text: "Fixed Salaries" },
      { icon: Clock, text: "Long Ramp-Up Time" },
      { icon: Wrench, text: "Tooling Costs" },
      { icon: TrendingDown, text: "Unused Capacity" },
    ],
  },
  {
    id: "reframe",
    title: "What If You Only Paid For Results?",
    subtitle: "The Solution",
    tagline: "Outcomes, Not Overhead",
    bubbles: [
      { icon: Zap, text: "On-Demand Expertise" },
      { icon: UserCheck, text: "Senior-Level Screening" },
      { icon: Ban, text: "Zero Idle Cost" },
    ],
  },
  {
    id: "comparison",
    title: "In-House Vs. Hiring Partner",
    subtitle: "The Comparison",
    tagline: "Same Talent, Smarter Spend",
    bubbles: [
      { icon: X, text: "$130K–$180K/Year Salary" },
      { icon: Check, text: "Pay Only When You Hire" },
      { icon: X, text: "2–4 Months Ramp-Up" },
      { icon: Check, text: "Immediate Access" },
    ],
  },
  {
    id: "savings",
    title: "Where The Savings Come From",
    subtitle: "Cost Breakdown",
    tagline: "Efficiency Without Compromise",
    bubbles: [
      { icon: Wallet, text: "No Salary" },
      { icon: Receipt, text: "No Overhead" },
      { icon: Timer, text: "20–40% Faster" },
      { icon: Target, text: "Better Fit" },
    ],
  },
  {
    id: "relief",
    title: "You Approve. We Handle The Rest.",
    subtitle: "What We Do",
    tagline: "Your Time Is Precious",
    bubbles: [
      { icon: Eye, text: "Review Candidates" },
      { icon: CheckCircle, text: "Final Decision" },
      { icon: CreditCard, text: "Simple Commission" },
    ],
  },
  {
    id: "sweetspot",
    title: "Built For Teams Hiring With Intention",
    subtitle: "Our Sweet Spot",
    tagline: "Intentional Growth",
    bubbles: [
      { icon: Users, text: "Flexible To Your Needs" },
      { icon: TrendingUp, text: "Scaling Carefully" },
      { icon: Star, text: "High-Impact Positions" },
      { icon: BarChart3, text: "Quality Over Volume" },
    ],
  },
  {
    id: "contract",
    title: "Flexible. Transparent. No Lock-Ins.",
    subtitle: "How We Work",
    tagline: "Clear Terms, Clean Exit",
    bubbles: [
      { icon: FileText, text: "Defined Scope" },
      { icon: Coins, text: "Agreed Commission" },
      { icon: EyeOff, text: "No Hidden Fees" },
      { icon: Unlock, text: "No Lock-In" },
    ],
  },
  {
    id: "whynow",
    title: "Why This Works Better Today",
    subtitle: "The Shift",
    tagline: "The World Changed",
    bubbles: [
      { icon: Globe, text: "Remote Talent" },
      { icon: Briefcase, text: "Specialized Roles" },
      { icon: Clock, text: "Shorter Windows" },
      { icon: TrendingDown, text: "Cost-Conscious" },
    ],
  },
];

/* ── Car SVG ──────────────────────────────────────────────── */

const NovaIcon = () => (
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none" className="drop-shadow-[0_0_12px_hsl(168_100%_37%/0.6)]">
    {/* Outer glow ring */}
    <circle cx="16" cy="16" r="14" fill="hsl(168 100% 37% / 0.08)" stroke="hsl(168 100% 37% / 0.3)" strokeWidth="0.5" />
    {/* Nova starburst */}
    <path
      d="M16 2 L18.5 12.5 L28 10 L20 16 L28 22 L18.5 19.5 L16 30 L13.5 19.5 L4 22 L12 16 L4 10 L13.5 12.5 Z"
      fill="hsl(168 100% 37%)"
      opacity="0.9"
    />
    {/* Inner core */}
    <circle cx="16" cy="16" r="4" fill="hsl(168 80% 55%)" />
    <circle cx="16" cy="16" r="2" fill="hsl(168 100% 80%)" />
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
  const [hasStartedAutoScroll, setHasStartedAutoScroll] = useState(false);
  const autoScrollRef = useRef<number | null>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Nova travels down the timeline track
  const novaY = useTransform(scrollYProgress, [0, 1], ["0%", "92%"]);
  const novaRotate = useTransform(scrollYProgress, [0, 1], [0, 360]);
  const novaGlow = useTransform(scrollYProgress, [0, 0.5, 1], [0.4, 1, 0.6]);

  // Show scroll arrow once user has seen most stations
  useMotionValueEvent(scrollYProgress, "change", (v) => {
    setShowArrow(v > 0.75);
  });

  // Auto-scroll when section enters viewport
  useEffect(() => {
    if (hasStartedAutoScroll) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasStartedAutoScroll) {
            setHasStartedAutoScroll(true);

            const el = containerRef.current;
            if (!el) return;

            const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
            if (prefersReduced) return;

            const start = window.scrollY;
            const end = el.getBoundingClientRect().bottom + window.scrollY - window.innerHeight + 80;
            const distance = end - start;
            if (distance <= 0) return;

            const duration = Math.min(Math.max(distance * 4, 6000), 18000);
            const startTime = performance.now();

            const ease = (t: number) => t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;

            const step = (now: number) => {
              const elapsed = now - startTime;
              const progress = Math.min(elapsed / duration, 1);
              window.scrollTo(0, start + distance * ease(progress));
              if (progress < 1) {
                autoScrollRef.current = requestAnimationFrame(step);
              }
            };

            autoScrollRef.current = requestAnimationFrame(step);

            // Stop auto-scroll on user interaction
            const stop = () => {
              if (autoScrollRef.current) cancelAnimationFrame(autoScrollRef.current);
              window.removeEventListener('wheel', stop);
              window.removeEventListener('touchstart', stop);
              window.removeEventListener('keydown', stop);
            };
            window.addEventListener('wheel', stop, { passive: true });
            window.addEventListener('touchstart', stop, { passive: true });
            window.addEventListener('keydown', stop, { passive: true });
          }
        });
      },
      { threshold: 0.15 }
    );

    if (containerRef.current) observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, [hasStartedAutoScroll]);

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
            How We Think About Hiring
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-6">
            Less Process, More Conversation. Less Guessing, More Knowing.
          </p>
          <div className="flex flex-wrap justify-center gap-2">
            <ImpactBubble text="Bridging Talent Across Borders" delay={0.2} size="sm" />
            <ImpactBubble text="Signal Over Noise" delay={0.4} size="sm" />
          </div>
        </motion.div>

        {/* Journey timeline */}
        <div ref={containerRef} className="relative max-w-3xl mx-auto">
          {/* Vertical track line */}
          <div className="absolute left-6 md:left-8 top-0 bottom-0 w-px bg-gradient-to-b from-primary/40 via-primary/20 to-primary/5" />

          {/* Moving nova */}
          <motion.div
            style={{ top: novaY }}
            className="absolute left-[9px] md:left-[17px] z-20 pointer-events-none"
          >
            <motion.div style={{ rotate: novaRotate, opacity: novaGlow }}>
              <NovaIcon />
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
            <span className="text-xs uppercase tracking-wider font-medium">Continue The Journey</span>
            <ChevronDown className="w-5 h-5" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default ImpactAccordion;
