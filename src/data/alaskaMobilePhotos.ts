export interface AlaskaMobilePhoto {
  file: string;
  group: "hero" | "story" | "season" | "day";
  day?: number;
}

export const alaskaMobilePhotos: AlaskaMobilePhoto[] = [
  { file: "hero-1.webp", group: "hero" },
  { file: "hero-2.webp", group: "hero" },
  { file: "hero-3.webp", group: "hero" },

  { file: "story-1.webp", group: "story" },
  { file: "story-2.webp", group: "story" },
  { file: "story-3.webp", group: "story" },
  { file: "story-4.webp", group: "story" },

  { file: "season-spring.webp", group: "season" },
  { file: "season-summer.webp", group: "season" },
  { file: "season-fall.webp", group: "season" },
  { file: "season-winter.webp", group: "season" },

  { file: "day1-1.webp", group: "day", day: 1 },
  { file: "day1-2.webp", group: "day", day: 1 },
  { file: "day1-3.webp", group: "day", day: 1 },

  { file: "day2-1.webp", group: "day", day: 2 },
  { file: "day2-2.webp", group: "day", day: 2 },
  { file: "day2-3.webp", group: "day", day: 2 },

  { file: "day3-1.webp", group: "day", day: 3 },
  { file: "day3-2.webp", group: "day", day: 3 },
  { file: "day3-3.webp", group: "day", day: 3 },

  { file: "day4-1.webp", group: "day", day: 4 },
  { file: "day4-2.webp", group: "day", day: 4 },
  { file: "day4-3.webp", group: "day", day: 4 },

  { file: "day5-1.webp", group: "day", day: 5 },
  { file: "day5-2.webp", group: "day", day: 5 },
  { file: "day5-3.webp", group: "day", day: 5 },

  { file: "day6-1.webp", group: "day", day: 6 },
  { file: "day6-2.webp", group: "day", day: 6 },
  { file: "day6-3.webp", group: "day", day: 6 },

  { file: "day7-1.webp", group: "day", day: 7 },
  { file: "day7-2.webp", group: "day", day: 7 },
  { file: "day7-3.webp", group: "day", day: 7 },

  { file: "day8-1.webp", group: "day", day: 8 },
  { file: "day8-2.webp", group: "day", day: 8 },
  { file: "day8-3.webp", group: "day", day: 8 },

  { file: "day9-1.webp", group: "day", day: 9 },
  { file: "day9-2.webp", group: "day", day: 9 },
  { file: "day9-3.webp", group: "day", day: 9 },
];
