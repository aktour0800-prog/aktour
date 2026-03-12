export interface ContactProfile {
  role: string;
  name: string;
  phone: string;
  tel: string;
}

export interface TrustMetric {
  title: string;
  value: string;
  description: string;
}

export interface StoryCard {
  title: string;
  subtitle: string;
  image: string;
}

export interface SeasonCard {
  key: "spring" | "summer" | "fall" | "winter";
  title: string;
  status: "open" | "coming";
  image: string;
  summary: string;
}

export interface DayPlan {
  day: string;
  date: string;
  route: string;
  summary: string;
  highlights: string[];
  meals: string;
  image: string;
  gallery: string[];
}

export const contacts: ContactProfile[] = [
  {
    role: "엄태인 대표",
    name: "엄태인 대표",
    phone: "010-3309-0800",
    tel: "01033090800",
  },
  {
    role: "정수미 대표",
    name: "정수미 대표",
    phone: "010-6424-7774",
    tel: "01064247774",
  },
];

export const trustMetrics: TrustMetric[] = [
  {
    title: "운영 경력",
    value: "18년+",
    description: "현지를 아는 동선으로 불필요한 이동을 줄였습니다.",
  },
  {
    title: "소그룹 케어",
    value: "12명 정원",
    description: "천천히 즐겨도 일정이 흔들리지 않습니다.",
  },
  {
    title: "촬영 포인트",
    value: "도시어부 코스",
    description: "TV로 본 호머 포인트를 직접 경험합니다.",
  },
];

export const storyCards: StoryCard[] = [
  {
    title: "디날리 경비행기",
    subtitle: "하늘에서 만나는 알래스카의 스케일",
    image: "/alaska-mobile/story-1.webp",
  },
  {
    title: "콜롬비아 빙하",
    subtitle: "거대한 빙하를 눈앞에서 보는 하루",
    image: "/alaska-mobile/story-2.webp",
  },
  {
    title: "호머 도시어부 포인트",
    subtitle: "바다와 항구 감성이 한 장면에",
    image: "/alaska-mobile/story-3.webp",
  },
  {
    title: "헤쳐패스 파노라마",
    subtitle: "차창 밖이 계속 명장면인 이동 구간",
    image: "/alaska-mobile/highlight-panorama-fall.webp",
  },
];

export const seasonCards: SeasonCard[] = [
  {
    key: "summer",
    title: "여름 시즌",
    status: "open",
    image: "/alaska-mobile/season-summer.webp",
    summary: "2026년 7월 출발 확정 일정 운영",
  },
  {
    key: "fall",
    title: "가을 시즌",
    status: "coming",
    image: "/alaska-mobile/season-fall.webp",
    summary: "오픈 예정 · 사전 알림 신청 가능",
  },
  {
    key: "winter",
    title: "겨울 시즌",
    status: "coming",
    image: "/alaska-mobile/season-winter.webp",
    summary: "오픈 예정 · 오로라 중심 코스 준비",
  },
  {
    key: "spring",
    title: "봄 시즌",
    status: "coming",
    image: "/alaska-mobile/season-spring.webp",
    summary: "오픈 예정 · 동선 확정 후 우선 안내",
  },
];

export const summerSummary = {
  title: "알래스카 여름 8박 9일 프리미엄",
  period: "2026년 7월 15일(수) ~ 7월 23일(목)",
  duration: "8박 9일",
  price: "1인 9,500,000원 (12명 기준)",
  airline: "대한항공 또는 아시아나",
  subtitle: "사진으로 설레고, 일정으로 결심하는 여행",
};

export const includes = [
  "국제선/국내선 항공",
  "전 일정 숙박 및 차량",
  "입장료 및 핵심 체험",
  "미국 ESTA",
  "현지 가이드/인솔 운영",
];

export const excludes = [
  "개인 경비",
  "개별 팁",
  "개인 선택 옵션",
  "개인 물값",
];

