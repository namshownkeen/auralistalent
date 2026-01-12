import { motion } from "framer-motion";
import { Mail } from "lucide-react";
import { Button } from "@/components/ui/button";

const QuickContact = () => {
  return (
    <motion.div
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: 1 }}
      className="fixed right-6 bottom-6 z-50"
    >
      <Button
        size="lg"
        className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 group px-6"
        asChild
      >
        <a href="mailto:alek@auralistalent.com">
          <Mail className="w-5 h-5 mr-2" />
          <span className="hidden sm:inline">Quick Contact</span>
          <span className="sm:hidden">Contact</span>
        </a>
      </Button>
    </motion.div>
  );
};

export default QuickContact;
