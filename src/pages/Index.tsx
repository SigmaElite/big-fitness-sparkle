import { Helmet } from "react-helmet-async";
import { Header } from "@/components/landing/Header";
import { Hero } from "@/components/landing/Hero";
import { KidsPrograms } from "@/components/landing/KidsPrograms";
import { AdultPrograms } from "@/components/landing/AdultPrograms";
import { About } from "@/components/landing/About";
import { Schedule } from "@/components/landing/Schedule";
import { Contact } from "@/components/landing/Contact";
import { Footer } from "@/components/landing/Footer";

const Index = () => {
  return (
    <div className="min-h-screen overflow-x-hidden w-full max-w-full">
      <Helmet>
        <title>Big Fitness — Фитнес-студия в Новой Боровой</title>
        <meta name="description" content="Современная фитнес-студия 630 кв.м в Новой Боровой: 4 зала, тренировки для детей 4-14 лет и взрослых. ОФП, нейрофитнес, кикбоксинг, йога." />
        <link rel="canonical" href="https://big-fitness-sparkle.lovable.app/" />
        <meta property="og:title" content="Big Fitness — Фитнес-студия в Новой Боровой" />
        <meta property="og:description" content="Тренировки для детей и взрослых в Новой Боровой. Приходите на бесплатное пробное занятие." />
        <meta property="og:url" content="https://big-fitness-sparkle.lovable.app/" />
      </Helmet>
      <Header />
      <main>
        <Hero />
        <KidsPrograms />
        <AdultPrograms />
        <About />
        <Schedule />
        <Contact />
      </main>
      <Footer />
    </div>
  );
};

export default Index;

