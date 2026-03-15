import { FormEvent, useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowDown,
  ArrowLeftRight,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  MessageSquareText,
  PhoneCall,
  Sparkles,
  X,
} from "lucide-react";

import Header from "@/components/landing/Header";
import Footer from "@/components/landing/Footer";
import FloatingCallButton from "@/components/landing/FloatingCallButton";
import ConversionBoosterSection from "@/components/landing/ConversionBoosterSection";
import SeoHead from "@/components/seo/SeoHead";
import { trackCallIntent } from "@/lib/callIntent";
import {
  contacts,
  dayPlans,
  excludes,
  faqItems,
  includes,
  seasonCards,
  seasonGalleryGroups,
  storyCards,
  summerSummary,
  tasteMatches,
  trustMetrics,
  wowPoints,
  type GallerySeasonKey,
  type SeasonGalleryPhoto,
} from "@/data/summerCampaignData";

const HERO_INTRO_MS = 2000;
const HERO_ACTION_DELAY_MS = 980;
const HERO_CYCLE_MS = 7600;
const PRIMARY_CALL_COPY = "\uC9C0\uAE08 \uC88C\uC11D \uD655\uC778 \uC804\uD654";

type HeroPhase = "intro" | "copy" | "actions";

interface ShortsDayGroup {
  key: string;
  label: string;
  spot: string;
  photos: SeasonGalleryPhoto[];
}

type InquiryFeedback = { type: "idle" | "error" | "success"; message: string };

