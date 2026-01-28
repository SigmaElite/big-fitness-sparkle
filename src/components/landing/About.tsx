import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { Building2, Droplets, HandHeart, Users, Sparkles, Clock, ChevronLeft, ChevronRight, Play, Pause } from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { Skeleton } from "@/components/ui/skeleton";
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
    title: "3 раздевалки с душевыми",
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
  id: string;
  type: "image" | "video";
  url: string;
  thumbnail_url: string | null;
  title: string | null;
  sort_order: number;
};

const fallbackGallery: MediaItem[] = [
  { id: "1", type: "image", url: hallForestView, thumbnail_url: null, title: "Зал с видом на лес", sort_order: 1 },
  { id: "2", type: "image", url: hallCityView, thumbnail_url: null, title: "Зал с видом на город", sort_order: 2 },
  { id: "3", type: "video", url: "/videos/facility-tour-1.mov", thumbnail_url: gymHall1, title: "Видео тур по залу", sort_order: 3 },
  { id: "4", type: "image", url: gymHall1, thumbnail_url: null, title: "Зал для тренировок", sort_order: 4 },
  { id: "5", type: "image", url: gymHall2, thumbnail_url: null, title: "Просторный зал с видом", sort_order: 5 },
  { id: "6", type: "video", url: "/videos/facility-tour-2.mov", thumbnail_url: lobbyView, title: "Видео тур по студии", sort_order: 6 },
  { id: "7", type: "image", url: lobbyView, thumbnail_url: null, title: "Лобби с панорамными окнами", sort_order: 7 },
  { id: "8", type: "image", url: corridor, thumbnail_url: null, title: "Коридор с дизайнерским освещением", sort_order: 8 },
  { id: "9", type: "image", url: lobbyEntrance, thumbnail_url: null, title: "Вход в студию", sort_order: 9 },
  { id: "10", type: "image", url: lockers, thumbnail_url: null, title: "Раздевалки", sort_order: 10 },
];

