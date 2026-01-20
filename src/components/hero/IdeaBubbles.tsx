import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState, useRef } from 'react';

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

// Predefined positions for single bubble display - varied positions around bridge
const bubblePositions = [
  { x: -120, y: -80 },  // top-left
  { x: 130, y: -70 },   // top-right
  { x: -140, y: 60 },   // bottom-left
  { x: 110, y: 75 },    // bottom-right
  { x: 0, y: -95 },     // top-center
];

const IdeaBubbles = ({ isVisible }: IdeaBubblesProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  
  // Cycle through bubbles one at a time
  useEffect(() => {
    if (isVisible) {
      // Reset to first bubble when hover starts
      setCurrentIndex(0);
      
      // Cycle through bubbles every 2.5 seconds
      intervalRef.current = setInterval(() => {
        setCurrentIndex(prev => (prev + 1) % bubbleContent.length);
      }, 2500);
    } else {
      // Clear interval when hover ends
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    }
    
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isVisible]);

  const currentPosition = bubblePositions[currentIndex];
  const mobileScale = isMobile ? 0.7 : 1;

  return (
    <AnimatePresence mode="wait">
      {isVisible && (
        <motion.div
          key={currentIndex}
          initial={{ 
            opacity: 0, 
            scale: 0.9,
            x: currentPosition.x * mobileScale,
            y: currentPosition.y * mobileScale + 8,
          }}
          animate={{ 
            opacity: 1, 
            scale: 1,
            x: currentPosition.x * mobileScale,
            y: currentPosition.y * mobileScale,
          }}
          exit={{ 
            opacity: 0, 
            scale: 0.95,
            y: currentPosition.y * mobileScale - 10,
          }}
          transition={{ 
            duration: 0.4,
            ease: [0.22, 1, 0.36, 1]
          }}
          className="absolute z-30 pointer-events-none"
          style={{
            left: '50%',
            top: '50%',
            transform: 'translate(-50%, -50%)',
          }}
        >
          {/* Gentle floating motion */}
          <motion.div
            animate={{ 
              y: [0, -6, 0],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          >
            {/* Bubble with water-like styling */}
            <div 
              className="relative rounded-full px-6 py-3"
              style={{
                background: 'linear-gradient(135deg, hsl(var(--background) / 0.9), hsl(var(--background) / 0.8))',
                backdropFilter: 'blur(12px)',
                boxShadow: `
                  0 0 30px hsl(var(--primary) / 0.15),
                  inset 0 1px 2px hsl(var(--primary) / 0.1),
                  0 8px 32px hsl(var(--background) / 0.5)
                `,
                border: '1px solid hsl(var(--primary) / 0.35)',
              }}
            >
              {/* Inner glass highlight */}
              <div 
                className="absolute inset-0 rounded-full pointer-events-none overflow-hidden"
                style={{
                  background: 'linear-gradient(to bottom, hsl(var(--primary) / 0.1) 0%, transparent 40%)',
                }}
              />
              
              {/* Text */}
              <span className="relative text-sm md:text-base text-primary whitespace-nowrap font-light tracking-wide">
                {bubbleContent[currentIndex]}
              </span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default IdeaBubbles;
