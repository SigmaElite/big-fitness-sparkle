import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Menu, X, Phone, MapPin, Smartphone, Send } from "lucide-react";
import { useState } from "react";

const navLinks = [
  { href: "#kids", label: "Детям" },
  { href: "#adults", label: "Взрослым" },
  { href: "#about", label: "О нас" },
  { href: "#contacts", label: "Контакты" },
];

const scrollToForm = () => {
  const contactSection = document.getElementById("contacts");
  if (contactSection) {
    contactSection.scrollIntoView({ behavior: "smooth" });
  }
};

export const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-50 bg-card/90 backdrop-blur-md shadow-soft"
    >
      {/* Top bar with address and app buttons - hidden on mobile */}
      <div className="bg-primary/10 py-2 hidden lg:block">
        <div className="container mx-auto px-4 flex items-center justify-between text-sm">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2 text-foreground/80">
              <MapPin className="w-4 h-4 text-primary" />
              <span>Новая Боровая, Камова, 7а</span>
            </div>
            <a
              href="tel:+375295060605"
              className="flex items-center gap-2 text-foreground/80 hover:text-primary transition-colors"
            >
              <Phone className="w-4 h-4 text-primary" />
              <span className="font-semibold">+375 29 506 06 05</span>
            </a>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-foreground/60 flex items-center gap-2">
              <Smartphone className="w-4 h-4" />
              Скачайте приложение:
            </span>
            <a
              href="https://apps.apple.com/app/big-fitness"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 bg-foreground text-card px-3 py-1 rounded-lg hover:bg-foreground/90 transition-colors"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
              </svg>
              <span className="text-xs font-medium">App Store</span>
            </a>
            <a
              href="https://play.google.com/store/apps/details?id=com.bigfitness"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 bg-foreground text-card px-3 py-1 rounded-lg hover:bg-foreground/90 transition-colors"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.53,12.9 20.18,13.18L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z"/>
              </svg>
              <span className="text-xs font-medium">Google Play</span>
            </a>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <motion.a
            href="#"
            className="flex items-center gap-2"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="w-10 h-10 lg:w-12 lg:h-12 rounded-xl lg:rounded-2xl bg-gradient-to-br from-orange to-orange-light flex items-center justify-center shadow-lg">
              <span className="text-primary-foreground font-heading font-black text-lg lg:text-xl">BF</span>
            </div>
            <div className="hidden sm:block">
              <span className="font-heading font-bold text-lg lg:text-xl text-foreground">Big</span>
              <span className="font-heading font-bold text-lg lg:text-xl text-primary"> Fitness</span>
            </div>
          </motion.a>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link, index) => (
              <motion.a
                key={link.href}
                href={link.href}
                className="font-medium text-foreground/80 hover:text-primary transition-colors relative group"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full" />
              </motion.a>
            ))}
          </nav>

          {/* CTA Buttons */}
          <div className="hidden lg:flex items-center gap-4">
            <a
              href="https://t.me/+375292788806"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-foreground/80 hover:text-primary transition-colors"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
              </svg>
              <span className="font-semibold">Telegram</span>
            </a>
            <Button variant="hero" size="lg" className="text-sm" onClick={scrollToForm}>
              Записаться на пробное
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-2 lg:hidden">
            <a
              href="https://t.me/+375292788806"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-primary"
            >
              <Send className="w-5 h-5" />
            </a>
            <a
              href="tel:+375295060605"
              className="p-2 text-primary"
            >
              <Phone className="w-5 h-5" />
            </a>
            <button
              className="p-2 text-foreground"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <motion.nav
          initial={false}
          animate={isOpen ? { height: "auto", opacity: 1 } : { height: 0, opacity: 0 }}
          className="lg:hidden overflow-hidden"
        >
          <div className="py-4 flex flex-col gap-3">
            <div className="flex items-center gap-2 text-foreground/80 text-sm pb-2 border-b border-border">
              <MapPin className="w-4 h-4 text-primary flex-shrink-0" />
              <span>Новая Боровая, Камова, 7а</span>
            </div>
            <a href="tel:+375295060605" className="flex items-center gap-2 text-foreground/80 pb-2 border-b border-border">
              <Phone className="w-4 h-4 text-primary flex-shrink-0" />
              <span className="font-semibold">+375 29 506 06 05</span>
            </a>
            
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="font-medium text-foreground/80 hover:text-primary transition-colors py-2"
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </a>
            ))}
            
            {/* Telegram link for mobile */}
            <a
              href="https://t.me/+375292788806"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-foreground/80 hover:text-primary transition-colors py-2"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
              </svg>
              <span className="font-semibold">Написать в Telegram</span>
            </a>
            
            <div className="flex gap-2 pt-2">
              <a
                href="https://apps.apple.com/app/big-fitness"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 bg-foreground text-card px-3 py-2.5 rounded-lg flex-1 justify-center"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                </svg>
                <span className="text-xs font-medium">App Store</span>
              </a>
              <a
                href="https://play.google.com/store/apps/details?id=com.bigfitness"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 bg-foreground text-card px-3 py-2.5 rounded-lg flex-1 justify-center"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.53,12.9 20.18,13.18L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z"/>
                </svg>
                <span className="text-xs font-medium">Google Play</span>
              </a>
            </div>
            <Button variant="hero" size="lg" className="mt-2 text-sm" onClick={() => { setIsOpen(false); scrollToForm(); }}>
              Записаться на пробное занятие
            </Button>
          </div>
        </motion.nav>
      </div>
    </motion.header>
  );
};
