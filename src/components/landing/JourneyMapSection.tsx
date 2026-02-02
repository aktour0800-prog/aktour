import { motion, AnimatePresence, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { ChevronDown, MapPin, Utensils, Building2, Lightbulb, Phone, X, ChevronLeft, ChevronRight } from "lucide-react";

// 이미지 imports - 기존 에셋 활용
import heroImg from "@/assets/hero-alaska.jpg";
import denaliFlightImg from "@/assets/itinerary/denali-flight.jpg";
import glacierCruiseImg from "@/assets/glacier-cruise.jpg";
import salmonHatcheryImg from "@/assets/itinerary/salmon-hatchery.jpg";
import trainImg from "@/assets/itinerary/train.jpg";
import homerImg from "@/assets/itinerary/homer.jpg";
import cablecarImg from "@/assets/itinerary/cablecar.jpg";
import flattopImg from "@/assets/itinerary/flattop.jpg";
import hotelAnchorageImg from "@/assets/itinerary/hotel-anchorage.jpg";
import dogSleddingImg from "@/assets/dog-sledding.jpg";
import helicopterGlacierImg from "@/assets/helicopter-glacier.jpg";
import pipelineImg from "@/assets/itinerary/pipeline.jpg";
import hotelValdezImg from "@/assets/itinerary/hotel-valdez.jpg";
import trainScenicImg from "@/assets/experiences/train-scenic.jpg";
import cityFishermanImg from "@/assets/experiences/city-fisherman.jpg";
import salmonFishingImg from "@/assets/experiences/salmon-fishing.jpg";
import mealCrabImg from "@/assets/itinerary/meal-crab.jpg";
import mealHalibutImg from "@/assets/itinerary/meal-halibut.jpg";
import hotelLodgeImg from "@/assets/itinerary/hotel-lodge.jpg";

interface JourneyPoint {
  id: number;
  day: string;
  city: string;
  cityEn: string;
  summary: string;
  image: string;
  gallery: string[];
  highlight?: boolean;
  details: {
    activities: string[];
    meals: string[];
    hotel: string;
    tips?: string;
  };
}

const journeyPoints: JourneyPoint[] = [
  {
    id: 1,
    day: "Day 1",
    city: "앵커리지",
    cityEn: "Anchorage",
    summary: "Flat Top 관망대 · 다운타운 관광",
    image: heroImg,
    gallery: [flattopImg, hotelAnchorageImg, heroImg],
    details: {
      activities: [
        "앵커리지 공항 도착 및 영접 (오후 5시 이전 도착)",
        "추가치산 Flat Top 관망대 시야 관광",
        "앵커리지 다운타운 및 주변지역 관광",
        "Hood Lake 수상 비행장",
        "Wildberry 초콜릿 폭포"
      ],
      meals: ["석식"],
      hotel: "Alex Hotel & Suite or 동급(중상급) / Millenium Hotel or 동급(고급)",
      tips: "해발 400m 높이 추가치산에서 앵커리지시를 한눈에!"
    }
  },
  {
    id: 2,
    day: "Day 2",
    city: "타키나",
    cityEn: "Talkeetna",
    summary: "개썰매 체험 · 디날리산 경비행기",
    image: denaliFlightImg,
    gallery: [denaliFlightImg, dogSleddingImg, helicopterGlacierImg],
    highlight: true,
    details: {
      activities: [
        "글렌하이웨이를 따라 와실라로 이동",
        "개썰매 박물관 방문 및 체험",
        "디날리산(6,194m) 경비행기 관광 ⭐",
        "빙하 랜딩 옵션 가능"
      ],
      meals: ["조식", "중식", "석식"],
      hotel: "Alex Hotel & Suite or 동급(중상급) / Millenium Hotel or 동급(고급)",
      tips: "북미 최고봉 디날리산을 경비행기로! 시야관광 $305 / 랜딩 $445"
    }
  },
  {
    id: 3,
    day: "Day 3-4",
    city: "발디즈",
    cityEn: "Valdez",
    summary: "콜롬비아 빙하 유람선 · 7시간 특선 포함",
    image: glacierCruiseImg,
    gallery: [glacierCruiseImg, pipelineImg, hotelValdezImg],
    highlight: true,
    details: {
      activities: [
        "헤쳐패스 인디펜던스 광산 대평원",
        "알래스카 파이프라인 (800마일)",
        "키스톤 캐년 - 면사포 폭포, 말꼬리 폭포",
        "탐슨패스(855m) 정상",
        "콜롬비아 빙하 7시간 유람선 관광 ⭐ (특선포함)",
        "프린스 윌리엄 사운드 해양동물 감상"
      ],
      meals: ["조식", "중식", "석식", "선상식"],
      hotel: "Glacier Hotel or 동급(중급) / Princess Lodge or 동급(고급)",
      tips: "알래스카 최대 콜롬비아 빙하! 물개, 수달, 고래 감상"
    }
  },
  {
    id: 4,
    day: "Day 5",
    city: "앵커리지",
    cityEn: "Anchorage",
    summary: "워팅톤 빙하 · 마타누스카 빙하",
    image: salmonHatcheryImg,
    gallery: [salmonHatcheryImg, helicopterGlacierImg, hotelAnchorageImg],
    details: {
      activities: [
        "솔로몬 연어 부화장 방문",
        "워팅톤 빙하 관광 (5,774 에이커)",
        "링겔 세인트 엘리야스 국립공원",
        "마타누스카 빙하 VIEW (미국 최장 27마일)"
      ],
      meals: ["조식", "중식", "석식"],
      hotel: "Alex Hotel & Suite or 동급(중상급) / Millenium Hotel or 동급(고급)",
      tips: "연어떼 가득한 부화장에서 운 좋으면 곰도!"
    }
  },
  {
    id: 5,
    day: "Day 6",
    city: "스워드",
    cityEn: "Seward",
    summary: "알래스카 기차 4시간 20분 · 피요르드 국립공원",
    image: trainImg,
    gallery: [trainImg, trainScenicImg, hotelLodgeImg],
    highlight: true,
    details: {
      activities: [
        "앵커리지→스워드 기차 관광 (4시간 20분) ⭐",
        "태초의 원시림과 만년설 감상",
        "BENNY BENSON 기념비 방문",
        "쿠퍼랜딩 키나이강 트레일 걷기",
        "러시아 정교회 유적지 관광"
      ],
      meals: ["조식", "중식", "석식"],
      hotel: "Quality Inn & Suite or 동급(중상급) / Land's End 리조트(고급)",
      tips: "알래스카에서 가장 인기있는 기차! 일반 $185 / 고급 $325"
    }
  },
  {
    id: 6,
    day: "Day 7",
    city: "호머",
    cityEn: "Homer",
    summary: "MBC 도시어부 촬영지 · 알래스카 땅끝 도시",
    image: homerImg,
    gallery: [homerImg, cityFishermanImg, salmonFishingImg, mealHalibutImg],
    highlight: true,
    details: {
      activities: [
        "도시어부 촬영지 호머 자유관광 ⭐",
        "방문객 센터 탐방",
        "모래섬 바닷길 걷기 (3.5마일)",
        "알래스카 광어 전시 및 손질법 구경",
        "등대 술집 구경"
      ],
      meals: ["조식", "중식(자유식)", "석식"],
      hotel: "Quality Inn & Suite or 동급(중상급) / Land's End 리조트(고급)",
      tips: "옵션: Bear Viewing $1200 / 광어 낚시 $250 / 세도비아 섬 투어 $150"
    }
  },
  {
    id: 7,
    day: "Day 8-9",
    city: "앵커리지",
    cityEn: "Anchorage",
    summary: "추가치산 케이블카 · 귀국",
    image: cablecarImg,
    gallery: [cablecarImg, mealCrabImg, hotelAnchorageImg],
    details: {
      activities: [
        "솔다나 Visitor Center 방문",
        "키나이강 올레길 걷기",
        "추가치산 케이블카 관광 (700m) ⭐",
        "Turnagain 만 전경 감상",
        "자유시간 및 특산품 쇼핑",
        "공항 이동 및 환송"
      ],
      meals: ["조식", "중식", "석식", "조식(9일차)"],
      hotel: "Alex Hotel & Suite or 동급(중상급) / Millenium Hotel or 동급(고급)",
      tips: "추가치산 케이블카 $60 - 라운지에서 커피와 함께 절경 감상"
    }
  },
];

const JourneyMapSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });
  const [expandedId, setExpandedId] = useState<number | null>(null);
  
  // 갤러리 모달 상태
  const [modalOpen, setModalOpen] = useState(false);
  const [modalImages, setModalImages] = useState<string[]>([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const toggleExpand = (id: number) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const openGalleryModal = (images: string[], startIndex: number) => {
    setModalImages(images);
    setCurrentImageIndex(startIndex);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % modalImages.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + modalImages.length) % modalImages.length);
  };

  // 스와이프 핸들러
  const handleDragEnd = (event: any, info: any) => {
    const threshold = 50;
    if (info.offset.x < -threshold) {
      nextImage();
    } else if (info.offset.x > threshold) {
      prevImage();
    }
  };

  return (
    <section id="itinerary" className="py-16 md:py-20 bg-secondary" ref={ref}>
      <motion.div
        className="container mx-auto px-5"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* Section Header */}
        <div className="text-center mb-10">
          <motion.h2 
            className="section-title text-foreground mb-2"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1 }}
          >
            8박 9일 여정 지도
          </motion.h2>
          <motion.p 
            className="text-lg text-accent font-semibold mb-3"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2 }}
          >
            Let's go Alaska!!!
          </motion.p>
          <motion.div
            className="w-16 h-1 bg-accent mx-auto mb-4 rounded-full"
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : {}}
            transition={{ delay: 0.3 }}
          />
          <motion.p 
            className="text-base text-muted-foreground"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.4 }}
          >
            각 일정을 터치하면 상세 내용을 볼 수 있어요
          </motion.p>
        </div>

        {/* Journey Accordion */}
        <div className="max-w-2xl mx-auto">
          {journeyPoints.map((point, index) => (
            <motion.div
              key={point.id}
              className="relative flex"
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.1 * index + 0.3 }}
            >
              {/* Day Badge - Compact */}
              <div className="flex-shrink-0 mr-3">
                <div className={`w-14 h-14 rounded-xl overflow-hidden border-2 bg-white shadow-sm ${
                  point.highlight ? 'border-accent' : 'border-accent/40'
                }`}>
                  <img 
                    src={point.image} 
                    alt={point.city}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              {/* Right Content Column */}
              <div className="flex-1 min-w-0 pb-3">
                {/* Accordion Header */}
                <button
                  onClick={() => toggleExpand(point.id)}
                  className={`w-full text-left p-3 rounded-xl transition-all duration-300 ${
                    expandedId === point.id 
                      ? 'bg-white shadow-sm' 
                      : 'bg-white/70 hover:bg-white'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className="bg-accent text-primary text-xs font-bold px-2 py-0.5 rounded">
                        {point.day}
                      </span>
                      <span className="font-bold text-lg text-foreground">
                        {point.city}
                      </span>
                      {point.highlight && expandedId !== point.id && (
                        <span className="text-accent text-sm">★</span>
                      )}
                    </div>
                    <ChevronDown 
                      className={`w-5 h-5 text-muted-foreground transition-transform duration-300 flex-shrink-0 ${
                        expandedId === point.id ? 'rotate-180' : ''
                      }`}
                    />
                  </div>
                  <p className="text-sm text-muted-foreground mt-1 line-clamp-1">
                    {point.summary}
                  </p>
                </button>

                {/* Accordion Content */}
                <AnimatePresence>
                  {expandedId === point.id && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <div className="px-2 pb-2 pt-2 space-y-2">
                        {/* Photo Gallery - Compact */}
                        {point.gallery && point.gallery.length > 0 && (
                          <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
                            {point.gallery.map((img, idx) => (
                              <motion.div
                                key={idx}
                                className="flex-shrink-0 w-24 h-16 rounded-lg overflow-hidden cursor-pointer"
                                whileTap={{ scale: 0.95 }}
                                onClick={() => openGalleryModal(point.gallery, idx)}
                              >
                                <img 
                                  src={img} 
                                  alt={`${point.city} ${idx + 1}`}
                                  className="w-full h-full object-cover"
                                />
                              </motion.div>
                            ))}
                          </div>
                        )}

                        {/* Activities */}
                        <div className="bg-white rounded-lg p-4">
                          <div className="flex items-center gap-2 mb-3">
                            <MapPin className="w-4 h-4 text-accent flex-shrink-0" />
                            <span className="font-bold text-foreground text-sm">주요 일정</span>
                          </div>
                          <ul className="space-y-2 pl-6">
                            {point.details.activities.map((activity, idx) => (
                              <li key={idx} className="text-sm text-foreground leading-relaxed list-disc marker:text-accent">
                                {activity}
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Meals */}
                        <div className="bg-white rounded-lg p-4">
                          <div className="flex items-center gap-2 mb-3">
                            <Utensils className="w-4 h-4 text-accent flex-shrink-0" />
                            <span className="font-bold text-foreground text-sm">식사</span>
                          </div>
                          <div className="flex flex-wrap gap-2 pl-6">
                            {point.details.meals.map((meal, idx) => (
                              <span key={idx} className="bg-accent/20 text-foreground text-sm font-medium px-3 py-1 rounded-full">
                                {meal}
                              </span>
                            ))}
                          </div>
                        </div>

                        {/* Hotel */}
                        <div className="bg-white rounded-lg p-4">
                          <div className="flex items-center gap-2 mb-3">
                            <Building2 className="w-4 h-4 text-accent flex-shrink-0" />
                            <span className="font-bold text-foreground text-sm">숙소</span>
                          </div>
                          <p className="text-foreground text-sm leading-relaxed pl-6">
                            {point.details.hotel}
                          </p>
                        </div>

                        {/* Tips */}
                        {point.details.tips && (
                          <div className="bg-accent/10 rounded-lg p-4 border border-accent/30">
                            <div className="flex items-center gap-2 mb-2">
                              <Lightbulb className="w-4 h-4 text-accent flex-shrink-0" />
                              <span className="font-bold text-foreground text-sm">TIP</span>
                            </div>
                            <p className="text-foreground text-sm leading-relaxed pl-6">
                              {point.details.tips}
                            </p>
                          </div>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Route Summary */}
        <motion.div
          className="mt-10 max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8 }}
        >
          {/* Visual Route Path */}
          <div className="bg-white rounded-2xl p-5 shadow-card mb-4">
            <div className="flex flex-wrap items-center justify-center gap-2">
              {[
                { city: "앵커리지", highlight: true },
                { city: "타키나", highlight: false },
                { city: "발디즈", highlight: true },
                { city: "스워드", highlight: false },
                { city: "호머", highlight: true },
                { city: "앵커리지", highlight: true },
              ].map((item, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <span className={`text-sm font-medium px-3 py-1 rounded-full ${
                    item.highlight 
                      ? 'bg-accent text-primary' 
                      : 'bg-secondary text-muted-foreground'
                  }`}>
                    {item.city}
                  </span>
                  {idx < 5 && (
                    <span className="text-muted-foreground">
                      →
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* MBC Badge */}
          <div className="flex items-center justify-center gap-3 bg-primary text-primary-foreground rounded-2xl px-5 py-4 mb-6">
            <span className="bg-accent text-primary font-bold px-3 py-1 rounded-lg text-sm">
              MBC
            </span>
            <span className="font-medium">도시어부 알래스카 편 촬영 코스</span>
          </div>

          {/* Info Boxes */}
          <div className="space-y-3 mb-6">
            <div className="bg-white rounded-2xl p-4 border-l-4 border-accent shadow-sm">
              <p className="text-foreground text-base font-medium">
                ✅ <strong>포함:</strong> 전일정 숙박(중상급~고급) · 식사(조중석) · 가이드 · 전용차량 · 콜롬비아 빙하 유람선
              </p>
            </div>
            <div className="bg-white rounded-2xl p-4 border-l-4 border-primary shadow-sm">
              <p className="text-foreground text-base">
                ℹ️ 상세 요금은 전화 상담 시 안내드립니다
              </p>
            </div>
          </div>

          {/* CTA Button */}
          <div className="text-center">
            <a 
              href="tel:010-6424-7774"
              className="btn-gold inline-flex"
            >
              <Phone className="w-5 h-5" />
              일정 문의하기
            </a>
          </div>
        </motion.div>
      </motion.div>

      {/* 갤러리 모달 */}
      <AnimatePresence>
        {modalOpen && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeModal}
          >
            {/* 닫기 버튼 */}
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 z-10 p-2 bg-white/20 rounded-full hover:bg-white/30 transition-colors"
            >
              <X className="w-8 h-8 text-white" />
            </button>

            {/* 이미지 카운터 */}
            <div className="absolute top-4 left-1/2 -translate-x-1/2 z-10 bg-white/20 px-4 py-2 rounded-full">
              <span className="text-white font-bold text-lg">
                {currentImageIndex + 1} / {modalImages.length}
              </span>
            </div>

            {/* 이전 버튼 */}
            <button
              onClick={(e) => { e.stopPropagation(); prevImage(); }}
              className="absolute left-2 md:left-4 z-10 p-2 bg-white/20 rounded-full hover:bg-white/30 transition-colors"
            >
              <ChevronLeft className="w-8 h-8 text-white" />
            </button>

            {/* 다음 버튼 */}
            <button
              onClick={(e) => { e.stopPropagation(); nextImage(); }}
              className="absolute right-2 md:right-4 z-10 p-2 bg-white/20 rounded-full hover:bg-white/30 transition-colors"
            >
              <ChevronRight className="w-8 h-8 text-white" />
            </button>

            {/* 스와이프 가능한 이미지 */}
            <motion.div
              key={currentImageIndex}
              className="w-full h-full flex items-center justify-center p-4"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.2}
              onDragEnd={handleDragEnd}
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={modalImages[currentImageIndex]}
                alt={`Gallery ${currentImageIndex + 1}`}
                className="max-w-full max-h-[80vh] object-contain rounded-lg shadow-2xl"
                draggable={false}
              />
            </motion.div>

            {/* 하단 썸네일 */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 px-4 overflow-x-auto max-w-full scrollbar-hide">
              {modalImages.map((img, idx) => (
                <button
                  key={idx}
                  onClick={(e) => { e.stopPropagation(); setCurrentImageIndex(idx); }}
                  className={`flex-shrink-0 w-16 h-12 rounded-lg overflow-hidden transition-all ${
                    idx === currentImageIndex 
                      ? 'ring-2 ring-accent scale-110' 
                      : 'opacity-60 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt={`Thumb ${idx + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default JourneyMapSection;
