import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

const Navbar = () => {
  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border/50"
    >
      <nav className="container mx-auto px-6 h-16 flex items-center justify-between">
        <a href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
            <span className="text-primary-foreground font-bold text-lg">T</span>
          </div>
          <span className="font-semibold text-lg text-foreground">TalentMatch</span>
        </a>

        <div className="hidden md:flex items-center gap-8">
          <a href="#approach" className="text-muted-foreground hover:text-foreground transition-colors text-sm">
            Our Approach
          </a>
          <a href="#services" className="text-muted-foreground hover:text-foreground transition-colors text-sm">
            Services
          </a>
          <a href="#about" className="text-muted-foreground hover:text-foreground transition-colors text-sm">
            About
          </a>
        </div>

        <div className="flex items-center gap-3">
          <Button variant="ghost" size="sm" className="hidden sm:inline-flex">
            Sign In
          </Button>
          <Button variant="default" size="sm">
            Get Started
          </Button>
        </div>
      </nav>
    </motion.header>
  );
};

export default Navbar;
