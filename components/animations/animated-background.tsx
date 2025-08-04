"use client";

import { motion } from "framer-motion";

export function AnimatedBackground() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
      {/* Electric Blue Floating Orbs */}
      <motion.div
        className="absolute top-20 left-10 w-80 h-80 rounded-full blur-3xl opacity-40"
        style={{
          background: "radial-gradient(circle, rgba(100, 150, 255, 0.4) 0%, rgba(30, 60, 120, 0.15) 70%, transparent 100%)"
        }}
        animate={{
          y: [0, -40, 0],
          x: [0, 30, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      
      <motion.div
        className="absolute bottom-20 right-10 w-96 h-96 rounded-full blur-3xl opacity-30"
        style={{
          background: "radial-gradient(circle, rgba(80, 120, 255, 0.35) 0%, rgba(10, 30, 80, 0.12) 65%, transparent 100%)"
        }}
        animate={{
          y: [0, 50, 0],
          x: [0, -40, 0],
          scale: [1, 0.8, 1],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2
        }}
      />
      
      <motion.div
        className="absolute top-1/2 left-1/3 w-72 h-72 rounded-full blur-2xl opacity-25"
        style={{
          background: "radial-gradient(circle, rgba(120, 180, 255, 0.3) 0%, rgba(20, 50, 120, 0.1) 60%, transparent 100%)"
        }}
        animate={{
          y: [0, -25, 0],
          x: [0, 20, 0],
          scale: [1, 1.3, 1],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 4
        }}
      />

      <motion.div
        className="absolute top-3/4 right-1/4 w-64 h-64 rounded-full blur-2xl opacity-20"
        style={{
          background: "radial-gradient(circle, rgba(60, 140, 255, 0.25) 0%, rgba(5, 25, 60, 0.08) 50%, transparent 100%)"
        }}
        animate={{
          y: [0, 30, 0],
          x: [0, -15, 0],
          scale: [1, 0.9, 1],
        }}
        transition={{
          duration: 9,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1
        }}
      />

      {/* Enhanced Blue Grid Pattern */}
      <div 
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: `
            linear-gradient(rgba(100, 150, 255, 0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(100, 150, 255, 0.03) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
          maskImage: "radial-gradient(ellipse 80% 50% at 50% 0%, black 70%, transparent 110%)"
        }}
      />
    </div>
  );
}
