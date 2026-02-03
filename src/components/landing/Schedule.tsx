import { useRef, useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { supabase } from "@/integrations/supabase/client";
import { X, ZoomIn, ZoomOut } from "lucide-react";

// Fallback images for when database is empty
import scheduleForestHall from "@/assets/schedule-forest-hall.jpg";
import scheduleGlassHall from "@/assets/schedule-glass-hall.jpg";
import scheduleSmallHall from "@/assets/schedule-small-hall.jpg";
import scheduleBigHall from "@/assets/schedule-big-hall.jpg";

interface Schedule {
  id: string;
  hall_id: string;
  hall_name: string;
  image_url: string;
  sort_order: number;
}

const fallbackSchedules = [
  { id: "1", hall_id: "forest", hall_name: "Лесной", image_url: scheduleForestHall, sort_order: 1 },
  { id: "2", hall_id: "glass", hall_name: "Прозрачный", image_url: scheduleGlassHall, sort_order: 2 },
  { id: "3", hall_id: "small", hall_name: "Малый", image_url: scheduleSmallHall, sort_order: 3 },
  { id: "4", hall_id: "big", hall_name: "Большой", image_url: scheduleBigHall, sort_order: 4 },
];

export const Schedule = () => {
  const ref = useRef(null);
  const [activeTab, setActiveTab] = useState("");
  const [loadedImages, setLoadedImages] = useState<Set<string>>(new Set());
  const [schedules, setSchedules] = useState<Schedule[]>(fallbackSchedules);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState<{ url: string; name: string } | null>(null);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const fetchSchedules = async () => {
      const { data, error } = await supabase
        .from("schedules")
        .select("*")
        .order("sort_order");

      if (!error && data && data.length > 0) {
        setSchedules(data);
        setActiveTab(data[0].hall_id);
      } else {
        setActiveTab(fallbackSchedules[0].hall_id);
      }
      setIsLoading(false);
    };

    fetchSchedules();
  }, []);

  // Preload all images on mount
  useEffect(() => {
    if (schedules.length > 0) {
      schedules.forEach((schedule) => {
        const img = new Image();
        img.src = schedule.image_url;
        img.onload = () => {
          setLoadedImages((prev) => new Set(prev).add(schedule.hall_id));
        };
      });
    }
  }, [schedules]);

  const isImageLoaded = (hallId: string) => loadedImages.has(hallId);

  const handleImageClick = (url: string, name: string) => {
    setSelectedImage({ url, name });
    setScale(1);
  };

  const handleZoomIn = () => {
    setScale((prev) => Math.min(prev + 0.5, 4));
  };

  const handleZoomOut = () => {
    setScale((prev) => Math.max(prev - 0.5, 0.5));
  };

  const handleCloseModal = () => {
    setSelectedImage(null);
    setScale(1);
  };

  if (isLoading) {
    return (
      <section id="schedule" className="py-6 bg-card" ref={ref}>
        <div className="container mx-auto px-3">
          <div className="text-center mb-3">
            <Skeleton className="h-6 w-40 mx-auto" />
          </div>
          <Skeleton className="h-10 w-full mb-2" />
          <Skeleton className="w-full aspect-[3/4]" />
        </div>
      </section>
    );
  }

  return (
    <>
      <section id="schedule" className="py-6 bg-card" ref={ref}>
        <div className="container mx-auto px-3">
          {/* Section header */}
          <div className="text-center mb-3">
            <h2 className="text-base sm:text-lg md:text-xl font-heading font-black">
              <span className="text-foreground">Расписание </span>
              <span className="text-primary">занятий</span>
            </h2>
          </div>

          {/* Tabs for halls */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-4 gap-1 bg-transparent h-auto mb-2 p-0">
              {schedules.map((schedule) => (
                <TabsTrigger
                  key={schedule.hall_id}
                  value={schedule.hall_id}
                  className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground bg-mint text-foreground rounded-md py-1.5 px-1 text-[9px] sm:text-[10px] md:text-xs font-semibold transition-all hover:bg-mint-dark whitespace-nowrap"
                >
                  {schedule.hall_name}
                </TabsTrigger>
              ))}
            </TabsList>

            {schedules.map((schedule) => (
              <TabsContent key={schedule.hall_id} value={schedule.hall_id} className="mt-0">
                <div 
                  className="bg-mint-light rounded-lg p-1 border border-mint overflow-hidden cursor-pointer group relative"
                  onClick={() => handleImageClick(schedule.image_url, schedule.hall_name)}
                >
                  {!isImageLoaded(schedule.hall_id) && (
                    <Skeleton className="w-full aspect-[3/4] rounded-md" />
                  )}
                  <img
                    src={schedule.image_url}
                    alt={`Расписание - ${schedule.hall_name}`}
                    className={`w-full h-auto object-cover object-center rounded-md transition-all duration-300 group-hover:opacity-90 ${
                      isImageLoaded(schedule.hall_id) ? "opacity-100" : "opacity-0 absolute"
                    }`}
                    loading="eager"
                  />
                  {/* Overlay hint */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-foreground/10 rounded-md">
                    <div className="bg-card/90 backdrop-blur-sm rounded-lg px-3 py-2 flex items-center gap-2 shadow-lg">
                      <ZoomIn className="w-4 h-4 text-primary" />
                      <span className="text-xs font-medium text-foreground">Нажмите для увеличения</span>
                    </div>
                  </div>
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </section>

      {/* Fullscreen Image Modal */}
      <Dialog open={!!selectedImage} onOpenChange={handleCloseModal}>
        <DialogContent className="max-w-[95vw] max-h-[95vh] p-0 bg-foreground/95 border-none overflow-hidden">
          <DialogTitle className="sr-only">
            {selectedImage?.name ? `Расписание - ${selectedImage.name}` : 'Расписание'}
          </DialogTitle>
          
          {/* Controls */}
          <div className="absolute top-2 right-2 z-50 flex gap-2">
            <button
              onClick={handleZoomOut}
              className="w-10 h-10 bg-card/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-card transition-colors shadow-lg"
              disabled={scale <= 0.5}
            >
              <ZoomOut className="w-5 h-5 text-foreground" />
            </button>
            <button
              onClick={handleZoomIn}
              className="w-10 h-10 bg-card/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-card transition-colors shadow-lg"
              disabled={scale >= 4}
            >
              <ZoomIn className="w-5 h-5 text-foreground" />
            </button>
            <button
              onClick={handleCloseModal}
              className="w-10 h-10 bg-card/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-card transition-colors shadow-lg"
            >
              <X className="w-5 h-5 text-foreground" />
            </button>
          </div>

          {/* Scale indicator */}
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 z-50 bg-card/90 backdrop-blur-sm rounded-full px-3 py-1 shadow-lg">
            <span className="text-xs font-medium text-foreground">{Math.round(scale * 100)}%</span>
          </div>

          {/* Image container with pan/zoom */}
          <div 
            className="w-full h-[95vh] overflow-auto flex items-center justify-center"
            style={{ touchAction: 'pan-x pan-y pinch-zoom' }}
          >
            {selectedImage && (
              <img
                src={selectedImage.url}
                alt={`Расписание - ${selectedImage.name}`}
                className="max-w-none transition-transform duration-200"
                style={{ transform: `scale(${scale})`, transformOrigin: 'center center' }}
                draggable={false}
              />
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};
