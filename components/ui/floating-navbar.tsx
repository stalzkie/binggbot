"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export const FloatingNav = ({
  navItems,
  className,
}: {
  navItems: {
    name: string;
    link: string;
    icon?: React.ReactNode;
  }[];
  className?: string;
}) => {
  const [activeSection, setActiveSection] = useState("");
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const sections = navItems.map(item => item.link.substring(1)); 
      const scrollPosition = window.scrollY + 100;

      setIsVisible(window.scrollY > 100);

      for (let i = sections.length - 1; i >= 0; i--) {
        const element = document.getElementById(sections[i]);
        if (element && element.offsetTop <= scrollPosition) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); 
    return () => window.removeEventListener("scroll", handleScroll);
  }, [navItems]);

  const scrollToSection = (link: string) => {
    const element = document.querySelector(link);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -50 }}
      animate={{ 
        opacity: isVisible ? 1 : 0, 
        y: isVisible ? 0 : -50 
      }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className={cn(
        "fixed top-6 left-1/2 transform -translate-x-1/2 z-[5000]",
        "bg-gradient-to-r from-background/95 via-background/90 to-background/95",
        "backdrop-blur-xl border border-border/30 rounded-2xl shadow-2xl",
        "px-3 sm:px-4 md:px-6 py-2 sm:py-3 flex items-center justify-center",
        "max-w-[90vw] sm:max-w-fit overflow-x-auto scrollbar-hide",
        !isVisible && "pointer-events-none",
        className
      )}
    >
      <div className="flex items-center space-x-0.5 sm:space-x-1">
        {navItems.map((navItem, idx) => {
          const isActive = activeSection === navItem.link.substring(1);
          return (
            <motion.button
              key={`nav-${idx}`}
              onClick={() => scrollToSection(navItem.link)}
              className={cn(
                "relative px-2 sm:px-3 md:px-4 py-1.5 sm:py-2 rounded-lg sm:rounded-xl",
                "transition-all duration-300 flex items-center space-x-1 sm:space-x-2 group",
                "hover:bg-primary/10 hover:scale-105 whitespace-nowrap",
                isActive 
                  ? "bg-gradient-to-r from-primary/20 to-accent/20 text-primary shadow-lg" 
                  : "text-foreground/70 hover:text-foreground"
              )}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
            >
              {/* Icon - Show on mobile, hide on larger screens for space */}
              <motion.div
                className={cn(
                  "transition-colors duration-300 sm:block",
                  isActive ? "text-primary" : "text-foreground/60 group-hover:text-primary"
                )}
                animate={isActive ? { scale: [1, 1.1, 1] } : {}}
                transition={{ duration: 0.3 }}
              >
                <span className="block sm:hidden">{navItem.icon}</span>
                <span className="hidden sm:block">{navItem.icon}</span>
              </motion.div>
              
              {/* Text - Always show but with responsive sizing */}
              <span className={cn(
                "text-xs sm:text-sm font-medium transition-all duration-300",
                isActive ? "text-primary font-semibold" : "text-foreground/80"
              )}>
                {navItem.name}
              </span>

              {/* Active indicator */}
              {isActive && (
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-primary/10 to-accent/10 rounded-lg sm:rounded-xl -z-10"
                  layoutId="activeTab"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}

              {/* Hover effect */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-primary/5 to-accent/5 rounded-lg sm:rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"
              />
            </motion.button>
          );
        })}
      </div>

      <motion.div
        className="absolute -top-1 -left-1 w-2 h-2 bg-primary/30 rounded-full"
        animate={{ scale: [1, 1.5, 1], opacity: [0.3, 0.7, 0.3] }}
        transition={{ duration: 3, repeat: Infinity }}
      />
      <motion.div
        className="absolute -bottom-1 -right-1 w-2 h-2 bg-accent/30 rounded-full"
        animate={{ scale: [1, 1.5, 1], opacity: [0.3, 0.7, 0.3] }}
        transition={{ duration: 3, repeat: Infinity, delay: 1.5 }}
      />
    </motion.div>
  );
};
