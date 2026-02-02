import glacierCruise from "@/assets/glacier-cruise.jpg";
import helicopterGlacier from "@/assets/helicopter-glacier.jpg";
import dogSledding from "@/assets/dog-sledding.jpg";
import trainScenic from "@/assets/experiences/train-scenic.jpg";
import salmonFishing from "@/assets/experiences/salmon-fishing.jpg";
import aurora from "@/assets/experiences/aurora.jpg";
import midnightSun from "@/assets/experiences/midnight-sun.jpg";

const experiences = [
  {
    title: "빙하 크루즈",
    description: "7시간 콜롬비아 빙하 유람선",
    image: glacierCruise,
    highlight: true,
  },
  {
    title: "경비행기 투어",
    description: "디날리산 빙하 착륙 체험",
    image: helicopterGlacier,
    highlight: true,
  },
  {
    title: "개썰매",
    description: "세계 최고의 개썰매 본고장",
    image: dogSledding,
  },
  {
    title: "기차 여행",
    description: "4시간 20분 원시림 감상",
    image: trainScenic,
  },
  {
    title: "연어 낚시",
    description: "알래스카 자연 속 낚시 체험",
    image: salmonFishing,
  },
  {
    title: "오로라",
    description: "하늘의 커튼, 신비로운 빛",
    image: aurora,
  },
  {
    title: "백야",
    description: "해가 지지 않는 여름밤",
    image: midnightSun,
  },
];

const ExperienceGallerySection = () => {
  return (
    <section id="experiences" className="py-16 md:py-20 bg-background">
      <div className="container mx-auto px-5">
        {/* Section Title */}
        <div className="text-center mb-10">
          <h2 className="section-title text-foreground mb-3">
            알래스카 7대 필수 체험
          </h2>
          <p className="text-lg text-muted-foreground">
            평생 잊지 못할 특별한 경험들
          </p>
        </div>

        {/* Experience Grid - 2 columns on mobile */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-5">
          {experiences.map((exp, index) => (
            <div 
              key={index}
              className="relative rounded-2xl overflow-hidden aspect-[4/5] group"
            >
              {/* Image */}
              <img 
                src={exp.image} 
                alt={exp.title}
                className="absolute inset-0 w-full h-full object-cover"
              />
              
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
              
              {/* Highlight Badge */}
              {exp.highlight && (
                <div className="absolute top-3 left-3">
                  <span className="px-2 py-1 bg-accent text-primary text-xs font-bold rounded-lg">
                    ⭐ 추천
                  </span>
                </div>
              )}
              
              {/* Content */}
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <h3 className="text-white font-bold text-lg md:text-xl mb-1">
                  {exp.title}
                </h3>
                <p className="text-white/80 text-sm md:text-base leading-snug">
                  {exp.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ExperienceGallerySection;
