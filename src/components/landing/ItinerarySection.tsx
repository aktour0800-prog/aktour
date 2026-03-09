import { useMemo, useState } from "react";
import { alaskaMobilePhotos } from "@/data/alaskaMobilePhotos";
import {
  BedDouble,
  Camera,
  ChevronDown,
  Clock3,
  MapPin,
  Phone,
  UtensilsCrossed,
} from "lucide-react";

interface DayData {
  day: number;
  title: string;
  route: string;
  summary: string;
  timeline: string[];
  meals: {
    breakfast: string;
    lunch: string;
    dinner: string;
  };
  hotel: string;
  options?: string[];
}

interface PhotoItem {
  path: string;
  url: string;
  fileName: string;
  title: string;
  folderName: string;
  day?: number;
}

const dayPlans: DayData[] = [
  {
    day: 1,
    title: "앵커리지 도착 · 시내 적응",
    route: "앵커리지 공항 → Flat Top → 다운타운 → 호텔",
    summary:
      "오후 5시 이전 공항 도착 기준으로 가이드 미팅 후 시내 핵심 포인트를 둘러보는 첫날 코스입니다.",
    timeline: [
      "공항 영접 후 전용차량 탑승, 호텔 체크인",
      "추가치산 Flat Top 관망대 시야 관광(단독관광 시)",
      "앵커리지 다운타운 및 주변 지역 드라이브/산책",
      "Hood Lake 수상비행장, Wildberry 초콜릿 폭포 방문",
      "석식 후 전체 일정 브리핑 및 자유시간",
    ],
    meals: { breakfast: "-", lunch: "-", dinner: "석식 포함" },
    hotel:
      "Alex Hotel & Suite 또는 동급(중상급) / Millenium Hotel 또는 동급(고급)",
  },
  {
    day: 2,
    title: "와실라 · 타키나 개썰매 & 디날리",
    route: "앵커리지 → 와실라(개썰매 박물관) → 타키나",
    summary:
      "개썰매 박물관 체험과 함께 디날리 경비행기 옵션을 선택할 수 있는 액티비티 중심 일정입니다.",
    timeline: [
      "조식 후 글렌하이웨이를 따라 와실라 이동",
      "개썰매 박물관 소개 영상 시청 및 역사 전시 관람",
      "개썰매 체험(현장 상황에 따라 진행)",
      "디날리 경비행기 시야/랜딩 선택 관광(옵션)",
      "저녁 후 앵커리지 복귀 및 휴식",
    ],
    meals: { breakfast: "조식 포함", lunch: "중식 포함", dinner: "석식 포함" },
    hotel:
      "Alex Hotel & Suite 또는 동급(중상급) / Millenium Hotel 또는 동급(고급)",
    options: ["디날리 경비행기 시야 $305", "디날리 경비행기 랜딩 $445 (Tax 포함)"],
  },
  {
    day: 3,
    title: "헤쳐패스 · 파이프라인 · 발데즈",
    route: "앵커리지 → 팔머/헤쳐패스 → 카퍼리버 → 발데즈",
    summary:
      "헤쳐패스 대평원과 파이프라인, 키스톤 캐년을 거쳐 발데즈 항구도시로 진입하는 대자연 드라이브 코스입니다.",
    timeline: [
      "조식 후 1번 도로를 따라 헤쳐패스 이동",
      "인디펜던스 광산과 대평원 풍경 감상",
      "알래스카 파이프라인 현장 관광",
      "키스톤 캐년(면사포 폭포, 말꼬리 폭포) 감상",
      "탐슨패스(855m) 경유 후 발데즈 도착, 체크인",
    ],
    meals: { breakfast: "조식 포함", lunch: "중식 포함", dinner: "석식 포함" },
    hotel: "Glacier Hotel 동급(중급) / Princess Lodge 동급(고급)",
  },
  {
    day: 4,
    title: "발데즈 · 콜롬비아 빙하 유람선",
    route: "발데즈 항구 전망대 → 프린스 윌리엄 사운드",
    summary:
      "발데즈 핵심 일정인 7시간 콜롬비아 빙하 유람선 특선 포함 코스입니다.",
    timeline: [
      "조식 후 발데즈 항구 전망대 이동 및 주변 관광",
      "콜롬비아 빙하 유람선 탑승(약 7시간)",
      "선상식과 함께 유빙/빙하 절경 감상",
      "물개, 수달, 고래 등 해양 야생동물 관찰",
      "투어 후 석식 및 자유시간",
    ],
    meals: { breakfast: "조식 포함", lunch: "중식(선상식)", dinner: "석식 포함" },
    hotel: "Glacier Hotel 동급(중급) / Princess Lodge 동급(고급)",
  },
  {
    day: 5,
    title: "연어부화장 · 워딩턴 · 마타누스카",
    route: "발데즈 → 카퍼리버 → 마타누스카 뷰 → 앵커리지",
    summary:
      "연어 생태 체험과 국립공원 비지터센터, 계곡 빙하 뷰포인트를 묶은 이동형 일정입니다.",
    timeline: [
      "발데즈 구항구 및 지진 흔적지, 솔로몬 연어부화장 방문",
      "워딩턴 빙하 관광(탐슨패스 인접)",
      "랭겔-세인트 엘리야스 국립공원 Visitor Center 방문",
      "마타누스카 빙하 VIEW 포인트 감상",
      "앵커리지 복귀 후 체크인 및 휴식",
    ],
    meals: { breakfast: "조식 포함", lunch: "중식 포함", dinner: "석식 포함" },
    hotel:
      "Alex Hotel & Suite 또는 동급(중상급) / Millenium Hotel 또는 동급(고급)",
  },
  {
    day: 6,
    title: "스워드 기차 · 쿠퍼랜딩 · 키나이",
    route: "앵커리지 역 → 스워드 → 쿠퍼랜딩 → 키나이",
    summary:
      "알래스카 레일로드와 피요르드 해안, 러시아 유적지까지 연결되는 테마형 교통 관광 일정입니다.",
    timeline: [
      "앵커리지 기차역 체크인 후 스워드행 기차 탑승",
      "4시간 20분 기차 관광(원시림, 만년설 풍경)",
      "스워드 항구 관광 후 쿠퍼랜딩 이동",
      "키나이강 트레일 걷기 및 주변 자연 감상",
      "BENNY BENSON 기념비 및 러시아 정교회 유적지 방문",
    ],
    meals: { breakfast: "조식 포함", lunch: "중식 포함", dinner: "석식 포함" },
    hotel: "Quality Inn & Suite 동급(중상급) / Land's End 리조트 또는 동급(고급)",
    options: [
      "스워드 기차 일반석 $185",
      "스워드 기차 골드스타 $325 (Tax 포함)",
      "헬기 + 빙하 개썰매(1시간 30분) $599",
    ],
  },
  {
    day: 7,
    title: "호머(도시어부 촬영지) 자유관광",
    route: "키나이 → 스털링 하이웨이 → 호머",
    summary:
      "알래스카 땅끝 도시 호머에서 촬영지 감성과 액티비티 옵션을 자유롭게 즐기는 날입니다.",
    timeline: [
      "조식 후 스털링 하이웨이를 따라 호머 이동",
      "방문객 센터 탐방 및 항구 주변 자유 관광",
      "호머 스핏 모래섬 바닷길 산책(약 3.5마일)",
      "광어 전시/손질법 관람, 기념 사진 촬영",
      "등대 술집 등 로컬 스폿 자유 방문",
    ],
    meals: { breakfast: "조식 포함", lunch: "중식 자유식", dinner: "석식 포함" },
    hotel: "Quality Inn & Suite 동급(중상급) / Land's End 리조트 또는 동급(고급)",
    options: [
      "Bear Viewing + 호머 전경 투어(8시간) $1200",
      "광어 바다낚시(6시간, 장비 지원·라이선스 별도) $250",
      "세도비아 섬 투어(5시간) $150",
    ],
  },
  {
    day: 8,
    title: "솔도트나 · 걸우드 케이블카",
    route: "호머 → 솔도트나 → 걸우드 → 앵커리지",
    summary:
      "키나이강 올레길 산책과 알리에스카 케이블카로 Turnagain Arm 파노라마를 즐기는 일정입니다.",
    timeline: [
      "조식 후 호머 출발, 솔도트나 이동",
      "솔도트나 Visitor Center 방문",
      "키나이강 올레길 걷기(단독관광 시)",
      "걸우드 알리에스카 추가치산 케이블카 탑승",
      "라운지 커피 타임과 함께 Turnagain 만 경관 감상",
    ],
    meals: { breakfast: "조식 포함", lunch: "중식 포함", dinner: "석식 포함" },
    hotel:
      "Alex Hotel & Suite 또는 동급(중상급) / Millenium Hotel 또는 동급(고급)",
    options: ["추가치산 케이블카 $60"],
  },
  {
    day: 9,
    title: "앵커리지 출국",
    route: "호텔 자유시간 → 특산품 쇼핑 → 공항 이동",
    summary: "비행기 출발 시간에 맞춰 여유 있게 마무리하는 귀국 일정입니다.",
    timeline: [
      "조식 후 자유시간 또는 특산품 쇼핑",
      "출발 시간에 맞춰 공항 이동 및 환송",
      "귀국편 탑승",
    ],
    meals: { breakfast: "조식 포함", lunch: "-", dinner: "-" },
    hotel: "-",
  },
];

