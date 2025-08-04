"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  variant?: "default" | "dark" | "nav";
  hover?: boolean;
}

export function GlassCard({ 
  children, 
  className, 
  variant = "default",
  hover = true 
}: GlassCardProps) {
  const variantClasses = {
    default: "glass",
    dark: "glass-dark", 
    nav: "glass-nav"
  };

  return (
    <motion.div
      className={cn(
        "rounded-xl",
        variantClasses[variant],
        hover && "hover:scale-105 transition-all duration-300",
        className
      )}
      whileHover={hover ? { 
        scale: 1.02,
        boxShadow: "0 20px 40px rgba(0, 0, 0, 0.4)"
      } : undefined}
      transition={{ duration: 0.3 }}
    >
      {children}
    </motion.div>
  );
}
