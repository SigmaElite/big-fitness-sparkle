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
    <section id="schedule" className="py-12 md:py-16 bg-card relative overflow-hidden" ref={ref}>
      <div className="container mx-auto px-4 relative z-10">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-6 md:mb-8"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-heading font-black mb-2">
            <span className="text-foreground">Расписание </span>
            <span className="text-primary">занятий</span>
          </h2>
          <p className="text-sm md:text-base text-muted-foreground">
            Выберите зал для просмотра расписания
          </p>
        </motion.div>

        {/* Tabs for halls */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 gap-2 bg-transparent h-auto mb-4 md:mb-6">
              {scheduleHalls.map((hall) => (
                <TabsTrigger
                  key={hall.id}
                  value={hall.id}
                  className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground bg-mint text-foreground rounded-xl py-2.5 px-3 text-sm font-semibold transition-all duration-300 hover:bg-mint-dark"
                >
                  {hall.name}
                </TabsTrigger>
              ))}
            </TabsList>

            {scheduleHalls.map((hall) => (
              <TabsContent key={hall.id} value={hall.id} className="mt-0">
                <div className="bg-mint-light rounded-xl md:rounded-2xl p-2 md:p-4 border border-mint">
                  <img
                    src={hall.image}
                    alt={`Расписание - ${hall.name}`}
                    className="w-full h-auto rounded-lg md:rounded-xl"
                  />
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </motion.div>
      </div>
    </section>
  );
};
