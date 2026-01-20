import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';

interface IdeaBubblesProps {
  isVisible: boolean;
}

const bubbleContent = [
  "Where companies meet talent",
  "Alignment before hiring",
  "One conversation, real fit",
  "Trust across the bridge",
  "People over resumes",
];

// Calculate radial positions with proper spacing
const calculateBubblePositions = (count: number, isMobile: boolean) => {
  const arcStart = -65;
  const arcEnd = 65;
  const arcRange = arcEnd - arcStart;
  
  // Responsive radius: clamp(120px, 18vw, 220px)
  const baseRadius = isMobile ? 100 : 160;
  
  return Array.from({ length: count }, (_, i) => {
    // Angular distribution with slight random offset
    const angleStep = arcRange / (count - 1 || 1);
    const randomOffset = (Math.random() - 0.5) * 12; // ±6°
    const angle = arcStart + angleStep * i + randomOffset;
    const radians = (angle * Math.PI) / 180;
    
    // Calculate position
    const x = Math.sin(radians) * baseRadius;
    const y = -Math.cos(radians) * baseRadius * 0.6; // Flatten vertically
    
    // Add slight Y variation for organic feel
    const yOffset = (Math.random() - 0.5) * 24; // ±12px
    
    return {
      x,
      y: y + yOffset,
      delay: 0.12 + i * 0.09, // Staggered: 120ms first, 90ms apart
      duration: 7 + Math.random() * 3, // 7-10s float duration
      driftX: (Math.random() - 0.5) * 8, // ±4px horizontal
      driftY: 6 + Math.random() * 4, // 6-10px vertical
    };
  });
};

const IdeaBubbles = ({ isVisible }: IdeaBubblesProps) => {
  const [isMobile, setIsMobile] = useState(false);
  const [positions, setPositions] = useState<ReturnType<typeof calculateBubblePositions>>([]);
  
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  
  useEffect(() => {
    if (isVisible) {
      const count = isMobile ? 4 : 5;
      setPositions(calculateBubblePositions(count, isMobile));
    }
  }, [isVisible, isMobile]);

  const bubblesToShow = isMobile ? bubbleContent.slice(0, 4) : bubbleContent;

  return (
    <AnimatePresence>
      {isVisible && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-30">
          {bubblesToShow.map((text, index) => {
            const pos = positions[index];
            if (!pos) return null;
            
            return (
              <motion.div
                key={index}
                initial={{ 
                  opacity: 0, 
                  scale: 0.9,
                  x: pos.x,
                  y: pos.y + 6,
                }}
                animate={{ 
                  opacity: 1, 
                  scale: 1,
                  x: pos.x,
                  y: pos.y,
                }}
                exit={{ 
                  opacity: 0, 
                  y: pos.y - 4,
                }}
                transition={{ 
                  duration: 0.28,
                  delay: pos.delay,
                  ease: [0.22, 1, 0.36, 1]
                }}
                className="absolute"
              >
                {/* Floating animation wrapper */}
                <motion.div
                  animate={{ 
                    y: [0, -pos.driftY, 0],
                    x: [0, pos.driftX, 0],
                  }}
                  transition={{
                    duration: pos.duration,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                >
                  {/* Bubble with water-like styling */}
                  <div 
                    className="relative rounded-full px-5 py-2.5 md:px-6 md:py-3"
                    style={{
                      background: 'linear-gradient(135deg, hsl(var(--background) / 0.85), hsl(var(--background) / 0.75))',
                      backdropFilter: 'blur(8px)',
                      boxShadow: `
                        0 0 20px hsl(var(--primary) / 0.1),
                        inset 0 1px 1px hsl(var(--primary) / 0.1),
                        0 4px 16px hsl(var(--background) / 0.4)
                      `,
                      border: '1px solid hsl(var(--primary) / 0.3)',
                    }}
                  >
                    {/* Inner glass highlight */}
                    <div 
                      className="absolute inset-0 rounded-full pointer-events-none"
                      style={{
                        background: 'linear-gradient(to bottom, hsl(var(--primary) / 0.08) 0%, transparent 50%)',
                      }}
                    />
                    
                    {/* Text */}
                    <span className="relative text-xs md:text-sm text-primary/90 whitespace-nowrap font-light tracking-wide">
                      {text}
                    </span>
                  </div>
                </motion.div>
              </motion.div>
            );
          })}
        </div>
      )}
    </AnimatePresence>
  );
};

export default IdeaBubbles;