import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles, Smartphone, Square, ShowerHead, Users } from "lucide-react";
import buildingImage from "@/assets/building-exterior.jpg";

export const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-gradient-hero pt-24 lg:pt-40 max-w-full">
      {/* Animated background shapes - hidden on mobile to prevent overflow */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none hidden md:block">
        <motion.div
          className="absolute -top-20 -right-20 w-96 h-96 bg-mint rounded-full opacity-60 blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            x: [0, 30, 0],
            y: [0, -20, 0],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute top-1/2 -left-20 w-80 h-80 bg-orange/20 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            x: [0, 20, 0],
          }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <div className="container mx-auto px-4 relative z-10 overflow-hidden">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Content - no x animation on mobile */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-center lg:text-left overflow-hidden"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="inline-flex items-center gap-2 bg-card/80 backdrop-blur-sm rounded-full px-3 py-1.5 md:px-4 md:py-2 shadow-soft mb-4 md:mb-6"
            >
              <Sparkles className="w-3 h-3 md:w-4 md:h-4 text-primary" />
              <span className="text-xs md:text-sm font-semibold text-foreground">Новая Боровая</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl xl:text-7xl font-heading font-black leading-tight mb-4 md:mb-6"
            >
              <span className="text-foreground">Фитнес для </span>
              <span className="text-primary">всей семьи</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="text-sm md:text-lg lg:text-xl text-muted-foreground mb-4 md:mb-5"
            >
              Групповые и индивидуальные занятия для взрослых и детей. 
              <span className="text-primary font-semibold"> ОФП и нейрофитнес для детей 4-14 лет</span>!
            </motion.p>

            {/* Family advantage */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.75 }}
              className="bg-mint/50 backdrop-blur-sm rounded-xl md:rounded-2xl p-3 md:p-4 mb-4 md:mb-5 border-2 border-primary/30"
            >
              <div className="flex items-start gap-2 md:gap-3">
                <div className="w-8 h-8 md:w-10 md:h-10 rounded-lg md:rounded-xl bg-primary flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Users className="w-4 h-4 md:w-5 md:h-5 text-primary-foreground" />
                </div>
                <div>
                  <p className="font-bold text-foreground text-sm md:text-base">Занимайтесь одновременно с ребёнком!</p>
                  <p className="text-xs md:text-sm text-muted-foreground">Во время детских тренировок всегда есть взрослая группа в соседнем зале. Ребёнок занимается в одном зале, вы — в другом</p>
                </div>
              </div>
            </motion.div>

            {/* App CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="bg-card/80 backdrop-blur-sm rounded-xl md:rounded-2xl p-3 md:p-4 mb-4 md:mb-6 border-2 border-primary/20"
            >
              <div className="flex items-center gap-2 md:gap-3 mb-2 md:mb-3">
                <div className="w-8 h-8 md:w-10 md:h-10 rounded-lg md:rounded-xl bg-primary flex items-center justify-center flex-shrink-0">
                  <Smartphone className="w-4 h-4 md:w-5 md:h-5 text-primary-foreground" />
                </div>
                <div>
                  <p className="font-bold text-foreground text-sm md:text-base">Запись через приложение Big Fitness</p>
                  <p className="text-xs md:text-sm text-muted-foreground">Скачайте и записывайтесь онлайн</p>
                </div>
              </div>
              <div className="flex gap-2">
                <a
                  href="https://apps.apple.com/app/big-fitness"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 md:gap-2 bg-foreground text-card px-3 md:px-4 py-2 rounded-lg md:rounded-xl hover:bg-foreground/90 transition-colors flex-1 justify-center"
                >
                  <svg className="w-4 h-4 md:w-5 md:h-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                  </svg>
                  <span className="font-medium text-xs md:text-sm">App Store</span>
                </a>
                <a
                  href="https://play.google.com/store/apps/details?id=com.bigfitness"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 md:gap-2 bg-foreground text-card px-3 md:px-4 py-2 rounded-lg md:rounded-xl hover:bg-foreground/90 transition-colors flex-1 justify-center"
                >
                  <svg className="w-4 h-4 md:w-5 md:h-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.53,12.9 20.18,13.18L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z"/>
                  </svg>
                  <span className="font-medium text-xs md:text-sm">Google Play</span>
                </a>
              </div>
            </motion.div>

            {/* CTA Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 }}
              className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center lg:justify-start"
            >
              <Button variant="hero" size="xl" className="group text-sm md:text-base">
                Записаться на пробное бесплатное занятие
                <ArrowRight className="w-4 h-4 md:w-5 md:h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </motion.div>

            {/* Stats - responsive grid */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.1 }}
              className="grid grid-cols-3 gap-3 md:gap-6 mt-8 md:mt-12"
            >
              {[
                { icon: Square, value: "630", label: "кв.м" },
                { icon: Sparkles, value: "4", label: "зала" },
                { icon: ShowerHead, value: "3", label: "душевых" },
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  className="text-center"
                  whileHover={{ scale: 1.1 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.2 + index * 0.1 }}
                >
                  <div className="inline-flex items-center justify-center w-10 h-10 md:w-12 md:h-12 rounded-xl md:rounded-2xl bg-mint mb-1 md:mb-2">
                    <stat.icon className="w-5 h-5 md:w-6 md:h-6 text-primary" />
                  </div>
                  <p className="text-xl md:text-2xl font-heading font-bold text-foreground">{stat.value}</p>
                  <p className="text-xs md:text-sm text-muted-foreground">{stat.label}</p>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Hero Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative hidden md:block"
          >
            <motion.div
              className="relative z-10 rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl max-w-md mx-auto"
              whileHover={{ scale: 1.02, rotate: 1 }}
              transition={{ duration: 0.3 }}
            >
              <img
                src={buildingImage}
                alt="Big Fitness - фитнес зал в Новой Боровой"
                className="w-full h-auto object-cover aspect-[3/4]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/20 to-transparent" />
            </motion.div>

            {/* Floating badges */}
            <motion.div
              className="absolute -top-2 md:-top-4 -left-2 md:-left-4 bg-card rounded-xl md:rounded-2xl p-2 md:p-4 shadow-card z-20"
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            >
              <Smartphone className="w-6 h-6 md:w-8 md:h-8 text-primary mb-0.5 md:mb-1" />
              <p className="text-xs md:text-sm font-bold text-foreground">Приложение</p>
              <p className="text-[10px] md:text-xs text-muted-foreground">Big Fitness</p>
            </motion.div>

            <motion.div
              className="absolute -bottom-2 md:-bottom-4 -right-2 md:-right-4 bg-primary rounded-xl md:rounded-2xl p-2 md:p-4 shadow-orange z-20"
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
            >
              <p className="text-2xl md:text-3xl font-heading font-black text-primary-foreground">4+</p>
              <p className="text-xs md:text-sm text-primary-foreground/80">лет детям</p>
            </motion.div>

            {/* Decorative element */}
            <motion.div
              className="absolute -z-10 -bottom-4 md:-bottom-8 -left-4 md:-left-8 w-full h-full bg-mint rounded-2xl md:rounded-3xl"
              animate={{ rotate: [3, 5, 3] }}
              transition={{ duration: 5, repeat: Infinity }}
            />
          </motion.div>
        </div>
      </div>

      {/* Wave decoration */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg
          viewBox="0 0 1440 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-auto"
          preserveAspectRatio="none"
        >
          <path
            d="M0 120L48 105C96 90 192 60 288 45C384 30 480 30 576 37.5C672 45 768 60 864 67.5C960 75 1056 75 1152 67.5C1248 60 1344 45 1392 37.5L1440 30V120H1392C1344 120 1248 120 1152 120C1056 120 960 120 864 120C768 120 672 120 576 120C480 120 384 120 288 120C192 120 96 120 48 120H0Z"
            fill="hsl(var(--card))"
          />
        </svg>
      </div>
    </section>
  );
};
