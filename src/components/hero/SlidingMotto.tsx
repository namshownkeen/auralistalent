import { motion } from 'framer-motion';

const mottos = [
  "Hiring, made human.",
  "Where talent meets trust.",
  "One conversation. The right fit.",
  "We don't place people. We align futures.",
];

const SlidingMotto = () => {
  return (
    <div className="absolute bottom-32 left-0 right-0 overflow-hidden pointer-events-none z-20">
      {/* Primary sliding text - left to right */}
      <motion.div
        className="whitespace-nowrap"
        animate={{
          x: ['-100%', '100%'],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: 'linear',
        }}
      >
        <span className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary/90 tracking-wide">
          {mottos.map((motto, i) => (
            <span key={i} className="mx-16">
              {motto}
            </span>
          ))}
        </span>
      </motion.div>
      
      {/* Secondary sliding text - right to left (offset) */}
      <motion.div
        className="whitespace-nowrap mt-4 opacity-40"
        animate={{
          x: ['100%', '-100%'],
        }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: 'linear',
        }}
      >
        <span className="text-2xl md:text-3xl lg:text-4xl font-medium text-primary/60 tracking-wider">
          {mottos.map((motto, i) => (
            <span key={i} className="mx-12">
              {motto}
            </span>
          ))}
        </span>
      </motion.div>
    </div>
  );
};

export default SlidingMotto;
