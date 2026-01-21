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
    <section id="schedule" className="py-16 md:py-24 bg-card relative overflow-hidden" ref={ref}>
      {/* Background decoration */}
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
          className="text-center mb-8 md:mb-12"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={isInView ? { scale: 1 } : {}}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="inline-flex items-center gap-2 bg-mint rounded-full px-4 py-2 mb-6"
          >
            <Calendar className="w-5 h-5 text-primary" />
            <span className="font-semibold text-foreground">Расписание</span>
          </motion.div>

          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-heading font-black mb-4">
            <span className="text-foreground">Расписание </span>
            <span className="text-primary">занятий</span>
          </h2>
          <p className="text-sm md:text-lg text-muted-foreground max-w-xl mx-auto">
            Актуальное расписание по залам. Выберите нужный зал.
          </p>
        </motion.div>

        {/* Tabs for halls */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 gap-2 bg-transparent h-auto mb-6 md:mb-8">
              {scheduleHalls.map((hall) => (
                <TabsTrigger
                  key={hall.id}
                  value={hall.id}
                  className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground bg-mint text-foreground rounded-xl py-3 px-4 font-semibold transition-all duration-300 hover:bg-mint-dark"
                >
                  {hall.name}
                </TabsTrigger>
              ))}
            </TabsList>

            {scheduleHalls.map((hall) => (
              <TabsContent key={hall.id} value={hall.id} className="mt-0">
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4 }}
                  className="relative bg-gradient-to-br from-mint-light to-card rounded-2xl md:rounded-3xl p-3 md:p-6 border-2 border-mint overflow-hidden"
                >
                  <img
                    src={hall.image}
                    alt={`Расписание - ${hall.name}`}
                    className="w-full h-auto rounded-xl md:rounded-2xl shadow-lg"
                  />
                  
                  {/* Decorative elements */}
                  <motion.div
                    className="absolute -top-10 -right-10 w-32 h-32 bg-primary/10 rounded-full"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 4, repeat: Infinity }}
                  />
                  <motion.div
                    className="absolute -bottom-8 -left-8 w-24 h-24 bg-mint rounded-full opacity-50"
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}
                  />
                </motion.div>
              </TabsContent>
            ))}
          </Tabs>
        </motion.div>

        {/* Note for admins */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.8 }}
          className="text-center text-muted-foreground/60 text-sm mt-6"
        >
          Для обновления расписания замените изображения в папке src/assets/
        </motion.p>
      </div>
    </section>
  );
};
