import { motion } from 'framer-motion';

const Bridge = () => {
  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
      {/* Bridge structure */}
      <div className="relative w-full max-w-5xl mx-8">
        {/* Main bridge deck */}
        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
          className="relative h-[2px] bg-gradient-to-r from-transparent via-primary/60 to-transparent"
        >
          {/* Shimmer effect */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/40 to-transparent"
            animate={{
              x: ['-100%', '100%'],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: 'linear',
            }}
          />
        </motion.div>

        {/* Bridge supports - left */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="absolute left-[15%] top-1/2 -translate-y-1/2"
        >
          <div className="w-[1px] h-16 bg-gradient-to-b from-primary/40 to-transparent" />
          <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-primary/40" />
        </motion.div>

        {/* Bridge supports - right */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="absolute right-[15%] top-1/2 -translate-y-1/2"
        >
          <div className="w-[1px] h-16 bg-gradient-to-b from-primary/40 to-transparent" />
          <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-primary/40" />
        </motion.div>

        {/* Ambient glow under bridge */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2/3 h-32 bg-primary/5 blur-3xl -z-10" />

        {/* Company indicator - left */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="absolute left-0 top-1/2 -translate-y-1/2 flex items-center gap-3"
        >
          <div className="flex flex-col gap-1.5">
            <div className="w-8 h-1.5 bg-primary/20 rounded-full" />
            <div className="w-6 h-1.5 bg-primary/15 rounded-full" />
            <div className="w-4 h-1.5 bg-primary/10 rounded-full" />
          </div>
          <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground/50 hidden sm:block">
            Companies
          </span>
        </motion.div>

        {/* Talent indicator - right */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="absolute right-0 top-1/2 -translate-y-1/2 flex items-center gap-3"
        >
          <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground/50 hidden sm:block">
            Talent
          </span>
          <div className="flex flex-col gap-1.5 items-end">
            <div className="w-8 h-1.5 bg-primary/20 rounded-full" />
            <div className="w-6 h-1.5 bg-primary/15 rounded-full" />
            <div className="w-4 h-1.5 bg-primary/10 rounded-full" />
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Bridge;