export const dayPlans: DayPlan[] = [
  {
    day: "DAY 1",
    date: "7/15 (수)",
    route: "인천 → 시애틀 → 앵커리지",
    summary: "앵커리지 도착 후 시내 뷰 포인트로 여정을 시작합니다.",
    highlights: [
      "Flattop 관망대 시야 관광",
      "앵커리지 다운타운 산책",
      "공항 미팅 후 전용차량 이동",
    ],
    meals: "기내식 / 기내식 / 현지식",
    image: "/alaska-mobile/day1-1.webp",
    gallery: ["/alaska-mobile/day1-1.webp", "/alaska-mobile/day1-2.webp", "/alaska-mobile/day1-3.webp"],
  },
  {
    day: "DAY 2",
    date: "7/16 (목)",
    route: "앵커리지 → 와실라 → 타키나",
    summary: "개썰매 체험과 디날리 경비행기로 알래스카의 밀도를 높입니다.",
    highlights: [
      "개썰매 본부 박물관 방문",
      "디날리산 경비행기 관광",
      "타키나 이동 후 휴식",
    ],
    meals: "호텔식 / 현지식 / 현지식",
    image: "/alaska-mobile/day2-1.webp",
    gallery: ["/alaska-mobile/day2-1.webp", "/alaska-mobile/day2-2.webp", "/alaska-mobile/day2-3.webp"],
  },
  {
    day: "DAY 3",
    date: "7/17 (금)",
    route: "타키나 → 카퍼리버 → 발디즈",
    summary: "헤쳐패스와 파이프라인, 협곡 절경을 따라 발디즈로 이동합니다.",
    highlights: [
      "헤쳐패스 인디펜던스 광산 대평원",
      "키스톤 캐년 폭포 구간",
      "발디즈 항구도시 입성",
    ],
    meals: "호텔식 / 현지식 / 현지식",
    image: "/alaska-mobile/day3-1.webp",
    gallery: ["/alaska-mobile/day3-1.webp", "/alaska-mobile/day3-2.webp", "/alaska-mobile/day3-3.webp"],
  },
  {
    day: "DAY 4",
    date: "7/18 (토)",
    route: "발디즈",
    summary: "7시간 콜롬비아 빙하 유람선이 핵심인 하이라이트 데이입니다.",
    highlights: [
      "발디즈 전망 포인트 투어",
      "콜롬비아 빙하 유람선 7시간",
      "프린스 윌리엄 사운드 야생 관찰",
    ],
    meals: "호텔식 / 선상식 / 현지식",
    image: "/alaska-mobile/day4-1.webp",
    gallery: ["/alaska-mobile/day4-1.webp", "/alaska-mobile/day4-2.webp", "/alaska-mobile/day4-3.webp"],
  },
  {
    day: "DAY 5",
    date: "7/19 (일)",
    route: "발디즈 → 카퍼리버 → 앵커리지",
    summary: "연어 부화장과 빙하 조망을 거쳐 앵커리지로 복귀합니다.",
    highlights: [
      "솔로몬 연어 부화장",
      "워딩턴/마타누스카 빙하 조망",
      "랭겔-세인트 엘리야스 권역",
    ],
    meals: "호텔식 / 현지식 / 현지식",
    image: "/alaska-mobile/day5-1.webp",
    gallery: ["/alaska-mobile/day5-1.webp", "/alaska-mobile/day5-2.webp", "/alaska-mobile/day5-3.webp"],
  },
  {
    day: "DAY 6",
    date: "7/20 (월)",
    route: "앵커리지 → 스워드 → 쿠퍼랜딩",
    summary: "알래스카 레일로드와 항구, 트레일 동선을 하루에 경험합니다.",
    highlights: [
      "스워드 기차 관광",
      "키나이강 트레일 산책",
      "러시아 유적지 방문",
    ],
    meals: "호텔식 / 현지식 / 현지식",
    image: "/alaska-mobile/day6-1.webp",
    gallery: ["/alaska-mobile/day6-1.webp", "/alaska-mobile/day6-2.webp", "/alaska-mobile/day6-3.webp"],
  },
  {
    day: "DAY 7",
    date: "7/21 (화)",
    route: "키나이 → 호머",
    summary: "도시어부 촬영지 호머에서 광어 낚시와 자유관광을 즐깁니다.",
    highlights: [
      "광어(헐리벗) 바다낚시",
      "호머 스핏 모래섬 산책",
      "호머 항구 자유시간",
    ],
    meals: "호텔식 / 현지식 / 현지식",
    image: "/alaska-mobile/day7-1.webp",
    gallery: ["/alaska-mobile/day7-1.webp", "/alaska-mobile/day7-2.webp", "/alaska-mobile/day7-3.webp"],
  },
  {
    day: "DAY 8",
    date: "7/22 (수)",
    route: "호머 → 솔도트나 → 걸우드 → 앵커리지",
    summary: "강변 산책과 이동 동선 중심으로 마지막 체류일을 보냅니다.",
    highlights: [
      "솔도트나 권역 이동",
      "키나이강 주변 산책",
      "앵커리지 복귀 후 휴식",
    ],
    meals: "호텔식 / 현지식 / 현지식",
    image: "/alaska-mobile/day8-1.webp",
    gallery: ["/alaska-mobile/day8-1.webp", "/alaska-mobile/day8-2.webp", "/alaska-mobile/day8-3.webp"],
  },
  {
    day: "DAY 9",
    date: "7/23 (목)",
    route: "앵커리지 → 시애틀 → 인천",
    summary: "귀국 항공편으로 여정을 마무리합니다.",
    highlights: [
      "앵커리지 국제공항 출발",
      "시애틀 경유",
      "인천 도착",
    ],
    meals: "기내식",
    image: "/alaska-mobile/day9-1.webp",
    gallery: ["/alaska-mobile/day9-1.webp", "/alaska-mobile/day9-2.webp", "/alaska-mobile/day9-3.webp"],
  },
];

