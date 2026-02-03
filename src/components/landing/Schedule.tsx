import { useRef, useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";
import { supabase } from "@/integrations/supabase/client";

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
  { id: "1", hall_id: "forest", hall_name: "Лесной зал", image_url: scheduleForestHall, sort_order: 1 },
  { id: "2", hall_id: "glass", hall_name: "Прозрачный зал", image_url: scheduleGlassHall, sort_order: 2 },
  { id: "3", hall_id: "small", hall_name: "Малый зал", image_url: scheduleSmallHall, sort_order: 3 },
  { id: "4", hall_id: "big", hall_name: "Большой зал", image_url: scheduleBigHall, sort_order: 4 },
];

export const Schedule = () => {
  const ref = useRef(null);
  const [activeTab, setActiveTab] = useState("");
  const [loadedImages, setLoadedImages] = useState<Set<string>>(new Set());
  const [schedules, setSchedules] = useState<Schedule[]>(fallbackSchedules);
  const [isLoading, setIsLoading] = useState(true);

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

  if (isLoading) {
    return (
      <section id="schedule" className="py-6 md:py-8 bg-card" ref={ref}>
        <div className="container mx-auto px-4">
          <div className="text-center mb-3">
            <Skeleton className="h-8 w-48 mx-auto" />
          </div>
          <Skeleton className="h-12 w-full mb-2" />
          <Skeleton className="w-full aspect-[3/4]" />
        </div>
      </section>
    );
  }

  return (
    <section id="schedule" className="py-6 md:py-8 bg-card" ref={ref}>
      <div className="container mx-auto px-4">
        {/* Section header */}
        <div className="text-center mb-3">
          <h2 className="text-lg sm:text-xl md:text-2xl font-heading font-black">
            <span className="text-foreground">Расписание </span>
            <span className="text-primary">занятий</span>
          </h2>
        </div>

        {/* Tabs for halls */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4 gap-1 bg-transparent h-auto mb-2">
            {schedules.map((schedule) => (
              <TabsTrigger
                key={schedule.hall_id}
                value={schedule.hall_id}
                className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground bg-mint text-foreground rounded-md py-1.5 px-1 text-[10px] md:text-xs font-semibold transition-all hover:bg-mint-dark"
              >
                {schedule.hall_name}
              </TabsTrigger>
            ))}
          </TabsList>

          {schedules.map((schedule) => (
            <TabsContent key={schedule.hall_id} value={schedule.hall_id} className="mt-0">
              <div className="bg-mint-light rounded-md p-1 border border-mint overflow-hidden max-h-[66vh] md:max-h-[78vh] overflow-y-auto">
                {!isImageLoaded(schedule.hall_id) && (
                  <Skeleton className="w-full aspect-[3/4] rounded-sm" />
                )}
                <img
                  src={schedule.image_url}
                  alt={`Расписание - ${schedule.hall_name}`}
                  className={`w-full h-auto object-cover object-center rounded-sm transition-opacity duration-300 ${
                    isImageLoaded(schedule.hall_id) ? "opacity-100" : "opacity-0 absolute"
                  }`}
                  loading="eager"
                />
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </section>
  );
};
