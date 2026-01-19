import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { Baby, Activity, Medal, Star, ChevronRight } from "lucide-react";
import kidsImage from "@/assets/kids-fitness.jpg";

const programs = [
  {
    icon: Activity,
    title: "Общая физическая подготовка + нейрофитнес",
    age: "4-14 лет",
    description: "Тренировки для общего физического и ментального развития, ОФП для профессиональных спортсменов",
    color: "from-primary to-orange-light",
  },
  {
    icon: Medal,
    title: "Гонки с препятствиями",
    age: "от 6 лет",
    description: "Соревновательная подготовка с элементами полосы препятствий",
    color: "from-mint-dark to-mint",
  },
];

export const KidsPrograms = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="kids" className="py-24 bg-card relative overflow-hidden" ref={ref}>
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-mint/30 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-48 h-48 bg-orange/10 rounded-full blur-2xl" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={isInView ? { scale: 1 } : {}}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="inline-flex items-center gap-2 bg-mint rounded-full px-4 py-2 mb-6"
          >
            <Baby className="w-5 h-5 text-primary" />
            <span className="font-semibold text-foreground">Для детей</span>
          </motion.div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-black mb-4">
            <span className="text-foreground">Детские </span>
            <span className="text-primary">направления</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Тренировки для общего физического и ментального развития, ОФП для профессиональных спортсменов
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative order-2 lg:order-1"
          >
            <motion.div
              className="rounded-3xl overflow-hidden shadow-2xl"
              whileHover={{ scale: 1.02 }}
            >
              <img
                src={kidsImage}
                alt="Детские занятия в Big Fitness"
                className="w-full h-auto object-cover aspect-[4/3]"
              />
            </motion.div>

            {/* Floating stars */}
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

            {/* Age badge */}
            <motion.div
              className="absolute -bottom-6 -right-6 bg-primary rounded-2xl p-6 shadow-orange"
              animate={{ rotate: [-3, 3, -3] }}
              transition={{ duration: 4, repeat: Infinity }}
            >
              <p className="text-4xl font-heading font-black text-primary-foreground">4-14</p>
              <p className="text-sm text-primary-foreground/80">лет</p>
            </motion.div>
          </motion.div>

          {/* Programs list */}
          <div className="space-y-6 order-1 lg:order-2">
            {programs.map((program, index) => (
              <motion.div
                key={program.title}
                initial={{ opacity: 0, x: 50 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.4 + index * 0.15 }}
                className="group"
              >
                <motion.div
                  className="bg-card border-2 border-mint rounded-2xl p-6 flex gap-4 items-start hover:border-primary hover:shadow-card transition-all duration-300"
                  whileHover={{ x: 10, scale: 1.02 }}
                >
                  <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${program.color} flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform`}>
                    <program.icon className="w-7 h-7 text-primary-foreground" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2 flex-wrap">
                      <h3 className="text-xl font-heading font-bold text-foreground">{program.title}</h3>
                      <span className="px-3 py-1 bg-mint rounded-full text-xs font-semibold text-foreground">{program.age}</span>
                    </div>
                    <p className="text-muted-foreground">{program.description}</p>
                  </div>
                  <ChevronRight className="w-5 h-5 text-primary group-hover:translate-x-1 transition-transform" />
                </motion.div>
              </motion.div>
            ))}

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.9 }}
              className="pt-4"
            >
              <Button variant="hero" size="xl" className="w-full sm:w-auto">
                Записаться на пробное бесплатное занятие
              </Button>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};
