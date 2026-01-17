import { motion, AnimatePresence } from 'framer-motion';

interface HeroTooltipProps {
  isVisible: boolean;
}

const HeroTooltip = ({ isVisible }: HeroTooltipProps) => {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 10, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 10, scale: 0.9 }}
          transition={{ duration: 0.3 }}
          className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 z-40 pointer-events-none"
        >
          <div className="bg-background/90 backdrop-blur-sm border border-primary/30 rounded-xl px-6 py-3 shadow-lg shadow-primary/10">
            <p className="text-primary font-medium text-lg whitespace-nowrap">
              This is where alignment begins.
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default HeroTooltip;