export const faqItems = [
  {
    question: "50대 이상도 일정 소화가 가능한가요?",
    answer:
      "가능합니다. 이동 템포를 무리하게 끌어올리지 않고, 핵심 포인트 중심으로 동선을 구성해 피로를 줄였습니다.",
  },
  {
    question: "7월 알래스카 날씨는 어떤가요?",
    answer:
      "주요 이동 구간 기준 선선한 여름 날씨로, 가벼운 레이어드 복장과 방풍 겉옷을 준비하면 안정적입니다.",
  },
  {
    question: "가격 9,500,000원에 무엇이 포함되나요?",
    answer:
      "항공, 숙박, 주요 관광, 차량, 입장료, ESTA가 포함됩니다. 개인 경비/팁/개별 옵션은 별도입니다.",
  },
  {
    question: "여름 외 시즌은 언제 열리나요?",
    answer:
      "봄·가을·겨울은 현재 오픈 예정입니다. 상담 등록 시 시즌 오픈 즉시 우선 안내해 드립니다.",
  },
  {
    question: "도시어부 촬영지 일정이 포함되나요?",
    answer:
      "포함됩니다. 호머 구간에서 촬영 포인트 동선을 기준으로 낚시/자유관광 일정을 운영합니다.",
  },
  {
    question: "준비물은 어떻게 챙기면 될까요?",
    answer:
      "방풍 겉옷, 편한 워킹화, 선글라스, 개인 상비약 기준으로 준비하면 충분하며 상세 리스트는 상담 시 전달합니다.",
  },
];

export interface BrandPalette {
  name: string;
  hex: string;
  usage: string;
}

export interface BrandCi {
  signature: string;
  slogan: string;
  mission: string;
  toneKeywords: string[];
  palette: BrandPalette[];
}

export interface PhotoGalleryItem {
  id: string;
  image: string;
  title: string;
  tag: "빙하" | "절경" | "도시어부" | "이동" | "호수";
  day: string;
  spot: string;
}

export interface TasteMatch {
  key: "panorama" | "relaxed" | "fishing" | "aurora" | "salmon";
  label: string;
  summary: string;
  day: string;
  route: string;
  image: string;
}

