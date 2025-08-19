"use client";

import { motion } from "framer-motion";
import {
  Check,
  Star,
  Zap,
  Crown,
  Rocket,
  ShieldCheck,
  Headphones,
} from "lucide-react";
import { GlassCard } from "@/components/ui/glass-card";
import { MotionContainer } from "@/components/animations/motion-container";
import { Button } from "@/components/ui/button";

interface PricingTier {
  name: string;
  price: string;
  period: string;
  description: string;
  features: string[];
  highlighted?: boolean;
  icon: React.ElementType;
  buttonText: string;
  badge?: string;
  subscriptionPrice?: string;
}

const pricingTiers: PricingTier[] = [
  {
    name: "Chatbot Only",
    price: "₱ 3,000",
    period: "one-time",
    subscriptionPrice: "+ ₱ 1,500/month maintenance subscription",
    description: "Perfect for small businesses starting their AI journey",
    icon: Star,
    buttonText: "Get Started",
    features: [
      "Basic chatbot",
      "Email support integration",
      "Basic analytics dashboard",
      "Up to 1,000 monthly conversations",
      "Standard response time (2-3 seconds)",
      "Uploadable & downloadable knowledge base",
      "Monthly support period",
    ],
  },
  {
    name: "Chatbot + Website",
    price: "₱ 5,000",
    subscriptionPrice: "+ ₱ 1,500/month maintenance subscription",
    period: "one-time",
    description: "Advanced features for growing businesses",
    icon: Zap,
    buttonText: "Most Popular",
    highlighted: true,
    badge: "Most Popular",
    features: [
      "**Custom Website Landing Page**",
      "Advanced chatbot",
      "Email support integration",
      "Advanced analytics & reporting dashboard",
      "Up to 10,000 monthly conversations",
      "Fast response time (under 1 second)",
      "Uploadable & downloadable knowledge base",
      "Monthly support & maintenance",
    ],
  },
  {
    name: "Personalized",
    price: "Custom",
    period: "pricing",
    description: "A custom AI chatbot solution for your business",
    icon: Crown,
    buttonText: "Contact Sales",
    features: [
      "Fully custom chatbot solution",
      "Unlimited conversations",
      "Fastest response time",
      "Advanced AI & NLP capabilities",
      "Additional features may be added",
      "Dedicated account manager",
      "24/7 priority support",
      "Custom training & onboarding",
    ],
  },
];

interface PricingCardProps {
  tier: PricingTier;
  index: number;
  onContactClick: () => void;
}

function buttonClassesForTier(tier: PricingTier) {
  const base =
    "w-full py-3 font-semibold rounded-lg transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-ring/50";

  if (tier.highlighted) {
    // "Most Popular"
    return [
      base,
      "dark:bg-gradient-to-r dark:from-primary dark:to-accent dark:text-white dark:hover:from-primary/90 dark:hover:to-accent/90",
      "light:bg-gradient-to-r light:from-primary light:to-accent light:text-primary-foreground light:hover:from-primary/90 light:hover:to-accent/90",
    ].join(" ");
  }

  const isContact = /contact/i.test(tier.buttonText);

  if (isContact) {
    // "Contact Sales"
    return [
      base,
      "light:bg-transparent light:text-primary light:border light:border-primary/60 light:hover:bg-primary/10",
      "dark:bg-transparent dark:text-accent dark:border dark:border-accent/40 dark:hover:bg-accent/10",
    ].join(" ");
  }

  // Default "Get Started"
  return [
    base,
    "dark:bg-muted dark:hover:bg-muted/80 dark:text-white",
    "light:bg-card light:text-foreground light:border light:border-border light:hover:bg-muted",
  ].join(" ");
}

