import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState, useRef, useCallback } from 'react';

interface IdeaBubblesProps {
  isVisible: boolean;
  onCycleComplete?: () => void;
}

const bubbleContent = [
  "Where companies meet talent",
  "Alignment before hiring",
  "One conversation, real fit",
  "Trust across the bridge",
  "People over resumes",
];

// Predefined positions for bubbles - distributed around the bridge
const bubblePositions = [
  { x: -130, y: -75 },  // top-left
  { x: 120, y: -65 },   // top-right
  { x: -145, y: 55 },   // bottom-left
  { x: 105, y: 70 },    // bottom-right
  { x: 0, y: -90 },     // top-center
];

interface BubbleData {
  id: number;
  contentIndex: number;
  positionIndex: number;
  driftX: number;
  driftY: number;
}

const IdeaBubbles = ({ isVisible, onCycleComplete }: IdeaBubblesProps) => {
  const [activeBubbles, setActiveBubbles] = useState<BubbleData[]>([]);
  const [isMobile, setIsMobile] = useState(false);
  const bubbleIdRef = useRef(0);
  const contentIndexRef = useRef(0);
  const positionIndexRef = useRef(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const cycleCountRef = useRef(0);
  const hasFiredCycleComplete = useRef(false);
  
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const addBubble = useCallback(() => {
    const newBubble: BubbleData = {
      id: bubbleIdRef.current++,
      contentIndex: contentIndexRef.current,
      positionIndex: positionIndexRef.current,
      driftX: (Math.random() - 0.5) * 4,
      driftY: 6 + Math.random() * 2,
    };
    
    contentIndexRef.current = (contentIndexRef.current + 1) % bubbleContent.length;
    positionIndexRef.current = (positionIndexRef.current + 1) % bubblePositions.length;
    
    // Track cycle completion
    if (contentIndexRef.current === 0) {
      cycleCountRef.current++;
      if (cycleCountRef.current === 1 && !hasFiredCycleComplete.current) {
        hasFiredCycleComplete.current = true;
        // Delay to let last bubble appear before triggering scroll
        setTimeout(() => {
          onCycleComplete?.();
        }, 1800);
      }
    }
    
    setActiveBubbles(prev => {
      // Keep max 2-3 bubbles visible
      const maxBubbles = isMobile ? 2 : 3;
      const newBubbles = [...prev, newBubble];
      return newBubbles.slice(-maxBubbles);
    });
    
    // Remove bubble after 1.5s visibility
    setTimeout(() => {
      setActiveBubbles(prev => prev.filter(b => b.id !== newBubble.id));
    }, 1500);
  }, [isMobile, onCycleComplete]);

  useEffect(() => {
    if (isVisible) {
      // Reset state
      contentIndexRef.current = 0;
      positionIndexRef.current = 0;
      cycleCountRef.current = 0;
      hasFiredCycleComplete.current = false;
      setActiveBubbles([]);
      
      // Add first bubble immediately
      addBubble();
      
      // Add new bubble every 1 second
      intervalRef.current = setInterval(addBubble, 1000);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      setActiveBubbles([]);
    }
    
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isVisible, addBubble]);

  const mobileScale = isMobile ? 0.65 : 1;

  return (
    <div className="absolute inset-0 z-30 pointer-events-none flex items-center justify-center">
      <AnimatePresence>
        {activeBubbles.map((bubble) => {
          const position = bubblePositions[bubble.positionIndex];
          
          return (
            <motion.div
              key={bubble.id}
              initial={{ 
                opacity: 0, 
                scale: 0.9,
                x: position.x * mobileScale,
                y: position.y * mobileScale,
              }}
              animate={{ 
                opacity: 1, 
                scale: 1,
                x: position.x * mobileScale + bubble.driftX,
                y: position.y * mobileScale - bubble.driftY,
              }}
              exit={{ 
                opacity: 0, 
                scale: 0.95,
                y: position.y * mobileScale - bubble.driftY - 8,
                transition: { duration: 0.18, ease: 'easeIn' }
              }}
              transition={{ 
                opacity: { duration: 0.22, ease: 'easeOut' },
                scale: { duration: 0.22, ease: 'easeOut' },
                x: { duration: 1.5, ease: 'easeInOut' },
                y: { duration: 1.5, ease: 'easeInOut' },
              }}
              className="absolute"
            >
              {/* Bubble with water-like styling */}
              <div 
                className="relative rounded-full px-5 py-2.5"
                style={{
                  background: 'linear-gradient(135deg, hsl(var(--background) / 0.9), hsl(var(--background) / 0.8))',
                  backdropFilter: 'blur(12px)',
                  boxShadow: `
                    0 0 25px hsl(var(--primary) / 0.12),
                    inset 0 1px 2px hsl(var(--primary) / 0.08),
                    0 6px 24px hsl(var(--background) / 0.4)
                  `,
                  border: '1px solid hsl(var(--primary) / 0.3)',
                }}
              >
                {/* Inner glass highlight */}
                <div 
                  className="absolute inset-0 rounded-full pointer-events-none overflow-hidden"
                  style={{
                    background: 'linear-gradient(to bottom, hsl(var(--primary) / 0.08) 0%, transparent 40%)',
                  }}
                />
                
                {/* Text */}
                <span className="relative text-sm md:text-base text-primary whitespace-nowrap font-light tracking-wide">
                  {bubbleContent[bubble.contentIndex]}
                </span>
              </div>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
};

export default IdeaBubbles;
