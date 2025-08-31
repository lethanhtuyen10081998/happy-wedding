"use client";

import { TooltipProvider } from "@/components/ui/tooltip";
import { motion } from "framer-motion";
import { Heart } from "lucide-react";

export function DesktopSidebar() {
  return (
    <TooltipProvider>
      <motion.aside className="fixed left-0 top-0 w-full h-[100px]">
        <header className="sticky top-0 header-bg z-50">
          <div className="container mx-auto px-4 py-6 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Heart className="h-8 w-8 text-primary" />
              <h1 className="text-2xl font-serif font-bold text-foreground">
                Wedding Dreams
              </h1>
            </div>
            <nav className="hidden md:flex items-center space-x-6">
              <a
                href="#services"
                className="text-foreground hover:text-primary transition-colors"
              >
                Dịch vụ
              </a>
              <a
                href="#portfolio"
                className="text-foreground hover:text-primary transition-colors"
              >
                Portfolio
              </a>
              <a
                href="#about"
                className="text-foreground hover:text-primary transition-colors"
              >
                Về chúng tôi
              </a>
              <a
                href="#contact"
                className="text-foreground hover:text-primary transition-colors"
              >
                Liên hệ
              </a>
            </nav>
          </div>
        </header>
      </motion.aside>
    </TooltipProvider>
  );
}