export const brandCi: BrandCi = {
  signature: "ALASKATRIP",
  slogan: "느리게, 깊게, 확실하게.",
  mission: "큰 풍경 앞에서 숨 고를 시간을 보장하는 프리미엄 소그룹 여정",
  toneKeywords: ["사진 우선", "과장 없는 고급감", "안심 동선", "전화 전환 중심"],
  palette: [
    { name: "Glacier Navy", hex: "#112A46", usage: "신뢰, 상담 CTA" },
    { name: "Aurora Gold", hex: "#CFA144", usage: "강조 버튼, 예약 유도" },
    { name: "Ice Mist", hex: "#E8EEF5", usage: "배경, 정보 카드" },
    { name: "Midnight Ink", hex: "#0B1420", usage: "텍스트, 오버레이" },
  ],
};

export const photoGallery: PhotoGalleryItem[] = [
  { id: "g1", image: "/alaska-mobile/day4-1.webp", title: "빙하가 눈앞으로 다가오는 순간", tag: "빙하", day: "DAY 4", spot: "콜롬비아 빙하" },
  { id: "g2", image: "/alaska-mobile/day4-2.webp", title: "선상에서 마주한 거대한 얼음 절벽", tag: "빙하", day: "DAY 4", spot: "프린스 윌리엄 사운드" },
  { id: "g3", image: "/alaska-mobile/day3-1.webp", title: "헤쳐패스 대평원의 스케일", tag: "절경", day: "DAY 3", spot: "헤쳐패스" },
  { id: "g4", image: "/alaska-mobile/day3-3.webp", title: "협곡을 가르며 이어지는 도로", tag: "절경", day: "DAY 3", spot: "키스톤 캐년" },
  { id: "g5", image: "/alaska-mobile/day2-1.webp", title: "디날리 경비행기 하늘 뷰", tag: "절경", day: "DAY 2", spot: "디날리" },
  { id: "g6", image: "/alaska-mobile/day2-2.webp", title: "이동 중에도 계속 이어지는 풍경", tag: "이동", day: "DAY 2", spot: "타키나 구간" },
  { id: "g7", image: "/alaska-mobile/day6-1.webp", title: "알래스카 레일로드 감성", tag: "이동", day: "DAY 6", spot: "스워드 라인" },
  { id: "g8", image: "/alaska-mobile/day6-3.webp", title: "기차 창밖 파노라마", tag: "이동", day: "DAY 6", spot: "스워드" },
  { id: "g9", image: "/alaska-mobile/day7-1.webp", title: "도시어부 촬영지의 바다 색감", tag: "도시어부", day: "DAY 7", spot: "호머" },
  { id: "g10", image: "/alaska-mobile/day7-2.webp", title: "헐리벗 포인트 출항", tag: "도시어부", day: "DAY 7", spot: "호머 스핏" },
  { id: "g11", image: "/alaska-mobile/day7-3.webp", title: "항구 산책과 자유시간", tag: "도시어부", day: "DAY 7", spot: "호머 항구" },
  { id: "g12", image: "/alaska-mobile/day5-2.webp", title: "빙하 조망 드라이브 코스", tag: "절경", day: "DAY 5", spot: "마타누스카" },
  { id: "g13", image: "/alaska-mobile/day5-3.webp", title: "산맥과 하늘의 레이어", tag: "절경", day: "DAY 5", spot: "랭겔 권역" },
  { id: "g14", image: "/alaska-mobile/day8-1.webp", title: "강변 산책의 느린 템포", tag: "호수", day: "DAY 8", spot: "키나이강" },
  { id: "g15", image: "/alaska-mobile/day8-2.webp", title: "마지막 체류일의 여유", tag: "호수", day: "DAY 8", spot: "솔도트나" },
  { id: "g16", image: "/alaska-mobile/day1-1.webp", title: "앵커리지 첫 도착 뷰", tag: "절경", day: "DAY 1", spot: "앵커리지" },
  { id: "g17", image: "/alaska-mobile/hero-2.webp", title: "여름 알래스카 대표 장면", tag: "빙하", day: "HERO", spot: "알래스카" },
  { id: "g18", image: "/alaska-mobile/story-3.webp", title: "호머 항구의 저녁 색감", tag: "도시어부", day: "DAY 7", spot: "호머" },
];

