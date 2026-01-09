import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { Baby, Activity, Medal, Star, Check } from "lucide-react";

const kidsPrograms = [
  {
    icon: Activity,
    title: "Детский ОФП",
    age: "от 4 лет",
    description: "Общая физическая подготовка для развития силы, выносливости и координации",
    benefits: [
      "Развитие всех физических качеств",
      "Формирование правильной осанки",
      "Укрепление иммунитета",
      "Игровая форма занятий",
    ],
  },
  {
    icon: Medal,
    title: "Спортивная гимнастика",
    age: "от 4 лет",
    description: "Профессиональные занятия гимнастикой с опытными тренерами",
    benefits: [
      "Развитие гибкости и пластичности",
      "Укрепление мышечного корсета",
      "Координация движений",
      "Подготовка к соревнованиям",
    ],
  },
];

export const KidsPrograms = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="kids" className="py-20 bg-mint-light relative overflow-hidden" ref={ref}>
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 mb-6">
            <Baby className="w-5 h-5" />
            <span className="font-bold text-sm">ДЕТСКИЕ НАПРАВЛЕНИЯ</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-black text-foreground mb-4">
            ЗАНЯТИЯ ДЛЯ ДЕТЕЙ ОТ 4 ЛЕТ
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Растим здоровых и активных детей! Профессиональные тренеры и безопасные залы
          </p>
        </motion.div>

        {/* Programs grid */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {kidsPrograms.map((program, index) => (
            <motion.div
              key={program.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 + index * 0.15 }}
              className="bg-card border-2 border-primary p-8"
            >
              <div className="flex items-start gap-4 mb-6">
                <div className="w-16 h-16 bg-primary flex items-center justify-center flex-shrink-0">
                  <program.icon className="w-8 h-8 text-primary-foreground" />
                </div>
                <div>
                  <h3 className="text-2xl font-heading font-bold text-foreground mb-1">
                    {program.title}
                  </h3>
                  <span className="inline-block bg-mint-dark text-foreground text-sm font-bold px-3 py-1">
                    {program.age}
                  </span>
                </div>
              </div>
              
              <p className="text-muted-foreground mb-6">{program.description}</p>
              
              <ul className="space-y-3">
                {program.benefits.map((benefit, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <Check className="w-5 h-5 text-primary flex-shrink-0" />
                    <span className="text-foreground">{benefit}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6 }}
          className="text-center"
        >
          <p className="text-lg text-foreground mb-4">
            Запишите ребёнка на пробное занятие
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
              ЗАПИСАТЬ РЕБЁНКА
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
