import { motion, AnimatePresence } from 'framer-motion';

interface IdeaBubblesProps {
  isVisible: boolean;
}

const bubbleContent = [
  { text: "Where companies meet talent", x: -15, y: -60, delay: 0 },
  { text: "Where talent meets opportunity", x: 18, y: -45, delay: 0.1 },
  { text: "One conversation, real alignment", x: -20, y: 55, delay: 0.2 },
  { text: "Trust built before the hire", x: 15, y: 65, delay: 0.15 },
  { text: "More than resumes. Real people.", x: 0, y: -80, delay: 0.25 },
];

const IdeaBubbles = ({ isVisible }: IdeaBubblesProps) => {
  return (
    <AnimatePresence>
      {isVisible && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-30">
          {bubbleContent.map((bubble, index) => (
            <motion.div
              key={index}
              initial={{ 
                opacity: 0, 
                y: 20,
                x: `${bubble.x}%`,
                scale: 0.8 
              }}
              animate={{ 
                opacity: 1, 
                y: bubble.y,
                x: `${bubble.x}%`,
                scale: 1 
              }}
              exit={{ 
                opacity: 0, 
                y: bubble.y - 20,
                scale: 0.9 
              }}
              transition={{ 
                duration: 0.5, 
                delay: bubble.delay,
                ease: [0.22, 1, 0.36, 1]
              }}
              className="absolute"
            >
              <motion.div
                animate={{ 
                  y: [0, -4, 0],
                }}
                transition={{
                  duration: 3 + index * 0.5,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
                className="bg-background/80 backdrop-blur-sm border border-primary/30 rounded-full px-4 py-2 shadow-lg shadow-primary/5"
              >
                <span className="text-sm text-primary/90 whitespace-nowrap font-light tracking-wide">
                  {bubble.text}
                </span>
              </motion.div>
            </motion.div>
          ))}
        </div>
      )}
    </AnimatePresence>
  );
};

export default IdeaBubbles;