"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const BackToTop = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <div className="fixed bottom-28 right-11 z-50">

          <motion.button
            onClick={scrollToTop}
            onMouseEnter={() => setShowTooltip(true)}
            onMouseLeave={() => setShowTooltip(false)}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            transition={{ duration: 0.3 }}
            whileHover={{ scale: 1.15 }}
            whileTap={{ scale: 0.95 }}
            className="relative group bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-3 rounded-full shadow-lg shadow-blue-500/25 hover:shadow-blue-500/50 transition-all duration-300"
            aria-label="Back to Top"
          >
          <span className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 opacity-0 group-hover:opacity-30 group-hover:animate-ping transition-opacity" />
            ↑
          </motion.button>
        </div>
      )}
    </AnimatePresence>
  );
};

export default BackToTop;