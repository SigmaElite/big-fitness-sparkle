import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Dumbbell, Heart, Zap, Music, Sparkles, Users, Moon, Target, Activity, Medal, Star, Baby } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Skeleton } from "@/components/ui/skeleton";
import adultsImage from "@/assets/adults-training.jpg";

interface Program {
  id: string;
  title: string;
  description: string;
  icon: string | null;
  sort_order: number;
}

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Activity, Medal, Heart, Zap, Moon, Target, Music, Dumbbell, Users, Star, Baby, Sparkles
};

const fallbackPrograms = [
  { id: "1", title: "Йога", description: "Гармония тела и разума", icon: "Heart", sort_order: 1 },
  { id: "2", title: "Функциональный тренинг", description: "Сила и выносливость", icon: "Zap", sort_order: 2 },
  { id: "3", title: "Танцы", description: "Зумба, хип-хоп, стрип-пластика", icon: "Music", sort_order: 3 },
  { id: "4", title: "Силовые тренировки", description: "Набор мышечной массы", icon: "Dumbbell", sort_order: 4 },
  { id: "5", title: "Кикбоксинг", description: "Боевые искусства и фитнес", icon: "Target", sort_order: 5 },
  { id: "6", title: "Стретчинг", description: "Растяжка и гибкость", icon: "Moon", sort_order: 6 },
  { id: "7", title: "Пилатес", description: "Укрепление мышц кора", icon: "Dumbbell", sort_order: 7 },
  { id: "8", title: "Персональные тренировки", description: "Индивидуальный подход", icon: "Users", sort_order: 8 },
];

export const AdultPrograms = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [programs, setPrograms] = useState<Program[]>(fallbackPrograms);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPrograms = async () => {
      const { data, error } = await supabase
        .from("programs")
        .select("*")
        .eq("category", "adults")
        .order("sort_order");

      if (!error && data && data.length > 0) {
        setPrograms(data);
      }
      setIsLoading(false);
    };

    fetchPrograms();
  }, []);

  return (
    <section id="adults" className="py-10 md:py-20 bg-mint-light relative overflow-x-hidden w-full max-w-full" ref={ref}>
      <div className="container mx-auto px-3 sm:px-4 relative z-10 max-w-full">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-6 md:mb-12"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={isInView ? { scale: 1 } : {}}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="inline-flex items-center gap-1.5 bg-card rounded-full px-3 py-1 mb-3 md:mb-4 shadow-soft"
          >
            <Dumbbell className="w-3.5 h-3.5 md:w-4 md:h-4 text-primary" />
            <span className="font-semibold text-foreground text-xs md:text-sm">Для взрослых</span>
          </motion.div>

          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-heading font-black mb-2">
            <span className="text-foreground">Взрослые </span>
            <span className="text-primary">направления</span>
          </h2>
          <p className="text-xs sm:text-sm md:text-base text-muted-foreground max-w-xl mx-auto">
            Групповые и персональные тренировки
          </p>
        </motion.div>

        {/* Programs grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-3 md:gap-4 mb-8 md:mb-12">
          {isLoading ? (
            <>
              {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                <Skeleton key={i} className="h-24 md:h-32 rounded-xl" />
              ))}
            </>
          ) : (
            programs.map((program, index) => {
              const IconComponent = iconMap[program.icon || "Heart"] || Heart;
              
              return (
                <motion.div
                  key={program.id}
                  initial={{ opacity: 0, y: 30, scale: 0.9 }}
                  animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
                  transition={{ duration: 0.5, delay: 0.2 + index * 0.05 }}
                  className="group"
                >
                  <div className="bg-card rounded-lg md:rounded-xl p-3 md:p-4 h-full shadow-soft border-2 border-transparent hover:border-primary transition-all duration-300">
                    <div className="w-8 h-8 md:w-10 md:h-10 rounded-lg bg-gradient-to-br from-mint to-mint-dark flex items-center justify-center mb-2 group-hover:from-orange group-hover:to-orange-light transition-all duration-300">
                      <IconComponent className="w-4 h-4 md:w-5 md:h-5 text-foreground group-hover:text-primary-foreground transition-colors" />
                    </div>
                    <h3 className="font-heading font-bold text-xs sm:text-sm md:text-base text-foreground leading-tight">{program.title}</h3>
                    <p className="text-[10px] sm:text-xs text-muted-foreground mt-1 leading-snug">{program.description}</p>
                  </div>
                </motion.div>
              );
            })
          )}
        </div>

        {/* Image and CTA */}
        <div className="grid lg:grid-cols-2 gap-6 md:gap-10 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="relative"
          >
            <motion.div
              className="rounded-xl md:rounded-2xl overflow-hidden shadow-xl"
              whileHover={{ scale: 1.02 }}
            >
              <img
                src={adultsImage}
                alt="Взрослые занятия в Big Fitness"
                className="w-full h-auto object-cover aspect-[4/3]"
              />
            </motion.div>

            {/* Badge */}
            <motion.div
              className="absolute -top-2 -right-2 md:-top-4 md:-right-4 bg-card rounded-lg md:rounded-xl p-2 md:p-3 shadow-card"
              animate={{ y: [0, -5, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              <p className="text-lg md:text-xl font-heading font-bold text-primary">15+</p>
              <p className="text-[10px] md:text-xs text-muted-foreground">направлений</p>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-center lg:text-left"
          >
            <h3 className="text-lg sm:text-xl md:text-2xl font-heading font-bold mb-3 text-foreground">
              Индивидуальный подход
            </h3>
            <p className="text-xs sm:text-sm md:text-base text-muted-foreground mb-4">
              Все занятия проходят в малых группах или индивидуально.
            </p>
            <ul className="space-y-2 mb-4">
              {["Персональные программы", "Опытные тренеры", "Удобное расписание"].map((item, i) => (
                <motion.li
                  key={item}
                  initial={{ opacity: 0, x: 20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.8 + i * 0.1 }}
                  className="flex items-center gap-2 justify-center lg:justify-start"
                >
                  <div className="w-5 h-5 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
                    <Sparkles className="w-2.5 h-2.5 text-primary-foreground" />
                  </div>
                  <span className="text-xs sm:text-sm text-foreground font-medium">{item}</span>
                </motion.li>
              ))}
            </ul>
            <Button variant="hero" size="lg" className="w-full sm:w-auto text-sm">
              Записаться на пробное бесплатное занятие
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
