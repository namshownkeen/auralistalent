import { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import RecruiterScene from './hero/RecruiterScene';
import SlidingMotto from './hero/SlidingMotto';
import ScrollCue from './hero/ScrollCue';
import HeroTooltip from './hero/HeroTooltip';

const Hero = () => {
  const [showTooltip, setShowTooltip] = useState(false);
  const { scrollY } = useScroll();
  
  // Transform values for scroll-based animations
  const opacity = useTransform(scrollY, [0, 400], [1, 0]);
  const scale = useTransform(scrollY, [0, 400], [1, 0.9]);
  const y = useTransform(scrollY, [0, 400], [0, 100]);

  const scrollToFounder = () => {
    const element = document.getElementById('founder');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Tooltip appears periodically when user hovers in center area
  useEffect(() => {
    const interval = setInterval(() => {
      setShowTooltip(true);
      setTimeout(() => setShowTooltip(false), 3000);
    }, 12000);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.section 
      style={{ opacity, scale, y }}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background"
    >
      {/* Ambient background effects */}
      <div className="absolute inset-0 bg-gradient-radial from-primary/5 via-transparent to-transparent" />
      
      {/* Subtle grid pattern */}
      <div 
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `
            linear-gradient(to right, hsl(var(--primary)) 1px, transparent 1px),
            linear-gradient(to bottom, hsl(var(--primary)) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
        }}
      />
      
      {/* 3D Scene */}
      <RecruiterScene />
      
      {/* Side labels */}
      <motion.div
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1, delay: 1.5 }}
        className="absolute left-4 md:left-12 top-1/2 -translate-y-1/2 z-20"
      >
        <div className="flex flex-col items-start gap-2">
          <span className="text-xs md:text-sm uppercase tracking-widest text-primary/60 font-medium">
            Companies
          </span>
          <div className="w-8 md:w-12 h-px bg-gradient-to-r from-primary/60 to-transparent" />
        </div>
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0, x: 30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1, delay: 1.5 }}
        className="absolute right-4 md:right-12 top-1/2 -translate-y-1/2 z-20"
      >
        <div className="flex flex-col items-end gap-2">
          <span className="text-xs md:text-sm uppercase tracking-widest text-primary/60 font-medium">
            Candidates
          </span>
          <div className="w-8 md:w-12 h-px bg-gradient-to-l from-primary/60 to-transparent" />
        </div>
      </motion.div>
      
      {/* Central focus indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5, delay: 2 }}
        className="absolute top-1/4 left-1/2 -translate-x-1/2 z-20 text-center"
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
      >
        <span className="text-xs md:text-sm uppercase tracking-[0.3em] text-primary/40 font-light">
          The Bridge
        </span>
      </motion.div>
      
      {/* Tooltip on hover */}
      <HeroTooltip isVisible={showTooltip} />
      
      {/* Sliding Motto */}
      <SlidingMotto />
      
      {/* Scroll cue */}
      <ScrollCue onScroll={scrollToFounder} />
      
      {/* Vignette effect */}
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-background via-transparent to-background/50 z-10" />
    </motion.section>
  );
};

export default Hero;
