import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Dumbbell, Heart, Zap, Music, Moon, Sparkles, Users, Flame, Check } from "lucide-react";

const programs = [
  { icon: Heart, title: "Пилатес", description: "Укрепление кора и осанки" },
  { icon: Zap, title: "Функц. тренинг", description: "Сила и выносливость" },
  { icon: Moon, title: "Стретчинг", description: "Растяжка и гибкость" },
  { icon: Sparkles, title: "Йогалатес", description: "Гармония тела и разума" },
  { icon: Dumbbell, title: "Силовые", description: "Тонус и рельеф" },
  { icon: Music, title: "Танцы", description: "Зумба, хип-хоп" },
];

const advantages = [
  "Только групповые и индивидуальные занятия — никаких тренажёров!",
  "Профессиональные сертифицированные тренеры",
  "Малые группы до 10 человек",
  "Индивидуальный подход к каждому",
];

export const AdultPrograms = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="adults" className="py-20 bg-card relative overflow-hidden" ref={ref}>
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 bg-mint-dark text-foreground px-4 py-2 mb-6">
            <Dumbbell className="w-5 h-5" />
            <span className="font-bold text-sm">ДЛЯ ВЗРОСЛЫХ</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-black text-foreground mb-4">
            15+ НАПРАВЛЕНИЙ
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Групповые и индивидуальные занятия с профессиональными инструкторами
          </p>
        </motion.div>

        {/* Programs grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-16">
          {programs.map((program, index) => (
            <motion.div
              key={program.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 + index * 0.05 }}
              whileHover={{ y: -5, borderColor: "hsl(var(--primary))" }}
              className="border-2 border-border p-4 text-center hover:border-primary transition-all group cursor-pointer"
            >
              <div className="w-12 h-12 bg-mint-dark mx-auto mb-3 flex items-center justify-center group-hover:bg-primary transition-colors">
                <program.icon className="w-6 h-6 text-foreground group-hover:text-primary-foreground transition-colors" />
              </div>
              <h3 className="font-bold text-foreground text-sm mb-1">{program.title}</h3>
              <p className="text-xs text-muted-foreground">{program.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Advantages */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.5 }}
          className="bg-mint-light border-2 border-primary p-8 lg:p-12"
        >
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl font-heading font-bold text-foreground mb-6">
                Почему выбирают нас?
              </h3>
              <ul className="space-y-4">
                {advantages.map((adv, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 0.6 + i * 0.1 }}
                    className="flex items-start gap-3"
                  >
                    <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-foreground">{adv}</span>
                  </motion.li>
                ))}
              </ul>
            </div>
            <div className="text-center lg:text-right">
              <p className="text-primary text-xl font-bold mb-4">
                С нами Вы заметите результат уже через 5 занятий!
              </p>
              <button className="inline-block border-2 border-foreground px-8 py-4 font-bold text-foreground hover:bg-foreground hover:text-card transition-colors">
                ЗАПИСАТЬСЯ НА
                <br />
                ПРОБНОЕ ЗАНЯТИЕ
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
