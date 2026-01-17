import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

interface ScrollCueProps {
  onScroll: () => void;
}

const ScrollCue = ({ onScroll }: ScrollCueProps) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1, delay: 2 }}
      className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 cursor-pointer"
      onClick={onScroll}
    >
      <div className="flex flex-col items-center gap-2 group">
        <motion.span
          className="text-sm text-muted-foreground/80 tracking-widest uppercase"
          whileHover={{ color: 'hsl(var(--primary))' }}
        >
          Scroll to explore
        </motion.span>
        
        <motion.div
          animate={{ 
            y: [0, 8, 0],
          }}
          transition={{ 
            duration: 2, 
            repeat: Infinity, 
            ease: 'easeInOut' 
          }}
          className="relative"
        >
          <ChevronDown className="w-6 h-6 text-primary/60 group-hover:text-primary transition-colors" />
          <motion.div
            className="absolute inset-0 bg-primary/20 rounded-full blur-md"
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.5, 0, 0.5],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        </motion.div>
      </div>
    </motion.div>
  );
};

export default ScrollCue;
