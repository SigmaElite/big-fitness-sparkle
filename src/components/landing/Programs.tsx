import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { 
  Heart, Zap, Music, Dumbbell, Moon, Baby, Medal, Activity,
  Smile, ArrowRight, Check
} from "lucide-react";

const programCategories = [
  { id: "pilates", label: "ПИЛАТЕС" },
  { id: "functional", label: "ФУНКЦ.ТРЕНИНГ" },
  { id: "stretching", label: "СТРЕТЧИНГ" },
  { id: "yoga", label: "ЙОГАЛАТЕС" },
  { id: "strength", label: "СИЛОВЫЕ" },
  { id: "kids-ofp", label: "ДЕТСКИЙ ОФП" },
  { id: "kids-gym", label: "ГИМНАСТИКА" },
];

const programDetails: Record<string, {
  title: string;
  benefits: string[];
  icon: typeof Heart;
}> = {
  pilates: {
    title: "Пилатес",
    icon: Heart,
    benefits: [
      "доступен каждому, независимо от возраста и уровня физической подготовки",
      "способствует повышению гибкости",
      "уникальная возможность познать собственный организм",
      "борется со стрессом и помогает развить позитивное отношение к жизни",
      "создает силу без массы",
      "улучшение осанки",
      "улучшение координации и баланса",
      "работа большинства мышечных групп",
      "оздоровительный эффект",
    ],
  },
  functional: {
    title: "Функциональный тренинг",
    icon: Zap,
    benefits: [
      "сбалансированная фитнес-программа",
      "укрепление суставов",
      "улучшение координации и баланса",
      "максимально снижен риск получения травмы",
      "легкость и простота выполнения",
      "работа большинства мышечных групп",
      "оздоровительный эффект",
    ],
  },
  stretching: {
    title: "Стретчинг",
    icon: Moon,
    benefits: [
      "улучшение гибкости и подвижности суставов",
      "снятие мышечного напряжения",
      "профилактика травм",
      "улучшение осанки",
      "расслабление и снятие стресса",
      "улучшение кровообращения",
    ],
  },
  yoga: {
    title: "Йогалатес",
    icon: Smile,
    benefits: [
      "избавляет от болей в спине",
      "способствует похудению и укрепляет все мышцы",
      "улучшает гибкость и осанку",
      "способствует укреплению иммунитета",
      "избавляет от стресса",
      "подходит каждому, независимо от возраста и уровня подготовки",
    ],
  },
  strength: {
    title: "Силовые тренировки",
    icon: Dumbbell,
    benefits: [
      "укрепляет все ткани организма и улучшает функцию мозга",
      "способствует лечению метаболических заболеваний",
      "увеличивает продолжительность жизни",
      "улучшает качество сна, уменьшает стресс",
      "эффективная кардионагрузка, улучшает функцию сердца",
      "улучшает координацию и уменьшает время реакции",
    ],
  },
  "kids-ofp": {
    title: "Детский ОФП",
    icon: Activity,
    benefits: [
      "развитие силы, выносливости и координации",
      "формирование правильной осанки",
      "укрепление иммунитета",
      "развитие дисциплины и целеустремленности",
      "социализация в группе сверстников",
      "занятия от 4 лет",
      "игровая форма обучения",
    ],
  },
  "kids-gym": {
    title: "Спортивная гимнастика",
    icon: Medal,
    benefits: [
      "развитие гибкости и пластичности",
      "укрепление мышечного корсета",
      "развитие координации движений",
      "формирование красивой осанки",
      "подготовка к соревнованиям",
      "занятия от 4 лет",
      "профессиональные тренеры",
    ],
  },
};

export const Programs = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [activeProgram, setActiveProgram] = useState("pilates");
  const currentProgram = programDetails[activeProgram];

  return (
    <section id="programs" className="py-20 bg-card relative overflow-hidden" ref={ref}>
      {/* Decorative border */}
      <div className="absolute top-0 left-0 right-0 h-2 bg-primary" />
      <div className="absolute bottom-0 left-0 right-0 h-2 bg-primary" />

      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-black text-foreground leading-tight">
            ПОДБЕРИТЕ
            <br />
            НАПРАВЛЕНИЕ
            <br />
            ДЛЯ СЕБЯ
          </h2>
        </motion.div>

        {/* Program tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.3 }}
          className="flex flex-wrap gap-3 mb-12"
        >
          {programCategories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveProgram(cat.id)}
              className={`px-4 py-2 font-bold text-sm transition-all border-2 ${
                activeProgram === cat.id
                  ? "bg-primary text-primary-foreground border-primary"
                  : "bg-mint-dark text-foreground border-mint-dark hover:border-primary"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </motion.div>

        {/* Program content */}
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Image placeholder */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.4 }}
            className="relative"
          >
            <div className="aspect-[4/3] bg-muted flex items-center justify-center grayscale">
              <currentProgram.icon className="w-24 h-24 text-muted-foreground" />
            </div>
          </motion.div>

          {/* Program details */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeProgram}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.3 }}
            >
              <h3 className="text-3xl sm:text-4xl font-heading font-black text-foreground mb-8">
                {currentProgram.title}
              </h3>

              <ul className="space-y-4 mb-8">
                {currentProgram.benefits.map((benefit, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="flex items-start gap-3"
                  >
                    <div className="mt-1 flex-shrink-0">
                      <currentProgram.icon className="w-5 h-5 text-primary" />
                    </div>
                    <span className="text-foreground">- {benefit}</span>
                  </motion.li>
                ))}
              </ul>

              <div className="flex flex-col sm:flex-row gap-3 max-w-md">
                <input
                  type="tel"
                  placeholder="Введите ваш телефон"
                  className="flex-1 px-4 py-3 border-2 border-border rounded-none bg-card text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none transition-colors"
                />
                <Button 
                  variant="default" 
                  size="lg" 
                  className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-none font-bold whitespace-nowrap"
                >
                  ПОЛУЧИТЬ КОНСУЛЬТАЦИЮ
                </Button>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};
