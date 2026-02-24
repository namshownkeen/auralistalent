import { motion, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion";
import { useRef, useState } from "react";
import { Sparkles, Heart, Target, Eye, Shield, Zap } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

const philosophyCards = [
  {
    icon: Heart,
    title: "People First",
    line1: "Every Hire Is A Human Story.",
    line2: "We Listen Before We Match.",
    symbol: "♥",
  },
  {
    icon: Eye,
    title: "Deep Signal",
    line1: "We See What Resumes Can't Show.",
    line2: "Potential Over Keywords.",
    symbol: "◆",
  },
  {
    icon: Target,
    title: "Precision Fit",
    line1: "Not The Most Candidates.",
    line2: "The Right One.",
    symbol: "♠",
  },
  {
    icon: Shield,
    title: "Trust Built In",
    line1: "Transparency At Every Step.",
    line2: "No Surprises, No Games.",
    symbol: "♣",
  },
  {
    icon: Zap,
    title: "Speed With Care",
    line1: "Fast Doesn't Mean Reckless.",
    line2: "We Move With Purpose.",
    symbol: "★",
  },
  {
    icon: Sparkles,
    title: "Lasting Impact",
    line1: "Great Hires Build Great Teams.",
    line2: "We Think In Years, Not Days.",
    symbol: "✦",
  },
];

const CardFace = ({
  card,
  isFront,
}: {
  card: (typeof philosophyCards)[0];
  isFront: boolean;
}) => {
  if (!isFront) {
    return (
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[hsl(var(--primary))] to-[hsl(var(--primary-glow))] flex items-center justify-center backface-hidden rotate-y-180 overflow-hidden">
        {/* Pattern overlay */}
        <div className="absolute inset-0 opacity-20">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="absolute text-[hsl(var(--primary-foreground))] text-2xl font-bold"
              style={{
                top: `${15 + i * 15}%`,
                left: `${10 + (i % 3) * 30}%`,
                transform: `rotate(${i * 30}deg)`,
              }}
            >
              ✦
            </div>
          ))}
        </div>
        <div className="text-center z-10">
          <span className="text-5xl font-bold text-[hsl(var(--primary-foreground))]">A</span>
          <p className="text-xs font-medium text-[hsl(var(--primary-foreground))]/80 mt-2 tracking-widest uppercase">
            Auralis
          </p>
        </div>
      </div>
    );
  }

  const Icon = card.icon;
  return (
    <div className="absolute inset-0 rounded-2xl backface-hidden overflow-hidden flex flex-col">
      {/* Glassmorphism background */}
      <div className="absolute inset-0 bg-[hsl(var(--card))]/80 backdrop-blur-xl" />
      <div className="absolute inset-0 bg-gradient-to-br from-[hsl(var(--primary))]/10 to-transparent" />
      <div className="absolute inset-[1px] rounded-2xl border border-[hsl(var(--primary))]/20" />

      {/* Card content */}
      <div className="relative z-10 flex flex-col h-full p-6">
        {/* Top symbol */}
        <div className="flex justify-between items-start">
          <span className="text-2xl text-[hsl(var(--primary))]">{card.symbol}</span>
          <div className="w-10 h-10 rounded-xl bg-[hsl(var(--primary))]/15 flex items-center justify-center">
            <Icon className="w-5 h-5 text-[hsl(var(--primary))]" />
          </div>
        </div>

        {/* Center content */}
        <div className="flex-1 flex flex-col justify-center text-center px-2">
          <h3 className="text-xl md:text-2xl font-bold text-[hsl(var(--foreground))] mb-3">
            {card.title}
          </h3>
          <p className="text-sm text-[hsl(var(--muted-foreground))] leading-relaxed">
            {card.line1}
          </p>
          <p className="text-sm text-[hsl(var(--muted-foreground))]/70 leading-relaxed mt-1">
            {card.line2}
          </p>
        </div>

        {/* Bottom symbol */}
        <div className="flex justify-end">
          <span className="text-2xl text-[hsl(var(--primary))]/40 rotate-180">{card.symbol}</span>
        </div>
      </div>
    </div>
  );
};

