const trustPoints = [
  {
    value: "18년",
    label: "여행업 경력",
    description: "2007년 설립, 국내외 여행 전문",
  },
  {
    value: "📺",
    label: "도시어부 코디네이터",
    description: "MBC 알래스카 편 촬영 총괄\n김락희 대표 동행",
  },
  {
    value: "15명",
    label: "최대 인원",
    description: "프라이빗 케어, 소규모 프리미엄",
  },
];

const WhyAlaskaSection = () => {
  return (
    <section id="why" className="py-16 md:py-20 bg-background">
      <div className="container mx-auto px-5">
        {/* Section Title */}
        <div className="text-center mb-10">
          <h2 className="section-title text-foreground mb-3">
            왜 아름다운비행인가요?
          </h2>
        </div>

        {/* Trust Points - Vertical Cards on Mobile */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 max-w-4xl mx-auto">
          {trustPoints.map((point, index) => (
            <div 
              key={index}
              className="bg-white rounded-2xl p-6 text-center shadow-card"
            >
              <div className="text-accent text-4xl md:text-5xl font-bold mb-3">
                {point.value}
              </div>
              <h3 className="text-foreground font-bold text-xl mb-2">
                {point.label}
              </h3>
              <p className="text-muted-foreground text-base whitespace-pre-line">
                {point.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyAlaskaSection;
