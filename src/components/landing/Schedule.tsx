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
    <section id="schedule" className="py-8 md:py-12 bg-card" ref={ref}>
      <div className="container mx-auto px-4">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.4 }}
          className="text-center mb-4 md:mb-6"
        >
          <h2 className="text-xl sm:text-2xl md:text-3xl font-heading font-black mb-1">
            <span className="text-foreground">Расписание </span>
            <span className="text-primary">занятий</span>
          </h2>
        </motion.div>

        {/* Tabs for halls */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 gap-1.5 bg-transparent h-auto mb-3 md:mb-4">
            {scheduleHalls.map((hall) => (
              <TabsTrigger
                key={hall.id}
                value={hall.id}
                className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground bg-mint text-foreground rounded-lg py-2 px-2 text-xs md:text-sm font-semibold transition-all hover:bg-mint-dark"
              >
                {hall.name}
              </TabsTrigger>
            ))}
          </TabsList>

          {scheduleHalls.map((hall) => (
            <TabsContent key={hall.id} value={hall.id} className="mt-0">
              <div className="bg-mint-light rounded-lg p-1.5 md:p-2 border border-mint overflow-hidden">
                <div className="overflow-hidden rounded-md">
                  <img
                    src={hall.image}
                    alt={`Расписание - ${hall.name}`}
                    className="w-full h-auto object-cover object-center"
                    style={{ marginTop: '-8%', marginBottom: '-5%' }}
                  />
                </div>
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </section>
  );
};
