import { motion, AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect } from "react";
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

const CardBack = () => (
  <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[hsl(var(--primary))] to-[hsl(var(--primary-glow))] flex items-center justify-center backface-hidden overflow-hidden shadow-lg">
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

const CardFront = ({ card }: { card: (typeof philosophyCards)[0] }) => {
  const Icon = card.icon;
  return (
    <div className="absolute inset-0 rounded-2xl backface-hidden rotate-y-180 overflow-hidden flex flex-col shadow-lg">
      <div className="absolute inset-0 bg-[hsl(var(--card))]/80 backdrop-blur-xl" />
      <div className="absolute inset-0 bg-gradient-to-br from-[hsl(var(--primary))]/10 to-transparent" />
      <div className="absolute inset-[1px] rounded-2xl border border-[hsl(var(--primary))]/20" />
      <div className="relative z-10 flex flex-col h-full p-6">
        <div className="flex justify-between items-start">
          <span className="text-2xl text-[hsl(var(--primary))]">{card.symbol}</span>
          <div className="w-10 h-10 rounded-xl bg-[hsl(var(--primary))]/15 flex items-center justify-center">
            <Icon className="w-5 h-5 text-[hsl(var(--primary))]" />
          </div>
        </div>
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
        <div className="flex justify-end">
          <span className="text-2xl text-[hsl(var(--primary))]/40 rotate-180">{card.symbol}</span>
        </div>
      </div>
    </div>
  );
};

type Phase = "enter" | "deck" | "reveal" | "grid";

const CardPhilosophy = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();
  const [inView, setInView] = useState(false);
  const [phase, setPhase] = useState<Phase>("enter");
  const [revealedCount, setRevealedCount] = useState(0);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          obs.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    if (!inView) return;

    const enterDuration = philosophyCards.length * 350 + 500;
    const deckTimer = setTimeout(() => setPhase("deck"), enterDuration);

    const revealStart = enterDuration + 800;
    const revealTimers: ReturnType<typeof setTimeout>[] = [];

    const startRevealTimer = setTimeout(() => {
      setPhase("reveal");
      philosophyCards.forEach((_, i) => {
        revealTimers.push(
          setTimeout(() => setRevealedCount(i + 1), i * 400)
        );
      });
    }, revealStart);

    // Grid phase after all reveals complete
    const gridStart = revealStart + philosophyCards.length * 400 + 600;
    const gridTimer = setTimeout(() => setPhase("grid"), gridStart);

    return () => {
      clearTimeout(deckTimer);
      clearTimeout(startRevealTimer);
      clearTimeout(gridTimer);
      revealTimers.forEach(clearTimeout);
    };
  }, [inView]);

  const cardW = isMobile ? 160 : 220;
  const cardH = isMobile ? 240 : 320;
  const gap = isMobile ? 12 : 24;
  const cols = isMobile ? 2 : 3;
  const rows = isMobile ? 3 : 2;

  // Calculate grid positions relative to center of container
  const gridTotalW = cols * cardW + (cols - 1) * gap;
  const gridTotalH = rows * cardH + (rows - 1) * gap;

  const getGridPosition = (index: number) => {
    const col = index % cols;
    const row = Math.floor(index / cols);
    const x = col * (cardW + gap) - gridTotalW / 2 + cardW / 2;
    const y = row * (cardH + gap) - gridTotalH / 2 + cardH / 2;
    return { x, y };
  };

  return (
    <section
      ref={sectionRef}
      id="philosophy"
      className="relative py-32 md:py-40 overflow-hidden"
    >
      <div className="absolute inset-0 bg-[hsl(var(--impact-bg))]" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[hsl(var(--primary))]/[0.03] to-transparent" />

      <div className="container mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16 relative z-10"
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

        {/* Cards container — always uses absolute positioning for smooth animation */}
        <div
          className="relative mx-auto"
          style={{
            width: gridTotalW,
            height: gridTotalH,
          }}
        >
          {inView &&
            philosophyCards.map((card, index) => {
              // Entry: fly in from radial directions
              const angle = ((index / philosophyCards.length) * 360 + 45) * (Math.PI / 180);
              const entryDist = isMobile ? 400 : 600;
              const entryX = Math.cos(angle) * entryDist;
              const entryY = Math.sin(angle) * entryDist;
              const entryRotate = (index - 2.5) * 25;

              // Deck: stacked center
              const deckY = index * -3;
              const deckRotate = (index - 2.5) * 2;

              // Reveal: fan out with flip
              const isRevealed = (phase === "reveal" || phase === "grid") && index < revealedCount;
              const revealSpread = (index - 2.5) * (isMobile ? 30 : 50);

              // Grid: precise positions
              const gridPos = getGridPosition(index);

              let targetX = 0;
              let targetY = 0;
              let targetRotate = 0;
              let targetScale = 1;
              let flipY = 0;

              if (phase === "enter" || phase === "deck") {
                targetX = 0;
                targetY = deckY;
                targetRotate = deckRotate;
                targetScale = 1 - index * 0.015;
              } else if (phase === "reveal") {
                targetX = isRevealed ? revealSpread : 0;
                targetY = isRevealed ? 0 : deckY;
                targetRotate = isRevealed ? (index - 2.5) * 3 : deckRotate;
                targetScale = 1;
                flipY = isRevealed ? 180 : 0;
              } else if (phase === "grid") {
                targetX = gridPos.x;
                targetY = gridPos.y;
                targetRotate = 0;
                targetScale = 1;
                flipY = 180;
              }

              // Spring-like bounce easing for grid settle
              const gridTransition = phase === "grid"
                ? {
                    duration: 0.9,
                    delay: index * 0.07,
                    ease: [0.34, 1.56, 0.64, 1] as [number, number, number, number], // overshoot bounce
                  }
                : {
                    duration: 0.8,
                    delay: phase === "enter" ? index * 0.35 : 0,
                    ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number],
                  };

              return (
                <motion.div
                  key={card.title}
                  className="absolute"
                  style={{
                    width: cardW,
                    height: cardH,
                    perspective: 1000,
                    left: "50%",
                    top: "50%",
                    marginLeft: -cardW / 2,
                    marginTop: -cardH / 2,
                    zIndex: phase === "grid" ? 1 : (phase === "reveal" && isRevealed ? 10 + index : philosophyCards.length - index),
                  }}
                  initial={{
                    x: entryX,
                    y: entryY,
                    rotate: entryRotate,
                    opacity: 0,
                    scale: 0.6,
                  }}
                  animate={{
                    x: targetX,
                    y: targetY,
                    rotate: targetRotate,
                    opacity: 1,
                    scale: targetScale,
                  }}
                  transition={gridTransition}
                  whileHover={
                    phase === "grid" && !isMobile
                      ? { y: gridPos.y - 8, scale: 1.03, transition: { duration: 0.25 } }
                      : {}
                  }
                >
                  <motion.div
                    className="relative w-full h-full"
                    style={{ transformStyle: "preserve-3d" }}
                    animate={{ rotateY: flipY }}
                    transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
                  >
                    <CardBack />
                    <CardFront card={card} />
                  </motion.div>
                </motion.div>
              );
            })}
        </div>

        {/* Status text */}
        <AnimatePresence mode="wait">
          {phase === "enter" && inView && (
            <motion.p
              key="dealing"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center mt-10 text-xs text-[hsl(var(--muted-foreground))]/60 tracking-widest uppercase"
            >
              Dealing The Cards...
            </motion.p>
          )}
          {phase === "deck" && (
            <motion.p
              key="deck"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center mt-10 text-xs text-[hsl(var(--muted-foreground))]/60 tracking-widest uppercase"
            >
              Shuffling The Deck...
            </motion.p>
          )}
          {phase === "reveal" && (
            <motion.p
              key="reveal"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center mt-10 text-xs text-[hsl(var(--muted-foreground))]/60 tracking-widest uppercase"
            >
              Revealing Our Principles...
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default CardPhilosophy;
