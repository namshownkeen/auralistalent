import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState, useRef, useCallback } from 'react';

const bubbleContent = [
  "Where companies meet talent",
  "Alignment before hiring",
  "One conversation, real fit",
  "Trust across the bridge",
  "People over resumes",
];

interface FloatingBubble {
  id: number;
  x: number;
  y: number;
  size: number;
  driftX: number;
  driftY: number;
  duration: number;
  delay: number;
  contentIndex: number;
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
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    const size = isMobile ? 44 + Math.random() * 16 : 56 + Math.random() * 32;

    const newBubble: FloatingBubble = {
      id: idRef.current++,
      x: 60 + Math.random() * (vw - 120),
      y: vh + size, // start below viewport
      size,
      driftX: (Math.random() - 0.5) * 80,
      driftY: -(vh + size + 60 + Math.random() * 100), // float all the way up and out
      duration: 12 + Math.random() * 8, // 12-20s journey
      delay: 0,
      contentIndex: contentRef.current,
      shimmerAngle: Math.random() * 360,
    };

    contentRef.current = (contentRef.current + 1) % bubbleContent.length;

    setBubbles(prev => {
      const max = isMobile ? 4 : 6;
      return [...prev, newBubble].slice(-max);
    });

    // Remove after journey completes
    setTimeout(() => {
      setBubbles(prev => prev.filter(b => b.id !== newBubble.id));
    }, newBubble.duration * 1000);
  }, [isMobile]);

  useEffect(() => {
    // Check reduced motion preference
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    // Spawn initial bubbles staggered
    const initialTimers = Array.from({ length: isMobile ? 2 : 3 }, (_, i) =>
      setTimeout(() => spawnBubble(), i * 1200)
    );

    // Continue spawning
    intervalRef.current = setInterval(spawnBubble, isMobile ? 4500 : 3500);

    return () => {
      initialTimers.forEach(clearTimeout);
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [spawnBubble, isMobile]);

  return (
    <div className="absolute inset-0 z-10 pointer-events-none overflow-hidden">
      <AnimatePresence>
        {bubbles.map((bubble) => (
          <motion.div
            key={bubble.id}
            initial={{
              opacity: 0,
              scale: 0.3,
              x: bubble.x,
              y: bubble.y,
            }}
            animate={{
              opacity: [0, 0.7, 0.7, 0],
              scale: [0.3, 1, 1.05, 0.9],
              x: bubble.x + bubble.driftX,
              y: bubble.y + bubble.driftY,
            }}
            transition={{
              duration: bubble.duration,
              ease: 'easeInOut',
              opacity: {
                duration: bubble.duration,
                times: [0, 0.08, 0.85, 1],
                ease: 'easeInOut',
              },
              scale: {
                duration: bubble.duration,
                times: [0, 0.1, 0.8, 1],
                ease: 'easeInOut',
              },
            }}
            className="absolute pointer-events-auto cursor-default group"
          >
            {/* Outer iridescent ring */}
            <div
              className="relative rounded-full flex items-center justify-center"
              style={{
                width: bubble.size,
                height: bubble.size,
                background: `
                  radial-gradient(circle at 30% 30%, 
                    hsl(var(--primary) / 0.12) 0%, 
                    hsl(var(--primary) / 0.04) 40%, 
                    transparent 70%
                  )
                `,
                border: '1px solid hsl(var(--primary) / 0.2)',
                boxShadow: `
                  0 0 20px hsl(var(--primary) / 0.08),
                  inset 0 0 15px hsl(var(--primary) / 0.05),
                  0 0 40px hsl(var(--primary) / 0.04)
                `,
              }}
            >
              {/* Shimmer highlight - the light reflection on a soap bubble */}
              <div
                className="absolute rounded-full pointer-events-none"
                style={{
                  width: '40%',
                  height: '25%',
                  top: '15%',
                  left: '20%',
                  background: 'linear-gradient(135deg, hsl(var(--primary) / 0.2), transparent)',
                  borderRadius: '50%',
                  filter: 'blur(2px)',
                  transform: `rotate(${bubble.shimmerAngle}deg)`,
                }}
              />

              {/* Content revealed on hover */}
              <motion.span
                className="text-[10px] md:text-xs text-primary/0 group-hover:text-primary/90 transition-colors duration-500 text-center px-2 font-light tracking-wide whitespace-nowrap select-none"
                style={{ maxWidth: bubble.size * 2.5 }}
              >
                {bubbleContent[bubble.contentIndex]}
              </motion.span>
            </div>

            {/* Hover glow ring */}
            <div
              className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
              style={{
                boxShadow: `
                  0 0 24px hsl(var(--primary) / 0.25),
                  inset 0 0 12px hsl(var(--primary) / 0.1)
                `,
              }}
            />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default AmbientBubbles;
