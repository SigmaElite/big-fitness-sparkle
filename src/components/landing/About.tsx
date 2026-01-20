import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Building2, Droplets, HandHeart, Users, Sparkles, Clock, ChevronLeft, ChevronRight, Play, Pause } from "lucide-react";
import { Button } from "@/components/ui/button";
import gymHall1 from "@/assets/gym-hall-1.jpg";
import gymHall2 from "@/assets/gym-hall-2.jpg";
import lobbyView from "@/assets/lobby-view.jpg";
import lockers from "@/assets/lockers.jpg";
import hallForestView from "@/assets/hall-forest-view.jpg";
import hallCityView from "@/assets/hall-city-view.jpg";
import corridor from "@/assets/corridor.jpg";
import lobbyEntrance from "@/assets/lobby-entrance.jpg";

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

type MediaItem = {
  type: "image" | "video";
  src: string;
  alt: string;
  poster?: string;
};

const galleryMedia: MediaItem[] = [
  { type: "image", src: hallForestView, alt: "Зал с видом на лес" },
  { type: "image", src: hallCityView, alt: "Зал с видом на город" },
  { type: "video", src: "/videos/facility-tour-1.mov", alt: "Видео тур по залу", poster: gymHall1 },
  { type: "image", src: gymHall1, alt: "Зал для тренировок" },
  { type: "image", src: gymHall2, alt: "Просторный зал с видом" },
  { type: "video", src: "/videos/facility-tour-2.mov", alt: "Видео тур по студии", poster: lobbyView },
  { type: "image", src: lobbyView, alt: "Лобби с панорамными окнами" },
  { type: "image", src: corridor, alt: "Коридор с дизайнерским освещением" },
  { type: "image", src: lobbyEntrance, alt: "Вход в студию" },
  { type: "image", src: lockers, alt: "Раздевалки" },
];

export const About = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % galleryMedia.length);
    setIsPlaying(false);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + galleryMedia.length) % galleryMedia.length);
    setIsPlaying(false);
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
    setIsPlaying(false);
  };

  const toggleVideo = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const currentMedia = galleryMedia[currentIndex];

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

        {/* Gallery Carousel */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-10 md:mb-16"
        >
          <div className="relative max-w-4xl mx-auto">
            {/* Main Carousel */}
            <div className="relative aspect-[16/9] rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl bg-muted">
              {currentMedia.type === "image" ? (
                <motion.img
                  key={currentIndex}
                  src={currentMedia.src}
                  alt={currentMedia.alt}
                  className="w-full h-full object-cover"
                  initial={{ opacity: 0, scale: 1.1 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                />
              ) : (
                <div className="relative w-full h-full">
                  <video
                    ref={videoRef}
                    src={currentMedia.src}
                    poster={currentMedia.poster}
                    className="w-full h-full object-cover"
                    loop
                    playsInline
                    onEnded={() => setIsPlaying(false)}
                  />
                  <button
                    onClick={toggleVideo}
                    className="absolute inset-0 flex items-center justify-center bg-black/20 hover:bg-black/30 transition-colors"
                  >
                    <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-primary/90 flex items-center justify-center shadow-lg hover:scale-110 transition-transform">
                      {isPlaying ? (
                        <Pause className="w-8 h-8 md:w-10 md:h-10 text-primary-foreground" />
                      ) : (
                        <Play className="w-8 h-8 md:w-10 md:h-10 text-primary-foreground ml-1" />
                      )}
                    </div>
                  </button>
                </div>
              )}

              {/* Navigation arrows */}
              <Button
                variant="ghost"
                size="icon"
                onClick={prevSlide}
                className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 rounded-full bg-background/80 backdrop-blur-sm hover:bg-background shadow-lg"
              >
                <ChevronLeft className="w-5 h-5 md:w-6 md:h-6 text-foreground" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={nextSlide}
                className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 rounded-full bg-background/80 backdrop-blur-sm hover:bg-background shadow-lg"
              >
                <ChevronRight className="w-5 h-5 md:w-6 md:h-6 text-foreground" />
              </Button>

              {/* Slide counter */}
              <div className="absolute bottom-3 md:bottom-4 left-1/2 -translate-x-1/2 px-3 py-1.5 md:px-4 md:py-2 rounded-full bg-background/80 backdrop-blur-sm">
                <span className="text-sm font-medium text-foreground">
                  {currentIndex + 1} / {galleryMedia.length}
                </span>
              </div>

              {/* Video indicator */}
              {currentMedia.type === "video" && (
                <div className="absolute top-3 md:top-4 right-3 md:right-4 px-3 py-1 rounded-full bg-primary text-primary-foreground text-xs font-semibold">
                  Видео
                </div>
              )}
            </div>

            {/* Thumbnails */}
            <div className="mt-4 flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
              {galleryMedia.map((media, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`relative flex-shrink-0 w-16 h-16 md:w-20 md:h-20 rounded-lg md:rounded-xl overflow-hidden transition-all duration-300 ${
                    index === currentIndex
                      ? "ring-2 ring-primary ring-offset-2 scale-105"
                      : "opacity-70 hover:opacity-100"
                  }`}
                >
                  <img
                    src={media.type === "image" ? media.src : media.poster}
                    alt={media.alt}
                    className="w-full h-full object-cover"
                  />
                  {media.type === "video" && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                      <Play className="w-4 h-4 md:w-5 md:h-5 text-white" />
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>
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