export const tasteMatches: TasteMatch[] = [
  {
    key: "panorama",
    label: "\uC808\uACBD \uC911\uC2EC",
    summary: "\uBE59\uD558\uC640 \uD611\uACE1\uC744 \uD06C\uAC8C \uBCF4\uACE0 \uC2F6\uB2E4\uBA74 DAY 3~4\uAC00 \uD575\uC2EC\uC785\uB2C8\uB2E4.",
    day: "DAY 4",
    route: "\uBC1C\uB514\uC988 \u00B7 \uCF5C\uB86C\uBE44\uC544 \uBE59\uD558",
    image: "/alaska-mobile/highlight-panorama-1.webp",
  },
  {
    key: "aurora",
    label: "\uC624\uB85C\uB77C \uC911\uC2EC",
    summary: "\uBC24\uD558\uB298 \uC624\uB85C\uB77C\uB97C \uBCF8\uACA9\uC801\uC73C\uB85C \uBCF4\uACE0 \uC2F6\uC73C\uBA74 \uAC00\uC744\u00B7\uACA8\uC6B8 \uC2DC\uC98C\uC774 \uB9DE\uC2B5\uB2C8\uB2E4.",
    day: "SEASON",
    route: "\uD398\uC5B4\uBC45\uD06C\uC2A4 \u00B7 \uC624\uB85C\uB77C \uD3EC\uC778\uD2B8",
    image: "/alaska-mobile/highlight-aurora-hero.webp",
  },
  {
    key: "fishing",
    label: "\uB099\uC2DC \uC911\uC2EC",
    summary: "\uD638\uBA38 \uBC14\uB2E4 \uD3EC\uC778\uD2B8\uC5D0\uC11C \uAD11\uC5B4 \uB099\uC2DC \uBD84\uC704\uAE30\uB97C \uD06C\uAC8C \uB290\uB07C\uB824\uBA74 DAY 7\uC774 \uB9DE\uC2B5\uB2C8\uB2E4.",
    day: "DAY 7",
    route: "\uD638\uBA38 \u00B7 \uC2A4\uD54F",
    image: "/alaska-mobile/highlight-fishing-1.webp",
  },
  {
    key: "salmon",
    label: "\uC5F0\uC5B4 \uC911\uC2EC",
    summary: "\uC5F0\uC5B4 \uBD80\uD654\uC7A5\uACFC \uC0DD\uD0DC \uC7A5\uBA74\uC744 \uBCF4\uACE0 \uC2F6\uB2E4\uBA74 DAY 5 \uB8E8\uD2B8\uAC00 \uD575\uC2EC\uC785\uB2C8\uB2E4.",
    day: "DAY 5",
    route: "\uC194\uB85C\uBAAC \uC5F0\uC5B4\uBD80\uD654\uC7A5 \u00B7 \uB9C8\uD0C0\uB204\uC2A4\uCE74",
    image: "/alaska-mobile/highlight-salmon-1.webp",
  },
  {
    key: "relaxed",
    label: "\uC5EC\uC720 \uC911\uC2EC",
    summary: "\uC774\uB3D9 \uD15C\uD3EC\uB97C \uBB34\uB9AC\uD558\uC9C0 \uC54A\uAC8C \uAC00\uC838\uAC00\uB294 DAY 6~8 \uAD6C\uAC04\uC774 \uB9DE\uC2B5\uB2C8\uB2E4.",
    day: "DAY 8",
    route: "\uC194\uB3C4\uD2B8\uB098 \u00B7 \uD0A4\uB098\uC774\uAC15",
    image: "/alaska-mobile/day8-1.webp",
  },
];

export interface WowPoint {
  badge: string;
  title: string;
  description: string;
  image: string;
}

export const wowPoints: WowPoint[] = [
  {
    badge: "핵심 장면 1",
    title: "콜롬비아 빙하 7시간 선상 체험",
    description: "사진으로만 보던 스케일을 눈앞에서 여유 있게 체감하는 핵심 하이라이트입니다.",
    image: "/alaska-mobile/day4-2.webp",
  },
  {
    badge: "핵심 장면 2",
    title: "도시어부 촬영지 호머 포인트",
    description: "항구 감성과 광어 포인트를 동시에 즐기는 알래스카 대표 장면을 만납니다.",
    image: "/alaska-mobile/day7-2.webp",
  },
  {
    badge: "핵심 장면 3",
    title: "이동 자체가 절경인 파노라마 루트",
    description: "헤쳐패스부터 키나이강까지, 차창 밖 풍경이 끊기지 않는 동선으로 구성했습니다.",
    image: "/alaska-mobile/day3-3.webp",
  },
];

