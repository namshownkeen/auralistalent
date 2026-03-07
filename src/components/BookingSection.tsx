import { useState, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Clock, Check } from "lucide-react";

const TIME_SLOTS = [
  { id: 1, time: "7:00 AM", label: "Central Time" },
  { id: 2, time: "7:30 AM", label: "Central Time" },
  { id: 3, time: "8:00 AM", label: "Central Time" },
  { id: 4, time: "8:30 AM", label: "Central Time" },
  { id: 5, time: "9:00 AM", label: "Central Time" },
  { id: 6, time: "9:30 AM", label: "Central Time" },
];

const MAX_CHATS = 2;

const FounderCard = ({ remaining }: { remaining: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
    whileHover={{ rotateY: 2, rotateX: -1 }}
    className="relative rounded-2xl border border-border/40 bg-card p-8 md:p-10 overflow-hidden"
    style={{ transformStyle: "preserve-3d", perspective: 800 }}
  >
    {/* Ambient glow */}
    <div className="absolute -top-20 -right-20 w-60 h-60 bg-primary/8 rounded-full blur-3xl pointer-events-none" />
    <div className="absolute -bottom-16 -left-16 w-40 h-40 bg-primary/5 rounded-full blur-3xl pointer-events-none" />

    <motion.div
      animate={{ y: [0, -4, 0] }}
      transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
    >
      <span className="text-xs font-medium tracking-widest uppercase text-primary/70 mb-6 block">
        Founder Conversation
      </span>

      <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-3 font-display">
        Talk with Alek
      </h2>

      <p className="text-muted-foreground text-lg leading-relaxed mb-6">
        Discover where your talent can create the most impact.
      </p>

      <p className="text-muted-foreground/80 text-base leading-relaxed mb-8">
        Alek, founder of Auralis Talent Xplore, spends a few minutes each morning
        connecting with exceptional people exploring their next chapter. These short
        conversations are designed to help you identify opportunities where your
        strengths can truly compound.
      </p>

      {/* Founder label */}
      <div className="mb-8">
        <div className="relative inline-block">
          <p className="text-foreground font-semibold text-lg">Alek</p>
          {/* Glowing accent line */}
          <motion.div
            className="h-[2px] bg-gradient-to-r from-primary via-primary-glow to-transparent rounded-full mt-1"
            initial={{ width: 0 }}
            whileInView={{ width: "100%" }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.5 }}
          />
        </div>
        <p className="text-muted-foreground text-sm mt-1">
          Founder, Auralis Talent Xplore
        </p>
      </div>

      {/* Remaining chats signal */}
      <motion.div
        className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-secondary/60 border border-border/30 w-fit"
        animate={{ opacity: [0.85, 1, 0.85] }}
        transition={{ duration: 3, repeat: Infinity }}
      >
        <div className="w-2 h-2 rounded-full bg-primary animate-pulse-soft" />
        <span className="text-sm text-muted-foreground">
          Today's founder chats remaining:{" "}
          <span className="text-primary font-semibold">{remaining}</span>
        </span>
      </motion.div>
    </motion.div>
  </motion.div>
);

const SlotPill = ({
  slot,
  isSelected,
  onSelect,
  index,
}: {
  slot: (typeof TIME_SLOTS)[0];
  isSelected: boolean;
  onSelect: () => void;
  index: number;
}) => (
  <motion.button
    layout
    onClick={onSelect}
    whileHover={{ y: -4, scale: 1.02 }}
    whileTap={{ scale: 0.97 }}
    className={`relative flex-shrink-0 w-[140px] sm:w-[160px] rounded-xl border p-5 transition-colors duration-300 overflow-hidden ${
      isSelected
        ? "bg-primary border-primary text-primary-foreground shadow-glow"
        : "bg-card border-border/40 text-foreground hover:border-primary/40"
    }`}
  >
    {/* Ripple on selection */}
    <AnimatePresence>
      {isSelected && (
        <motion.div
          initial={{ scale: 0, opacity: 0.6 }}
          animate={{ scale: 3, opacity: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6 }}
          className="absolute inset-0 m-auto w-8 h-8 bg-primary-foreground/20 rounded-full"
        />
      )}
    </AnimatePresence>

    <div className="relative z-10 flex flex-col items-center gap-2">
      <Clock className={`w-4 h-4 ${isSelected ? "text-primary-foreground" : "text-primary/60"}`} />
      <span className="text-lg font-semibold">{slot.time}</span>
      <span className={`text-xs ${isSelected ? "text-primary-foreground/70" : "text-muted-foreground"}`}>
        {slot.label}
      </span>
    </div>

    {/* Subtle glow on hover */}
    {!isSelected && (
      <div className="absolute inset-0 rounded-xl opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none bg-primary/5" />
    )}
  </motion.button>
);

