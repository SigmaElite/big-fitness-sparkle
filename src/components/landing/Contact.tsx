import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { MapPin, Phone, Clock, Instagram, MessageCircle, Send } from "lucide-react";

const socials = [
  { icon: Instagram, label: "Instagram", href: "#", color: "bg-gradient-to-br from-purple-500 to-pink-500" },
  { icon: MessageCircle, label: "VK", href: "#", color: "bg-blue-500" },
  { icon: Send, label: "Telegram", href: "#", color: "bg-sky-500" },
];

export const Contact = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="contacts" className="py-20 bg-card" ref={ref}>
      <div className="container mx-auto px-4">
        {/* Social section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="border-4 border-primary inline-block px-12 py-8 mb-8">
            <h2 className="text-2xl sm:text-3xl font-heading font-black text-primary">
              СЛЕДУЙТЕ ЗА НАМИ
            </h2>
          </div>

          <div className="flex justify-center gap-4">
            {socials.map((social, index) => (
              <motion.a
                key={social.label}
                href={social.href}
                initial={{ opacity: 0, scale: 0 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: 0.3 + index * 0.1, type: "spring" }}
                whileHover={{ scale: 1.1, y: -5 }}
                className={`w-16 h-16 ${social.color} flex items-center justify-center`}
              >
                <social.icon className="w-8 h-8 text-white" />
              </motion.a>
            ))}
          </div>
        </motion.div>

        {/* Contact info */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.5 }}
          className="grid md:grid-cols-3 gap-8 text-center"
        >
          <div className="p-6">
            <MapPin className="w-10 h-10 text-primary mx-auto mb-4" />
            <h3 className="font-bold text-foreground mb-2">Адрес</h3>
            <p className="text-muted-foreground">ЖК Новая Боровая</p>
            <p className="text-muted-foreground">г. Минск</p>
          </div>

          <div className="p-6">
            <Phone className="w-10 h-10 text-primary mx-auto mb-4" />
            <h3 className="font-bold text-foreground mb-2">Телефон</h3>
            <a href="tel:+375291234567" className="text-foreground font-bold hover:text-primary transition-colors">
              +375 (29) 123-45-67
            </a>
          </div>

          <div className="p-6">
            <Clock className="w-10 h-10 text-primary mx-auto mb-4" />
            <h3 className="font-bold text-foreground mb-2">Часы работы</h3>
            <p className="text-muted-foreground">Пн-Вс: 08:00 - 22:00</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
