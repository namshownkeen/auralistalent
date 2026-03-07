import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Clock, Check, Phone, Mail, User, Building2 } from "lucide-react";
import { Input } from "@/components/ui/input";

type BookingType = "personal" | "company";
type ContactPref = "phone" | "email";
type BookingStep = "select" | "form" | "confirmed";

const SLOTS = [
  { id: 1, time: "7:30 AM", label: "Central Time" },
  { id: 2, time: "8:00 AM", label: "Central Time" },
];

const ToggleGroup = ({
  options,
  value,
  onChange,
}: {
  options: { value: string; label: string; icon: React.ReactNode }[];
  value: string;
  onChange: (v: string) => void;
}) => (
  <div className="flex rounded-xl border border-border/40 overflow-hidden">
    {options.map((opt) => (
      <button
        key={opt.value}
        type="button"
        onClick={() => onChange(opt.value)}
        className={`flex-1 flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-medium transition-all duration-300 ${
          value === opt.value
            ? "bg-primary text-primary-foreground"
            : "bg-card text-muted-foreground hover:text-foreground"
        }`}
      >
        {opt.icon}
        {opt.label}
      </button>
    ))}
  </div>
);

const SlotCard = ({
  slot,
  isSelected,
  isLocked,
  onSelect,
}: {
  slot: (typeof SLOTS)[0];
  isSelected: boolean;
  isLocked: boolean;
  onSelect: () => void;
}) => (
  <motion.button
    onClick={onSelect}
    disabled={isLocked && !isSelected}
    whileHover={!isLocked ? { y: -6, scale: 1.02 } : {}}
    whileTap={!isLocked ? { scale: 0.96 } : {}}
    className={`relative flex-1 min-w-[160px] rounded-2xl border p-6 transition-all duration-300 overflow-hidden ${
      isLocked && isSelected
        ? "bg-primary/15 border-primary/40"
        : isSelected
        ? "bg-primary border-primary text-primary-foreground shadow-glow"
        : "bg-card border-border/40 text-foreground hover:border-primary/40 hover:shadow-glow/30"
    }`}
  >
    <AnimatePresence>
      {isLocked && isSelected && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="absolute top-3 right-3 w-6 h-6 rounded-full bg-primary flex items-center justify-center"
        >
          <motion.div
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.4, delay: 0.1 }}
          >
            <Check className="w-3.5 h-3.5 text-primary-foreground" />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>

    <div className="relative z-10 flex flex-col items-center gap-2">
      <Clock
        className={`w-5 h-5 ${
          isLocked && isSelected
            ? "text-primary"
            : isSelected
            ? "text-primary-foreground"
            : "text-primary/60"
        }`}
      />
      <span
        className={`text-xl font-bold ${
          isLocked && isSelected ? "text-primary" : ""
        }`}
      >
        {slot.time}
      </span>
      <span
        className={`text-xs ${
          isLocked && isSelected
            ? "text-muted-foreground"
            : isSelected
            ? "text-primary-foreground/70"
            : "text-muted-foreground"
        }`}
      >
        {slot.label}
      </span>
    </div>
  </motion.button>
);