export interface SeasonalWaitlistOption {
  key: "fall" | "winter";
  title: string;
  subtitle: string;
  image: string;
  openPlan: string;
  benchmarkNote: string;
}

export interface DesignEvidence {
  title: string;
  benchmark: string;
  reason: string;
  appliedPattern: string;
}

export const summerCampaignClock = {
  departureAt: "2026-07-15T09:00:00+09:00",
  recruitmentOpenAt: "2026-03-09T09:00:00+09:00",
  capacity: 12,
};

export const seasonalWaitlistOptions: SeasonalWaitlistOption[] = [
  {
    key: "fall",
    title: "가을 시즌 우선 오픈 알림",
    subtitle: "단풍 + 파노라마 드라이브 중심 코스",
    image: "/alaska-mobile/season-fall.webp",
    openPlan: "2026년 가을 코스 오픈 예정",
    benchmarkNote: "네이버 예약형 간단 신청 패턴처럼 1회 등록 후 재안내",
  },
  {
    key: "winter",
    title: "겨울 시즌 우선 오픈 알림",
    subtitle: "오로라 + 설경 중심 프리미엄 코스",
    image: "/alaska-mobile/season-winter.webp",
    openPlan: "2026년 겨울 코스 오픈 예정",
    benchmarkNote: "카카오T 사전호출처럼 먼저 의사 등록 후 오픈 시 즉시 연결",
  },
];

export const designEvidence: DesignEvidence[] = [
  {
    title: "상단 핵심 CTA 단일 집중",
    benchmark: "토스 홈/결제 플로우",
    reason: "50대 모바일 사용자는 선택지가 많을수록 이탈이 늘어나기 때문에 1순위 행동을 크게 제시해야 전환이 올라갑니다.",
    appliedPattern: "첫 화면에서 전화 상담과 일정 보기만 크게 배치",
  },
  {
    title: "하단 고정 액션 바",
    benchmark: "카카오T, 쿠팡 고정 구매 바",
    reason: "스크롤이 길어져도 행동 버튼이 계속 보이면 CTA 도달 비용이 줄어 전환 유지에 유리합니다.",
    appliedPattern: "대표 2인 전화 버튼을 전 구간 고정 노출",
  },
  {
    title: "숏폼형 몰입 갤러리",
    benchmark: "YouTube Shorts, Instagram Reels 탐색 구조",
    reason: "이미지 중심 타깃은 짧은 텍스트보다 연속 장면 소비에서 체류시간과 감정 이입이 크게 증가합니다.",
    appliedPattern: "이미지 클릭 시 세로 스크롤 풀스크린 피드로 전환",
  },
  {
    title: "희소성 + 시간 압박",
    benchmark: "국내 상위 커머스 한정수량/타이머 패턴",
    reason: "정원 12명, 출발 D-Day를 동시에 제시하면 상담 결정이 빨라지고 '나중에' 지연을 줄일 수 있습니다.",
    appliedPattern: "D-Day 카드 + 12명 정원 문구 + 즉시 전화 CTA",
  },
];


export type GallerySeasonKey = "spring" | "summer" | "fall" | "winter";

export interface SeasonLeadOption {
  key: Exclude<GallerySeasonKey, "summer">;
  title: string;
  subtitle: string;
  image: string;
  openPlan: string;
  previewImages: string[];
}

export interface SeasonGalleryPhoto {
  id: string;
  image: string;
  title: string;
  dayLabel: string;
  spot: string;
  day?: number;
}

export interface SeasonGalleryGroup {
  key: GallerySeasonKey;
  label: string;
  description: string;
  photos: SeasonGalleryPhoto[];
}

