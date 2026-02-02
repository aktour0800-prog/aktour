import Header from "@/components/landing/Header";
import HeroSection from "@/components/landing/HeroSection";
import ExperienceGallerySection from "@/components/landing/ExperienceGallerySection";
import WhyAlaskaSection from "@/components/landing/WhyAlaskaSection";
import JourneyMapSection from "@/components/landing/JourneyMapSection";
import FinalCTASection from "@/components/landing/FinalCTASection";
import Footer from "@/components/landing/Footer";
import FloatingCallButton from "@/components/landing/FloatingCallButton";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroSection />
        <ExperienceGallerySection />
        <WhyAlaskaSection />
        <JourneyMapSection />
        <FinalCTASection />
      </main>
      <Footer />
      <FloatingCallButton />
    </div>
  );
};

export default Index;