export const About = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [currentPage, setCurrentPage] = useState(0);
  const [playingVideo, setPlayingVideo] = useState<number | null>(null);
  const [showVideoControls, setShowVideoControls] = useState<number | null>(null);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const hideControlsTimeout = useRef<NodeJS.Timeout | null>(null);
  const [galleryMedia, setGalleryMedia] = useState<MediaItem[]>(fallbackGallery);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchGallery = async () => {
      const { data, error } = await supabase
        .from("gallery")
        .select("*")
        .order("sort_order");

      if (!error && data && data.length > 0) {
        setGalleryMedia(data as MediaItem[]);
      }
      setIsLoading(false);
    };

    fetchGallery();
  }, []);

  const itemsPerPage = 4;
  const totalPages = Math.ceil(galleryMedia.length / itemsPerPage);
  
  const getCurrentItems = () => {
    const start = currentPage * itemsPerPage;
    return galleryMedia.slice(start, start + itemsPerPage);
  };

  const nextPage = () => {
    setCurrentPage((prev) => (prev + 1) % totalPages);
    setPlayingVideo(null);
    setShowVideoControls(null);
  };

  const prevPage = () => {
    setCurrentPage((prev) => (prev - 1 + totalPages) % totalPages);
    setPlayingVideo(null);
    setShowVideoControls(null);
  };

  const toggleVideo = (globalIndex: number, localIndex: number) => {
    const video = videoRefs.current[localIndex];
    if (video) {
      if (playingVideo === globalIndex) {
        video.pause();
        setPlayingVideo(null);
        setShowVideoControls(null);
      } else {
        // Pause any other playing video
        videoRefs.current.forEach((v, i) => {
          if (v && i !== localIndex) v.pause();
        });
        video.play();
        setPlayingVideo(globalIndex);
        setShowVideoControls(globalIndex);
        
        // Hide controls after 1 second
        if (hideControlsTimeout.current) {
          clearTimeout(hideControlsTimeout.current);
        }
        hideControlsTimeout.current = setTimeout(() => {
          setShowVideoControls(null);
        }, 1000);
      }
    }
  };

  const handleVideoClick = (globalIndex: number, localIndex: number) => {
    if (playingVideo === globalIndex) {
      // Show controls briefly when clicking playing video
      setShowVideoControls(globalIndex);
      if (hideControlsTimeout.current) {
        clearTimeout(hideControlsTimeout.current);
      }
      hideControlsTimeout.current = setTimeout(() => {
        setShowVideoControls(null);
      }, 1000);
    }
    toggleVideo(globalIndex, localIndex);
  };

  useEffect(() => {
    return () => {
      if (hideControlsTimeout.current) {
        clearTimeout(hideControlsTimeout.current);
      }
    };
  }, []);

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

        {/* Gallery Grid with Carousel */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-10 md:mb-16 relative"
        >
          {/* Navigation Arrows */}
          <Button
            variant="ghost"
            size="icon"
            onClick={prevPage}
            className="absolute -left-2 md:-left-6 top-1/2 -translate-y-1/2 z-10 w-10 h-10 md:w-12 md:h-12 rounded-full bg-background/90 backdrop-blur-sm hover:bg-background shadow-lg border border-border"
          >
            <ChevronLeft className="w-5 h-5 md:w-6 md:h-6 text-foreground" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={nextPage}
            className="absolute -right-2 md:-right-6 top-1/2 -translate-y-1/2 z-10 w-10 h-10 md:w-12 md:h-12 rounded-full bg-background/90 backdrop-blur-sm hover:bg-background shadow-lg border border-border"
          >
            <ChevronRight className="w-5 h-5 md:w-6 md:h-6 text-foreground" />
          </Button>

          {/* Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {isLoading ? (
              <>
                {[1, 2, 3, 4].map((i) => (
                  <Skeleton key={i} className="rounded-3xl" style={{ aspectRatio: '3/4' }} />
                ))}
              </>
            ) : (
              getCurrentItems().map((media, localIndex) => {
                const globalIndex = currentPage * itemsPerPage + localIndex;
                return (
                  <motion.div
                    key={`${currentPage}-${localIndex}`}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4, delay: localIndex * 0.1 }}
                    whileHover={{ scale: 1.02 }}
                    className="rounded-2xl md:rounded-3xl overflow-hidden shadow-card relative group cursor-pointer"
                    style={{ aspectRatio: '3/4' }}
                  >
                    {media.type === "image" ? (
                      <img
                        src={media.url}
                        alt={media.title || "Gallery item"}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <>
                        <video
                          ref={(el) => { videoRefs.current[localIndex] = el; }}
                          src={media.url}
                          poster={media.thumbnail_url || undefined}
                          className="w-full h-full object-cover"
                          loop
                          playsInline
                          muted
                        />
                        <button
                          onClick={() => handleVideoClick(globalIndex, localIndex)}
                          className="absolute inset-0 flex items-center justify-center transition-colors"
                          style={{ background: playingVideo === globalIndex ? 'transparent' : 'rgba(0,0,0,0.2)' }}
                        >
                          <AnimatePresence>
                            {(playingVideo !== globalIndex || showVideoControls === globalIndex) && (
                              <motion.div 
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.8 }}
                                transition={{ duration: 0.2 }}
                                className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-primary/90 flex items-center justify-center shadow-lg"
                              >
                                {playingVideo === globalIndex ? (
                                  <Pause className="w-5 h-5 md:w-6 md:h-6 text-primary-foreground" />
                                ) : (
                                  <Play className="w-5 h-5 md:w-6 md:h-6 text-primary-foreground ml-0.5" />
                                )}
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </button>
                        <div className="absolute top-2 right-2 px-2 py-0.5 rounded-full bg-primary text-primary-foreground text-xs font-semibold">
                          Видео
                        </div>
                      </>
                    )}
                  </motion.div>
                );
              })
            )}
          </div>

          {/* Page indicators */}
          <div className="flex justify-center gap-2 mt-4">
            {Array.from({ length: totalPages }).map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setCurrentPage(index);
                  setPlayingVideo(null);
                }}
                className={`w-2.5 h-2.5 md:w-3 md:h-3 rounded-full transition-all duration-300 ${
                  index === currentPage
                    ? "bg-primary w-6 md:w-8"
                    : "bg-muted-foreground/30 hover:bg-muted-foreground/50"
                }`}
              />
            ))}
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
