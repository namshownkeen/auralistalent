import { motion } from "framer-motion";
import { useInView } from "@/hooks/useInView";

interface ImpactBubbleProps {
  text: string;
  delay?: number;
  position?: "left" | "right" | "center";
  size?: "sm" | "md" | "lg";
}

const ImpactBubble = ({ text, delay = 0, position = "left", size = "md" }: ImpactBubbleProps) => {
  const { ref, isInView } = useInView(0.3);

  const positionClasses = {
    left: "self-start",
    right: "self-end",
    center: "self-center",
  };

  const sizeClasses = {
    sm: "text-xs px-3 py-1.5",
    md: "text-sm px-4 py-2",
    lg: "text-base px-5 py-2.5",
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.8, y: 10 }}
      animate={isInView ? { opacity: 1, scale: 1, y: 0 } : { opacity: 0, scale: 0.8, y: 10 }}
      transition={{ 
        duration: 0.5, 
        delay: delay,
        ease: [0.21, 0.47, 0.32, 0.98]
      }}
      whileHover={{ scale: 1.05, y: -2 }}
      className={`
        ${positionClasses[position]}
        ${sizeClasses[size]}
        inline-block rounded-full
        bg-card/80 backdrop-blur-sm
        border border-primary/30
        text-foreground/90
        shadow-sm
        cursor-default
        transition-all duration-300
        hover:border-primary/60
        hover:shadow-[0_0_20px_hsl(168_100%_37%/0.25)]
        hover:bg-card
      `}
    >
      <span className="font-medium italic">{text}</span>
    </motion.div>
  );
};

export default ImpactBubble;
