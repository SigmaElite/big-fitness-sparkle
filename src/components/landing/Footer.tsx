import { motion } from "framer-motion";
import { Heart, Smartphone } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="bg-mint text-foreground py-6 md:py-10 overflow-x-hidden w-full max-w-full">
      <div className="container mx-auto px-3 sm:px-4 max-w-full">
        <div className="flex flex-col gap-4 md:gap-6 w-full">
          {/* Top row */}
          <div className="flex flex-col items-center gap-4">
            {/* Logo */}
            <motion.div
              className="flex items-center gap-2"
              whileHover={{ scale: 1.05 }}
            >
              <div className="w-8 h-8 md:w-9 md:h-9 rounded-lg bg-gradient-to-br from-orange to-orange-light flex items-center justify-center">
                <span className="text-primary-foreground font-heading font-black text-sm md:text-base">BF</span>
              </div>
              <span className="font-heading font-bold text-sm md:text-base text-foreground">Big Fitness</span>
            </motion.div>

            {/* App download buttons */}
            <div className="flex flex-wrap items-center justify-center gap-2">
              <span className="text-foreground/60 flex items-center gap-1 text-[10px] md:text-xs">
                <Smartphone className="w-3 h-3" />
                Приложение:
              </span>
              <a
                href="https://apps.apple.com/app/big-fitness"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 bg-foreground text-card px-2 py-1 rounded-md hover:bg-foreground/90 transition-colors"
              >
                <svg className="w-3 h-3" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                </svg>
                <span className="text-[9px] md:text-[10px] font-medium">App Store</span>
              </a>
              <a
                href="https://play.google.com/store/apps/details?id=com.bigfitness"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 bg-foreground text-card px-2 py-1 rounded-md hover:bg-foreground/90 transition-colors"
              >
                <svg className="w-3 h-3" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.53,12.9 20.18,13.18L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z"/>
                </svg>
                <span className="text-[9px] md:text-[10px] font-medium">Google Play</span>
              </a>
            </div>

            {/* Nav links */}
            <nav className="flex flex-wrap justify-center gap-3 md:gap-4">
              {["Направления", "Детям", "Взрослым", "О нас", "Контакты"].map((link) => (
                <a
                  key={link}
                  href={`#${link.toLowerCase()}`}
                  className="text-foreground/70 hover:text-primary transition-colors text-[10px] md:text-xs"
                >
                  {link}
                </a>
              ))}
            </nav>
          </div>

          {/* Divider */}
          <div className="border-t border-foreground/10" />

          {/* Bottom row */}
          <div className="flex flex-col items-center gap-2">
            {/* Legal links */}
            <div className="flex flex-wrap justify-center gap-3 text-[10px] md:text-xs">
              <a href="#" className="text-foreground/60 hover:text-primary transition-colors">
                Договор публичной оферты
              </a>
              <a href="#" className="text-foreground/60 hover:text-primary transition-colors">
                Политика конфиденциальности
              </a>
            </div>

            {/* Copyright */}
            <div className="flex items-center gap-1.5 text-foreground/60 text-[10px] md:text-xs">
              <span>© 2026 Big Fitness</span>
              <Heart className="w-3 h-3 text-primary fill-primary" />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
