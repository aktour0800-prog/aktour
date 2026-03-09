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
    role: "대표 상담",
    name: "엄태인 실장",
    phone: "010-3309-0800",
    tel: "01033090800",
  },
  {
    role: "일정 상담",
    name: "정수미 담당",
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
    image: "/alaska-mobile/story-4.webp",
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
