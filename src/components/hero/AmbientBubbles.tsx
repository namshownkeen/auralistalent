import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState, useRef, useCallback } from 'react';

const bubbleMessages = [
  "Where companies meet talent",
  "Alignment before hiring",
  "One conversation, real fit",
  "Trust across the bridge",
  "People over resumes",
  "Culture-first matching",
  "Human stories, not keywords",
  "Built for lasting teams",
];

interface FloatingBubble {
  id: number;
  contentIndex: number;
  // Starting angle from center (radians)
  angle: number;
  // How far it travels
  distance: number;
  // Size
  size: number;
  // Journey duration
  duration: number;
  // Slight bobbing offset
  bobPhase: number;
  shimmerAngle: number;
}

const AmbientBubbles = () => {
  const [bubbles, setBubbles] = useState<FloatingBubble[]>([]);
  const [isMobile, setIsMobile] = useState(false);
  const idRef = useRef(0);
  const contentRef = useRef(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  const spawnBubble = useCallback(() => {
    // Avoid the horizontal center band (±25°) so bubbles don't overlap the tagline
    // Split into upper and lower arcs, skipping ~150°-210° and ~330°-30° (left/right center)
    const zones = [
      [0.15 * Math.PI, 0.85 * Math.PI],   // upper arc (roughly 27° to 153°)
      [1.15 * Math.PI, 1.85 * Math.PI],   // lower arc (roughly 207° to 333°)
    ];
    const zone = zones[Math.floor(Math.random() * zones.length)];
    const angle = zone[0] + Math.random() * (zone[1] - zone[0]);
    const size = isMobile ? 85 + Math.random() * 30 : 110 + Math.random() * 50;
    const distance = isMobile ? 200 + Math.random() * 150 : 300 + Math.random() * 250;
    const duration = 10 + Math.random() * 6; // 10-16s

    const newBubble: FloatingBubble = {
      id: idRef.current++,
      contentIndex: contentRef.current,
      angle,
      distance,
      size,
      duration,
      bobPhase: Math.random() * Math.PI * 2,
      shimmerAngle: Math.random() * 360,
    };

    contentRef.current = (contentRef.current + 1) % bubbleMessages.length;

    setBubbles(prev => {
      const max = isMobile ? 4 : 6;
      return [...prev, newBubble].slice(-max);
    });

    setTimeout(() => {
      setBubbles(prev => prev.filter(b => b.id !== newBubble.id));
    }, duration * 1000);
  }, [isMobile]);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    // Staggered initial spawn — feels like a gentle burst
    const timers = Array.from({ length: isMobile ? 3 : 4 }, (_, i) =>
      setTimeout(() => spawnBubble(), 800 + i * 700)
    );

    intervalRef.current = setInterval(spawnBubble, isMobile ? 3200 : 2400);

    return () => {
      timers.forEach(clearTimeout);
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [spawnBubble, isMobile]);

  return (
    <div className="absolute inset-0 z-20 pointer-events-none overflow-hidden flex items-center justify-center">
      <AnimatePresence>
        {bubbles.map((bubble) => {
          const endX = Math.cos(bubble.angle) * bubble.distance;
          const endY = Math.sin(bubble.angle) * bubble.distance;

          return (
            <motion.div
              key={bubble.id}
              className="absolute pointer-events-auto cursor-default"
              initial={{
                opacity: 0,
                scale: 0.2,
                x: 0,
                y: 0,
              }}
              animate={{
                opacity: [0, 0.85, 0.85, 0],
                scale: [0.2, 1, 1.02, 0.85],
                x: endX,
                y: endY,
              }}
              transition={{
                duration: bubble.duration,
                ease: [0.25, 0.1, 0.25, 1],
                opacity: {
                  duration: bubble.duration,
                  times: [0, 0.06, 0.8, 1],
                  ease: 'easeInOut',
                },
                scale: {
                  duration: bubble.duration,
                  times: [0, 0.1, 0.75, 1],
                  ease: 'easeInOut',
                },
              }}
            >
              {/* The bubble sphere */}
              <motion.div
                className="relative rounded-full flex items-center justify-center"
                style={{
                  width: bubble.size,
                  height: bubble.size,
                }}
                animate={{
                  y: [0, -6, 0, 4, 0],
                }}
                transition={{
                  duration: 4 + Math.random() * 2,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  delay: bubble.bobPhase,
                }}
              >
                {/* Outer iridescent skin */}
                <div
                  className="absolute inset-0 rounded-full"
                  style={{
                    background: `
                      radial-gradient(circle at 35% 25%, 
                        hsl(var(--primary) / 0.15) 0%, 
                        hsl(var(--primary) / 0.06) 35%, 
                        hsl(var(--primary) / 0.02) 60%,
                        transparent 80%
                      )
                    `,
                    border: '1px solid hsl(var(--primary) / 0.18)',
                    boxShadow: `
                      0 0 30px hsl(var(--primary) / 0.06),
                      inset 0 0 20px hsl(var(--primary) / 0.04),
                      0 0 60px hsl(var(--primary) / 0.03)
                    `,
                  }}
                />

                {/* Top-left shimmer highlight — soap bubble light reflection */}
                <div
                  className="absolute rounded-full pointer-events-none"
                  style={{
                    width: '35%',
                    height: '20%',
                    top: '12%',
                    left: '18%',
                    background: 'linear-gradient(145deg, hsl(var(--primary) / 0.25), transparent)',
                    borderRadius: '50%',
                    filter: 'blur(3px)',
                    transform: `rotate(${bubble.shimmerAngle}deg)`,
                  }}
                />

                {/* Secondary shimmer — bottom-right */}
                <div
                  className="absolute rounded-full pointer-events-none"
                  style={{
                    width: '18%',
                    height: '12%',
                    bottom: '18%',
                    right: '22%',
                    background: 'linear-gradient(325deg, hsl(var(--primary) / 0.12), transparent)',
                    borderRadius: '50%',
                    filter: 'blur(2px)',
                  }}
                />

                {/* Text content — bright, crisp, and compelling */}
                <span
                  className="relative z-10 text-[11px] sm:text-sm text-primary font-medium text-center px-3 tracking-wide leading-tight select-none drop-shadow-[0_0_6px_hsl(var(--primary)/0.4)]"
                  style={{ maxWidth: bubble.size * 0.85 }}
                >
                  {bubbleMessages[bubble.contentIndex]}
                </span>
              </motion.div>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
};

export default AmbientBubbles;