const buildSummerSeasonPhotos = (): SeasonGalleryPhoto[] => {
  const summerSpots: Record<number, string> = {
    1: "앵커리지",
    2: "디날리 경비행기",
    3: "헤쳐패스",
    4: "콜롬비아 빙하",
    5: "마타누스카",
    6: "스워드",
    7: "호머",
    8: "솔도트나",
    9: "귀국 여정",
  };

  const photos: SeasonGalleryPhoto[] = [];

  const summerImageOverrides: Partial<Record<number, string[]>> = {
    3: [
      "/alaska-mobile/highlight-panorama-1.webp",
      "/alaska-mobile/highlight-panorama-2.webp",
      "/alaska-mobile/day3-3.webp",
    ],
    4: [
      "/alaska-mobile/day4-1.webp",
      "/alaska-mobile/highlight-glacier-cruise-1.webp",
      "/alaska-mobile/day4-3.webp",
    ],
    5: [
      "/alaska-mobile/highlight-salmon-1.webp",
      "/alaska-mobile/highlight-salmon-2.webp",
      "/alaska-mobile/highlight-salmon-bear-1.webp",
    ],
    7: [
      "/alaska-mobile/highlight-fishing-1.webp",
      "/alaska-mobile/highlight-fishing-2.webp",
      "/alaska-mobile/day7-3.webp",
    ],
  };

  for (let day = 1; day <= 9; day += 1) {
    const dayImages = summerImageOverrides[day] ?? [
      `/alaska-mobile/day${day}-1.webp`,
      `/alaska-mobile/day${day}-2.webp`,
      `/alaska-mobile/day${day}-3.webp`,
    ];

    dayImages.forEach((image, index) => {
      const cut = index + 1;

      photos.push({
        id: `summer-day${day}-${cut}`,
        image,
        title: `DAY ${day} · ${summerSpots[day]} 장면 ${cut}`,
        dayLabel: `DAY ${day}`,
        day,
        spot: summerSpots[day],
      });
    });
  }

  return photos;
};

const springSeasonPhotos: SeasonGalleryPhoto[] = [
  { id: "spring-1", image: "/alaska-mobile/season-spring.webp", title: "봄 시작 풍경", dayLabel: "SPRING", spot: "봄 프리뷰" },
  { id: "spring-2", image: "/alaska-mobile/hero-1.webp", title: "봄 햇살의 첫 장면", dayLabel: "SPRING", spot: "앵커리지" },
  { id: "spring-3", image: "/alaska-mobile/day1-1.webp", title: "가벼운 산책 코스", dayLabel: "SPRING", spot: "Flat Top" },
  { id: "spring-4", image: "/alaska-mobile/day1-3.webp", title: "도착 첫날 도심 풍경", dayLabel: "SPRING", spot: "다운타운" },
  { id: "spring-5", image: "/alaska-mobile/day2-2.webp", title: "봄 하늘 경비행기 뷰", dayLabel: "SPRING", spot: "디날리" },
  { id: "spring-6", image: "/alaska-mobile/day6-2.webp", title: "잔잔한 호수 분위기", dayLabel: "SPRING", spot: "스워드" },
  { id: "spring-7", image: "/alaska-mobile/day8-1.webp", title: "강변 산책의 계절", dayLabel: "SPRING", spot: "키나이강" },
  { id: "spring-8", image: "/alaska-mobile/day8-2.webp", title: "초록빛 여유 장면", dayLabel: "SPRING", spot: "솔도트나" },
];

const fallSeasonPhotos: SeasonGalleryPhoto[] = [
  { id: "fall-1", image: "/alaska-mobile/season-fall.webp", title: "가을 대표 단풍 장면", dayLabel: "FALL", spot: "가을 프리뷰" },
  { id: "fall-2", image: "/alaska-mobile/highlight-panorama-fall.webp", title: "황금빛 파노라마 루트", dayLabel: "FALL", spot: "헤쳐패스" },
  { id: "fall-3", image: "/alaska-mobile/highlight-panorama-1.webp", title: "단풍과 산맥 드라이브", dayLabel: "FALL", spot: "발디즈 구간" },
  { id: "fall-4", image: "/alaska-mobile/highlight-aurora-fall-1.webp", title: "가을 협곡 풍경", dayLabel: "FALL", spot: "키스톤 캐년" },
  { id: "fall-5", image: "/alaska-mobile/day5-3.webp", title: "레이어가 깊은 능선 뷰", dayLabel: "FALL", spot: "랭겔 권역" },
  { id: "fall-6", image: "/alaska-mobile/day8-3.webp", title: "노을빛 고속도로", dayLabel: "FALL", spot: "귀환 루트" },
  { id: "fall-7", image: "/alaska-mobile/story-3.webp", title: "항구의 가을 공기", dayLabel: "FALL", spot: "호머" },
  { id: "fall-8", image: "/alaska-mobile/day7-3.webp", title: "항구 산책 컷", dayLabel: "FALL", spot: "호머 스핏" },
];

