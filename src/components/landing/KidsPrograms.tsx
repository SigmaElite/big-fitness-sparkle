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
    <section id="kids" className="py-16 md:py-24 bg-card relative overflow-hidden max-w-full" ref={ref}>
      {/* Decorative elements - hidden on mobile to prevent overflow */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-mint/30 rounded-full blur-3xl hidden md:block" />
      <div className="absolute bottom-0 left-0 w-48 h-48 bg-orange/10 rounded-full blur-2xl hidden md:block" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-8 md:mb-16"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={isInView ? { scale: 1 } : {}}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="inline-flex items-center gap-2 bg-mint rounded-full px-3 py-1.5 md:px-4 md:py-2 mb-4 md:mb-6"
          >
            <Baby className="w-4 h-4 md:w-5 md:h-5 text-primary" />
            <span className="font-semibold text-foreground text-sm md:text-base">Для детей</span>
          </motion.div>

          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-heading font-black mb-3 md:mb-4">
            <span className="text-foreground">Детские </span>
            <span className="text-primary">направления</span>
          </h2>
          <p className="text-sm md:text-lg text-muted-foreground max-w-2xl mx-auto px-4">
            Тренировки для общего физического и ментального развития
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 md:gap-12 items-center">
          {/* Image - no x animation on mobile */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative order-2 lg:order-1 overflow-hidden"
          >
            <motion.div
              className="rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl"
              whileHover={{ scale: 1.02 }}
            >
              <img
                src={kidsImage}
                alt="Детские занятия нейрофитнесом в Big Fitness"
                className="w-full h-auto object-cover aspect-[4/3]"
              />
            </motion.div>

            {/* Floating stars - hidden on mobile */}
            <div className="hidden md:block">
              {[...Array(5)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute"
                  style={{
                    top: `${20 + i * 15}%`,
                    left: i % 2 === 0 ? "-5%" : "95%",
                  }}
                  animate={{
                    y: [0, -10, 0],
                    rotate: [0, 180, 360],
                  }}
                  transition={{
                    duration: 3 + i,
                    repeat: Infinity,
                    delay: i * 0.3,
                  }}
                >
                  <Star className="w-6 h-6 text-primary fill-primary" />
                </motion.div>
              ))}
            </div>

            {/* Age badge - positioned inside on mobile */}
            <motion.div
              className="absolute -bottom-2 -right-2 md:-bottom-6 md:-right-6 bg-primary rounded-xl md:rounded-2xl p-2 md:p-6 shadow-orange"
              animate={{ rotate: [-3, 3, -3] }}
              transition={{ duration: 4, repeat: Infinity }}
            >
              <p className="text-xl md:text-4xl font-heading font-black text-primary-foreground">4-14</p>
              <p className="text-[10px] md:text-sm text-primary-foreground/80">лет</p>
            </motion.div>
          </motion.div>

          {/* Programs list */}
          <div className="space-y-3 md:space-y-6 order-1 lg:order-2 overflow-hidden lg:overflow-visible lg:py-2 lg:-my-2 lg:px-2 lg:-mx-2">
            {isLoading ? (
              <>
                {[1, 2, 3].map((i) => (
                  <Skeleton key={i} className="h-24 w-full rounded-2xl" />
                ))}
              </>
            ) : (
              programs.map((program, index) => {
                const IconComponent = iconMap[program.icon || "Activity"] || Activity;
                const colorClass = program.color || "from-primary to-orange-light";
                
                  return (
                    <motion.div
                      key={program.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={isInView ? { opacity: 1, y: 0 } : {}}
                      transition={{ duration: 0.6, delay: 0.4 + index * 0.15 }}
                      className="group"
                    >
                      <motion.div
                        className="bg-card border-2 border-mint rounded-xl md:rounded-2xl p-3 md:p-6 flex gap-2 md:gap-4 items-start hover:border-primary hover:shadow-card transition-all duration-300"
                        whileHover={{ scale: 1.02 }}
                      >
                      <div className={`w-12 h-12 md:w-14 md:h-14 rounded-lg md:rounded-xl bg-gradient-to-br ${colorClass} flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform`}>
                        <IconComponent className="w-6 h-6 md:w-7 md:h-7 text-primary-foreground" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 md:gap-3 mb-1 md:mb-2 flex-wrap">
                          <h3 className="text-lg md:text-xl font-heading font-bold text-foreground">{program.title}</h3>
                        </div>
                        <p className="text-sm md:text-base text-muted-foreground">{program.description}</p>
                      </div>
                      <ChevronRight className="w-4 h-4 md:w-5 md:h-5 text-primary group-hover:translate-x-1 transition-transform flex-shrink-0 mt-1" />
                    </motion.div>
                  </motion.div>
                );
              })
            )}

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.9 }}
              className="pt-2 md:pt-4"
            >
              <a href="#contacts" className="inline-block w-full sm:w-auto">
                <Button variant="hero" size="lg" className="w-full sm:w-auto text-xs sm:text-sm md:text-base">
                  Записаться на пробное занятие
                </Button>
              </a>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};
