"use client";

import { motion } from "framer-motion";
import { 
  MessageSquare, 
  Brain, 
  Cog, 
  Rocket, 
  Users, 
  BarChart3,
  ArrowRight,
  CheckCircle
} from "lucide-react";
import { GlassCard } from "@/components/ui/glass-card";
import { MotionContainer } from "@/components/animations/motion-container";

interface WorkflowStep {
  id: number;
  title: string;
  description: string;
  icon: React.ElementType;
  details: string[];
  color: string;
}

const workflowSteps: WorkflowStep[] = [
  {
    id: 1,
    title: "Kickoff & Plan",
    description: "We learn your goals and map the chatbot.",
    icon: MessageSquare,
    color: "from-blue-500 to-cyan-500",
    details: [
      "Quick needs check",
      "Key questions to handle",
      "Channels to use (web/chat)",
      "Timeline & handoff"
    ]
  },
  {
    id: 2,
    title: "Chatbot Build",
    description: "We build your custom chatbot using your content.",
    icon: Brain,
    color: "from-purple-500 to-pink-500",
    details: [
      "Knowledge base setup",
      "Intents & replies",
      "Tone & branding",
      "Safety guardrails"
    ]
  },
  {
    id: 3,
    title: "Landing Page",
    description: "We create a clean, responsive page for your bot.",
    icon: Cog,
    color: "from-orange-500 to-red-500",
    details: [
      "Modern layout",
      "Clear CTA",
      "Embed chatbot",
      "Basic SEO"
    ]
  },
  {
    id: 4,
    title: "Dashboard Setup",
    description: "We set up your admin dashboard.",
    icon: Rocket,
    color: "from-green-500 to-emerald-500",
    details: [
      "Analytics view",
      "Upload/download knowledge",
      "Products: add/edit/delete",
      "Statuses & categories"
    ]
  },
  {
    id: 5,
    title: "Test & Launch",
    description: "We test, fix issues, and go live.",
    icon: Users,
    color: "from-indigo-500 to-blue-500",
    details: [
      "Function checks",
      "Content review",
      "Performance check",
      "Production launch"
    ]
  },
  {
    id: 6,
    title: "Monitor & Improve",
    description: "We track results and make updates.",
    icon: BarChart3,
    color: "from-teal-500 to-cyan-500",
    details: [
      "Usage reports",
      "Content tweaks",
      "Bug fixes",
      "Optional support"
    ]
  }
];

interface StepCardProps {
  step: WorkflowStep;
  index: number;
  isLast: boolean;
}

function StepCard({ step, index, isLast }: StepCardProps) {
  const IconComponent = step.icon;

  return (
    <div className="relative">
      <MotionContainer direction="up" delay={index * 0.15}>
        <GlassCard className="p-6 hover:border-primary/40 transition-all duration-300 group h-full">
          <div className="flex items-center justify-between mb-4">
            <motion.div
              className={`w-12 h-12 rounded-full bg-gradient-to-r ${step.color} flex items-center justify-center text-white font-bold text-lg`}
              whileHover={{ scale: 1.1, rotate: 5 }}
              transition={{ duration: 0.3 }}
            >
              {step.id}
            </motion.div>
            <motion.div
              className="p-3 rounded-full bg-gradient-to-r from-primary/20 to-accent/20"
              whileHover={{ scale: 1.1, rotate: -5 }}
              transition={{ duration: 0.3 }}
            >
              <IconComponent className="h-6 w-6 text-primary" />
            </motion.div>
          </div>

          {/* Content */}
          <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors">
            {step.title}
          </h3>
          <p className="text-muted-foreground mb-4 leading-relaxed">
            {step.description}
          </p>

          {/* Details */}
          <ul className="space-y-2">
            {step.details.map((detail, detailIndex) => (
              <motion.li
                key={detailIndex}
                className="flex items-center space-x-2 text-sm text-foreground/80"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 + detailIndex * 0.05 }}
              >
                <CheckCircle className="h-4 w-4 text-primary flex-shrink-0" />
                <span>{detail}</span>
              </motion.li>
            ))}
          </ul>
        </GlassCard>
      </MotionContainer>

      {!isLast && (
        <motion.div
          className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2 z-10"
          initial={{ opacity: 0, scale: 0 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ delay: index * 0.15 + 0.3 }}
        >
          <div className="w-8 h-8 bg-gradient-to-r from-primary to-accent rounded-full flex items-center justify-center">
            <ArrowRight className="h-4 w-4 text-white" />
          </div>
        </motion.div>
      )}
    </div>
  );
}

interface HowItWorksProps {
  className?: string;
}

export function HowItWorks({ className }: HowItWorksProps) {
  return (
    <section id="how-it-works" className={`py-20 px-4 sm:px-6 lg:px-8 ${className}`}>
      <div className="max-w-7xl mx-auto">
        <MotionContainer className="text-center mb-16">
          <motion.h2 
            className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent leading-tight"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            How Does It Work?
          </motion.h2>
          <motion.p 
            className="text-xl text-muted-foreground max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            Our simple 6-step process ensures your chatbot is built for your unqiue business needs and delivers great results.
          </motion.p>
        </MotionContainer>

        {/* Steps Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-6">
          {workflowSteps.map((step, index) => (
            <StepCard
              key={step.id}
              step={step}
              index={index}
              isLast={index === workflowSteps.length - 1}
            />
          ))}
        </div>

        {/* Timeline for Mobile */}
        <div className="lg:hidden mt-12">
          <MotionContainer>
            <div className="relative">
              <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary to-accent"></div>
              {workflowSteps.map((step, index) => (
                <motion.div
                  key={step.id}
                  className="relative flex items-center mb-8 last:mb-0"
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className={`w-12 h-12 rounded-full bg-gradient-to-r ${step.color} flex items-center justify-center text-white font-bold relative z-10`}>
                    {step.id}
                  </div>
                  <div className="ml-6">
                    <h4 className="font-semibold text-foreground">{step.title}</h4>
                    <p className="text-sm text-muted-foreground">{step.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </MotionContainer>
        </div>

        {/* Call to Action */}
        <MotionContainer className="text-center mt-16">
          <motion.div
            className="glass-card p-8 rounded-2xl"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <h3 className="text-2xl font-bold text-foreground mb-4">
              Ready to Get Started?
            </h3>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Our streamlined process ensures you get a high-quality, custom chatbot solution that fits your exact needs and budget.
            </p>
            <div className="flex flex-wrap justify-center gap-6 text-sm text-muted-foreground">
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-4 w-4 text-primary" />
                <span>1-2 weeks delivery</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-4 w-4 text-primary" />
                <span>Dedicated project manager</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-4 w-4 text-primary" />
                <span>Money-back guarantee</span>
              </div>
            </div>
          </motion.div>
        </MotionContainer>
      </div>
    </section>
  );
}