const formatTitle = (fileName: string) =>
  fileName.replace(/\.[^/.]+$/, "").replace(/[_-]+/g, " ").replace(/\s+/g, " ").trim();

const allPhotos: PhotoItem[] = alaskaMobilePhotos
  .map((photo) => ({
    path: `/alaska-mobile/${photo.file}`,
    url: `/alaska-mobile/${photo.file}`,
    fileName: photo.file,
    title: formatTitle(photo.file),
    folderName: photo.group === "day" ? `DAY${photo.day}` : photo.group.toUpperCase(),
    day: photo.day,
  }))
  .sort((a, b) => a.path.localeCompare(b.path, "ko"));

const dayPhotoMap: Record<number, PhotoItem[]> = dayPlans.reduce((acc, plan) => {
  acc[plan.day] = allPhotos.filter((photo) => photo.day === plan.day);
  return acc;
}, {} as Record<number, PhotoItem[]>);

const extraPhotoGroups = Object.entries(
  allPhotos
    .filter((photo) => !photo.day)
    .reduce((acc, photo) => {
      const key = photo.folderName;
      if (!acc[key]) {
        acc[key] = [];
      }
      acc[key].push(photo);
      return acc;
    }, {} as Record<string, PhotoItem[]>),
)
  .map(([name, photos]) => ({
    name,
    photos: photos.sort((a, b) => a.fileName.localeCompare(b.fileName, "ko")),
  }))
  .sort((a, b) => a.name.localeCompare(b.name, "ko"));