const winterSeasonPhotos: SeasonGalleryPhoto[] = [
  { id: "winter-1", image: "/alaska-mobile/season-winter.webp", title: "겨울 대표 설경", dayLabel: "WINTER", spot: "겨울 프리뷰" },
  { id: "winter-2", image: "/alaska-mobile/highlight-aurora-1.webp", title: "겨울 오로라 나이트", dayLabel: "WINTER", spot: "빙하 권역" },
  { id: "winter-3", image: "/alaska-mobile/highlight-aurora-2.webp", title: "오로라 리본 장면", dayLabel: "WINTER", spot: "콜롬비아 빙하" },
  { id: "winter-4", image: "/alaska-mobile/highlight-aurora-hero.webp", title: "오로라 대표 포인트", dayLabel: "WINTER", spot: "선상 투어" },
  { id: "winter-5", image: "/alaska-mobile/day4-2.webp", title: "유빙을 가르는 항로", dayLabel: "WINTER", spot: "프린스 윌리엄 사운드" },
  { id: "winter-6", image: "/alaska-mobile/day5-1.webp", title: "차창 밖 설원", dayLabel: "WINTER", spot: "마타누스카" },
  { id: "winter-7", image: "/alaska-mobile/day5-2.webp", title: "새하얀 빙하 조망", dayLabel: "WINTER", spot: "워딩턴" },
  { id: "winter-8", image: "/alaska-mobile/day9-2.webp", title: "귀환 비행 설경", dayLabel: "WINTER", spot: "귀국 항공" },
];

export const seasonLeadOptions: SeasonLeadOption[] = [
  {
    key: "spring",
    title: "봄 시즌 오픈 알림",
    subtitle: "여유 산책 + 파노라마 중심 코스",
    image: "/alaska-mobile/season-spring.webp",
    openPlan: "2026년 봄 코스 오픈 예정",
    previewImages: springSeasonPhotos.slice(0, 4).map((photo) => photo.image),
  },
  {
    key: "fall",
    title: "가을 시즌 오픈 알림",
    subtitle: "단풍 + 파노라마 드라이브 중심 코스",
    image: "/alaska-mobile/season-fall.webp",
    openPlan: "2026년 가을 코스 오픈 예정",
    previewImages: fallSeasonPhotos.slice(0, 4).map((photo) => photo.image),
  },
  {
    key: "winter",
    title: "겨울 시즌 오픈 알림",
    subtitle: "오로라 + 설경 중심 프리미엄 코스",
    image: "/alaska-mobile/season-winter.webp",
    openPlan: "2026년 겨울 코스 오픈 예정",
    previewImages: winterSeasonPhotos.slice(0, 4).map((photo) => photo.image),
  },
];

export const seasonGalleryGroups: SeasonGalleryGroup[] = [
  {
    key: "summer",
    label: "여름",
    description: "DAY 1부터 DAY 9까지 순서대로 이어보세요.",
    photos: buildSummerSeasonPhotos(),
  },
  {
    key: "spring",
    label: "봄",
    description: "봄 시즌 미리보기 장면을 연속으로 확인하세요.",
    photos: springSeasonPhotos,
  },
  {
    key: "fall",
    label: "가을",
    description: "가을 단풍 코스 분위기를 먼저 느껴보세요.",
    photos: fallSeasonPhotos,
  },
  {
    key: "winter",
    label: "겨울",
    description: "겨울 설경/빙하 중심 코스를 미리 체험하세요.",
    photos: winterSeasonPhotos,
  },
];
