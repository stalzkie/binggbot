"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export const BentoGrid = ({
  className,
  children,
}: {
  className?: string;
  children?: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        "grid auto-rows-[16rem] grid-cols-1 md:grid-cols-3 gap-6 max-w-7xl mx-auto",
        className
      )}
    >
      {children}
    </div>
  );
};

export const BentoGridItem = ({
  className,
  title,
  description,
  header,
  icon,
}: {
  className?: string;
  title?: string | React.ReactNode;
  description?: string | React.ReactNode;
  header?: React.ReactNode;
  icon?: React.ReactNode;
}) => {
  return (
    <motion.div
      className={cn(
        "row-span-1 rounded-xl group/bento hover:shadow-xl transition-all duration-300 shadow-input glass-card border border-primary/20 hover:border-primary/40 justify-between flex flex-col space-y-4 p-6 backdrop-blur-md",
        className
      )}
      whileHover={{ y: -3, scale: 1.01 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
    >
      {header}
      <div className="group-hover/bento:translate-x-1 transition-all duration-300">
        {icon}
        <div className="font-semibold text-foreground mb-2 mt-3 text-lg">
          {title}
        </div>
        <div className="font-normal text-muted-foreground text-sm leading-relaxed">
          {description}
        </div>
      </div>
    </motion.div>
  );
};
