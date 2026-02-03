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
    <section id="contacts" className="py-16 md:py-24 bg-gradient-to-br from-mint-light via-card to-mint-light relative overflow-hidden max-w-full" ref={ref}>
      {/* Animated shapes - hidden on mobile for performance */}
      <motion.div
        className="absolute top-10 left-10 w-24 md:w-40 h-24 md:h-40 bg-orange/10 rounded-full blur-3xl hidden md:block"
        animate={{ scale: [1, 1.4, 1], rotate: [0, 90, 0] }}
        transition={{ duration: 10, repeat: Infinity }}
      />
      <motion.div
        className="absolute bottom-10 right-10 w-32 md:w-60 h-32 md:h-60 bg-mint-dark/30 rounded-full blur-3xl hidden md:block"
        animate={{ scale: [1.2, 1, 1.2] }}
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
            className="inline-flex items-center gap-2 bg-primary rounded-full px-3 py-1.5 md:px-4 md:py-2 mb-4 md:mb-6 shadow-orange"
          >
            <MapPin className="w-4 h-4 md:w-5 md:h-5 text-primary-foreground" />
            <span className="font-semibold text-primary-foreground text-sm md:text-base">Контакты</span>
          </motion.div>

          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-heading font-black mb-3 md:mb-4">
            <span className="text-foreground">Ждём вас в </span>
            <span className="text-primary">Big Fitness!</span>
          </h2>
          <p className="text-sm md:text-lg text-muted-foreground max-w-2xl mx-auto px-4">
            Приходите на пробное занятие — первое посещение бесплатно!
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 md:gap-12 items-start overflow-hidden">
          {/* Contact cards */}
          <div className="space-y-3 md:space-y-6 overflow-hidden">
            {contactInfo.map((info, index) => (
              <motion.div
                key={info.title}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.3 + index * 0.15 }}
                whileHover={{ scale: 1.02 }}
                className="group"
              >
                <div className="bg-card rounded-xl md:rounded-2xl p-4 md:p-6 flex items-center gap-3 md:gap-5 shadow-soft hover:shadow-card transition-all duration-300 border-2 border-transparent hover:border-primary">
                  <motion.div
                    className="w-12 h-12 md:w-16 md:h-16 rounded-xl md:rounded-2xl bg-gradient-to-br from-orange to-orange-light flex items-center justify-center flex-shrink-0"
                    whileHover={{ rotate: 10 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <info.icon className="w-6 h-6 md:w-8 md:h-8 text-primary-foreground" />
                  </motion.div>
                  <div className="min-w-0">
                    <p className="text-xs md:text-sm text-muted-foreground mb-0.5 md:mb-1">{info.title}</p>
                    <p className="text-base md:text-xl font-heading font-bold text-foreground truncate">{info.value}</p>
                    <p className="text-xs md:text-sm text-muted-foreground">{info.subvalue}</p>
                  </div>
                </div>
              </motion.div>
            ))}

            {/* Social links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.8 }}
              className="pt-4 md:pt-6"
            >
              <p className="text-xs md:text-sm text-muted-foreground mb-3 md:mb-4">Мы в соцсетях:</p>
              <div className="flex gap-3 md:gap-4">
                {socials.map((social, index) => (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    className="w-10 h-10 md:w-12 md:h-12 rounded-lg md:rounded-xl bg-mint flex items-center justify-center hover:bg-primary group transition-colors duration-300"
                    whileHover={{ y: -5, scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ delay: 0.9 + index * 0.1, type: "spring" }}
                  >
                    <social.icon className="w-4 h-4 md:w-5 md:h-5 text-foreground group-hover:text-primary-foreground transition-colors" />
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Map / CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="overflow-hidden"
          >
            <div className="bg-card rounded-xl md:rounded-2xl lg:rounded-3xl p-5 md:p-6 lg:p-8 shadow-card border-2 border-mint">
              <h3 className="text-lg md:text-xl lg:text-2xl font-heading font-bold text-foreground mb-2 md:mb-4">
                Записаться на пробное бесплатное занятие
              </h3>
              <p className="text-sm md:text-base text-muted-foreground mb-4 md:mb-6">
                Оставьте заявку, и мы свяжемся с вами для уточнения деталей
              </p>
              
              <form className="space-y-3 md:space-y-4">
                <div>
                  <input
                    type="text"
                    placeholder="Ваше имя"
                    className="w-full px-3 md:px-4 py-2.5 md:py-3 rounded-lg md:rounded-xl bg-muted border-2 border-transparent focus:border-primary outline-none transition-colors placeholder:text-muted-foreground text-sm md:text-base"
                  />
                </div>
                <div>
                  <input
                    type="tel"
                    placeholder="Телефон"
                    className="w-full px-3 md:px-4 py-2.5 md:py-3 rounded-lg md:rounded-xl bg-muted border-2 border-transparent focus:border-primary outline-none transition-colors placeholder:text-muted-foreground text-sm md:text-base"
                  />
                </div>
                <div>
                  <select className="w-full px-3 md:px-4 py-2.5 md:py-3 rounded-lg md:rounded-xl bg-muted border-2 border-transparent focus:border-primary outline-none transition-colors text-muted-foreground text-sm md:text-base">
                    <option value="">Выберите направление</option>
                    <option value="kids-ofp">ОФП и нейрофитнес для детей</option>
                    <option value="kids-race">Гонки с препятствиями</option>
                    <option value="yoga">Йога</option>
                    <option value="pilates">Пилатес</option>
                    <option value="kickboxing">Кикбоксинг</option>
                    <option value="dance">Танцы</option>
                    <option value="strength">Силовые тренировки</option>
                    <option value="personal">Персональные коррекционные тренировки</option>
                    <option value="other">Другое</option>
                  </select>
                </div>
                <Button variant="hero" size="xl" className="w-full text-sm md:text-base">
                  Записаться на пробное бесплатное занятие
                </Button>
              </form>

              <p className="text-[10px] md:text-xs text-muted-foreground mt-3 md:mt-4 text-center">
                Нажимая кнопку, вы соглашаетесь с обработкой персональных данных
              </p>
            </div>

            {/* Location badge */}
            <motion.div
              className="mt-4 md:mt-6 flex items-center justify-center gap-2 text-primary"
              animate={{ y: [0, -5, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <MapPin className="w-4 h-4 md:w-5 md:h-5" />
              <span className="font-semibold text-sm md:text-base">Новая Боровая, Камова, 7а</span>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
