import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { Dumbbell, Heart, Zap, Music, Sparkles, Users, Moon, Target } from "lucide-react";
import adultsImage from "@/assets/adults-training.jpg";

const programs = [
  { icon: Heart, title: "Йога", description: "Гармония тела и разума" },
  { icon: Zap, title: "Функциональный тренинг", description: "Сила и выносливость" },
  { icon: Music, title: "Танцы", description: "Зумба, хип-хоп, стрип-пластика" },
  { icon: Dumbbell, title: "Силовые тренировки", description: "Набор мышечной массы" },
  { icon: Target, title: "Кикбоксинг", description: "Боевые искусства и фитнес" },
  { icon: Moon, title: "Стретчинг", description: "Растяжка и гибкость" },
  { icon: Dumbbell, title: "Пилатес", description: "Укрепление мышц кора" },
  { icon: Users, title: "Персональные тренировки", description: "Индивидуальный подход" },
];

export const AdultPrograms = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="adults" className="py-16 md:py-24 bg-mint-light relative overflow-hidden" ref={ref}>
      {/* Animated background shapes */}
      <motion.div
        className="absolute top-20 right-10 w-24 md:w-32 h-24 md:h-32 bg-orange/10 rounded-full blur-2xl"
        animate={{ scale: [1, 1.3, 1], x: [0, 20, 0] }}
        transition={{ duration: 6, repeat: Infinity }}
      />
      <motion.div
        className="absolute bottom-20 left-10 w-32 md:w-48 h-32 md:h-48 bg-mint-dark/30 rounded-full blur-3xl"
        animate={{ scale: [1.2, 1, 1.2], y: [0, -30, 0] }}
        transition={{ duration: 8, repeat: Infinity }}
      />

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
            className="inline-flex items-center gap-2 bg-card rounded-full px-3 py-1.5 md:px-4 md:py-2 mb-4 md:mb-6 shadow-soft"
          >
            <Dumbbell className="w-4 h-4 md:w-5 md:h-5 text-primary" />
            <span className="font-semibold text-foreground text-sm md:text-base">Для взрослых</span>
          </motion.div>

          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-heading font-black mb-3 md:mb-4">
            <span className="text-foreground">Взрослые </span>
            <span className="text-primary">направления</span>
          </h2>
          <p className="text-sm md:text-lg text-muted-foreground max-w-2xl mx-auto px-4">
            Групповые и персональные тренировки. Тренажерного зала у нас нет.
          </p>
        </motion.div>

        {/* Programs grid - responsive */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-6 mb-10 md:mb-16">
          {programs.map((program, index) => (
            <motion.div
              key={program.title}
              initial={{ opacity: 0, y: 30, scale: 0.9 }}
              animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.2 + index * 0.08 }}
              whileHover={{ y: -10, scale: 1.05 }}
              className="group"
            >
              <div className="bg-card rounded-xl md:rounded-2xl p-4 md:p-6 h-full shadow-soft hover:shadow-card transition-all duration-300 border-2 border-transparent hover:border-primary">
                <motion.div
                  className="w-10 h-10 md:w-14 md:h-14 rounded-lg md:rounded-xl bg-gradient-to-br from-mint to-mint-dark flex items-center justify-center mb-2 md:mb-4 group-hover:bg-gradient-to-br group-hover:from-orange group-hover:to-orange-light transition-all duration-300"
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.5 }}
                >
                  <program.icon className="w-5 h-5 md:w-7 md:h-7 text-foreground group-hover:text-primary-foreground transition-colors" />
                </motion.div>
                <h3 className="font-heading font-bold text-sm md:text-lg text-foreground mb-1 md:mb-2">{program.title}</h3>
                <p className="text-xs md:text-sm text-muted-foreground hidden sm:block">{program.description}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Image and CTA */}
        <div className="grid lg:grid-cols-2 gap-8 md:gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="relative"
          >
            <motion.div
              className="rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl"
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
              className="absolute -top-3 -right-3 md:-top-6 md:-right-6 bg-card rounded-xl md:rounded-2xl p-2 md:p-4 shadow-card"
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              <p className="text-xl md:text-2xl font-heading font-bold text-primary">15+</p>
              <p className="text-xs md:text-sm text-muted-foreground">направлений</p>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-center lg:text-left"
          >
            <h3 className="text-xl sm:text-2xl md:text-3xl font-heading font-bold mb-4 md:mb-6 text-foreground">
              Индивидуальный подход
            </h3>
            <p className="text-sm md:text-lg text-muted-foreground mb-4 md:mb-6">
              Все занятия проходят в малых группах или индивидуально, чтобы тренер мог уделить внимание каждому.
            </p>
            <ul className="space-y-2 md:space-y-3 mb-6 md:mb-8">
              {["Персональные программы", "Опытные тренеры", "Удобное расписание", "Новые залы с шикарным видом"].map((item, i) => (
                <motion.li
                  key={item}
                  initial={{ opacity: 0, x: 20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.8 + i * 0.1 }}
                  className="flex items-center gap-2 md:gap-3 justify-center lg:justify-start"
                >
                  <div className="w-5 h-5 md:w-6 md:h-6 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
                    <Sparkles className="w-2.5 h-2.5 md:w-3 md:h-3 text-primary-foreground" />
                  </div>
                  <span className="text-sm md:text-base text-foreground font-medium">{item}</span>
                </motion.li>
              ))}
            </ul>
            <Button variant="hero" size="xl" className="text-sm md:text-base">
              Записаться на пробное бесплатное занятие
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
