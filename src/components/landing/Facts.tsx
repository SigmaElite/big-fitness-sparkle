import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Award, Calendar, Users, MapPin, Droplets, Settings, Baby, Dumbbell } from "lucide-react";
import { Button } from "@/components/ui/button";

const facts = [
  {
    icon: Award,
    title: "Профессиональные",
    subtitle: "сертифицированные инструкторы",
    description: "с опытом более 5 лет",
  },
  {
    icon: Calendar,
    title: "Удобное расписание",
    subtitle: "занятий для каждого",
    action: "СМОТРЕТЬ РАСПИСАНИЕ",
  },
  {
    icon: Users,
    title: "Маленькие группы",
    subtitle: "до 10 человек",
    description: "и индивидуальный подход",
  },
  {
    icon: MapPin,
    title: "Удобное расположение",
    subtitle: "ЖК Новая Боровая",
    description: "",
  },
  {
    icon: Droplets,
    title: "Душевые кабины",
    subtitle: "с горячей водой",
    description: "",
  },
  {
    icon: Settings,
    title: "Современное",
    subtitle: "качественное",
    description: "оборудование",
  },
];

export const Facts = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-20 bg-card relative" ref={ref}>
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-[1fr_2fr] gap-12 items-start">
          {/* Left side - Title and image */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-black text-foreground leading-tight mb-8">
              6 основных фактов
              <br />о фитнес-клубе
            </h2>
            
            {/* Logo */}
            <div className="flex items-center gap-3 mb-8">
              <div className="w-20 h-20 border-2 border-foreground flex items-center justify-center">
                <div className="text-center">
                  <span className="font-heading font-black text-xl tracking-widest">BIG</span>
                  <div className="text-[10px] text-muted-foreground tracking-[0.15em]">FITNESS CLUB</div>
                </div>
              </div>
            </div>

            {/* Decorative image placeholder */}
            <div className="relative">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: 0.3, duration: 0.6 }}
                className="grayscale"
              >
                <div className="w-64 h-80 bg-muted flex items-center justify-center">
                  <Dumbbell className="w-16 h-16 text-muted-foreground" />
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Right side - Facts grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {facts.map((fact, index) => (
              <motion.div
                key={fact.title}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                className="border-2 border-border p-6 hover:border-primary transition-colors group"
              >
                <div className="flex flex-col h-full">
                  <div className="flex-1">
                    <h3 className="font-heading font-bold text-foreground mb-1">
                      {fact.title}
                    </h3>
                    <p className="text-muted-foreground text-sm mb-1">
                      {fact.subtitle}
                    </p>
                    {fact.description && (
                      <p className="text-muted-foreground text-sm">
                        {fact.description}
                      </p>
                    )}
                    {fact.action && (
                      <button className="mt-3 text-sm font-bold text-foreground bg-primary/20 px-3 py-1 hover:bg-primary hover:text-primary-foreground transition-colors">
                        {fact.action}
                      </button>
                    )}
                  </div>
                  <div className="mt-4 flex justify-end">
                    <fact.icon className="w-12 h-12 text-muted-foreground/30 group-hover:text-primary/50 transition-colors" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Consultation CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8 }}
          className="mt-16 text-center"
        >
          <p className="text-lg text-muted-foreground mb-2">
            Получите бесплатную консультацию от
          </p>
          <p className="text-lg text-muted-foreground mb-6">
            сертифицированного специалиста и
            <br />
            <span className="font-bold text-foreground">основателя фитнес-клуба Big Fitness</span>
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center max-w-xl mx-auto">
            <input
              type="tel"
              placeholder="Введите ваш телефон"
              className="flex-1 px-4 py-3 border-2 border-border rounded-none bg-card text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none transition-colors"
            />
            <Button 
              variant="default" 
              size="lg" 
              className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-none font-bold"
            >
              ПОЛУЧИТЬ КОНСУЛЬТАЦИЮ!
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
