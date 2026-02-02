import { useState } from "react";
import { ChevronDown, MapPin, Building2, Phone } from "lucide-react";

interface DayData {
  day: number;
  title: string;
  location: string;
  activities: string[];
  highlights?: string[];
  hotel: string;
}

const itineraryData: DayData[] = [
  {
    day: 1,
    title: "앵커리지 도착",
    location: "앵커리지",
    activities: [
      "공항 영접 (오후 5시 이전 도착)",
      "Flat Top 관망대 시야관광",
      "앵커리지 다운타운 투어",
      "Hood Lake 수상비행장",
    ],
    hotel: "Alex Hotel & Suite 또는 동급",
  },
  {
    day: 2,
    title: "개썰매 & 디날리산",
    location: "와실라 · 타키나",
    activities: [
      "개썰매 박물관 & 체험",
    ],
    highlights: [
      "⭐ 디날리산 경비행기 관광 (강추!)",
      "북미 최고봉 6,194m",
      "빙하 착륙 체험 가능",
    ],
    hotel: "Alex Hotel & Suite 또는 동급",
  },
  {
    day: 3,
    title: "대자연 드라이브",
    location: "카퍼리버 · 발디즈",
    activities: [
      "헤쳐패스 인디펜던스 광산 대평원",
      "알래스카 파이프라인 (800마일)",
      "키스톤 캐년 (면사포 폭포)",
      "탐슨 패스 정상",
    ],
    hotel: "Glacier Hotel 또는 동급",
  },
  {
    day: 4,
    title: "콜롬비아 빙하 유람선",
    location: "발디즈",
    activities: [
      "발디즈 항구 전망대",
    ],
    highlights: [
      "⭐ 콜롬비아 빙하 유람선 7시간 (특선포함!)",
      "프린스 윌리암 사운드",
      "선상식 제공",
      "물개, 수달, 고래 관찰",
    ],
    hotel: "Glacier Hotel 또는 동급",
  },
  {
    day: 5,
    title: "빙하 & 국립공원",
    location: "발디즈 · 카퍼리버",
    activities: [
      "솔로몬 연어 부화장",
      "워싱턴 빙하",
      "링겔 세인트 엘리야스 국립공원",
      "마타누스카 빙하 (미국 최장 27마일)",
    ],
    hotel: "Alex Hotel & Suite 또는 동급",
  },
  {
    day: 6,
    title: "알래스카 기차여행",
    location: "스워드 · 쿠퍼랜딩 · 키나이",
    activities: [
      "BENNY BENSON 기념비",
      "프린세스 라찌 투어",
      "러시아 정교회 유적지",
    ],
    highlights: [
      "⭐ 스워드 기차 4시간 20분",
      "태초의 원시림과 만년설",
      "피요르드 국립공원",
    ],
    hotel: "Quality Inn & Suite 또는 동급",
  },
  {
    day: 7,
    title: "도시어부 촬영지 호머",
    location: "호머 (알래스카 땅끝 도시)",
    activities: [
      "방문객 센터 탐방",
      "모래섬 바닷길 걷기 (3.5마일)",
      "알래스카 광어 전시",
      "등대 술집 구경",
    ],
    highlights: [
      "⭐ MBC 도시어부 촬영지!",
      "[옵션] 광어 바다낚시, 곰 투어",
    ],
    hotel: "Quality Inn & Suite 또는 동급",
  },
  {
    day: 8,
    title: "추가치산 케이블카",
    location: "솔다나 · 걸우드",
    activities: [
      "솔다나 Visitor Center",
      "키나이강 올레길 걷기",
    ],
    highlights: [
      "⭐ 추가치산 케이블카 (700m)",
      "턴어게인 만 전경",
      "라운지 커피 타임",
    ],
    hotel: "Alex Hotel & Suite 또는 동급",
  },
  {
    day: 9,
    title: "귀국",
    location: "앵커리지",
    activities: [
      "자유시간 & 특산품 쇼핑",
      "공항 이동 및 환송",
      "✈️ 안녕히 가세요!",
    ],
    hotel: "",
  },
];

const DayCard = ({ data }: { data: DayData }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="day-card">
      <button 
        className="day-card-header w-full text-left"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-xl bg-primary flex items-center justify-center flex-shrink-0">
            <span className="text-white font-bold text-lg">
              {data.day}일
            </span>
          </div>
          <div>
            <h3 className="font-bold text-lg text-foreground">
              {data.title}
            </h3>
            <p className="text-muted-foreground flex items-center gap-1 text-base">
              <MapPin className="w-4 h-4" />
              {data.location}
            </p>
          </div>
        </div>
        <ChevronDown 
          className={`w-6 h-6 text-muted-foreground transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`} 
        />
      </button>

      {isOpen && (
        <div className="day-card-content border-t border-border pt-4">
          {/* Activities */}
          <ul className="space-y-2 mb-4">
            {data.activities.map((activity, idx) => (
              <li key={idx} className="flex items-start gap-2 text-foreground text-base">
                <span className="text-muted-foreground mt-1">•</span>
                {activity}
              </li>
            ))}
          </ul>

          {/* Highlights */}
          {data.highlights && data.highlights.length > 0 && (
            <div className="bg-accent/10 rounded-xl p-4 mb-4">
              {data.highlights.map((highlight, idx) => (
                <p key={idx} className="text-foreground font-medium text-base leading-relaxed">
                  {highlight}
                </p>
              ))}
            </div>
          )}

          {/* Hotel */}
          {data.hotel && (
            <div className="flex items-center gap-2 text-muted-foreground text-base">
              <Building2 className="w-5 h-5" />
              <span>🏨 {data.hotel}</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

const ItinerarySection = () => {
  return (
    <section id="itinerary" className="py-16 md:py-20 bg-secondary">
      <div className="container mx-auto px-5">
        {/* Section Header */}
        <div className="text-center mb-8">
          <h2 className="section-title text-foreground mb-2">
            8박 9일 완벽한 여정
          </h2>
          <p className="text-lg text-accent font-semibold mb-3">
            도시어부 촬영지 코스
          </p>
          <p className="text-base text-muted-foreground">
            앵커리지 → 발디즈 → 스워드 → 호머 → 앵커리지
          </p>
        </div>

        {/* Day Cards */}
        <div className="space-y-4 max-w-2xl mx-auto mb-10">
          {itineraryData.map((day) => (
            <DayCard key={day.day} data={day} />
          ))}
        </div>

        {/* Info Boxes */}
        <div className="max-w-2xl mx-auto space-y-4 mb-8">
          <div className="bg-white rounded-2xl p-5 border-l-4 border-accent">
            <p className="text-foreground text-base font-medium">
              ✅ <strong>포함:</strong> 전일정 숙박(중상급~고급) · 식사(조중석) · 가이드 · 전용차량 · 콜롬비아 빙하 유람선
            </p>
          </div>
          <div className="bg-white rounded-2xl p-5 border-l-4 border-primary">
            <p className="text-foreground text-base">
              ℹ️ 상세 요금은 전화 상담 시 안내드립니다
            </p>
          </div>
        </div>

        {/* CTA Button */}
        <div className="text-center">
          <a 
            href="tel:010-3309-0800"
            className="btn-gold inline-flex"
          >
            <Phone className="w-5 h-5" />
            일정 문의하기
          </a>
        </div>
      </div>
    </section>
  );
};

export default ItinerarySection;
