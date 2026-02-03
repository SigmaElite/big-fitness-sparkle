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
      <Header />
      <Hero />
      <KidsPrograms />
      <AdultPrograms />
      <About />
      <Schedule />
      <Contact />
      <Footer />
    </div>
  );
};

export default Index;
