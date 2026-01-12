import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Mail } from "lucide-react";

const Navbar = () => {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 left-0 right-0 z-50 bg-background/90 backdrop-blur-lg border-b border-border/30"
    >
      <nav className="container mx-auto px-6 h-16 flex items-center justify-between">
        <a href="/" className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-lg bg-primary flex items-center justify-center">
            <span className="text-primary-foreground font-bold text-lg">A</span>
          </div>
          <span className="font-semibold text-lg text-foreground hidden sm:inline">Auralis Talent Xplore</span>
        </a>

        <div className="hidden md:flex items-center gap-8">
          <button 
            onClick={() => scrollToSection('why-auralis')} 
            className="text-muted-foreground hover:text-primary transition-colors text-sm"
          >
            Why Auralis
          </button>
          <button 
            onClick={() => scrollToSection('approach')} 
            className="text-muted-foreground hover:text-primary transition-colors text-sm"
          >
            Our Approach
          </button>
          <button 
            onClick={() => scrollToSection('services')} 
            className="text-muted-foreground hover:text-primary transition-colors text-sm"
          >
            Services
          </button>
          <button 
            onClick={() => scrollToSection('about')} 
            className="text-muted-foreground hover:text-primary transition-colors text-sm"
          >
            About
          </button>
        </div>

        <div className="flex items-center gap-3">
          <Button 
            variant="outline" 
            size="sm" 
            className="border-primary/50 text-primary hover:bg-primary/10 hover:border-primary hidden sm:inline-flex"
            asChild
          >
            <a href="mailto:alek@auralistalent.com">
              <Mail className="w-4 h-4 mr-2" />
              Contact
            </a>
          </Button>
          <Button 
            size="sm" 
            className="bg-primary text-primary-foreground hover:bg-primary/90"
          >
            Get Started
          </Button>
        </div>
      </nav>
    </motion.header>
  );
};

export default Navbar;
