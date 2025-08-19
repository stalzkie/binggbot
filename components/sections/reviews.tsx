"use client";

import { motion } from "framer-motion";
import { MessagesSquare, Star } from "lucide-react";
import { InfiniteMovingCards } from "@/components/ui/infinite-moving-cards";
import { MotionContainer } from "@/components/animations/motion-container";
import { Users, Rocket, MessageSquare } from "lucide-react";

interface ReviewsProps {
  className?: string;
}

const testimonials = [
  {
    quote:
      "BinggBot transformed our customer service. The chatbot handles 80% of our inquiries automatically, and our response time improved dramatically. The team was professional and delivered exactly what we needed.",
    name: "Sarah Johnson",
    title: "CEO at TechStart Inc",
  },
  {
    quote:
      "Working with BinggBot was seamless. They understood our complex requirements and built a chatbot that integrates perfectly with our existing systems. Our conversion rate increased by 35%.",
    name: "Michael Chen",
    title: "Head of Operations at E-Commerce Solutions",
  },
  {
    quote:
      "The HIPAA-compliant chatbot they built for us has revolutionized how we handle patient inquiries. It's secure, intelligent, and our patients love the instant responses.",
    name: "Emily Rodriguez",
    title: "Digital Manager at Healthcare Plus",
  },
  {
    quote:
      "Impressive work on our financial advisory chatbot. The natural language processing is top-notch, and it handles complex financial queries with remarkable accuracy.",
    name: "David Thompson",
    title: "CTO at Financial Advisory Group",
  },
  {
    quote:
      "Our sales chatbot has been a game-changer. It qualifies leads perfectly and has increased our qualified lead generation by 60%. The ROI has been incredible.",
    name: "Lisa Park",
    title: "Marketing Director at Retail Innovations",
  },
  {
    quote:
      "The educational chatbot they created for our students is fantastic. It provides instant help with coursework and has significantly improved student satisfaction scores.",
    name: "James Wilson",
    title: "Product Manager at Education Tech",
  },
  {
    quote:
      "BinggBot's AI solution helped us reduce support costs by 45% while improving customer satisfaction. The implementation was smooth and the results were immediate.",
    name: "Maria Garcia",
    title: "Operations Director at ServicePro",
  },
  {
    quote:
      "The multilingual chatbot they developed for our global platform is exceptional. It handles customer queries in 12 languages with incredible accuracy.",
    name: "Alex Kumar",
    title: "VP of Technology at GlobalTech",
  },
];

export function Reviews({ className }: ReviewsProps) {
  return (
    <section className={`py-20 px-4 sm:px-6 lg:px-8 ${className}`}>
      <div className="max-w-7xl mx-auto">
        <MotionContainer className="text-center mb-16">
          <motion.h2
            className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            What Our Clients Say
          </motion.h2>
          <motion.p
            className="text-xl text-muted-foreground max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            Real reviews from businesses that improved their customer experience with our custom chatbots.
          </motion.p>

          <motion.div
            className="flex items-center justify-center mt-8 space-x-2"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            <div className="flex space-x-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star key={star} className="h-6 w-6 text-yellow-400 fill-current" />
              ))}
            </div>
            <span className="text-muted-foreground text-lg ml-4">
              5.0 out of 5 stars from 10+ happy clients
            </span>
          </motion.div>
        </MotionContainer>

        {/* Row 1: soft card (light) / subtle glass (dark) */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="mb-8"
        >
          <InfiniteMovingCards
            items={testimonials.slice(0, 4)}
            direction="right"
            speed="slow"
            pauseOnHover
            className="mb-4"
            cardClassName="
              /* Light */
              light:bg-card light:border light:border-border light:shadow-sm
              /* Dark */
              dark:bg-white/5 dark:backdrop-blur-md dark:border dark:border-border/30
            "
          />
        </motion.div>

        {/* Row 2: brighter light card / same dark treatment */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="mb-12"
        >
          <InfiniteMovingCards
            items={testimonials.slice(4, 8)}
            direction="left"
            speed="slow"
            pauseOnHover
            cardClassName="
              /* Light */
              light:bg-white light:border light:border-border light:shadow-md
              /* Dark */
              dark:bg-muted/20 dark:border dark:border-border/30
            "
          />
        </motion.div>

        <MotionContainer className="mt-20">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { number: "10+", label: "Happy Clients", icon: Users },
              { number: "98%", label: "Satisfaction Rate", icon: MessagesSquare },
              { number: "1-2", label: "Weeks Delivery", icon: Rocket },
              { number: "24/7", label: "Support", icon: MessageSquare },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1, type: "spring", damping: 20, stiffness: 300 }}
                className="text-center group"
              >
                <motion.div
                  className="text-4xl mb-2 text-primary mx-auto flex items-center justify-center"
                  whileHover={{ scale: 1.2, rotate: 10 }}
                  transition={{ duration: 0.3 }}
                >
                  <stat.icon className="w-10 h-10 text-inherit" aria-hidden="true" />
                </motion.div>

                <motion.div
                  className="text-3xl md:text-4xl font-bold text-primary mb-2 group-hover:scale-110 transition-transform"
                  whileInView={{ scale: [0.8, 1.1, 1] }}
                  transition={{ delay: index * 0.1 + 0.2, duration: 0.6 }}
                >
                  {stat.number}
                </motion.div>

                <div className="text-muted-foreground text-sm font-medium">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </MotionContainer>
      </div>
    </section>
  );
}
