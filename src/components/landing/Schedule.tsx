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
            {scheduleHalls.map((hall) => (
              <TabsTrigger
                key={hall.id}
                value={hall.id}
                className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground bg-mint text-foreground rounded-md py-1.5 px-1 text-[10px] md:text-xs font-semibold transition-all hover:bg-mint-dark"
              >
                {hall.name}
              </TabsTrigger>
            ))}
          </TabsList>

          {scheduleHalls.map((hall) => (
            <TabsContent key={hall.id} value={hall.id} className="mt-0">
              <div className="bg-mint-light rounded-md p-1 border border-mint overflow-hidden max-h-[60vh] md:max-h-[70vh] overflow-y-auto">
                <img
                  src={hall.image}
                  alt={`Расписание - ${hall.name}`}
                  className="w-full h-auto object-cover object-center rounded-sm"
                  style={{ marginTop: '-10%', marginBottom: '-8%' }}
                />
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </section>
  );
};
