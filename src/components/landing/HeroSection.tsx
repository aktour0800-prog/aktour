import { ChevronDown, Phone } from "lucide-react";
import heroVideo from "@/assets/hero-video.mp4";

const HeroSection = () => {
  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Video */}
      <div className="absolute inset-0">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src={heroVideo} type="video/mp4" />
        </video>
        <div 
          className="absolute inset-0"
          style={{ background: 'var(--gradient-hero)' }}
        />
      </div>

      {/* MBC Badge */}
      <div className="absolute top-20 right-4 md:top-24 md:right-8 z-20">
        <span className="inline-block px-4 py-2 text-sm font-semibold bg-white/20 backdrop-blur-sm rounded-full text-white border border-white/30">
          📺 MBC 도시어부 촬영지
        </span>
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-5 text-center text-white pt-16">
        {/* Slogan */}
        <p className="text-accent font-display italic text-xl md:text-2xl mb-4">
          Let's go Alaska!!!
        </p>

        {/* Main Headline - Large for Seniors */}
        <h1 className="text-[32px] md:text-[44px] lg:text-[52px] font-bold leading-tight mb-6">
          살면서 꼭 한번,
          <br />
          <span className="text-white">알래스카</span>
        </h1>

        {/* Subtext - Clear and Readable */}
        <p className="text-white/90 text-lg md:text-xl leading-relaxed max-w-lg mx-auto mb-4">
          빙하 헬리콥터 · 개썰매 · 빙하 유람선
        </p>
        <p className="text-accent font-semibold text-lg md:text-xl mb-10">
          8박 9일 프리미엄 소그룹 투어
        </p>

        {/* CTA Buttons - Large Touch Targets */}
        <div className="flex flex-col gap-4 max-w-sm mx-auto">
          <a 
            href="tel:010-3309-0800" 
            className="btn-gold w-full text-xl"
          >
            <Phone className="w-6 h-6" />
            전화 상담하기
          </a>
          <button
            onClick={() => scrollToSection("itinerary")}
            className="btn-outline-light w-full"
          >
            일정 자세히 보기
          </button>
        </div>

        {/* Small Text */}
        <p className="text-white/60 text-base mt-8">
          15명 이하 소그룹 · 전문 가이드 동행
        </p>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/50 animate-bounce-slow">
        <ChevronDown className="w-8 h-8" />
      </div>
    </section>
  );
};

export default HeroSection;
