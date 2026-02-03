import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { MapPin, Phone, Clock, MessageCircle, Instagram, Send } from "lucide-react";

const contactInfo = [
  {
    icon: MapPin,
    title: "Адрес",
    value: "Новая Боровая, Камова, 7а",
    subvalue: "Минск",
  },
  {
    icon: Phone,
    title: "Телефон",
    value: "+375 29 506 06 05",
    subvalue: "Звоните в рабочее время",
  },
  {
    icon: Clock,
    title: "Часы работы",
    value: "Ежедневно: 8:00 - 22:00",
    subvalue: "Без выходных",
  },
];

const socials = [
  { icon: Instagram, label: "Instagram", href: "#" },
  { icon: MessageCircle, label: "Viber", href: "#" },
  { icon: Send, label: "Telegram", href: "https://t.me/+375292788806" },
];

export const Contact = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="contacts" className="py-10 md:py-20 bg-gradient-to-br from-mint-light via-card to-mint-light relative overflow-hidden" ref={ref}>
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
            className="inline-flex items-center gap-1.5 bg-primary rounded-full px-3 py-1 mb-3 md:mb-4 shadow-orange"
          >
            <MapPin className="w-3.5 h-3.5 md:w-4 md:h-4 text-primary-foreground" />
            <span className="font-semibold text-primary-foreground text-xs md:text-sm">Контакты</span>
          </motion.div>

          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-heading font-black mb-2">
            <span className="text-foreground">Ждём вас в </span>
            <span className="text-primary">Big Fitness!</span>
          </h2>
          <p className="text-xs sm:text-sm md:text-base text-muted-foreground max-w-xl mx-auto">
            Приходите на пробное занятие — первое посещение бесплатно!
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-6 md:gap-10 items-start">
          {/* Contact cards */}
          <div className="space-y-3 md:space-y-4">
            {contactInfo.map((info, index) => (
              <motion.div
                key={info.title}
                initial={{ opacity: 0, x: -50 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.3 + index * 0.15 }}
              >
                <div className="bg-card rounded-lg md:rounded-xl p-3 md:p-4 flex items-center gap-3 shadow-soft border-2 border-transparent hover:border-primary transition-all duration-300">
                  <div className="w-10 h-10 md:w-12 md:h-12 rounded-lg md:rounded-xl bg-gradient-to-br from-orange to-orange-light flex items-center justify-center flex-shrink-0">
                    <info.icon className="w-5 h-5 md:w-6 md:h-6 text-primary-foreground" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-[10px] md:text-xs text-muted-foreground">{info.title}</p>
                    <p className="text-xs sm:text-sm md:text-base font-heading font-bold text-foreground leading-tight break-words">{info.value}</p>
                    <p className="text-[10px] md:text-xs text-muted-foreground">{info.subvalue}</p>
                  </div>
                </div>
              </motion.div>
            ))}

            {/* Social links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.8 }}
              className="pt-2 md:pt-4"
            >
              <p className="text-[10px] md:text-xs text-muted-foreground mb-2 md:mb-3">Мы в соцсетях:</p>
              <div className="flex gap-2 md:gap-3">
                {socials.map((social, index) => (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    className="w-9 h-9 md:w-10 md:h-10 rounded-lg bg-mint flex items-center justify-center hover:bg-primary group transition-colors duration-300"
                    whileHover={{ y: -3 }}
                    whileTap={{ scale: 0.9 }}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ delay: 0.9 + index * 0.1, type: "spring" }}
                  >
                    <social.icon className="w-4 h-4 text-foreground group-hover:text-primary-foreground transition-colors" />
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Map / CTA */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <div className="bg-card rounded-lg md:rounded-xl p-4 md:p-6 shadow-card border-2 border-mint">
              <h3 className="text-base md:text-lg font-heading font-bold text-foreground mb-2 md:mb-3">
                Записаться на пробное занятие
              </h3>
              <p className="text-xs md:text-sm text-muted-foreground mb-3 md:mb-4">
                Оставьте заявку, и мы свяжемся с вами
              </p>
              
              <form className="space-y-2 md:space-y-3">
                <div>
                  <input
                    type="text"
                    placeholder="Ваше имя"
                    className="w-full px-3 py-2 md:py-2.5 rounded-lg bg-muted border-2 border-transparent focus:border-primary outline-none transition-colors placeholder:text-muted-foreground text-sm"
                  />
                </div>
                <div>
                  <input
                    type="tel"
                    placeholder="Телефон"
                    className="w-full px-3 py-2 md:py-2.5 rounded-lg bg-muted border-2 border-transparent focus:border-primary outline-none transition-colors placeholder:text-muted-foreground text-sm"
                  />
                </div>
                <div>
                  <select className="w-full px-3 py-2 md:py-2.5 rounded-lg bg-muted border-2 border-transparent focus:border-primary outline-none transition-colors text-muted-foreground text-sm">
                    <option value="">Выберите направление</option>
                    <option value="kids-ofp">ОФП и нейрофитнес для детей</option>
                    <option value="kids-race">Гонки с препятствиями</option>
                    <option value="yoga">Йога</option>
                    <option value="pilates">Пилатес</option>
                    <option value="kickboxing">Кикбоксинг</option>
                    <option value="dance">Танцы</option>
                    <option value="strength">Силовые тренировки</option>
                    <option value="personal">Персональные тренировки</option>
                    <option value="other">Другое</option>
                  </select>
                </div>
                <Button variant="hero" size="lg" className="w-full text-sm">
                  Записаться бесплатно
                </Button>
              </form>

              <p className="text-[9px] md:text-[10px] text-muted-foreground mt-2 md:mt-3 text-center">
                Нажимая кнопку, вы соглашаетесь с обработкой персональных данных
              </p>
            </div>

            {/* Location badge */}
            <motion.div
              className="mt-3 md:mt-4 flex items-center justify-center gap-1.5 text-primary"
              animate={{ y: [0, -3, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <MapPin className="w-3.5 h-3.5 md:w-4 md:h-4" />
              <span className="font-semibold text-xs md:text-sm">Новая Боровая, Камова, 7а</span>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
