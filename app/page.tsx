"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { GlassCard } from "@/components/ui/glass-card";
import { ProcessStep } from "@/components/ui/process-step";
import { MotionContainer } from "@/components/animations/motion-container";
import { AnimatedBackground } from "@/components/animations/animated-background";
import { HeroSection } from "@/components/sections/hero-section";
import { Header } from "@/components/sections/header";
import { Reviews } from "@/components/sections/reviews";
import { Pricing } from "@/components/sections/pricing";
import { HowItWorks } from "@/components/sections/how-it-works";
import { Footer } from "@/components/sections/footer";
import { ContactModal } from "@/components/ui/contact-modal";
import { Spotlight } from "@/components/ui/spotlight";
import { 
  MessageSquare, 
  Sparkles, 
  Shield, 
  Users,
  Zap,
  Code,
  Palette,
  Award,
  Clock,
  Target,
  Lightbulb,
  Rocket,
} from "lucide-react";

export default function Home() {
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);

  const processSteps = [
    {
      step: "01",
      icon: Lightbulb,
      title: "Discovery",
      description: "We review your business, customer experience, and technical needs."
    },
    {
      step: "02",
      icon: Palette,
      title: "Design",
      description: "Design conversation paths, UI samples, and set the chatbot’s personality."
    },
    {
      step: "03",
      icon: Code,
      title: "Development",
      description: "Develop and train your custom chatbot with smart AI and prepare your dashboard"
    },
    {
      step: "04",
      icon: Rocket,
      title: "Deploy",
      description: "Launch, test, and improve your chatbot for top performance and user satisfaction."
    }
  ];

  const advantages = [
    {
      icon: Award,
      title: "Industry Expertise",
      description: "Backed by 3+ years of hands-on AI and web development projects"
    },
    {
      icon: Zap,
      title: "Fast Delivery",
      description: "From idea to launch in 1–2 weeks, depending on complexity."
    },
    {
      icon: Shield,
      title: "High-Level Security",
      description: "Protecting your data with trusted, advanced measures."
    },
    {
      icon: Users,
      title: "Ongoing Support",
      description: "Dedicated support team for updates, maintenance, and improvements."
    },
    {
      icon: Target,
      title: "ROI Focused",
      description: "Every chatbot is designed to deliver measurable business value and results."
    },
    {
      icon: Sparkles,
      title: "Latest AI Tech",
      description: "Built with cutting-edge AI technology and natural language processing."
    }
  ];

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <Spotlight
        className="-top-40 left-0 md:left-60 md:-top-20"
        fill="rgba(100, 150, 255, 0.3)"
      />
      <AnimatedBackground />

      <Header />

      <section id="home" className="min-h-screen w-full">
        <HeroSection />
      </section>

      <section id="process" className="min-h-screen w-full py-16 px-4 sm:px-6 lg:px-8 flex items-center">
        <div className="max-w-7xl mx-auto w-full">
          <MotionContainer className="text-center mb-12">
            <h2 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-foreground to-accent bg-clip-text text-transparent">
              Our Process
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              From concept to deployment, we guide you through every step of creating your perfect chatbot solution.
            </p>
          </MotionContainer>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {processSteps.map((step, index) => (
              <ProcessStep
                key={step.title}
                {...step}
                index={index}
              />
            ))}
          </div>
        </div>
      </section>

      <section id="pricing" className="min-h-screen w-full flex items-center">
        <div className="w-full">
          <Pricing onContactClick={() => setIsContactModalOpen(true)} />
        </div>
      </section>

      <section id="how-it-works" className="min-h-screen w-full flex items-center">
        <div className="w-full">
          <HowItWorks />
        </div>
      </section>

      <section id="why-choose" className="min-h-screen w-full py-16 px-4 sm:px-6 lg:px-8 flex items-center">
        <div className="max-w-7xl mx-auto w-full">
          <MotionContainer className="text-center mb-12">
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent leading-tight">
              Why Choose BinggBot
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              We blend technical skill and creative design to deliver chatbot solutions that work for your business.
            </p>
          </MotionContainer>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {advantages.map((advantage, index) => (
              <MotionContainer
                key={advantage.title}
                direction="up"
                delay={index * 0.1}
              >
                <GlassCard className="group p-6 glass-card hover:border-primary/50 transition-all duration-300">
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ duration: 0.3 }}
                  >
                    <advantage.icon className="h-12 w-12 text-primary mb-4" />
                  </motion.div>
                  <h3 className="text-xl font-semibold mb-2 text-foreground">{advantage.title}</h3>
                  <p className="text-muted-foreground">{advantage.description}</p>
                </GlassCard>
              </MotionContainer>
            ))}
          </div>
        </div>
      </section>

      <section id="reviews" className="min-h-screen w-full flex items-center">
        <div className="w-full">
          <Reviews />
        </div>
      </section>

      <section id="contact" className="min-h-screen w-full py-16 px-4 sm:px-6 lg:px-8 relative flex items-center">
        <div className="max-w-5xl mx-auto w-full">
          <div 
            className="cursor-pointer transition-all duration-300 hover:scale-[1.02]"
            onClick={() => setIsContactModalOpen(true)}
          >
            <GlassCard className="p-12 text-center bg-gradient-to-r from-primary/20 to-accent/20 border-primary/30 relative overflow-hidden hover:border-primary/50">
              <Spotlight
                className="-top-20 -right-20 opacity-50"
                fill="rgba(80, 200, 255, 0.4)"
              />
              <MotionContainer>
                <motion.h2 
                  className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-foreground to-primary bg-clip-text text-transparent"
                  initial={{ scale: 0.9 }}
                  whileInView={{ scale: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  Ready to Build Your Custom Chatbot?
                </motion.h2>
                <p className="text-xl md:text-2xl mb-8 text-muted-foreground max-w-3xl mx-auto">
                  Let&apos;s discuss your business needs and create an AI solution that drives real results for your company.
                </p>
                
                <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-8 text-muted-foreground">
                  {[
                    { icon: Clock, text: "Free consultation" },
                    { icon: MessageSquare, text: "Custom solution" },
                    { icon: Award, text: "Proven results" }
                  ].map((item, index) => (
                    <motion.div 
                      key={item.text}
                      className="flex items-center space-x-2"
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <item.icon className="h-5 w-5" />
                      <span className="text-sm sm:text-base">{item.text}</span>
                    </motion.div>
                  ))}
                </div>
              </MotionContainer>
            </GlassCard>
          </div>
        </div>
      </section>

      <Footer />

      <ContactModal 
        isOpen={isContactModalOpen} 
        onClose={() => setIsContactModalOpen(false)} 
      />
    </div>
  );
}
