'use client';

import { motion } from 'framer-motion';
import { Twitter, Linkedin, Github, Facebook, Instagram } from 'lucide-react';
import { MotionContainer } from '@/components/animations/motion-container';
import Image from 'next/image';

const socialLinks = [
  { icon: Twitter, href: '#', label: 'Twitter' },
  { icon: Linkedin, href: '#', label: 'LinkedIn' },
  { icon: Github, href: '#', label: 'GitHub' },
  { icon: Facebook, href: '#', label: 'Facebook' },
  { icon: Instagram, href: '#', label: 'Instagram' },
];

interface SocialIconProps {
  icon: React.ElementType;
  href: string;
  label: string;
  index: number;
}

function SocialIcon({ icon: Icon, href, label, index }: SocialIconProps) {
  return (
    <motion.a
      href={href}
      aria-label={label}
      className="relative group w-12 h-12 rounded-xl bg-gradient-to-br from-background/50 to-background/20 border border-primary/10 backdrop-blur-sm flex items-center justify-center hover:border-primary/30 transition-all duration-300 shadow-lg hover:shadow-xl"
      whileHover={{ scale: 1.1, y: -2 }}
      whileTap={{ scale: 0.95 }}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-accent/20 rounded-xl opacity-0 group-hover:opacity-100 transition-all duration-300 blur-sm" />

      <Icon className="relative z-10 h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors duration-300" />

      <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 px-2 py-1 bg-background/90 backdrop-blur-sm border border-border/50 rounded-md text-xs font-medium opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none">
        {label}
      </div>
    </motion.a>
  );
}

export function Footer() {
  return (
    <footer className="relative bg-gradient-to-b from-background to-secondary/20 border-t border-border/50">
      <div className="absolute inset-0 bg-grid-white/[0.02] bg-grid-16" />
      <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-16">
          <div className="max-w-4xl mx-auto">
            <MotionContainer className="text-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="space-y-8"
              >
                <div className="flex flex-col items-center justify-center space-y-4">
                  <motion.div
                    className="relative group"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.4, ease: 'easeOut' }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-primary/30 to-accent/30 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-all duration-500 scale-110" />

                    <div className="relative w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/20 via-background to-accent/20 flex items-center justify-center border border-primary/20 backdrop-blur-sm shadow-lg">
                      <div className="absolute inset-[1px] rounded-2xl bg-gradient-to-br from-background/50 to-background/80 backdrop-blur-sm" />
                      <div className="relative z-10 w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-md">
                        <Image
                          src="/alternative-logo.png"
                          alt="BinggBot Logo"
                          width={24}
                          height={24}
                          className="w-6 h-6 object-contain filter brightness-110 drop-shadow-sm"
                        />
                      </div>
                    </div>
                  </motion.div>

                  <div className="text-center space-y-2">
                    <motion.h2
                      className="text-4xl md:text-5xl font-bold tracking-tight bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent px-1 pb-2 overflow-visible"
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      transition={{ delay: 0.2 }}
                      style={{
                        WebkitBackgroundClip: 'text',
                        backgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        color: '#3b3b3b',
                        textShadow: '0 0 30px rgba(0,0,0,0.08)',
                        lineHeight: 1.25,
                        padding: '0 2px',
                        paddingBottom: '10px',
                        overflow: 'visible',
                        display: 'inline-block',
                      }}
                    >
                      BinggBot
                    </motion.h2>

                    <motion.p
                      className="text-sm font-medium text-muted-foreground/80 tracking-wide uppercase"
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      transition={{ delay: 0.3 }}
                    >
                      AI-Powered Conversations
                    </motion.p>
                  </div>
                </div>

                <motion.div
                  className="max-w-3xl mx-auto text-center space-y-4"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  <p className="text-lg md:text-xl leading-relaxed text-muted-foreground font-light">
                    Transforming businesses with intelligent AI chatbots.
                  </p>
                  <p className="text-base leading-relaxed text-muted-foreground/80">
                    Automate support, increase engagement, and grow your business with our advanced conversational AI.
                  </p>

                  <div className="flex flex-wrap justify-center gap-4 mt-6">
                    {['24/7 Support', 'Multi-Language', 'Easy Integration', 'Analytics'].map(
                      (feature, index) => (
                        <motion.span
                          key={feature}
                          className="px-3 py-1 text-xs font-medium bg-primary/10 text-primary rounded-full border border-primary/20"
                          initial={{ opacity: 0, scale: 0.8 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.5 + index * 0.1 }}
                        >
                          {feature}
                        </motion.span>
                      )
                    )}
                  </div>
                </motion.div>

                <motion.div
                  className="pt-4"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ delay: 0.6 }}
                >
                  <p className="text-sm text-muted-foreground/60 mb-6 font-medium">
                    Connect with us
                  </p>
                  <div className="flex justify-center space-x-4">
                    {socialLinks.map((social, index) => (
                      <SocialIcon
                        key={social.label}
                        icon={social.icon}
                        href={social.href}
                        label={social.label}
                        index={index}
                      />
                    ))}
                  </div>
                </motion.div>
              </motion.div>
            </MotionContainer>
          </div>
        </div>

        <motion.div
          className="border-t border-border/50 py-6"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} BinggBot. All rights reserved.
            </p>
            <div className="flex items-center space-x-6 text-sm text-muted-foreground">
              <button
                onClick={() =>
                  document.querySelector('#privacy')?.scrollIntoView({ behavior: 'smooth' })
                }
                className="hover:text-primary transition-colors"
              >
                Privacy Policy
              </button>
              <button
                onClick={() =>
                  document.querySelector('#terms')?.scrollIntoView({ behavior: 'smooth' })
                }
                className="hover:text-primary transition-colors"
              >
                Terms of Service
              </button>
              <button
                onClick={() =>
                  document.querySelector('#cookies')?.scrollIntoView({ behavior: 'smooth' })
                }
                className="hover:text-primary transition-colors"
              >
                Cookie Policy
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