const TimeSlotCarousel = ({
  selectedSlot,
  onSelect,
  booked,
  onConfirm,
}: {
  selectedSlot: number | null;
  onSelect: (id: number) => void;
  booked: boolean;
  onConfirm: () => void;
}) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = useCallback((dir: "left" | "right") => {
    if (!scrollRef.current) return;
    const amount = 180;
    scrollRef.current.scrollBy({
      left: dir === "left" ? -amount : amount,
      behavior: "smooth",
    });
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
      className="flex flex-col"
    >
      <h3 className="text-xl font-semibold text-foreground mb-6 font-display">
        Available Founder Slots
      </h3>

      <div className="relative">
        {/* Arrows */}
        <button
          onClick={() => scroll("left")}
          className="absolute -left-3 top-1/2 -translate-y-1/2 z-10 w-8 h-8 rounded-full bg-secondary border border-border/40 flex items-center justify-center text-muted-foreground hover:text-primary transition-colors"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>
        <button
          onClick={() => scroll("right")}
          className="absolute -right-3 top-1/2 -translate-y-1/2 z-10 w-8 h-8 rounded-full bg-secondary border border-border/40 flex items-center justify-center text-muted-foreground hover:text-primary transition-colors"
        >
          <ChevronRight className="w-4 h-4" />
        </button>

        {/* Scroll container */}
        <div
          ref={scrollRef}
          className="flex gap-4 overflow-x-auto scrollbar-hide px-6 py-2 snap-x snap-mandatory"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {TIME_SLOTS.map((slot, i) => (
            <SlotPill
              key={slot.id}
              slot={slot}
              isSelected={selectedSlot === slot.id}
              onSelect={() => onSelect(slot.id)}
              index={i}
            />
          ))}
        </div>

        {/* Fade edges */}
        <div className="absolute top-0 left-0 w-6 h-full bg-gradient-to-r from-background to-transparent pointer-events-none z-[5]" />
        <div className="absolute top-0 right-0 w-6 h-full bg-gradient-to-l from-background to-transparent pointer-events-none z-[5]" />
      </div>

      {/* Confirmation bar */}
      <AnimatePresence>
        {selectedSlot && !booked && (
          <motion.div
            initial={{ opacity: 0, y: 10, height: 0 }}
            animate={{ opacity: 1, y: 0, height: "auto" }}
            exit={{ opacity: 0, y: 10, height: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="mt-6"
          >
            <div className="flex items-center justify-between p-4 rounded-xl bg-secondary/60 border border-border/30">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-primary" />
                <span className="text-sm text-muted-foreground">
                  Selected:{" "}
                  <span className="text-foreground font-medium">
                    {TIME_SLOTS.find((s) => s.id === selectedSlot)?.time} CT
                  </span>
                </span>
              </div>
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={onConfirm}
                className="px-5 py-2 bg-primary text-primary-foreground text-sm font-medium rounded-lg shadow-glow hover:brightness-110 transition-all"
              >
                Confirm
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Booked confirmation */}
      <AnimatePresence>
        {booked && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="mt-6 flex items-center gap-3 p-4 rounded-xl bg-primary/10 border border-primary/20"
          >
            <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
              <Check className="w-4 h-4 text-primary" />
            </div>
            <div>
              <p className="text-foreground font-medium text-sm">Slot reserved</p>
              <p className="text-muted-foreground text-xs">
                You'll receive a calendar invite shortly.
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const BookingSection = () => {
  const [selectedSlot, setSelectedSlot] = useState<number | null>(null);
  const [booked, setBooked] = useState(false);
  const [remaining, setRemaining] = useState(MAX_CHATS);

  const handleConfirm = useCallback(() => {
    if (!selectedSlot || booked) return;
    setBooked(true);
    setRemaining((r) => Math.max(0, r - 1));
  }, [selectedSlot, booked]);

  return (
    <section id="booking" className="py-20 md:py-28 bg-background relative overflow-hidden">
      {/* Background texture */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 left-1/4 w-80 h-80 bg-primary/3 rounded-full blur-[100px]" />
        <div className="absolute bottom-1/4 right-1/3 w-60 h-60 bg-primary/4 rounded-full blur-[80px]" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* Left — Founder card */}
          <FounderCard remaining={remaining} />

          {/* Right — Time slots */}
          <div className="flex flex-col justify-center">
            <TimeSlotCarousel
              selectedSlot={selectedSlot}
              onSelect={(id) => {
                if (!booked) {
                  setSelectedSlot(id);
                }
              }}
              booked={booked}
            />

            {/* Confirm handler wired to confirmation bar button */}
            {selectedSlot && !booked && (
              <div className="mt-0">
                {/* The confirm button is inside TimeSlotCarousel; 
                    we wire it via a click handler on the section level */}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default BookingSection;
