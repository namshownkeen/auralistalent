import { useCallback, useRef, useEffect, useState } from 'react';

interface UseAutoScrollOptions {
  enabled?: boolean;
  scrollDuration?: number;
  respectReducedMotion?: boolean;
}

export const useAutoScroll = (options: UseAutoScrollOptions = {}) => {
  const {
    enabled = true,
    scrollDuration = 1400,
    respectReducedMotion = true,
  } = options;

  const [isAutoScrolling, setIsAutoScrolling] = useState(false);
  const [userHasInteracted, setUserHasInteracted] = useState(false);
  const prefersReducedMotion = useRef(false);

  useEffect(() => {
    if (respectReducedMotion) {
      prefersReducedMotion.current = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    }
  }, [respectReducedMotion]);

  // Listen for user interaction to disable auto-scroll
  useEffect(() => {
    const handleInteraction = () => {
      if (!userHasInteracted) {
        setUserHasInteracted(true);
      }
    };

    // User scroll or touch immediately disables auto-guidance
    window.addEventListener('wheel', handleInteraction, { passive: true });
    window.addEventListener('touchstart', handleInteraction, { passive: true });
    window.addEventListener('keydown', handleInteraction, { passive: true });

    return () => {
      window.removeEventListener('wheel', handleInteraction);
      window.removeEventListener('touchstart', handleInteraction);
      window.removeEventListener('keydown', handleInteraction);
    };
  }, [userHasInteracted]);

  const scrollToElement = useCallback((elementId: string) => {
    // Don't auto-scroll on mobile or if user has interacted
    const isMobile = window.innerWidth < 768;
    if (!enabled || userHasInteracted || isMobile || prefersReducedMotion.current) {
      return;
    }

    const element = document.getElementById(elementId);
    if (!element) return;

    setIsAutoScrolling(true);

    const startPosition = window.scrollY;
    const targetPosition = element.getBoundingClientRect().top + window.scrollY;
    const distance = targetPosition - startPosition;
    const startTime = performance.now();

    const easeInOutCubic = (t: number): number => {
      return t < 0.5 
        ? 4 * t * t * t 
        : 1 - Math.pow(-2 * t + 2, 3) / 2;
    };

    const animateScroll = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / scrollDuration, 1);
      const easeProgress = easeInOutCubic(progress);
      
      window.scrollTo(0, startPosition + distance * easeProgress);

      if (progress < 1) {
        requestAnimationFrame(animateScroll);
      } else {
        setIsAutoScrolling(false);
      }
    };

    requestAnimationFrame(animateScroll);
  }, [enabled, userHasInteracted, scrollDuration]);

  return {
    scrollToElement,
    isAutoScrolling,
    userHasInteracted,
  };
};
