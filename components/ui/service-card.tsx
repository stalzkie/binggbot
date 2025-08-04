"use client";

import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";
import { GlassCard } from "@/components/ui/glass-card";

interface ServiceCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  features: string[];
  isActive: boolean;
  onHover: () => void;
  delay?: number;
}

export function ServiceCard({ 
  icon: Icon, 
  title, 
  description, 
  features, 
  isActive, 
  onHover,
  delay = 0
}: ServiceCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay }}
      onMouseEnter={onHover}
      className="cursor-pointer"
    >
      <GlassCard 
        className={`p-8 transition-all duration-500 ${
          isActive 
            ? 'glass-card border-primary/50 shadow-2xl shadow-primary/20' 
            : 'glass-dark border-border/30 hover:border-primary/30'
        }`}
      >
        <motion.div
          animate={{ 
            scale: isActive ? 1.1 : 1,
            rotate: isActive ? 5 : 0
          }}
          transition={{ duration: 0.3 }}
        >
          <Icon className="h-16 w-16 text-primary mb-6" />
        </motion.div>
        
        <h3 className="text-2xl font-bold mb-4 text-foreground">{title}</h3>
        <p className="text-muted-foreground mb-6 leading-relaxed">{description}</p>
        
        <ul className="space-y-2">
          {features.map((feature, i) => (
            <motion.li 
              key={i} 
              className="flex items-center text-sm text-foreground/80"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <motion.div 
                className="w-2 h-2 bg-primary rounded-full mr-3"
                animate={{ scale: isActive ? [1, 1.5, 1] : 1 }}
                transition={{ duration: 0.5, repeat: isActive ? Infinity : 0 }}
              />
              <span>{feature}</span>
            </motion.li>
          ))}
        </ul>
      </GlassCard>
    </motion.div>
  );
}
