import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Phone, MessageCircle, CreditCard, CheckCircle, ArrowRight } from "lucide-react";

const steps = [
  { icon: Phone, text: "Вы оставляете заявку на сайте или по телефону" },
  { icon: MessageCircle, text: "С вами связывается наш специалист, вместе с вами подбираем удобное время для занятий" },
  { icon: CreditCard, text: "Оплата и посещение занятий" },
  { icon: CheckCircle, text: "Вы видите результат уже через 5 занятий" },
];

export const SpecialOffer = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  
  // Countdown timer - ends in 3 days
  const [timeLeft, setTimeLeft] = useState({
    days: 2,
    hours: 12,
    minutes: 45,
    seconds: 30,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        let { days, hours, minutes, seconds } = prev;
        seconds--;
        if (seconds < 0) {
          seconds = 59;
          minutes--;
        }
        if (minutes < 0) {
          minutes = 59;
          hours--;
        }
        if (hours < 0) {
          hours = 23;
          days--;
        }
        if (days < 0) {
          days = 0;
          hours = 0;
          minutes = 0;
          seconds = 0;
        }
        return { days, hours, minutes, seconds };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative overflow-hidden" ref={ref}>
      <div className="grid lg:grid-cols-2">
        {/* Left - Special Offer */}
        <div className="bg-primary py-16 px-8 lg:px-16">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl sm:text-4xl font-heading font-black text-primary-foreground mb-2">
              СПЕЦИАЛЬНОЕ
            </h2>
            <h2 className="text-3xl sm:text-4xl font-heading font-black text-primary-foreground mb-6">
              ПРЕДЛОЖЕНИЕ
            </h2>

            <p className="text-primary-foreground/90 mb-2">
              Запишитесь на пробное занятие
            </p>
            <p className="text-primary-foreground/90 mb-1">
              до конца акции и получите абонемент
            </p>
            <p className="text-primary-foreground/90 mb-6">
              на первый месяц со{" "}
              <span className="font-black text-primary-foreground">СКИДКОЙ 20%</span>
            </p>

            {/* Form */}
            <div className="mb-8">
              <input
                type="tel"
                placeholder="Введите ваш телефон"
                className="w-full px-4 py-3 border-2 border-primary-foreground/30 rounded-none bg-primary-foreground text-foreground placeholder:text-muted-foreground focus:border-primary-foreground focus:outline-none transition-colors mb-3"
              />
              <Button 
                size="lg" 
                className="w-full bg-mint-dark hover:bg-mint text-foreground rounded-none font-bold"
              >
                ПОДОБРАТЬ ВРЕМЯ ЗАНЯТИЙ
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>

            {/* Countdown */}
            <div>
              <p className="text-primary-foreground/80 text-sm mb-3">Осталось:</p>
              <div className="flex gap-4">
                {[
                  { value: timeLeft.days, label: "дней" },
                  { value: timeLeft.hours, label: "часов" },
                  { value: timeLeft.minutes, label: "минут" },
                  { value: timeLeft.seconds, label: "секунд" },
                ].map((item) => (
                  <div key={item.label} className="text-center">
                    <div className="w-14 h-14 border-2 border-primary-foreground/50 rounded-full flex items-center justify-center mb-1">
                      <span className="text-xl font-bold text-primary-foreground">
                        {item.value}
                      </span>
                    </div>
                    <span className="text-xs text-primary-foreground/70">{item.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Right - How we work */}
        <div className="bg-mint-dark py-16 px-8 lg:px-16">
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h2 className="text-3xl sm:text-4xl font-heading font-black text-foreground mb-8">
              КАК МЫ РАБОТАЕМ
            </h2>

            <div className="space-y-6">
              {steps.map((step, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: 20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  className="flex items-start gap-4"
                >
                  <div className="w-10 h-10 border-2 border-foreground rounded-full flex items-center justify-center flex-shrink-0">
                    <step.icon className="w-5 h-5 text-foreground" />
                  </div>
                  <p className="text-foreground pt-2">{step.text}</p>
                </motion.div>
              ))}
            </div>

            <div className="mt-8 pt-6 border-t border-foreground/20">
              <p className="text-foreground mb-2">
                Вы оставляете заявку на сайте или по телефону
              </p>
              <a 
                href="tel:+375291234567" 
                className="text-xl font-bold text-foreground hover:text-primary transition-colors"
              >
                +375 (29) 123-45-67
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
