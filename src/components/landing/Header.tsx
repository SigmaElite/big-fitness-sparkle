import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Menu, X, Phone, Clock, MapPin } from "lucide-react";
import { useState } from "react";

const navLinks = [
  { href: "#programs", label: "Направления" },
  { href: "#kids", label: "Детям" },
  { href: "#adults", label: "Взрослым" },
  { href: "#about", label: "О нас" },
  { href: "#contacts", label: "Контакты" },
];

export const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-50 bg-card border-b border-border"
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20 lg:h-24">
          {/* Logo */}
          <motion.a
            href="#"
            className="flex items-center gap-3"
            whileHover={{ scale: 1.02 }}
          >
            <div className="w-14 h-14 border-2 border-primary rounded-lg flex items-center justify-center">
              <div className="text-center">
                <span className="font-heading font-black text-lg text-foreground tracking-widest">BIG</span>
                <div className="text-[8px] text-muted-foreground tracking-[0.2em]">FITNESS</div>
              </div>
            </div>
          </motion.a>

          {/* Center - Description */}
          <div className="hidden lg:block text-center flex-1 px-8">
            <p className="text-foreground font-medium">Фитнес-клуб</p>
            <p className="text-muted-foreground text-sm">
              с профессиональными инструкторами для любого возраста и уровня подготовки
            </p>
          </div>

          {/* Right side - Contact */}
          <div className="hidden lg:flex items-center gap-6">
            <div className="text-right">
              <a href="tel:+375291234567" className="text-xl font-bold text-foreground hover:text-primary transition-colors">
                +375 (29) 123-45-67
              </a>
              <div className="flex items-center justify-end gap-4 text-xs text-muted-foreground mt-1">
                <span className="flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  08:00 - 22:00 (пн-вс)
                </span>
              </div>
              <div className="flex items-center justify-end gap-1 text-xs text-primary mt-1">
                <MapPin className="w-3 h-3" />
                <span>ЖК Новая Боровая</span>
              </div>
            </div>
            <Button variant="outline" size="sm" className="border-2 border-foreground hover:bg-foreground hover:text-card">
              Заказать звонок
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2 text-foreground"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        <motion.nav
          initial={false}
          animate={isOpen ? { height: "auto", opacity: 1 } : { height: 0, opacity: 0 }}
          className="lg:hidden overflow-hidden"
        >
          <div className="py-4 flex flex-col gap-4 border-t border-border">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="font-medium text-foreground hover:text-primary transition-colors py-2"
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </a>
            ))}
            <div className="pt-4 border-t border-border">
              <a href="tel:+375291234567" className="text-lg font-bold text-foreground">
                +375 (29) 123-45-67
              </a>
              <p className="text-xs text-muted-foreground mt-1">08:00 - 22:00 (пн-вс)</p>
            </div>
          </div>
        </motion.nav>
      </div>
    </motion.header>
  );
};
