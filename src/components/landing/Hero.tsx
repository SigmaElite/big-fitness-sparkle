import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import heroImage from "@/assets/hero-fitness.jpg";

export const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center pt-24 lg:pt-28 bg-card overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-8 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="relative z-10"
          >
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-heading font-black leading-[1.1] mb-8"
            >
              <span className="text-primary">СДЕЛАЙ</span>
              <br />
              <span className="text-primary">СВОЁ ТЕЛО</span>
              <br />
              <span className="text-primary">ЗДОРОВЫМ И КРАСИВЫМ</span>
            </motion.h1>

            {/* Accent line */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="h-1 bg-mint-dark w-full max-w-md mb-10 origin-left"
            />

            {/* Form */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="max-w-md"
            >
              <p className="text-foreground text-sm mb-1">
                Запишитесь на пробное занятие
              </p>
              <p className="text-muted-foreground text-sm mb-4">
                до конца недели и получите абонемент
                <br />на первый месяц со <span className="font-bold text-foreground">СКИДКОЙ 20%</span>
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <input
                  type="tel"
                  placeholder="Введите ваш телефон"
                  className="flex-1 px-4 py-3 border-2 border-border rounded-none bg-card text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none transition-colors"
                />
                <Button 
                  variant="default" 
                  size="lg" 
                  className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-none font-bold tracking-wide"
                >
                  ПОДОБРАТЬ ВРЕМЯ ЗАНЯТИЙ
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </motion.div>
          </motion.div>

          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative"
          >
            <div className="relative">
              <img
                src={heroImage}
                alt="Big Fitness - фитнес зал"
                className="w-full h-auto object-cover"
              />
              {/* Decorative border */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="absolute -bottom-4 -right-4 w-full h-full border-2 border-primary -z-10"
              />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Bottom teal line */}
      <div className="absolute bottom-0 left-0 right-0 h-2 bg-mint-dark" />
    </section>
  );
};