const BookingSection = () => {
  const [selectedSlot, setSelectedSlot] = useState<number | null>(null);
  const [step, setStep] = useState<BookingStep>("select");
  const [name, setName] = useState("");
  const [bookingType, setBookingType] = useState<BookingType>("personal");
  const [contactPref, setContactPref] = useState<ContactPref>("email");
  const [contact, setContact] = useState("");

  const selectedTime = SLOTS.find((s) => s.id === selectedSlot)?.time;

  const handleSlotSelect = useCallback(
    (id: number) => {
      if (step !== "select") return;
      setSelectedSlot(id);
    },
    [step]
  );

  const handleLockSlot = useCallback(() => {
    if (!selectedSlot) return;
    setStep("form");
  }, [selectedSlot]);

  const handleConfirm = useCallback(() => {
    if (!name.trim() || !contact.trim()) return;
    setStep("confirmed");
  }, [name, contact]);

  return (
    <section
      id="booking"
      className="py-20 md:py-28 bg-background relative overflow-hidden"
    >
      {/* Ambient background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 left-1/4 w-72 h-72 bg-primary/5 rounded-full blur-[100px]" />
        <div className="absolute bottom-1/4 right-1/3 w-56 h-56 bg-primary/3 rounded-full blur-[80px]" />
      </div>

      <div className="container mx-auto px-6 relative z-10 max-w-5xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left — Founder Highlight */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="text-xs font-medium tracking-widest uppercase text-primary/70 mb-4 block">
              Founder Conversation
            </span>

            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-3 font-display">
              Chat with Alek
            </h2>

            <p className="text-muted-foreground text-lg leading-relaxed mb-8">
              Get founder-level guidance on where your talent fits best.
            </p>

            <div className="relative inline-block mb-1">
              <p className="text-foreground font-semibold text-base">Alek</p>
              <motion.div
                className="h-[2px] bg-gradient-to-r from-primary via-primary-glow to-transparent rounded-full mt-1"
                initial={{ width: 0 }}
                whileInView={{ width: "100%" }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.4 }}
              />
            </div>
            <p className="text-muted-foreground text-sm">
              Founder, Auralis Talent Xplore
            </p>
          </motion.div>

          {/* Right — Slot Cards + Form */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col gap-6"
          >
            <h3 className="text-lg font-semibold text-foreground font-display">
              Available Founder Slots
            </h3>

            {/* Slot cards */}
            <div className="flex gap-4">
              {SLOTS.map((slot) => (
                <SlotCard
                  key={slot.id}
                  slot={slot}
                  isSelected={selectedSlot === slot.id}
                  isLocked={step !== "select"}
                  onSelect={() => handleSlotSelect(slot.id)}
                />
              ))}
            </div>

            {/* Reserve button */}
            <AnimatePresence>
              {selectedSlot && step === "select" && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 8 }}
                  transition={{ duration: 0.3 }}
                >
                  <motion.button
                    whileHover={{ scale: 1.02, boxShadow: "0 0 20px hsl(168 100% 37% / 0.3)" }}
                    whileTap={{ scale: 0.97 }}
                    onClick={handleLockSlot}
                    className="w-full py-3 bg-primary text-primary-foreground text-sm font-semibold rounded-xl shadow-glow hover:brightness-110 transition-all"
                  >
                    Reserve My Spot
                  </motion.button>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Booking Form */}
            <AnimatePresence>
              {step === "form" && (
                <motion.div
                  initial={{ opacity: 0, y: 20, height: 0 }}
                  animate={{ opacity: 1, y: 0, height: "auto" }}
                  exit={{ opacity: 0, y: 20, height: 0 }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  className="rounded-2xl border border-border/40 bg-card p-6 flex flex-col gap-5"
                >
                  {/* Name */}
                  <div>
                    <label className="text-xs font-medium text-muted-foreground mb-1.5 block">
                      Name
                    </label>
                    <Input
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Your full name"
                      className="bg-secondary/60 border-border/30"
                    />
                  </div>

                  {/* Booking Type */}
                  <div>
                    <label className="text-xs font-medium text-muted-foreground mb-1.5 block">
                      Booking Type
                    </label>
                    <ToggleGroup
                      value={bookingType}
                      onChange={setBookingType}
                      options={[
                        { value: "personal", label: "Personal", icon: <User className="w-3.5 h-3.5" /> },
                        { value: "company", label: "Company", icon: <Building2 className="w-3.5 h-3.5" /> },
                      ]}
                    />
                  </div>

                  {/* Contact Preference */}
                  <div>
                    <label className="text-xs font-medium text-muted-foreground mb-1.5 block">
                      Contact Preference
                    </label>
                    <ToggleGroup
                      value={contactPref}
                      onChange={(v) => {
                        setContactPref(v);
                        setContact("");
                      }}
                      options={[
                        { value: "email", label: "Email", icon: <Mail className="w-3.5 h-3.5" /> },
                        { value: "phone", label: "Phone", icon: <Phone className="w-3.5 h-3.5" /> },
                      ]}
                    />
                  </div>

                  {/* Dynamic contact field */}
                  <div>
                    <Input
                      value={contact}
                      onChange={(e) => setContact(e.target.value)}
                      placeholder={
                        contactPref === "phone"
                          ? "Enter your phone number"
                          : "Enter your email address"
                      }
                      type={contactPref === "phone" ? "tel" : "email"}
                      className="bg-secondary/60 border-border/30"
                    />
                  </div>

                  {/* Confirm */}
                  <motion.button
                    whileHover={{ scale: 1.02, boxShadow: "0 0 20px hsl(168 100% 37% / 0.3)" }}
                    whileTap={{ scale: 0.97 }}
                    onClick={handleConfirm}
                    disabled={!name.trim() || !contact.trim()}
                    className="w-full py-3 bg-primary text-primary-foreground text-sm font-semibold rounded-xl shadow-glow hover:brightness-110 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Reserve My Spot
                  </motion.button>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Confirmation */}
            <AnimatePresence>
              {step === "confirmed" && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                  className="rounded-2xl border border-primary/20 bg-primary/5 p-6 flex flex-col gap-4"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                      <Check className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-foreground font-semibold">
                        Your chat with Alek is reserved
                      </p>
                      <p className="text-muted-foreground text-sm">
                        {selectedTime} CT · 20 minutes
                      </p>
                    </div>
                  </div>

                  <p className="text-muted-foreground text-sm leading-relaxed">
                    A Google Meet invite has been sent to both participants.
                  </p>

                  {/* Founder delight */}
                  <div className="flex items-center gap-3 pt-2 border-t border-border/20">
                    <motion.div
                      animate={{ scale: [1, 1.08, 1] }}
                      transition={{ duration: 1.5, ease: "easeInOut" }}
                      className="w-9 h-9 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold text-sm shrink-0"
                    >
                      A
                    </motion.div>
                    <p className="text-muted-foreground text-sm italic">
                      "Alek is looking forward to meeting you."
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>

        {/* Footer label */}
        <p className="text-center text-muted-foreground/50 text-xs mt-16 tracking-wide">
          Auralis Talent Xplore ✨
        </p>
      </div>
    </section>
  );
};

export default BookingSection;
