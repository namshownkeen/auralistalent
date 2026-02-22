import { useState, useCallback } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Bridge from './hero/Bridge';
import AmbientBubbles from './hero/AmbientBubbles';
import { ChevronDown } from 'lucide-react';

const Hero = () => {
  const { scrollY } = useScroll();
  
  const opacity = useTransform(scrollY, [0, 400], [1, 0]);
  const scale = useTransform(scrollY, [0, 400], [1, 0.85]);
  const y = useTransform(scrollY, [0, 400], [0, 80]);

  const scrollToNext = () => {
    const element = document.getElementById('founder');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <motion.section 
      style={{ opacity, scale, y }}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background"
    >
      {/* Subtle ambient background */}
      <div className="absolute inset-0 bg-gradient-radial from-primary/3 via-transparent to-transparent" />
      
      {/* The Bridge */}
      <Bridge isHovered={false} />
      
      {/* Center-stage storytelling bubbles */}
      <AmbientBubbles />
      
      {/* Central Title */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.3 }}
        className="relative z-20 text-center cursor-default"
      >
        <motion.h1
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light text-primary tracking-tight"
        >
          Auralis Talent Xplore
        </motion.h1>
        
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
          className="mt-6 text-sm md:text-base text-muted-foreground/60 font-light tracking-wide"
        >
          Connecting people, not just roles.
        </motion.p>
      </motion.div>
      
      {/* Scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 2.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 cursor-pointer"
        onClick={scrollToNext}
      >
        <div className="flex flex-col items-center gap-3 group">
          <span className="text-xs text-muted-foreground/50 tracking-[0.2em] uppercase group-hover:text-muted-foreground/70 transition-colors">
            Scroll to cross the bridge
          </span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          >
            <ChevronDown className="w-5 h-5 text-primary/40 group-hover:text-primary/60 transition-colors" />
          </motion.div>
        </div>
      </motion.div>
      
      {/* Vignette */}
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-background via-transparent to-background/30 z-10" />
    </motion.section>
  );
};

export default Hero;
