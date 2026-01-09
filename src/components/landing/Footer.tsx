import { motion } from "framer-motion";
import { Heart } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="bg-foreground text-card py-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo */}
          <motion.div
            className="flex items-center gap-2"
            whileHover={{ scale: 1.05 }}
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange to-orange-light flex items-center justify-center">
              <span className="text-primary-foreground font-heading font-black text-lg">BF</span>
            </div>
            <div>
              <span className="font-heading font-bold text-lg text-card">Big Fitness</span>
            </div>
          </motion.div>

          {/* Nav links */}
          <nav className="flex flex-wrap justify-center gap-6">
            {["Направления", "Детям", "Взрослым", "О нас", "Контакты"].map((link) => (
              <motion.a
                key={link}
                href={`#${link.toLowerCase()}`}
                className="text-card/70 hover:text-primary transition-colors text-sm"
                whileHover={{ y: -2 }}
              >
                {link}
              </motion.a>
            ))}
          </nav>

          {/* Copyright */}
          <div className="flex items-center gap-2 text-card/60 text-sm">
            <span>© 2024 Big Fitness</span>
            <Heart className="w-4 h-4 text-primary fill-primary" />
          </div>
        </div>
      </div>
    </footer>
  );
};
