import { motion } from 'framer-motion';
import { ReactNode, useEffect, useState } from 'react';

interface SectionHighlightProps {
  children: ReactNode;
  id: string;
  className?: string;
}

const SectionHighlight = ({ children, id, className = '' }: SectionHighlightProps) => {
  const [isInView, setIsInView] = useState(false);
  const [hasBeenViewed, setHasBeenViewed] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        const inView = entry.isIntersecting && entry.intersectionRatio > 0.3;
        setIsInView(inView);
        if (inView && !hasBeenViewed) {
          setHasBeenViewed(true);
        }
      },
      { 
        threshold: [0.3, 0.5],
        rootMargin: '-10% 0px -10% 0px'
      }
    );

    const element = document.getElementById(id);
    if (element) {
      observer.observe(element);
    }

    return () => observer.disconnect();
  }, [id, hasBeenViewed]);

  // Check for reduced motion preference
  const prefersReducedMotion = typeof window !== 'undefined' 
    ? window.matchMedia('(prefers-reduced-motion: reduce)').matches 
    : false;

  if (prefersReducedMotion) {
    return (
      <section id={id} className={className}>
        {children}
      </section>
    );
  }

  return (
    <motion.section
      id={id}
      className={className}
      initial={{ opacity: 0.85, scale: 0.98 }}
      animate={{ 
        opacity: isInView ? 1 : hasBeenViewed ? 0.95 : 0.85,
        scale: isInView ? 1 : 0.98,
      }}
      transition={{ 
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1]
      }}
      style={{
        willChange: 'transform, opacity',
      }}
    >
      {/* Teal accent highlight when in view */}
      <motion.div
        className="absolute inset-0 pointer-events-none rounded-lg"
        initial={{ opacity: 0 }}
        animate={{ 
          opacity: isInView ? 1 : 0,
        }}
        transition={{ duration: 0.4 }}
        style={{
          boxShadow: isInView 
            ? 'inset 0 0 0 1px hsl(var(--primary) / 0.08), 0 0 60px hsl(var(--primary) / 0.03)' 
            : 'none',
        }}
      />
      {children}
    </motion.section>
  );
};

export default SectionHighlight;
