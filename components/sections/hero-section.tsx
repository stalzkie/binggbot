"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { MotionContainer } from "@/components/animations/motion-container";
import { CheckCircle, Sparkles, Zap } from "lucide-react";

export function HeroSection() {
  return (
    <section className="relative pt-16 pb-16 px-4 sm:px-6 lg:px-8 flex items-center">
      <div className="max-w-7xl mx-auto w-full">
        <div className="text-center relative">
          <motion.div
            className="absolute -top-20 left-1/4 w-3 h-3 bg-primary rounded-full"
            animate={{
              y: [0, -20, 0],
              opacity: [0.4, 1, 0.4]
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <motion.div
            className="absolute -top-16 right-1/3 w-2 h-2 bg-accent rounded-full"
            animate={{
              y: [0, -15, 0],
              opacity: [0.6, 1, 0.6]
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1
            }}
          />

          {/* Enhanced Brand Section */}
          <MotionContainer direction="up" delay={0.1}>
            <motion.div 
              className="flex items-center justify-center space-x-6 mb-12"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, ease: "easeOut" }}
            >
              <div className="relative group">
                <motion.div
                  className="absolute inset-0 w-24 h-24 -m-2"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                >
                  <div className="w-full h-full rounded-full bg-gradient-to-r from-primary via-transparent to-accent" 
                       style={{ background: "conic-gradient(from 0deg, #6496ff 0%, transparent 50%, #50b3ff 100%)" }} />
                </motion.div>
                
                <motion.div
                  className="relative w-20 h-20 bg-gradient-to-br from-primary/20 to-accent/20 rounded-full flex items-center justify-center glass-card backdrop-blur-xl"
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.3 }}
                >
                  <Image
                    src="/logo.png"
                    alt="BingBot Logo"
                    width={48}
                    height={48}
                    className="rounded-lg filter brightness-110"
                  />
                  <motion.div 
                    className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-r from-accent to-primary rounded-full flex items-center justify-center"
                    animate={{
                      scale: [1, 1.2, 1],
                      rotate: [0, 180, 360]
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  >
                    <Sparkles className="w-3 h-3 text-white" />
                  </motion.div>
                </motion.div>
              </div>
              
              <div className="text-left">
                <motion.h1 
                  className="text-5xl md:text-6xl font-black tracking-tight"
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3, duration: 0.8 }}
                >
                  <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent bg-[length:200%_100%]">
                    BingBot
                  </span>
                </motion.h1>
                <motion.div
                  className="flex items-center space-x-2 mt-2"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                  <span className="text-sm text-muted-foreground font-semibold tracking-[0.3em] uppercase">
                    AI Solutions
                  </span>
                  <Zap className="w-4 h-4 text-accent" />
                </motion.div>
              </div>
            </motion.div>
          </MotionContainer>

          <MotionContainer direction="up" delay={0.3}>
            <motion.div className="mb-8 relative">
              <motion.h2 
                className="text-8xl md:text-9xl lg:text-[12rem] font-black leading-none tracking-tighter"
                initial={{ opacity: 0, y: 100 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.4, ease: "easeOut" }}
              >
                <motion.span 
                  className="block bg-gradient-to-r from-foreground to-primary bg-clip-text text-transparent"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                >
                  CUSTOM
                </motion.span>
                <motion.span 
                  className="block bg-gradient-to-r from-accent via-primary to-foreground bg-clip-text text-transparent"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                >
                  CHATBOTS
                </motion.span>
              </motion.h2>
              
              <motion.div 
                className="flex justify-center mt-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
              >
                <motion.div 
                  className="h-2 bg-gradient-to-r from-primary via-accent to-primary rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: 200 }}
                  transition={{ duration: 1.5, delay: 1.2, ease: "easeOut" }}
                />
              </motion.div>
            </motion.div>
          </MotionContainer>

          <MotionContainer direction="up" delay={0.6}>
            <motion.div 
              className="text-2xl md:text-3xl text-muted-foreground mb-8 max-w-5xl mx-auto leading-relaxed font-light"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              We craft{" "}
              <motion.span 
                className="text-primary font-semibold relative inline-block"
                whileHover={{ scale: 1.05 }}
              >
                intelligent AI solutions
                <motion.div 
                  className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary"
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  transition={{ delay: 2, duration: 0.8 }}
                />
              </motion.span>{" "}
              that understand your business, speak your language, and deliver{" "}
              <motion.span 
                className="text-accent font-semibold relative inline-block"
                whileHover={{ scale: 1.05 }}
              >
                exceptional results
                <motion.div 
                  className="absolute -bottom-1 left-0 right-0 h-0.5 bg-accent"
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  transition={{ delay: 2.3, duration: 0.8 }}
                />
              </motion.span>.
            </motion.div>
          </MotionContainer>

          <MotionContainer direction="up" delay={1.2}>
            <div className="flex flex-wrap items-center justify-center gap-6 text-muted-foreground">
              {[
                { icon: CheckCircle, text: "Custom Development", color: "text-primary" },
                { icon: Zap, text: "Lightning Fast", color: "text-accent" },
                { icon: Sparkles, text: "AI Powered", color: "text-primary" }
              ].map((item, index) => (
                <motion.div 
                  key={item.text}
                  className="flex items-center space-x-3 px-6 py-3 rounded-full glass-card hover:glass-dark transition-all cursor-pointer group"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.4 + index * 0.1 }}
                  whileHover={{ scale: 1.05, y: -2 }}
                >
                  <item.icon className={`h-5 w-5 ${item.color} group-hover:scale-110 transition-transform`} />
                  <span className="font-medium">{item.text}</span>
                </motion.div>
              ))}
            </div>
          </MotionContainer>
        </div>
      </div>
    </section>
  );
}
