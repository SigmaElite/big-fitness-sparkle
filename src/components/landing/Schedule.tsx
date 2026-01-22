import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Calendar } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Schedule images for each hall - replace these with actual schedule images
import scheduleForestHall from "@/assets/schedule-forest-hall.jpg";
import scheduleGlassHall from "@/assets/schedule-glass-hall.jpg";
import scheduleSmallHall from "@/assets/schedule-small-hall.jpg";
import scheduleBigHall from "@/assets/schedule-big-hall.jpg";

const scheduleHalls = [
  {
    id: "forest",
    name: "Лесной зал",
    image: scheduleForestHall,
  },
  {
    id: "glass",
    name: "Прозрачный зал",
    image: scheduleGlassHall,
  },
  {
    id: "small",
    name: "Малый зал",
    image: scheduleSmallHall,
  },
  {
    id: "big",
    name: "Большой зал",
    image: scheduleBigHall,
  },
];

export const Schedule = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [activeTab, setActiveTab] = useState("forest");

  return (
    <section id="schedule" className="h-screen flex flex-col py-2 bg-card" ref={ref}>
      <div className="w-full px-2 sm:px-4 flex flex-col flex-1 max-h-full">
        {/* Section header */}
        <div className="text-center mb-1">
          <h2 className="text-base sm:text-lg md:text-xl font-heading font-black">
            <span className="text-foreground">Расписание </span>
            <span className="text-primary">занятий</span>
          </h2>
        </div>

        {/* Tabs for halls */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full flex flex-col flex-1 min-h-0">
          <TabsList className="grid w-full grid-cols-4 gap-1 bg-transparent h-auto mb-1 flex-shrink-0">
            {scheduleHalls.map((hall) => (
              <TabsTrigger
                key={hall.id}
                value={hall.id}
                className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground bg-mint text-foreground rounded-md py-1 px-1 text-[9px] sm:text-[10px] md:text-xs font-semibold transition-all hover:bg-mint-dark"
              >
                {hall.name}
              </TabsTrigger>
            ))}
          </TabsList>

          {scheduleHalls.map((hall) => (
            <TabsContent key={hall.id} value={hall.id} className="mt-0 flex-1 min-h-0">
              <div className="bg-mint-light rounded-md p-1 border border-mint h-full flex items-center justify-center overflow-hidden">
                <img
                  src={hall.image}
                  alt={`Расписание - ${hall.name}`}
                  className="w-full h-full object-contain"
                />
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </section>
  );
};