function PricingCard({ tier, index, onContactClick }: PricingCardProps) {
  const IconComponent = tier.icon;

  return (
    <MotionContainer direction="up" delay={index * 0.2}>
      <GlassCard
        className={`relative p-8 h-full ${
          tier.highlighted
            ? "border-primary/50 bg-gradient-to-b from-primary/10 to-accent/5"
            : "border-border/30"
        } hover:border-primary/40 transition-all duration-300 group`}
      >
        {tier.badge && (
          <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
            <span className="bg-gradient-to-r from-primary to-accent text-white px-4 py-1 rounded-full text-sm font-semibold">
              {tier.badge}
            </span>
          </div>
        )}

        <div className="text-center mb-6">
          <motion.div
            className={`w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center ${
              tier.highlighted
                ? "text-primary bg-gradient-to-r from-primary/20 to-accent/20"
                : "text-foreground bg-muted/20"
            }`}
            whileHover={{ scale: 1.1, rotate: 5 }}
            transition={{ duration: 0.3 }}
          >
            <IconComponent className="h-8 w-8 text-inherit" aria-hidden="true" />
          </motion.div>

          <h3 className="text-2xl font-bold text-foreground mb-2">{tier.name}</h3>
          <p className="text-muted-foreground text-sm mb-4">{tier.description}</p>

          <div className="mb-6">
            <div className="flex items-baseline justify-center">
              <span className="text-4xl font-bold text-foreground">{tier.price}</span>
              {tier.period !== "pricing" && (
                <span className="text-muted-foreground ml-2">/{tier.period}</span>
              )}
            </div>
            {tier.subscriptionPrice && (
              <div className="text-sm text-muted-foreground mt-2">
                {tier.subscriptionPrice}
              </div>
            )}
          </div>
        </div>

        <ul className="space-y-3 mb-8 flex-grow">
          {tier.features.map((feature, featureIndex) => (
            <motion.li
              key={featureIndex}
              className="flex items-start space-x-3"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 + featureIndex * 0.05 }}
            >
              <Check
                className="h-5 w-5 text-primary flex-shrink-0 mt-0.5"
                aria-hidden="true"
              />
              <span
                className={`text-sm ${
                  feature.startsWith("**") && feature.endsWith("**")
                    ? "font-bold text-accent"
                    : "text-foreground/80"
                }`}
              >
                {feature.replace(/\*\*/g, "")}
              </span>
            </motion.li>
          ))}
        </ul>

        <Button
          onClick={onContactClick}
          className={buttonClassesForTier(tier)}
          type="button"
          aria-label={tier.buttonText}
        >
          {tier.buttonText}
        </Button>
      </GlassCard>
    </MotionContainer>
  );
}

interface PricingProps {
  onContactClick: () => void;
  className?: string;
}

export function Pricing({ onContactClick, className }: PricingProps) {
  return (
    <section id="pricing" className={`py-20 px-4 sm:px-6 lg:px-8 ${className}`}>
      <div className="max-w-7xl mx-auto">
        <MotionContainer className="text-center mb-16">
          <motion.h2
            className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent leading-tight"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Simple, Transparent Pricing
          </motion.h2>
          <motion.p
            className="text-xl text-muted-foreground max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            Choose the perfect plan for your business. All plans include our core
            AI technology and dedicated support.
          </motion.p>
        </MotionContainer>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-6">
          {pricingTiers.map((tier, index) => (
            <PricingCard
              key={tier.name}
              tier={tier}
              index={index}
              onContactClick={onContactClick}
            />
          ))}
        </div>

        {/* Additional Info */}
        <MotionContainer className="text-center mt-16">
          <motion.div
            className="glass-card p-8 rounded-2xl"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <h3 className="text-2xl font-bold text-foreground mb-4">
              All Plans Include
            </h3>
            <div className="grid md:grid-cols-3 gap-6 text-center">
              {[
                {
                  icon: ShieldCheck,
                  title: "Security & Compliance",
                  desc: "Enterprise-grade security",
                },
                {
                  icon: Rocket,
                  title: "Fast Deployment",
                  desc: "1–2 weeks delivery",
                },
                {
                  icon: Headphones,
                  title: "Ongoing Support",
                  desc: "Dedicated support team",
                },
              ].map((item, index) => {
                const Icon = item.icon;
                return (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 + index * 0.1 }}
                    className="text-foreground"
                  >
                    <Icon
                      className="w-8 h-8 text-inherit mx-auto mb-2"
                      aria-hidden="true"
                    />
                    <h4 className="font-semibold mb-1">{item.title}</h4>
                    <p className="text-muted-foreground text-sm">{item.desc}</p>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </MotionContainer>
      </div>
    </section>
  );
}
