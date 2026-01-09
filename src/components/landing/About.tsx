import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Building2, Droplets, HandHeart, Users, Sparkles, Clock, Check } from "lucide-react";

const features = [
  { icon: Building2, title: "4 просторных зала", description: "для разных направлений" },
  { icon: Droplets, title: "Душевые кабины", description: "с горячей водой" },
  { icon: HandHeart, title: "Массажный кабинет", description: "для восстановления" },
  { icon: Users, title: "Малые группы", description: "до 10 человек" },
  { icon: Clock, title: "Удобное расписание", description: "08:00 - 22:00" },
  { icon: Sparkles, title: "Современный ремонт", description: "новое оборудование" },
];

const reasons = [
  "Сохранить своё тело молодым и красивым",
  "Улучшить гибкость тела, снизить вес, обрести мышечный рельеф",
  "Вылечить боли в спине, головные боли",
  "Укрепить иммунитет",
  "Поддерживать себя и своё тело в тонусе",
  "Сформировать своё тело, свою фигуру, сделать её более привлекательной",
];

export const About = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="relative overflow-hidden" ref={ref}>
      {/* Gallery section with teal border */}
      <div className="py-16 bg-card border-4 border-primary mx-4 lg:mx-8 mb-0">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl sm:text-4xl font-heading font-black text-primary text-right mb-8">
            НАШ ЗАЛ
          </h2>
          
          {/* Image grid placeholder */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: 0.1 * i }}
                className="aspect-square bg-muted"
              />
            ))}
          </div>
        </div>
      </div>

      {/* Motivation section */}
      <div className="py-20 bg-card">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Image placeholder */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              className="relative"
            >
              <div className="aspect-[3/4] bg-muted grayscale" />
            </motion.div>

            {/* Content */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.3 }}
            >
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-heading font-black text-foreground leading-tight mb-8">
                ЧАЩЕ ВСЕГО
                <br />
                У НАС ЗАНИМАЮТСЯ ЛЮДИ,
                <br />
                КОТОРЫЕ ПРИНЯЛИ РЕШЕНИЕ:
              </h2>

              <ul className="space-y-4 mb-8">
                {reasons.map((reason, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: 20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 0.4 + i * 0.1 }}
                    className="flex items-start gap-3"
                  >
                    <span className="text-primary text-2xl font-black">/</span>
                    <span className="text-foreground">{reason}</span>
                  </motion.li>
                ))}
              </ul>

              {/* Logo and CTA */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
                <div className="w-24 h-24 border-2 border-foreground flex items-center justify-center flex-shrink-0">
                  <div className="text-center">
                    <span className="font-heading font-black text-xl tracking-widest">BIG</span>
                    <div className="text-[10px] text-muted-foreground tracking-[0.15em]">FITNESS CLUB</div>
                  </div>
                </div>
                <div>
                  <p className="text-primary font-bold mb-2">
                    С нами Вы заметите результат уже через 5 занятий!
                  </p>
                  <button className="border-2 border-foreground px-6 py-3 font-bold text-foreground hover:bg-foreground hover:text-card transition-colors text-sm">
                    ЗАПИСАТЬСЯ НА ПРОБНОЕ ЗАНЯТИЕ
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Features grid */}
      <div className="py-16 bg-mint-light">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.1 * index }}
                className="bg-card border-2 border-border p-4 text-center hover:border-primary transition-colors"
              >
                <feature.icon className="w-8 h-8 text-primary mx-auto mb-2" />
                <h3 className="font-bold text-foreground text-sm">{feature.title}</h3>
                <p className="text-xs text-muted-foreground">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