const InteractiveCard = ({
  card,
  index,
  isFlipped,
  fanAngle,
  fanX,
  stackOffset,
  phase,
}: {
  card: (typeof philosophyCards)[0];
  index: number;
  isFlipped: boolean;
  fanAngle: number;
  fanX: number;
  stackOffset: number;
  phase: "stack" | "fan" | "flip" | "grid";
}) => {
  const isMobile = useIsMobile();
  const [tapped, setTapped] = useState(false);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [8, -8]), {
    stiffness: 200,
    damping: 30,
  });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-8, 8]), {
    stiffness: 200,
    damping: 30,
  });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isMobile || phase !== "grid") return;
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
    mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  const handleTap = () => {
    if (isMobile) setTapped((t) => !t);
  };

  const showFront = phase === "flip" || phase === "grid" ? isFlipped : false;
  const mobileFlipped = isMobile && tapped;

  // Compute animation target based on phase
  let targetProps: Record<string, number | string> = {};
  if (phase === "stack") {
    targetProps = {
      x: 0,
      y: stackOffset,
      rotate: (index - 2.5) * 3 + Math.sin(index * 1.5) * 2,
      scale: 1 - index * 0.02,
    };
  } else if (phase === "fan") {
    targetProps = {
      x: fanX,
      y: 0,
      rotate: fanAngle,
      scale: 1,
    };
  } else if (phase === "flip" || phase === "grid") {
    targetProps = {
      x: 0,
      y: 0,
      rotate: 0,
      scale: 1,
    };
  }

  return (
    <motion.div
      className="relative cursor-pointer"
      style={{
        width: isMobile ? 200 : 240,
        height: isMobile ? 300 : 340,
        perspective: 1000,
        transformStyle: "preserve-3d",
      }}
      initial={{ opacity: 0, y: 80, rotate: (index - 2.5) * 15 }}
      animate={{
        opacity: 1,
        ...targetProps,
      }}
      transition={{
        duration: 0.8,
        delay: index * 0.12,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
      whileHover={
        phase === "grid" && !isMobile
          ? { y: -12, scale: 1.04, transition: { duration: 0.3 } }
          : {}
      }
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={handleTap}
    >
      <motion.div
        className="relative w-full h-full"
        style={{
          transformStyle: "preserve-3d",
          rotateX: phase === "grid" && !isMobile ? rotateX : 0,
          rotateY:
            phase === "grid" && !isMobile
              ? rotateY
              : showFront || mobileFlipped
                ? 180
                : 0,
        }}
        animate={{
          rotateY: showFront || mobileFlipped ? 180 : 0,
        }}
        transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        {/* Back face (default visible) */}
        <CardFace card={card} isFront={false} />
        {/* Front face (revealed on flip) */}
        <CardFace card={card} isFront={true} />
      </motion.div>

      {/* Glow effect on hover */}
      {phase === "grid" && (
        <motion.div
          className="absolute -inset-2 rounded-3xl bg-[hsl(var(--primary))]/0 pointer-events-none"
          whileHover={{ backgroundColor: "hsl(168 100% 37% / 0.08)" }}
          transition={{ duration: 0.3 }}
        />
      )}
    </motion.div>
  );
};

const CardPhilosophy = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  // Phase breakpoints based on scroll
  const progressValue = useTransform(scrollYProgress, [0, 1], [0, 1]);

  // Derive phase and per-card flip state from scroll
  const [phase, setPhase] = useState<"stack" | "fan" | "flip" | "grid">("stack");
  const [flippedCards, setFlippedCards] = useState<boolean[]>(
    new Array(philosophyCards.length).fill(false)
  );

  // Update phase based on scroll
  progressValue.on("change", (v) => {
    if (v < 0.2) {
      setPhase("stack");
      setFlippedCards(new Array(philosophyCards.length).fill(false));
    } else if (v < 0.35) {
      setPhase("fan");
      setFlippedCards(new Array(philosophyCards.length).fill(false));
    } else if (v < 0.65) {
      setPhase("flip");
      const flipProgress = (v - 0.35) / 0.3;
      const cardsToFlip = Math.floor(flipProgress * philosophyCards.length);
      setFlippedCards(
        philosophyCards.map((_, i) => i < cardsToFlip)
      );
    } else {
      setPhase("grid");
      setFlippedCards(new Array(philosophyCards.length).fill(true));
    }
  });

  return (
    <section
      ref={sectionRef}
      id="philosophy"
      className="relative py-32 md:py-40 overflow-hidden"
      style={{ minHeight: "200vh" }}
    >
      {/* Ambient background */}
      <div className="absolute inset-0 bg-[hsl(var(--impact-bg))]" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[hsl(var(--primary))]/[0.03] to-transparent" />

      {/* Floating particles */}
      {!isMobile &&
        Array.from({ length: 8 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 rounded-full bg-[hsl(var(--primary))]/30"
            style={{
              top: `${10 + Math.random() * 80}%`,
              left: `${5 + Math.random() * 90}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.2, 0.6, 0.2],
            }}
            transition={{
              duration: 4 + Math.random() * 3,
              repeat: Infinity,
              delay: i * 0.5,
              ease: "easeInOut",
            }}
          />
        ))}

      <div className="sticky top-0 min-h-screen flex flex-col items-center justify-center">
        <div className="container mx-auto px-6">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="text-center mb-16"
          >
            <span className="text-sm font-medium text-[hsl(var(--primary))] mb-4 block tracking-widest uppercase">
              Our Philosophy
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[hsl(var(--foreground))] mb-4">
              How We Think About Hiring
            </h2>
            <p className="text-[hsl(var(--muted-foreground))] max-w-lg mx-auto">
              Six Principles That Guide Every Search We Take On.
            </p>
          </motion.div>

          {/* Cards container */}
          {phase === "grid" ? (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 max-w-4xl mx-auto justify-items-center">
              {philosophyCards.map((card, index) => (
                <InteractiveCard
                  key={card.title}
                  card={card}
                  index={index}
                  isFlipped={flippedCards[index]}
                  fanAngle={0}
                  fanX={0}
                  stackOffset={0}
                  phase={phase}
                />
              ))}
            </div>
          ) : (
            <div className="relative flex items-center justify-center" style={{ height: isMobile ? 320 : 360 }}>
              {philosophyCards.map((card, index) => {
                const center = (philosophyCards.length - 1) / 2;
                const fanAngle = (index - center) * (isMobile ? 8 : 10);
                const fanX = (index - center) * (isMobile ? 50 : 80);
                const stackOffset = index * -4;

                return (
                  <div
                    key={card.title}
                    className="absolute"
                    style={{ zIndex: phase === "stack" ? philosophyCards.length - index : index }}
                  >
                    <InteractiveCard
                      card={card}
                      index={index}
                      isFlipped={flippedCards[index]}
                      fanAngle={fanAngle}
                      fanX={fanX}
                      stackOffset={stackOffset}
                      phase={phase}
                    />
                  </div>
                );
              })}
            </div>
          )}

          {/* Scroll hint */}
          {phase === "stack" && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center mt-12"
            >
              <p className="text-xs text-[hsl(var(--muted-foreground))]/60 tracking-widest uppercase mb-3">
                Scroll To Reveal
              </p>
              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                className="text-[hsl(var(--primary))]/50"
              >
                ↓
              </motion.div>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
};

export default CardPhilosophy;
