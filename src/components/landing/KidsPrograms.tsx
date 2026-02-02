import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Baby, Activity, Medal, Star, ChevronRight, Heart, Zap, Moon, Target, Music, Dumbbell, Users } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Skeleton } from "@/components/ui/skeleton";
import kidsImage from "@/assets/kids-neurofitness-new.jpg";

interface Program {
  id: string;
  title: string;
  description: string;
  icon: string | null;
  color: string | null;
  sort_order: number;
}

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Activity, Medal, Heart, Zap, Moon, Target, Music, Dumbbell, Users, Star, Baby
};

const fallbackPrograms = [
  { id: "1", title: "ОФП + нейрофитнес", description: "Тренировки для общего физического и ментального развития", icon: "Activity", color: "from-primary to-orange-light", sort_order: 1 },
  { id: "2", title: "Гонки с препятствиями", description: "Соревновательная подготовка с элементами полосы препятствий", icon: "Medal", color: "from-mint-dark to-mint", sort_order: 2 },
  { id: "3", title: "Оздоровительная гимнастика", description: "Укрепление здоровья и правильная осанка", icon: "Heart", color: "from-pink-400 to-pink-300", sort_order: 3 },
];

export const KidsPrograms = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [programs, setPrograms] = useState<Program[]>(fallbackPrograms);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPrograms = async () => {
      const { data, error } = await supabase
        .from("programs")
        .select("*")
        .eq("category", "kids")
        .order("sort_order");

      if (!error && data && data.length > 0) {
        setPrograms(data);
      }
      setIsLoading(false);
    };

    fetchPrograms();
  }, []);

  return (
    <section id="kids" className="py-10 md:py-20 bg-card relative overflow-hidden" ref={ref}>
      {/* Decorative elements - hidden on mobile */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-mint/30 rounded-full blur-3xl hidden md:block" />
      <div className="absolute bottom-0 left-0 w-48 h-48 bg-orange/10 rounded-full blur-2xl hidden md:block" />

      <div className="container mx-auto px-4 relative z-10">
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
            className="inline-flex items-center gap-1.5 bg-mint rounded-full px-3 py-1 mb-3 md:mb-4"
          >
            <Baby className="w-3.5 h-3.5 md:w-4 md:h-4 text-primary" />
            <span className="font-semibold text-foreground text-xs md:text-sm">Для детей</span>
          </motion.div>

          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-heading font-black mb-2">
            <span className="text-foreground">Детские </span>
            <span className="text-primary">направления</span>
          </h2>
          <p className="text-xs sm:text-sm md:text-base text-muted-foreground max-w-xl mx-auto">
            Тренировки для общего физического и ментального развития
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-6 md:gap-10 items-center">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative order-2 lg:order-1"
          >
            <motion.div
              className="rounded-xl md:rounded-2xl overflow-hidden shadow-xl"
              whileHover={{ scale: 1.02 }}
            >
              <img
                src={kidsImage}
                alt="Детские занятия нейрофитнесом в Big Fitness"
                className="w-full h-auto object-cover aspect-[4/3]"
              />
            </motion.div>

            {/* Age badge */}
            <motion.div
              className="absolute -bottom-2 -right-2 md:-bottom-4 md:-right-4 bg-primary rounded-lg md:rounded-xl p-2 md:p-4 shadow-orange"
              animate={{ rotate: [-3, 3, -3] }}
              transition={{ duration: 4, repeat: Infinity }}
            >
              <p className="text-xl md:text-3xl font-heading font-black text-primary-foreground">4-14</p>
              <p className="text-[10px] md:text-xs text-primary-foreground/80">лет</p>
            </motion.div>
          </motion.div>

          {/* Programs list */}
          <div className="space-y-3 md:space-y-4 order-1 lg:order-2">
            {isLoading ? (
              <>
                {[1, 2, 3].map((i) => (
                  <Skeleton key={i} className="h-20 w-full rounded-xl" />
                ))}
              </>
            ) : (
              programs.map((program, index) => {
                const IconComponent = iconMap[program.icon || "Activity"] || Activity;
                const colorClass = program.color || "from-primary to-orange-light";
                
                return (
                  <motion.div
                    key={program.id}
                    initial={{ opacity: 0, x: 50 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.4 + index * 0.15 }}
                    className="group"
                  >
                    <div className="bg-card border-2 border-mint rounded-lg md:rounded-xl p-3 md:p-4 flex gap-3 items-center hover:border-primary transition-all duration-300">
                      <div className={`w-10 h-10 md:w-12 md:h-12 rounded-lg bg-gradient-to-br ${colorClass} flex items-center justify-center flex-shrink-0`}>
                        <IconComponent className="w-5 h-5 md:w-6 md:h-6 text-primary-foreground" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-sm md:text-base font-heading font-bold text-foreground">{program.title}</h3>
                        <p className="text-xs md:text-sm text-muted-foreground line-clamp-1">{program.description}</p>
                      </div>
                      <ChevronRight className="w-4 h-4 text-primary flex-shrink-0" />
                    </div>
                  </motion.div>
                );
              })
            )}

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.9 }}
              className="pt-2"
            >
              <Button variant="hero" size="lg" className="w-full text-sm">
                Записаться на пробное бесплатное занятие
              </Button>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};