const Index = () => {
  const [heroPhase, setHeroPhase] = useState<HeroPhase>("intro");
  const [heroIndex, setHeroIndex] = useState(0);
  const [headerHidden, setHeaderHidden] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [activeSeason, setActiveSeason] = useState<GallerySeasonKey>("summer");
  const [activeSummerDay, setActiveSummerDay] = useState<number | "all">("all");
  const [selectedPhotoId, setSelectedPhotoId] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState<{ src: string; alt: string } | null>(null);
  const [selectedTasteKey, setSelectedTasteKey] = useState(tasteMatches[0].key);
  const [shortsIndex, setShortsIndex] = useState(0);
  const [shortsHorizontalIndex, setShortsHorizontalIndex] = useState<Record<string, number>>({});
  const [showHeroCallSheet, setShowHeroCallSheet] = useState(false);
  const [showInquiryModal, setShowInquiryModal] = useState(false);
  const [inquiryName, setInquiryName] = useState("");
  const [inquiryPhone, setInquiryPhone] = useState("");
  const [inquiryPreferredContact, setInquiryPreferredContact] = useState<"상관없음" | "엄태인 대표" | "정수미 대표">(
    "상관없음",
  );
  const [inquiryMessage, setInquiryMessage] = useState("");
  const [isSubmittingInquiry, setIsSubmittingInquiry] = useState(false);
  const [inquiryFeedback, setInquiryFeedback] = useState<InquiryFeedback>({ type: "idle", message: "" });

  const shortsFeedRef = useRef<HTMLDivElement | null>(null);
  const shortsRowRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const shortsIndexRef = useRef(0);

  const heroImages = ["/alaska-mobile/hero-1.webp", "/alaska-mobile/hero-2.webp", "/alaska-mobile/hero-3.webp"];
  const responsiveHeroImages = new Set([
    "/alaska-mobile/hero-1.webp",
    "/alaska-mobile/hero-2.webp",
    "/alaska-mobile/hero-3.webp",
    "/alaska-mobile/story-1.webp",
    "/alaska-mobile/story-2.webp",
    "/alaska-mobile/story-3.webp",
    "/alaska-mobile/story-4.webp",
  ]);

  const getResponsiveSrcSet = (src: string) => {
    if (!responsiveHeroImages.has(src) || !src.endsWith(".webp")) {
      return undefined;
    }

    const base = src.slice(0, -5);
    return `${base}-960.webp 960w, ${base}-1440.webp 1440w, ${src} 1920w`;
  };
  const isHeroIntro = heroPhase === "intro";
  const showHeroCopy = heroPhase !== "intro";
  const showHeroActions = heroPhase === "actions";

  const activeSeasonGallery = useMemo(
    () => seasonGalleryGroups.find((group) => group.key === activeSeason) ?? seasonGalleryGroups[0],
    [activeSeason],
  );

  const filteredGallery = useMemo(() => {
    if (activeSeason !== "summer") {
      return activeSeasonGallery.photos;
    }

    if (activeSummerDay === "all") {
      return activeSeasonGallery.photos;
    }

    return activeSeasonGallery.photos.filter((photo) => photo.day === activeSummerDay);
  }, [activeSeason, activeSeasonGallery.photos, activeSummerDay]);

  const shortsDayGroups = useMemo<ShortsDayGroup[]>(() => {
    if (!filteredGallery.length) {
      return [];
    }

    if (activeSeason === "summer") {
      const grouped = new Map<number, SeasonGalleryPhoto[]>();

      filteredGallery.forEach((photo) => {
        const day = photo.day ?? 0;
        if (!grouped.has(day)) {
          grouped.set(day, []);
        }

        grouped.get(day)?.push(photo);
      });

      return Array.from(grouped.entries())
        .sort((a, b) => a[0] - b[0])
        .map(([day, photos]) => ({
          key: `summer-day-${day}`,
          label: `DAY ${day}`,
          spot: photos[0]?.spot ?? "알래스카",
          photos,
        }));
    }

    return filteredGallery.map((photo, index) => ({
      key: `${activeSeason}-cut-${index}`,
      label: photo.dayLabel || `${activeSeasonGallery.label} ${index + 1}`,
      spot: photo.spot,
      photos: [photo],
    }));
  }, [activeSeason, activeSeasonGallery.label, filteredGallery]);

  const shortsStartPosition = useMemo(() => {
    if (!selectedPhotoId) {
      return { dayIndex: 0, photoIndex: 0 };
    }

    for (let dayIndex = 0; dayIndex < shortsDayGroups.length; dayIndex += 1) {
      const photoIndex = shortsDayGroups[dayIndex].photos.findIndex((photo) => photo.id === selectedPhotoId);
      if (photoIndex >= 0) {
        return { dayIndex, photoIndex };
      }
    }

    return { dayIndex: 0, photoIndex: 0 };
  }, [selectedPhotoId, shortsDayGroups]);

  const shortsStepCount = shortsDayGroups.length + 1;
  const shortsProgress =
    shortsStepCount > 0 ? Math.min(100, Math.round(((shortsIndex + 1) / shortsStepCount) * 100)) : 0;

  const selectedTaste = useMemo(
    () => tasteMatches.find((item) => item.key === selectedTasteKey) ?? tasteMatches[0],
    [selectedTasteKey],
  );

  const summerDayFilters = useMemo(
    () => [
      { label: "전체", value: "all" as const },
      ...dayPlans.map((plan) => ({
        label: plan.day.replace(" ", ""),
        value: Number(plan.day.replace(/\D/g, "")),
      })),
    ],
    [],
  );

  const openImageViewer = (src: string, alt: string) => {
    setSelectedImage({ src, alt });
  };

  const closeInquiryModal = () => {
    setShowInquiryModal(false);
    setInquiryFeedback({ type: "idle", message: "" });
  };

  const openInquiryModal = () => {
    setShowHeroCallSheet(false);
    setShowInquiryModal(true);
    setInquiryFeedback({ type: "idle", message: "" });
  };

  const submitInquiry = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const name = inquiryName.trim();
    const phone = inquiryPhone.replace(/\D/g, "");
    const message = inquiryMessage.trim();

    if (name.length < 2) {
      setInquiryFeedback({ type: "error", message: "이름을 2글자 이상 입력해주세요." });
      return;
    }

    if (phone.length < 10 || phone.length > 11) {
      setInquiryFeedback({ type: "error", message: "휴대폰 번호를 정확히 입력해주세요." });
      return;
    }

    if (message.length < 5) {
      setInquiryFeedback({ type: "error", message: "문의 내용을 5자 이상 입력해주세요." });
      return;
    }

    setIsSubmittingInquiry(true);
    setInquiryFeedback({ type: "idle", message: "" });

    try {
      const response = await fetch("/api/leads/inquiry", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          season: "summer",
          name,
          phone,
          preferredContact: inquiryPreferredContact,
          message,
        }),
      });

      if (!response.ok) {
        const payload = (await response.json().catch(() => null)) as { message?: string } | null;
        throw new Error(payload?.message ?? "문의 저장 중 오류가 발생했습니다.");
      }

      setInquiryFeedback({ type: "success", message: "문의가 접수되었습니다. 확인 후 빠르게 연락드리겠습니다." });
      setInquiryName("");
      setInquiryPhone("");
      setInquiryMessage("");
      setInquiryPreferredContact("상관없음");
    } catch (error) {
      setInquiryFeedback({
        type: "error",
        message: error instanceof Error ? error.message : "문의 저장 중 오류가 발생했습니다.",
      });
    } finally {
      setIsSubmittingInquiry(false);
    }
  };

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const applyPreference = () => setPrefersReducedMotion(mediaQuery.matches);
    applyPreference();

    if (typeof mediaQuery.addEventListener === "function") {
      mediaQuery.addEventListener("change", applyPreference);
      return () => mediaQuery.removeEventListener("change", applyPreference);
    }

    mediaQuery.addListener(applyPreference);
    return () => mediaQuery.removeListener(applyPreference);
  }, []);

  useEffect(() => {
    setHeroIndex(0);

    if (prefersReducedMotion) {
      setHeroPhase("actions");
      return;
    }

    setHeroPhase("intro");

    const copyTimer = window.setTimeout(() => setHeroPhase("copy"), HERO_INTRO_MS);
    const actionTimer = window.setTimeout(() => setHeroPhase("actions"), HERO_INTRO_MS + HERO_ACTION_DELAY_MS);

    return () => {
      window.clearTimeout(copyTimer);
      window.clearTimeout(actionTimer);
    };
  }, [prefersReducedMotion]);

  useEffect(() => {
    if (isHeroIntro || prefersReducedMotion) {
      return;
    }

    const slider = window.setInterval(() => {
      setHeroIndex((prev) => (prev + 1) % heroImages.length);
    }, HERO_CYCLE_MS);

    return () => window.clearInterval(slider);
  }, [heroImages.length, isHeroIntro, prefersReducedMotion]);

  useEffect(() => {
    if (!showHeroActions) {
      return;
    }

    let lastY = window.scrollY;

    const handleHeaderVisibility = () => {
      const currentY = window.scrollY;
      const delta = currentY - lastY;

      if (currentY <= 40) {
        setHeaderHidden(false);
      } else if (delta > 8) {
        setHeaderHidden(true);
      } else if (delta < -8) {
        setHeaderHidden(false);
      }

      lastY = currentY;
    };

    window.addEventListener("scroll", handleHeaderVisibility, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleHeaderVisibility);
    };
  }, [showHeroActions]);

  useEffect(() => {
    if (!selectedPhotoId) {
      return;
    }

    const existsInFilter = filteredGallery.some((photo) => photo.id === selectedPhotoId);
    if (!existsInFilter) {
      setSelectedPhotoId(null);
    }
  }, [filteredGallery, selectedPhotoId]);

  useEffect(() => {
    shortsIndexRef.current = shortsIndex;
  }, [shortsIndex]);

  useEffect(() => {
    if (!selectedPhotoId) {
      setShortsIndex(0);
      setShortsHorizontalIndex({});
      return;
    }

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const viewportHeight = Math.max(window.innerHeight, 1);
    shortsFeedRef.current?.scrollTo({
      top: viewportHeight * shortsStartPosition.dayIndex,
      left: 0,
      behavior: "auto",
    });

    const startGroup = shortsDayGroups[shortsStartPosition.dayIndex];
    if (startGroup) {
      const row = shortsRowRefs.current[startGroup.key];
      if (row) {
        const width = Math.max(row.clientWidth, 1);
        row.scrollTo({ left: width * shortsStartPosition.photoIndex, behavior: "auto" });
      }

      setShortsHorizontalIndex({ [startGroup.key]: shortsStartPosition.photoIndex });
    }

    const handleKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setSelectedPhotoId(null);
        return;
      }

      if (event.key === "ArrowDown" || event.key === "PageDown") {
        shortsFeedRef.current?.scrollBy({ top: window.innerHeight * 0.92, behavior: "smooth" });
        return;
      }

      if (event.key === "ArrowUp" || event.key === "PageUp") {
        shortsFeedRef.current?.scrollBy({ top: -window.innerHeight * 0.92, behavior: "smooth" });
        return;
      }

      if (event.key === "ArrowRight" || event.key === "ArrowLeft") {
        const currentDayIndex = Math.min(shortsIndexRef.current, shortsDayGroups.length - 1);
        if (currentDayIndex < 0 || currentDayIndex >= shortsDayGroups.length) {
          return;
        }

        const currentGroup = shortsDayGroups[currentDayIndex];
        const row = shortsRowRefs.current[currentGroup.key];
        if (!row) {
          return;
        }

        const direction = event.key === "ArrowRight" ? 1 : -1;
        row.scrollBy({ left: direction * row.clientWidth, behavior: "smooth" });
      }
    };

    window.addEventListener("keydown", handleKey);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", handleKey);
    };
  }, [selectedPhotoId, shortsDayGroups, shortsStartPosition.dayIndex, shortsStartPosition.photoIndex]);

  useEffect(() => {
    if (!selectedPhotoId) {
      return;
    }

    const scrollRoot = shortsFeedRef.current;
    if (!scrollRoot) {
      return;
    }

    const updateIndex = () => {
      const viewportHeight = Math.max(window.innerHeight, 1);
      const nextIndex = Math.round(scrollRoot.scrollTop / viewportHeight);
      const clamped = Math.max(0, Math.min(shortsStepCount - 1, nextIndex));
      setShortsIndex(clamped);
    };

    updateIndex();
    scrollRoot.addEventListener("scroll", updateIndex, { passive: true });

    return () => {
      scrollRoot.removeEventListener("scroll", updateIndex);
    };
  }, [selectedPhotoId, shortsStepCount]);

  useEffect(() => {
    if (!selectedImage) {
      return;
    }

    const handleKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setSelectedImage(null);
      }
    };

    window.addEventListener("keydown", handleKey);

    return () => {
      window.removeEventListener("keydown", handleKey);
    };
  }, [selectedImage]);

  const jsonLd = useMemo(
    () => [
      {
        "@context": "https://schema.org",
        "@type": "TravelAgency",
        name: "AlaskaTrip",
        alternateName: "아름다운비행 알래스카",
        url: "https://alaskatrip.co.kr",
        telephone: "+82-10-3309-0800",
        address: {
          "@type": "PostalAddress",
          streetAddress: "새문안로3길 36, 1225호",
          addressLocality: "종로구",
          addressRegion: "서울",
          addressCountry: "KR",
        },
      },
      {
        "@context": "https://schema.org",
        "@type": "TouristTrip",
        name: summerSummary.title,
        description: `${summerSummary.period}, ${summerSummary.price}`,
        itinerary: {
          "@type": "ItemList",
          numberOfItems: 9,
          itemListElement: [
            "앵커리지",
            "타키나",
            "발디즈",
            "콜롬비아 빙하",
            "마타누스카",
            "스워드",
            "호머",
            "솔도트나",
            "귀국",
          ],
        },
        offers: {
          "@type": "Offer",
          priceCurrency: "KRW",
          price: "9500000",
          availability: "https://schema.org/InStock",
          validFrom: "2026-03-09",
        },
      },
      {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: faqItems.slice(0, 4).map((item) => ({
          "@type": "Question",
          name: item.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: item.answer,
          },
        })),
      },
    ],
    [],
  );

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SeoHead
        title="알래스카 프리미엄 8박9일 | 프리미엄 알래스카 소그룹 여행"
        description="사진으로 먼저 설레고, 일정으로 확신하는 알래스카 여름 8박9일. 2026년 7월 출발 확정, 1인 9,500,000원(12명 기준)."
        path="/"
        image="/alaska-mobile/hero-1.webp"
        keywords="알래스카 여행, 알래스카 8박9일, 알래스카 여름 일정, 도시어부 촬영지, 프리미엄 소그룹"
        jsonLd={jsonLd}
      />

      {showHeroActions ? <Header hidden={headerHidden} /> : null}

      <main className="pb-28">
        <section className="relative min-h-[100svh] overflow-hidden">
          {heroImages.map((src, index) => (
            <img
              key={src}
              src={src}
              alt="알래스카 대표 풍경"
              loading={index === 0 ? "eager" : "lazy"}
              srcSet={getResponsiveSrcSet(src)}
              sizes="100vw"
              className={`absolute inset-0 h-full w-full transform-gpu object-cover transition-opacity [transition-duration:1300ms] ease-out ${
                heroIndex === index ? "opacity-100" : "opacity-0"
              } ${index === 0 && isHeroIntro && !prefersReducedMotion ? "hero-kenburns-intro" : ""}`}
            />
          ))}

          <div
            className={`pointer-events-none absolute inset-0 transition-opacity [transition-duration:1400ms] ease-out ${showHeroCopy ? "opacity-100" : "opacity-90"}`}
            style={{ background: "var(--gradient-hero-cool)" }}
          />
          <div
            className={`pointer-events-none absolute inset-0 transition-opacity [transition-duration:1700ms] ease-out ${showHeroCopy ? "opacity-100" : "opacity-92"}`}
            style={{ background: "var(--gradient-hero-deep)" }}
          />
          <div
            className="pointer-events-none absolute inset-0"
            style={{ background: "var(--gradient-hero-vignette)" }}
          />

          <div className="relative mx-auto flex min-h-[100svh] w-full max-w-5xl flex-col justify-end px-4 pb-16 pt-24">
            <div className="max-w-lg space-y-3 rounded-[30px] border border-white/20 bg-[linear-gradient(145deg,rgba(5,20,41,0.34),rgba(5,20,41,0.16)_58%,rgba(255,255,255,0.06))] px-4 py-5 shadow-[0_20px_48px_-34px_rgba(3,12,27,0.95)] backdrop-blur-[2px] sm:px-6 sm:py-6">
              <p
                className={`inline-flex rounded-full border border-white/35 bg-[rgba(10,28,54,0.4)] px-3 py-1 text-[16px] font-semibold text-white transition-all [transition-duration:1200ms] [transition-timing-function:cubic-bezier(0.22,1,0.36,1)] ${
                  showHeroCopy ? "translate-y-0 opacity-100 blur-0" : "translate-y-4 opacity-0 blur-[2px]"
                }`}
              >
                도시어부 촬영지 · 12명 프리미엄 소그룹
              </p>
              <h1
                className={`font-brand text-[36px] font-semibold leading-[1.22] tracking-[-0.01em] text-white transition-all [transition-duration:1400ms] [transition-delay:120ms] [transition-timing-function:cubic-bezier(0.22,1,0.36,1)] sm:text-[42px] ${
                  showHeroCopy ? "translate-y-0 opacity-100 blur-0" : "translate-y-5 opacity-0 blur-[3px]"
                }`}
              >
                눈으로 확신하는 알래스카,
                <br />
                이번 여름 단 12석
              </h1>
              <p
                className={`text-[17px] font-medium text-white/95 transition-all [transition-duration:1300ms] [transition-delay:220ms] [transition-timing-function:cubic-bezier(0.22,1,0.36,1)] ${
                  showHeroCopy ? "translate-y-0 opacity-100 blur-0" : "translate-y-5 opacity-0 blur-[2px]"
                }`}
              >
                2026년 7월 단 1회 확정 · 8박 9일
              </p>

              <div
                className={`grid grid-cols-1 gap-2 transition-all [transition-duration:1200ms] [transition-delay:180ms] [transition-timing-function:cubic-bezier(0.22,1,0.36,1)] sm:grid-cols-2 ${
                  showHeroActions ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0 pointer-events-none"
                }`}
              >
                <button
                  type="button"
                  onClick={() => setShowHeroCallSheet(true)}
                  className="inline-flex min-h-[54px] items-center justify-center gap-2 rounded-2xl border border-[#e2b855] bg-accent px-4 text-[17px] font-bold text-primary shadow-[0_10px_24px_-18px_rgba(214,161,53,0.95)]"
                >
                  <PhoneCall className="h-5 w-5" />
                  {PRIMARY_CALL_COPY}
                </button>
                <button
                  type="button"
                  onClick={openInquiryModal}
                  className="inline-flex min-h-[54px] items-center justify-center gap-2 rounded-2xl border border-white/65 bg-[rgba(5,17,34,0.24)] px-4 text-[17px] font-semibold text-white"
                >
                  <MessageSquareText className="h-5 w-5" />
                  {"\uBB38\uC758 \uB0A8\uAE30\uAE30"}
                </button>
              </div>
              <p className="text-[15px] text-white/80">{"\uD1B5\uD654 \uAC00\uB2A5 09:00~21:00 / \uC5F0\uACB0\uC774 \uC5B4\uB824\uC6B0\uBA74 \uBB38\uC758 \uB0A8\uAE30\uAE30"}</p>
            </div>
          </div>
        </section>

        <section id="wow-points" className="mx-auto mt-10 w-full max-w-5xl px-4">
          <div className="mb-4 flex items-end justify-between gap-4">
            <h2 className="font-brand text-[30px] font-semibold leading-tight">핵심 장면 3개</h2>
            <p className="text-[16px] text-muted-foreground">사진 먼저, 상담은 한 번에</p>
          </div>

          <div className="grid gap-3">
            {wowPoints.slice(0, 3).map((point) => (
              <article key={point.badge} className="wow-glow-card">
                <button type="button" onClick={() => openImageViewer(point.image, point.title)} className="block w-full">
                  <img src={point.image} alt={point.title} loading="lazy" className="h-56 w-full object-cover" />
                </button>
                <div className="space-y-2 p-5">
                  <p className="wow-ribbon">{point.badge}</p>
                  <h3 className="text-[24px] font-semibold leading-tight">{point.title}</h3>
                  <p className="text-[16px] text-foreground/80">{point.description}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section id="summer-offer" className="mx-auto mt-10 w-full max-w-5xl px-4">
          <div className="rounded-3xl border bg-primary px-5 py-6 text-white shadow-elegant">
            <p className="text-[16px] text-white/80">{"\uC5EC\uB984 \uD655\uC815 \uC624\uD37C"}</p>
            <h2 className="mt-1 font-brand text-[31px] font-semibold leading-tight">{summerSummary.title}</h2>
            <p className="mt-3 text-[17px] font-semibold text-accent">{summerSummary.period}</p>
            <p className="mt-1 text-[23px] font-bold">{summerSummary.price}</p>
            <div className="mt-5 grid grid-cols-1 gap-2 sm:grid-cols-2">
              <a
                href={`tel:${contacts[0].tel}`}
                onClick={() =>
                  trackCallIntent({
                    season: "summer",
                    contact: contacts[0].name,
                    surface: "hero",
                  })
                }
                className="inline-flex min-h-[52px] items-center justify-center gap-2 rounded-xl bg-accent px-4 text-[17px] font-bold text-primary"
              >
                <PhoneCall className="h-5 w-5" />
                {contacts[0].name} - {PRIMARY_CALL_COPY}
              </a>
              <a
                href={`tel:${contacts[1].tel}`}
                onClick={() =>
                  trackCallIntent({
                    season: "summer",
                    contact: contacts[1].name,
                    surface: "hero",
                  })
                }
                className="inline-flex min-h-[52px] items-center justify-center gap-2 rounded-xl border border-white/40 px-4 text-[17px] font-semibold"
              >
                <PhoneCall className="h-5 w-5" />
                {contacts[1].name} - {PRIMARY_CALL_COPY}
              </a>
            </div>
            <p className="mt-3 text-[15px] text-white/85">{"\uD1B5\uD654 \uAC00\uB2A5 09:00~21:00 / \uBD80\uC7AC \uC2DC \uBB38\uC758 \uB0A8\uAE30\uAE30 \uAC00\uB2A5"}</p>
          </div>
        </section>

        <section className="mx-auto mt-8 w-full max-w-5xl px-4">
          <article className="rounded-3xl border bg-white p-5 shadow-card">
            <div className="flex items-end justify-between gap-3">
              <h2 className="text-[25px] font-semibold leading-tight">{"\uD575\uC2EC \uD3EC\uD568/\uBD88\uD3EC\uD568 \uC694\uC57D"}</h2>
              <Link to="/summer-itinerary" className="text-[16px] font-semibold text-primary underline-offset-4 hover:underline">
                {"\uC0C1\uC138 \uC804\uCCB4 \uBCF4\uAE30"}
              </Link>
            </div>

            <div className="mt-3 grid gap-3 sm:grid-cols-2">
              <div className="rounded-2xl border bg-secondary/35 p-4">
                <p className="text-[16px] font-semibold text-primary">{"\uD3EC\uD568 \uD575\uC2EC 3\uAC00\uC9C0"}</p>
                <ul className="mt-2 space-y-1 text-[16px] text-foreground/85">
                  {includes.slice(0, 3).map((item) => (
                    <li key={`landing-include-${item}`}>- {item}</li>
                  ))}
                </ul>
              </div>

              <div className="rounded-2xl border bg-secondary/35 p-4">
                <p className="text-[16px] font-semibold text-primary">{"\uBD88\uD3EC\uD568 \uD575\uC2EC 3\uAC00\uC9C0"}</p>
                <ul className="mt-2 space-y-1 text-[16px] text-foreground/85">
                  {excludes.slice(0, 3).map((item) => (
                    <li key={`landing-exclude-${item}`}>- {item}</li>
                  ))}
                </ul>
              </div>
            </div>
          </article>
        </section>

        <section className="mx-auto mt-6 grid w-full max-w-5xl gap-3 px-4">
          {trustMetrics.map((metric, index) => (
            <article
              key={metric.title}
              className={`rounded-3xl border bg-white px-5 py-5 shadow-card transition-all duration-300 ${
                index === 1 ? "sm:translate-y-2" : ""
              }`}
            >
              <p className="text-[16px] font-semibold text-muted-foreground">{metric.title}</p>
              <p className="mt-1 text-[31px] font-bold text-primary">{metric.value}</p>
              <p className="mt-1 text-[16px] text-foreground/80">{metric.description}</p>
            </article>
          ))}
        </section>

        <section className="mx-auto mt-10 w-full max-w-5xl px-4">
          <div className="mb-4 flex items-end justify-between gap-4">
            <h2 className="font-brand text-[30px] font-semibold leading-tight">포토 스토리 4컷</h2>
            <p className="text-[16px] text-muted-foreground">좌우로 넘겨보세요</p>
          </div>
          <div className="flex snap-x snap-mandatory gap-3 overflow-x-auto pb-1 scrollbar-hide">
            {storyCards.map((story) => (
              <article
                key={story.title}
                className="min-w-[84%] snap-center overflow-hidden rounded-3xl border bg-white shadow-card sm:min-w-[46%]"
              >
                <button type="button" onClick={() => openImageViewer(story.image, story.title)} className="block w-full">
                  <img src={story.image} alt={story.title} loading="lazy" srcSet={getResponsiveSrcSet(story.image)} sizes="(max-width: 640px) 84vw, 46vw" className="h-56 w-full object-cover" />
                </button>
                <div className="space-y-1 px-4 py-4">
                  <h3 className="text-[23px] font-semibold leading-tight">{story.title}</h3>
                  <p className="text-[16px] text-foreground/80">{story.subtitle}</p>
                  <a
                    href={`tel:${contacts[0].tel}`}
                    onClick={() =>
                      trackCallIntent({
                        season: "summer",
                        contact: contacts[0].name,
                        surface: "gallery",
                      })
                    }
                    className="inline-flex min-h-[48px] items-center justify-center rounded-xl bg-primary px-4 text-[16px] font-semibold text-white"
                  >
                    {PRIMARY_CALL_COPY}
                  </a>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="mx-auto mt-10 w-full max-w-5xl px-4">
          <div className="mb-4 space-y-1">
            <h2 className="font-brand text-[30px] font-semibold leading-tight">내 취향 10초 매칭</h2>
            <p className="text-[16px] text-foreground/80">원하는 분위기를 고르면 추천 Day를 바로 보여드립니다.</p>
          </div>

          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
            {tasteMatches.map((match) => {
              const isActive = selectedTasteKey === match.key;
              return (
                <button
                  key={match.key}
                  type="button"
                  onClick={() => setSelectedTasteKey(match.key)}
                  className={`inline-flex min-h-[48px] items-center rounded-full border px-4 text-[16px] font-semibold transition-all ${
                    isActive
                      ? "border-primary bg-primary text-white shadow-card"
                      : "border-primary/20 bg-white text-primary"
                  }`}
                >
                  {match.label}
                </button>
              );
            })}
          </div>

          <article className="mt-3 overflow-hidden rounded-3xl border bg-white shadow-card">
            <button type="button" onClick={() => openImageViewer(selectedTaste.image, selectedTaste.label)} className="block w-full">
              <img src={selectedTaste.image} alt={selectedTaste.label} className="h-56 w-full object-cover" loading="lazy" />
            </button>
            <div className="space-y-2 p-5">
              <p className="inline-flex items-center gap-1 rounded-full bg-primary/8 px-3 py-1 text-[16px] font-semibold text-primary">
                <Sparkles className="h-4 w-4" />
                {selectedTaste.day} 추천
              </p>
              <h3 className="text-[24px] font-semibold leading-tight">{selectedTaste.route}</h3>
              <p className="text-[16px] text-foreground/80">{selectedTaste.summary}</p>
              <Link
                to="/summer-itinerary"
                className="inline-flex min-h-[48px] items-center gap-2 rounded-xl border border-primary/25 bg-primary px-4 text-[16px] font-semibold text-white"
              >
                상세 일정에서 확인
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </article>
        </section>

        <ConversionBoosterSection />

        <section id="gallery" className="mx-auto mt-10 w-full max-w-5xl px-4">
          <div className="mb-4 flex items-end justify-between gap-4">
            <div>
              <h2 className="font-brand text-[30px] font-semibold leading-tight">시즌 갤러리</h2>
              <p className="text-[16px] text-foreground/80">사진을 누르면 세로는 다음 DAY, 가로는 같은 DAY로 이어집니다.</p>
            </div>
            <Link to="/summer-itinerary" className="text-[16px] font-semibold text-primary underline-offset-4 hover:underline">
              여름 확정 일정 보기
            </Link>
          </div>

          <div className="mb-3 flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
            {seasonGalleryGroups.map((season) => {
              const isActive = activeSeason === season.key;
              return (
                <button
                  key={season.key}
                  type="button"
                  onClick={() => {
                    setActiveSeason(season.key);
                    setActiveSummerDay("all");
                  }}
                  className={`inline-flex min-h-[48px] items-center rounded-full border px-4 text-[16px] font-semibold transition-all ${
                    isActive ? "border-primary bg-primary text-white" : "border-primary/20 bg-white text-primary"
                  }`}
                >
                  {season.label}
                </button>
              );
            })}
          </div>

          {activeSeason === "summer" ? (
            <div className="mb-3 flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
              {summerDayFilters.map((filter) => {
                const isActive = activeSummerDay === filter.value;
                return (
                  <button
                    key={`summer-${filter.label}`}
                    type="button"
                    onClick={() => setActiveSummerDay(filter.value)}
                    className={`inline-flex min-h-[48px] items-center rounded-full border px-3 text-[16px] font-semibold transition-all ${
                      isActive ? "border-accent bg-accent text-primary" : "border-primary/20 bg-white text-primary"
                    }`}
                  >
                    {filter.label}
                  </button>
                );
              })}
            </div>
          ) : null}

          <p className="mb-3 text-[16px] text-muted-foreground">{activeSeasonGallery.description}</p>

          <div className="grid grid-cols-2 gap-2">
            {filteredGallery.map((photo, index) => {
              const isLarge = index % 6 === 0;
              return (
                <button
                  key={photo.id}
                  type="button"
                  onClick={() => setSelectedPhotoId(photo.id)}
                  className={`group relative overflow-hidden rounded-2xl border border-white/60 bg-black text-left shadow-card ${
                    isLarge ? "col-span-2 h-56" : "h-40"
                  }`}
                >
                  <img
                    src={photo.image}
                    alt={`${photo.dayLabel} ${photo.title}`}
                    loading="lazy"
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 via-black/35 to-transparent p-3">
                    <p className="text-[16px] font-semibold text-accent">{photo.dayLabel}</p>
                    <p className="text-[16px] font-semibold leading-tight text-white">{photo.title}</p>
                  </div>
                </button>
              );
            })}
          </div>

          <p className="mt-3 text-[16px] text-muted-foreground">
            {activeSeasonGallery.label} 시즌 {filteredGallery.length}컷 노출 중 · 끝까지 본 뒤 바로 전화 상담으로 연결할 수 있습니다.
          </p>

          <div className="mt-4 rounded-2xl border bg-white p-4 shadow-card">
            <p className="text-[16px] text-foreground/80">{"\uC6D0\uD558\uB294 \uC7A5\uBA74\uC744 \uCDA9\uBD84\uD788 \uBCF4\uC168\uB2E4\uBA74, \uC9C0\uAE08 \uAC00\uB2A5\uD55C \uC88C\uC11D\uBD80\uD130 \uBA3C\uC800 \uD655\uC778\uD574\uBCF4\uC138\uC694."}</p>
            <p className="mt-1 text-[15px] text-muted-foreground">{"\uD1B5\uD654 \uAC00\uB2A5 09:00~21:00 / \uC5F0\uACB0 \uC5B4\uB824\uC6B0\uBA74 \uBB38\uC758 \uB0A8\uAE30\uAE30"}</p>
            <div className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-2">
              {contacts.map((contact, index) => (
                <a
                  key={`gallery-call-${contact.tel}`}
                  href={`tel:${contact.tel}`}
                  onClick={() =>
                    trackCallIntent({
                      season: activeSeason,
                      contact: contact.name,
                      surface: "gallery",
                    })
                  }
                  className={`inline-flex min-h-[48px] items-center justify-center gap-2 rounded-xl px-4 text-[16px] font-bold ${
                    index === 0 ? "bg-primary text-white" : "bg-accent text-primary"
                  }`}
                >
                  <PhoneCall className="h-4 w-4" />
                  {contact.name} - {PRIMARY_CALL_COPY}
                </a>
              ))}
            </div>
          </div>
        </section>

        <section id="season-status" className="mx-auto mt-10 w-full max-w-5xl px-4">
          <h2 className="mb-4 font-brand text-[30px] font-semibold leading-tight">시즌 공개 상태</h2>
          <div className="grid gap-4">
            {seasonCards.map((season) => (
              <article key={season.key} className="overflow-hidden rounded-2xl border bg-white shadow-card">
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => openImageViewer(season.image, `${season.title} 대표 이미지`)}
                    className="block w-full"
                  >
                    <img src={season.image} alt={`${season.title} 대표 이미지`} loading="lazy" className="h-44 w-full object-cover" />
                  </button>
                  <span
                    className={`absolute left-3 top-3 rounded-full px-3 py-1 text-[16px] font-bold ${
                      season.status === "open" ? "bg-accent text-primary" : "bg-black/70 text-white"
                    }`}
                  >
                    {season.status === "open" ? "공개중" : "오픈 예정"}
                  </span>
                </div>
                <div className="space-y-2 p-5">
                  <h3 className="text-[22px] font-semibold">{season.title}</h3>
                  <p className="text-[16px] text-foreground/80">{season.summary}</p>
                  {season.status === "open" ? (
                    <Link
                      to="/summer-itinerary"
                      className="inline-flex min-h-[48px] items-center rounded-xl bg-primary px-4 text-[16px] font-semibold text-white"
                    >
                      여름 일정 확인하기
                    </Link>
                  ) : (
                    <a
                      href={`tel:${contacts[0].tel}`}
                      onClick={() =>
                        trackCallIntent({
                          season: season.key,
                          contact: contacts[0].name,
                          surface: "season_card",
                        })
                      }
                      className="inline-flex min-h-[48px] items-center rounded-xl border border-primary/30 px-4 text-[16px] font-semibold text-primary"
                    >
                      {PRIMARY_CALL_COPY}
                    </a>
                  )}
                </div>
              </article>
            ))}
          </div>
        </section>

        <section id="faq" className="mx-auto mt-10 w-full max-w-5xl px-4">
          <h2 className="mb-4 font-brand text-[30px] font-semibold leading-tight">자주 묻는 질문</h2>
          <div className="space-y-3">
            {faqItems.map((faq) => (
              <details key={faq.question} className="rounded-2xl border bg-white p-5 shadow-card">
                <summary className="cursor-pointer text-[17px] font-semibold">{faq.question}</summary>
                <p className="mt-3 text-[16px] leading-relaxed text-foreground/80">{faq.answer}</p>
              </details>
            ))}
          </div>
        </section>

        <section id="final-call" className="mx-auto mt-10 w-full max-w-5xl px-4">
          <div className="rounded-3xl border bg-secondary px-5 py-6">
            <h2 className="font-brand text-[30px] font-semibold leading-tight">{PRIMARY_CALL_COPY}</h2>
            <p className="mt-2 text-[16px] text-foreground/80">{"\uC9E7\uAC8C \uBB3C\uC5B4\uBCF4\uC154\uB3C4 \uB429\uB2C8\uB2E4. \uAC00\uB2A5\uD55C \uC77C\uC815\uACFC \uD56D\uACF5\uC744 \uBC14\uB85C \uD655\uC778\uD574\uB4DC\uB9BD\uB2C8\uB2E4."}</p>
            <p className="mt-1 text-[15px] text-muted-foreground">{"\uD1B5\uD654 \uAC00\uB2A5 09:00~21:00 / \uBD80\uC7AC \uC2DC \uBB38\uC758 \uB0A8\uAE30\uAE30"}</p>
            <div className="mt-5 grid gap-2">
              {contacts.map((contact) => (
                <a
                  key={contact.tel}
                  href={`tel:${contact.tel}`}
                  onClick={() =>
                    trackCallIntent({
                      season: "summer",
                      contact: contact.name,
                      surface: "final",
                    })
                  }
                  className="inline-flex min-h-[52px] items-center justify-between rounded-xl bg-white px-4 text-[17px] font-bold text-primary shadow-card"
                >
                  <span>{contact.name} - {PRIMARY_CALL_COPY}</span>
                  <span>{contact.phone}</span>
                </a>
              ))}
            </div>

            <button
              type="button"
              onClick={openInquiryModal}
              className="mt-3 inline-flex min-h-[48px] w-full items-center justify-center gap-2 rounded-xl border border-primary/30 bg-white px-4 text-[16px] font-semibold text-primary"
            >
              <MessageSquareText className="h-5 w-5" />
              {"\uBB38\uC758 \uB0A8\uAE30\uAE30"}
            </button>
          </div>
        </section>
      </main>

      {showHeroCallSheet ? (
        <div className="fixed inset-0 z-[76] flex items-end justify-center bg-black/60 px-4 pb-4" role="dialog" aria-modal="true" onClick={() => setShowHeroCallSheet(false)}>
          <div className="w-full max-w-xl overflow-hidden rounded-3xl border bg-white shadow-elegant" onClick={(event) => event.stopPropagation()}>
            <div className="flex items-start justify-between border-b px-5 py-4">
              <div>
                <p className="text-[16px] font-semibold text-primary">상담 전화하기</p>
                <h3 className="font-brand text-[26px] font-semibold leading-tight">통화할 대표를 선택해 바로 연결하세요</h3>
              </div>
              <button
                type="button"
                onClick={() => setShowHeroCallSheet(false)}
                className="inline-flex h-11 w-11 items-center justify-center rounded-full border"
                aria-label="상담 전화 선택 닫기"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="grid gap-2 px-5 py-4">
              {contacts.map((contact) => (
                <a
                  key={`hero-call-${contact.tel}`}
                  href={`tel:${contact.tel}`}
                  onClick={() =>
                    trackCallIntent({
                      season: "summer",
                      contact: contact.name,
                      surface: "hero",
                    })
                  }
                  className="inline-flex min-h-[52px] items-center justify-between rounded-xl bg-primary px-4 text-[17px] font-bold text-white"
                >
                  <span>{contact.name} - {PRIMARY_CALL_COPY}</span>
                  <span>{contact.phone}</span>
                </a>
              ))}

              <button
                type="button"
                onClick={openInquiryModal}
                className="inline-flex min-h-[50px] items-center justify-center gap-2 rounded-xl border border-primary/30 bg-white px-4 text-[16px] font-semibold text-primary"
              >
                <MessageSquareText className="h-5 w-5" />
                전화가 안되면 문의 남기기
              </button>
            </div>
          </div>
        </div>
      ) : null}

      {showInquiryModal ? (
        <div className="fixed inset-0 z-[77] flex items-center justify-center bg-black/65 px-4" role="dialog" aria-modal="true" onClick={closeInquiryModal}>
          <div className="w-full max-w-xl overflow-hidden rounded-3xl border bg-white shadow-elegant" onClick={(event) => event.stopPropagation()}>
            <div className="flex items-start justify-between border-b px-5 py-4">
              <div>
                <p className="text-[16px] font-semibold text-primary">전화 연결 실패 시</p>
                <h3 className="font-brand text-[26px] font-semibold leading-tight">문의 남기기</h3>
              </div>
              <button
                type="button"
                onClick={closeInquiryModal}
                className="inline-flex h-11 w-11 items-center justify-center rounded-full border"
                aria-label="문의 모달 닫기"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="space-y-3 px-5 py-4">
              <p className="text-[16px] text-foreground/80">이름/연락처를 남겨주시면 확인 후 빠르게 연락드리겠습니다.</p>

              <form onSubmit={submitInquiry} className="space-y-2">
                <input
                  value={inquiryName}
                  onChange={(event) => setInquiryName(event.target.value)}
                  placeholder="이름"
                  className="w-full rounded-xl border px-4 py-3 text-[16px]"
                />
                <input
                  value={inquiryPhone}
                  onChange={(event) => setInquiryPhone(event.target.value)}
                  inputMode="tel"
                  placeholder="휴대폰 번호 (숫자만)"
                  className="w-full rounded-xl border px-4 py-3 text-[16px]"
                />
                <label className="block text-[16px] font-medium text-foreground/80">
                  희망 담당
                  <select
                    value={inquiryPreferredContact}
                    onChange={(event) =>
                      setInquiryPreferredContact(event.target.value as "상관없음" | "엄태인 대표" | "정수미 대표")
                    }
                    className="mt-1 w-full rounded-xl border px-4 py-3 text-[16px]"
                  >
                    <option value="상관없음">상관없음</option>
                    <option value="엄태인 대표">엄태인 대표</option>
                    <option value="정수미 대표">정수미 대표</option>
                  </select>
                </label>
                <textarea
                  value={inquiryMessage}
                  onChange={(event) => setInquiryMessage(event.target.value)}
                  placeholder="상담 받고 싶은 내용을 간단히 적어주세요"
                  className="min-h-[110px] w-full rounded-xl border px-4 py-3 text-[16px]"
                />

                <button
                  type="submit"
                  disabled={isSubmittingInquiry}
                  className="inline-flex min-h-[50px] w-full items-center justify-center rounded-xl bg-primary px-4 text-[16px] font-semibold text-white disabled:opacity-60"
                >
                  {isSubmittingInquiry ? "문의 저장 중..." : "문의 남기기"}
                </button>
              </form>

              {inquiryFeedback.type !== "idle" ? (
                <p
                  className={`rounded-xl px-3 py-2 text-[16px] ${
                    inquiryFeedback.type === "error" ? "bg-red-50 text-red-600" : "bg-primary/10 text-primary"
                  }`}
                >
                  {inquiryFeedback.message}
                </p>
              ) : null}
            </div>
          </div>
        </div>
      ) : null}

      {selectedPhotoId ? (
        <div className="shorts-overlay fixed inset-0 z-[70] bg-black/90" role="dialog" aria-modal="true">
          <div className="pointer-events-none absolute inset-x-0 top-0 z-20 px-3 pt-[calc(env(safe-area-inset-top)+8px)]">
            <div className="mx-auto max-w-3xl">
              <div className="pointer-events-auto flex items-center justify-between rounded-2xl border border-white/20 bg-black/55 px-3 py-2 backdrop-blur">
                <div>
                  <p className="text-[16px] font-semibold text-white">알래스카 숏폼 갤러리</p>
                  <p className="text-[16px] text-white/75">
                    {Math.min(shortsIndex + 1, shortsStepCount)} / {shortsStepCount}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setSelectedPhotoId(null)}
                  className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/30 bg-black/30 text-white"
                  aria-label="숏폼 닫기"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>

              <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-white/20">
                <span
                  className="block h-full rounded-full bg-accent transition-all duration-300"
                  style={{ width: `${shortsProgress}%` }}
                />
              </div>
            </div>
          </div>

          <div ref={shortsFeedRef} className="shorts-feed h-[100svh] overflow-y-auto snap-y snap-mandatory" style={{ touchAction: "pan-y" }}>
            {shortsDayGroups.map((group, groupIndex) => {
              const currentHorizontal = shortsHorizontalIndex[group.key] ?? 0;
              const activePhoto =
                group.photos[Math.max(0, Math.min(group.photos.length - 1, currentHorizontal))] ?? group.photos[0];
              const hasMultipleCuts = group.photos.length > 1;

              const moveHorizontal = (direction: 1 | -1) => {
                const row = shortsRowRefs.current[group.key];
                if (!row) {
                  return;
                }

                row.scrollBy({ left: direction * row.clientWidth, behavior: "smooth" });
              };

              const moveToHorizontalIndex = (nextIndex: number) => {
                const row = shortsRowRefs.current[group.key];
                if (!row) {
                  return;
                }

                row.scrollTo({ left: row.clientWidth * nextIndex, behavior: "smooth" });
              };

              return (
                <article key={group.key} className="shorts-frame relative h-[100svh] snap-start overflow-hidden">
                  <div
                    ref={(node) => {
                      shortsRowRefs.current[group.key] = node;
                    }}
                    className="flex h-full w-full overflow-x-auto snap-x snap-mandatory scrollbar-hide"
                    style={{ touchAction: "pan-x" }}
                    onScroll={(event) => {
                      const viewportWidth = Math.max(event.currentTarget.clientWidth, 1);
                      const nextIndex = Math.round(event.currentTarget.scrollLeft / viewportWidth);
                      setShortsHorizontalIndex((prev) => {
                        if (prev[group.key] === nextIndex) {
                          return prev;
                        }

                        return {
                          ...prev,
                          [group.key]: nextIndex,
                        };
                      });
                    }}
                  >
                    {group.photos.map((photo) => (
                      <div key={`short-${group.key}-${photo.id}`} className="relative h-full w-full shrink-0 snap-start overflow-hidden">
                        <img src={photo.image} alt={photo.title} className="h-full w-full object-cover" />
                        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/35 to-black/78" />
                      </div>
                    ))}
                  </div>

                  {hasMultipleCuts ? (
                    <>
                      <button
                        type="button"
                        onClick={() => moveHorizontal(-1)}
                        className="absolute left-3 top-1/2 z-10 inline-flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/50 bg-black/40 text-white"
                        aria-label="이전 컷 보기"
                      >
                        <ChevronLeft className="h-5 w-5" />
                      </button>
                      <button
                        type="button"
                        onClick={() => moveHorizontal(1)}
                        className="absolute right-3 top-1/2 z-10 inline-flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/50 bg-black/40 text-white"
                        aria-label="다음 컷 보기"
                      >
                        <ChevronRight className="h-5 w-5" />
                      </button>
                    </>
                  ) : null}

                  <div className="absolute inset-x-0 bottom-0 mx-auto w-full max-w-3xl space-y-3 px-4 pb-[calc(env(safe-area-inset-bottom)+22px)]">
                    <p className="wow-ribbon">
                      {group.label} · {activePhoto.spot}
                    </p>
                    <h3 className="font-brand text-[30px] font-semibold leading-tight text-white">{activePhoto.title}</h3>
                    <p className="text-[16px] text-white/85">실제 보유 이미지 기반 숏폼 장면입니다.</p>

                    {hasMultipleCuts ? (
                      <div className="flex items-center gap-2">
                        {group.photos.map((photo, photoIndex) => (
                          <button
                            key={`dot-${group.key}-${photo.id}`}
                            type="button"
                            onClick={() => moveToHorizontalIndex(photoIndex)}
                            className={`h-2.5 rounded-full transition-all ${
                              currentHorizontal === photoIndex ? "w-7 bg-accent" : "w-2.5 bg-white/55"
                            }`}
                            aria-label={`cut ${photoIndex + 1}`}
                          />
                        ))}
                      </div>
                    ) : null}

                    <div className="flex flex-wrap gap-2">
                      <p className="inline-flex items-center gap-1 rounded-full bg-white/15 px-3 py-1 text-[16px] font-medium text-white">
                        <ArrowLeftRight className="h-4 w-4" /> 좌우 스와이프/버튼으로 {group.photos.length}컷 보기
                      </p>
                      {groupIndex < shortsDayGroups.length - 1 ? (
                        <p className="inline-flex items-center gap-1 rounded-full bg-white/15 px-3 py-1 text-[16px] font-medium text-white">
                          <ArrowDown className="h-4 w-4" /> 아래로 넘기면 다음 DAY
                        </p>
                      ) : (
                        <p className="inline-flex items-center gap-1 rounded-full bg-white/15 px-3 py-1 text-[16px] font-medium text-white">
                          마지막 DAY 다음에 상담 CTA가 나옵니다
                        </p>
                      )}
                    </div>

                    <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                      <button
                        type="button"
                        onClick={() => setSelectedPhotoId(null)}
                        className="inline-flex min-h-[48px] items-center justify-center rounded-xl border border-white/40 bg-black/30 px-4 text-[16px] font-semibold text-white"
                      >
                        {"\uAC24\uB7EC\uB9AC\uB85C \uB3CC\uC544\uAC00\uAE30"}
                      </button>
                      <Link
                        to="/summer-itinerary"
                        onClick={() => setSelectedPhotoId(null)}
                        className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-xl bg-accent px-4 text-[16px] font-bold text-primary"
                      >
                        {"\uC5EC\uB984 \uD655\uC815 \uC77C\uC815 \uBCF4\uAE30"}
                        <ArrowRight className="h-4 w-4" />
                      </Link>
                    </div>
                  </div>
                </article>
              );
            })}

            <article className="shorts-frame relative flex h-[100svh] snap-start items-end overflow-hidden bg-[radial-gradient(circle_at_20%_20%,#1f3f66,transparent_45%),radial-gradient(circle_at_85%_75%,#cf9f45,transparent_35%),#0b1420]">
              <div className="mx-auto w-full max-w-3xl space-y-4 px-4 pb-[calc(env(safe-area-inset-bottom)+26px)]">
                <p className="wow-ribbon">{"\uB9C8\uC9C0\uB9C9 \uC7A5\uBA74"}</p>
                <h3 className="font-brand text-[33px] font-semibold leading-tight text-white">{"\uB05D\uAE4C\uC9C0 \uBCF4\uC168\uC2B5\uB2C8\uB2E4. \uC9C0\uAE08 \uC804\uD654\uB85C \uC790\uB9AC\uBD80\uD130 \uD655\uC778\uD558\uC138\uC694."}</h3>
                <p className="text-[16px] text-white/85">{"\uCD9C\uBC1C \uAC00\uB2A5 \uC88C\uC11D\uACFC \uD56D\uACF5\uC744 \uC2E4\uC2DC\uAC04\uC73C\uB85C \uD655\uC778\uD574\uB4DC\uB9AC\uACA0\uC2B5\uB2C8\uB2E4."}</p>

                <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                  {contacts.map((contact, index) => (
                    <a
                      key={`shorts-final-call-${contact.tel}`}
                      href={`tel:${contact.tel}`}
                      onClick={() =>
                        trackCallIntent({
                          season: activeSeason,
                          contact: contact.name,
                          surface: "final",
                        })
                      }
                      className={`inline-flex min-h-[52px] items-center justify-center gap-2 rounded-xl px-4 text-[16px] font-bold ${
                        index === 0 ? "bg-white text-primary" : "bg-accent text-primary"
                      }`}
                    >
                      <PhoneCall className="h-5 w-5" />
                      {contact.name} - {PRIMARY_CALL_COPY}
                    </a>
                  ))}
                </div>

                <button
                  type="button"
                  onClick={() => setSelectedPhotoId(null)}
                  className="inline-flex min-h-[48px] items-center justify-center rounded-xl border border-white/40 px-4 text-[16px] font-semibold text-white"
                >
                  {"\uC20F\uD3FC \uB2EB\uACE0 \uD648\uD398\uC774\uC9C0 \uACC4\uC18D \uBCF4\uAE30"}
                </button>
              </div>
            </article>
          </div>
        </div>
      ) : null}

      {selectedImage ? (
        <div
          className="fixed inset-0 z-[75] flex items-center justify-center bg-black/85 px-4"
          role="dialog"
          aria-modal="true"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative w-full max-w-3xl" onClick={(event) => event.stopPropagation()}>
            <button
              type="button"
              onClick={() => setSelectedImage(null)}
              className="absolute right-2 top-2 inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/40 bg-black/40 text-white"
              aria-label="이미지 닫기"
            >
              <X className="h-5 w-5" />
            </button>
            <img src={selectedImage.src} alt={selectedImage.alt} className="max-h-[86svh] w-full rounded-2xl object-contain" />
            <p className="mt-2 text-center text-[16px] text-white/85">{selectedImage.alt}</p>
          </div>
        </div>
      ) : null}

      <Footer />
      {showHeroActions ? <FloatingCallButton /> : null}
    </div>
  );
};

export default Index;