const DayCard = ({ data, photos }: { data: DayData; photos: PhotoItem[] }) => {
  const [isOpen, setIsOpen] = useState(data.day === 1);

  return (
    <div className="day-card border border-border/70">
      <button
        type="button"
        className="day-card-header w-full text-left"
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <div className="flex items-center gap-4">
          <div className="h-14 w-14 rounded-xl bg-primary text-primary-foreground flex items-center justify-center flex-shrink-0">
            <span className="text-lg font-bold">{data.day}일</span>
          </div>
          <div>
            <h3 className="font-bold text-lg text-foreground">{data.title}</h3>
            <p className="text-muted-foreground flex items-center gap-1 text-[15px]">
              <MapPin className="w-4 h-4" />
              {data.route}
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
        <div className="day-card-content border-t border-border pt-5 space-y-6">
          <p className="text-base text-foreground leading-relaxed">{data.summary}</p>

          <div className="space-y-3">
            <h4 className="font-semibold text-foreground flex items-center gap-2">
              <Clock3 className="w-4 h-4 text-accent" />
              일자별 상세 코스
            </h4>
            <ul className="space-y-2">
              {data.timeline.map((item) => (
                <li key={item} className="flex items-start gap-2 text-[15px] text-foreground">
                  <span className="mt-1 text-accent">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-xl bg-secondary/70 p-4 space-y-2">
            <p className="font-semibold text-foreground flex items-center gap-2">
              <UtensilsCrossed className="w-4 h-4 text-accent" />
              식사
            </p>
            <p className="text-[15px] text-foreground">
              조식: {data.meals.breakfast} / 중식: {data.meals.lunch} / 석식: {data.meals.dinner}
            </p>
            <p className="text-[15px] text-foreground flex items-start gap-2">
              <BedDouble className="w-4 h-4 mt-0.5 text-accent" />
              <span>숙소: {data.hotel}</span>
            </p>
          </div>

          {data.options && data.options.length > 0 && (
            <div className="rounded-xl bg-accent/10 p-4">
              <p className="font-semibold text-foreground mb-2">선택 옵션</p>
              <ul className="space-y-1">
                {data.options.map((option) => (
                  <li key={option} className="text-[15px] text-foreground flex items-start gap-2">
                    <span className="mt-1 text-accent">•</span>
                    <span>{option}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="space-y-3">
            <p className="font-semibold text-foreground flex items-center gap-2">
              <Camera className="w-4 h-4 text-accent" />
              DAY {data.day} 사진 ({photos.length}장)
            </p>
            {photos.length === 0 ? (
              <p className="text-sm text-muted-foreground">이 일차와 자동 매칭된 사진이 없습니다.</p>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {photos.map((photo) => (
                  <figure
                    key={photo.path}
                    className="overflow-hidden rounded-xl border border-border bg-white"
                  >
                    <img
                      src={photo.url}
                      alt={`${data.day}일차 ${photo.title}`}
                      loading="lazy"
                      className="h-36 w-full object-cover"
                    />
                    <figcaption className="px-2 py-1.5 text-xs text-foreground line-clamp-2">
                      {photo.title}
                    </figcaption>
                  </figure>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

const ItinerarySection = () => {
  const dayPhotoCount = useMemo(
    () => Object.values(dayPhotoMap).reduce((sum, photos) => sum + photos.length, 0),
    [],
  );

  return (
    <section id="itinerary" className="py-16 md:py-20 bg-secondary">
      <div className="container mx-auto px-5">
        <div className="text-center mb-10">
          <h2 className="section-title text-foreground mb-2">발데즈 · 호머 8박 9일 상세 일정</h2>
          <p className="text-lg text-accent font-semibold mb-2">PDF 기준 일정 + 내 사진 자동 반영</p>
          <p className="text-base text-muted-foreground">
            앵커리지 → 발데즈 → 스워드/키나이 → 호머 → 솔도트나/걸우드 → 앵커리지
          </p>
          <p className="text-sm text-muted-foreground mt-2">
            전체 사진 {allPhotos.length}장 중 일자 매칭 {dayPhotoCount}장, 추가 라이브러리 {" "}
            {allPhotos.length - dayPhotoCount}장
          </p>
        </div>

        <div className="space-y-4 max-w-4xl mx-auto mb-10">
          {dayPlans.map((day) => (
            <DayCard key={day.day} data={day} photos={dayPhotoMap[day.day] ?? []} />
          ))}
        </div>

        <div className="max-w-4xl mx-auto space-y-4 mb-8">
          <div className="bg-white rounded-2xl p-5 border-l-4 border-accent">
            <p className="text-foreground text-[15px] leading-relaxed">
              <strong>포함:</strong> 전 일정 숙박, 식사, 가이드/운전, 차량, 보험, 개스, 공원 입장료
              <br />
              <strong>불포함:</strong> 선택관광, 여행자보험, 팁
              <br />
              <strong>특선 포함:</strong> 콜롬비아 빙하 유람선(약 7시간)
            </p>
          </div>
          <div className="bg-white rounded-2xl p-5 border-l-4 border-primary">
            <p className="text-foreground text-[15px] leading-relaxed">
              준비물: 봄/가을용 잠바와 셔츠, 편한 여행복장과 신발, 개인 상비약, 여권 등 필수 소지품
            </p>
          </div>
        </div>

        <div className="max-w-4xl mx-auto mb-10">
          <h3 className="text-xl font-bold text-foreground mb-3">추가 시즌/공통 사진 라이브러리</h3>
          <p className="text-sm text-muted-foreground mb-4">
            DAY 일정 외 사진도 폴더별로 모두 확인할 수 있도록 정리했습니다.
          </p>
          <div className="space-y-3">
            {extraPhotoGroups.map((group) => (
              <details key={group.name} className="bg-white rounded-2xl p-4 shadow-card">
                <summary className="cursor-pointer font-semibold text-foreground">
                  {group.name} ({group.photos.length}장)
                </summary>
                <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-3">
                  {group.photos.map((photo) => (
                    <figure
                      key={photo.path}
                      className="overflow-hidden rounded-xl border border-border bg-white"
                    >
                      <img
                        src={photo.url}
                        alt={photo.title}
                        loading="lazy"
                        className="h-28 w-full object-cover"
                      />
                      <figcaption className="px-2 py-1.5 text-xs text-foreground line-clamp-2">
                        {photo.title}
                      </figcaption>
                    </figure>
                  ))}
                </div>
              </details>
            ))}
          </div>
        </div>

        <div className="text-center space-y-3">
          <a href="tel:010-3309-0800" className="btn-gold inline-flex">
            <Phone className="w-5 h-5" />
            일정 문의하기
          </a>
          <div>
            <a
              href="/print-itinerary"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-xl border-2 border-primary/30 bg-white px-5 py-3 text-sm font-semibold text-primary hover:bg-primary/5"
            >
              인쇄용 PDF 일정표 열기
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ItinerarySection;



