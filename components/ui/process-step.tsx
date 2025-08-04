"use client";

import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";

interface ProcessStepProps {
  step: string;
  icon: LucideIcon;
  title: string;
  description: string;
  index: number;
}

export function ProcessStep({ step, icon: Icon, title, description, index }: ProcessStepProps) {
  return (
    <motion.div 
      className="text-center group"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ 
        duration: 0.6, 
        delay: index * 0.1,
        ease: [0.25, 0.4, 0.25, 1]
      }}
      whileHover={{ y: -10 }}
    >
      <div className="relative mb-6">
        <motion.div 
          className="w-20 h-20 bg-gradient-to-r from-primary to-accent rounded-full flex items-center justify-center mx-auto mb-4 shadow-2xl"
          whileHover={{ 
            scale: 1.1,
            boxShadow: "0 20px 40px rgba(0, 0, 0, 0.4)"
          }}
          transition={{ duration: 0.3 }}
        >
          <Icon className="h-10 w-10 text-white" />
        </motion.div>
        
        <motion.div 
          className="absolute -top-2 -right-2 w-8 h-8 bg-accent text-accent-foreground rounded-full flex items-center justify-center text-sm font-bold shadow-lg"
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          transition={{ delay: index * 0.1 + 0.3, type: "spring", stiffness: 500 }}
        >
          {step}
        </motion.div>
      </div>
      
      <motion.h3 
        className="text-xl font-bold mb-3 text-foreground"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: index * 0.1 + 0.4 }}
      >
        {title}
      </motion.h3>
      
      <motion.p 
        className="text-muted-foreground"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: index * 0.1 + 0.5 }}
      >
        {description}
      </motion.p>
    </motion.div>
  );
}
