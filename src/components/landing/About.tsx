import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Building2, Droplets, HandHeart, Users, Sparkles, Clock } from "lucide-react";
import gymHall1 from "@/assets/gym-hall-1.jpg";
import gymHall2 from "@/assets/gym-hall-2.jpg";
import lobbyView from "@/assets/lobby-view.jpg";
import lockers from "@/assets/lockers.jpg";

const features = [
  {
    icon: Building2,
    title: "4 просторных зала",
    description: "Каждый зал оборудован для определённого направления",
  },
  {
    icon: Droplets,
    title: "Большие раздевалки и душевые",
    description: "Комфортные душевые кабины с горячей водой",
  },
  {
    icon: HandHeart,
    title: "Массажный кабинет",
    description: "Профессиональный массаж для восстановления",
  },
  {
    icon: Users,
    title: "Малые группы",
    description: "До 10 человек для максимального внимания",
  },
  {
    icon: Clock,
    title: "Удобное расписание",
    description: "Занятия с утра до вечера каждый день",
  },
  {
    icon: Sparkles,
    title: "630 кв.м",
    description: "Новое оборудование и уютная атмосфера",
  },
];

const galleryImages = [
  { src: gymHall1, alt: "Зал для тренировок" },
  { src: gymHall2, alt: "Просторный зал с видом" },
  { src: lobbyView, alt: "Лобби с панорамными окнами" },
  { src: lockers, alt: "Раздевалки" },
];

export const About = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="py-24 bg-card relative overflow-hidden" ref={ref}>
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23E87B18' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

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
            <Building2 className="w-5 h-5 text-primary" />
            <span className="font-semibold text-foreground">О студии</span>
          </motion.div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-black mb-4">
            <span className="text-foreground">Всё для вашего </span>
            <span className="text-primary">комфорта</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Современная студия фитнеса в Новая Боровая с продуманной инфраструктурой
          </p>
        </motion.div>

        {/* Gallery */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-16"
        >
          {galleryImages.map((image, index) => (
            <motion.div
              key={image.alt}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
              whileHover={{ scale: 1.05 }}
              className="rounded-2xl overflow-hidden shadow-card aspect-square"
            >
              <img
                src={image.src}
                alt={image.alt}
                className="w-full h-full object-cover"
              />
            </motion.div>
          ))}
        </motion.div>

        {/* Features grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 40, scale: 0.9 }}
              animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
              whileHover={{ y: -8 }}
              className="group"
            >
              <div className="relative bg-gradient-to-br from-mint-light to-card rounded-3xl p-8 h-full border-2 border-mint hover:border-primary transition-all duration-300 overflow-hidden">
                {/* Hover gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                <motion.div
                  className="relative w-16 h-16 rounded-2xl bg-gradient-to-br from-orange to-orange-light flex items-center justify-center mb-6 shadow-lg"
                  whileHover={{ rotate: 10, scale: 1.1 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <feature.icon className="w-8 h-8 text-primary-foreground" />
                </motion.div>
                
                <h3 className="relative text-xl font-heading font-bold text-foreground mb-3">{feature.title}</h3>
                <p className="relative text-muted-foreground">{feature.description}</p>

                {/* Decorative circle */}
                <motion.div
                  className="absolute -bottom-8 -right-8 w-24 h-24 bg-mint rounded-full opacity-0 group-hover:opacity-50 transition-opacity duration-300"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 3, repeat: Infinity }}
                />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Stats bar */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-20 bg-gradient-to-r from-orange to-orange-light rounded-3xl p-8 md:p-12"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { value: "630", label: "кв.м площади" },
              { value: "15+", label: "направлений" },
              { value: "4", label: "зала" },
              { value: "10+", label: "тренеров" },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.5 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: 1 + index * 0.1, type: "spring" }}
              >
                <motion.p
                  className="text-4xl md:text-5xl font-heading font-black text-primary-foreground mb-2"
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 2, repeat: Infinity, delay: index * 0.3 }}
                >
                  {stat.value}
                </motion.p>
                <p className="text-primary-foreground/80 font-medium">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};
