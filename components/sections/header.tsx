"use client";

import { Home, Settings, Star, Phone, Rocket } from "lucide-react";
import { FloatingNav } from "@/components/ui/floating-navbar";

const navigationItems = [
  { name: "Home", link: "#home", icon: <Home className="h-4 w-4" /> },
  { name: "Process", link: "#process", icon: <Settings className="h-4 w-4" /> },
  { name: "Pricing", link: "#pricing", icon: <Star className="h-4 w-4" /> },
  { name: "Workflow", link: "#how-it-works", icon: <Rocket className="h-4 w-4" /> },
  { name: "Reviews", link: "#reviews", icon: <Star className="h-4 w-4" /> },
  { name: "Contact", link: "#contact", icon: <Phone className="h-4 w-4" /> },
];

export function Header() {
  return (
    <FloatingNav 
      navItems={navigationItems} 
      className="backdrop-blur-lg bg-background/80 border border-border/50 shadow-lg"
    />
  );
}
