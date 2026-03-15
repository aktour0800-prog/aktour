import { FormEvent, useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowDown,
  ArrowLeftRight,
  ArrowRight,
  CalendarDays,
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
import {
  contacts,
  dayPlans,
  faqItems,
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

const HERO_REVEAL_MS = 2000;
const HERO_COPY_DELAY_MS = 380;
const HERO_CTA_DELAY_MS = 980;
const HERO_FAST_CYCLE_MS = 420;
const HERO_SLOW_CYCLE_MS = 5200;

interface ShortsDayGroup {
  key: string;
  label: string;
  spot: string;
  photos: SeasonGalleryPhoto[];
}

type InquiryFeedback = { type: "idle" | "error" | "success"; message: string };

const Index = () => {
  const [showHeroContent, setShowHeroContent] = useState(false);
  const [showHeroCopy, setShowHeroCopy] = useState(false);
  const [showHeroActions, setShowHeroActions] = useState(false);
  const [heroIndex, setHeroIndex] = useState(0);
  const [headerHidden, setHeaderHidden] = useState(false);
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
    if (showHeroContent) {
      return;
    }

    const reveal = () => setShowHeroContent(true);
    const revealOnScroll = () => {
      if (window.scrollY > 36) {
        reveal();
      }
    };

    const revealTimer = window.setTimeout(reveal, HERO_REVEAL_MS);
    window.addEventListener("scroll", revealOnScroll, { passive: true });

    return () => {
      window.clearTimeout(revealTimer);
      window.removeEventListener("scroll", revealOnScroll);
    };
  }, [showHeroContent]);

  useEffect(() => {
    const cycleMs = showHeroContent ? HERO_SLOW_CYCLE_MS : HERO_FAST_CYCLE_MS;

    const slider = window.setInterval(() => {
      setHeroIndex((prev) => (prev + 1) % heroImages.length);
    }, cycleMs);

    return () => window.clearInterval(slider);
  }, [heroImages.length, showHeroContent]);

  useEffect(() => {
    if (!showHeroContent) {
      setShowHeroCopy(false);
      setShowHeroActions(false);
      return;
    }

    const copyTimer = window.setTimeout(() => setShowHeroCopy(true), HERO_COPY_DELAY_MS);
    const ctaTimer = window.setTimeout(() => setShowHeroActions(true), HERO_CTA_DELAY_MS);

    return () => {
      window.clearTimeout(copyTimer);
      window.clearTimeout(ctaTimer);
    };
  }, [showHeroContent]);

  useEffect(() => {
    if (!showHeroContent) {
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
  }, [showHeroContent]);

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

      {showHeroContent ? <Header hidden={headerHidden} /> : null}

      <main className="pb-28">
        <section className="relative min-h-[100svh] overflow-hidden">
          {heroImages.map((src, index) => (
            <img
              key={src}
              src={src}
              alt="알래스카 대표 풍경"
              loading={index === 0 ? "eager" : "lazy"}
              className={`absolute inset-0 h-full w-full object-cover transition-opacity ${
                showHeroContent ? "duration-1000" : "duration-500"
              } ${heroIndex === index ? "opacity-100" : "opacity-0"}`}
            />
          ))}

          <div
            className={`absolute inset-0 transition-all [transition-duration:1800ms] ease-out ${showHeroContent ? "opacity-100" : "opacity-80"}`}
            style={{ background: "var(--gradient-hero)" }}
          />

          <div className="relative mx-auto flex min-h-[100svh] w-full max-w-5xl flex-col justify-end px-4 pb-16 pt-24">
            <div className="max-w-lg space-y-3">
              <p
                className={`inline-flex rounded-full border border-white/30 bg-black/30 px-3 py-1 text-[16px] font-semibold text-white transition-all [transition-duration:1200ms] [transition-timing-function:cubic-bezier(0.22,1,0.36,1)] ${
                  showHeroCopy ? "translate-y-0 opacity-100 blur-0" : "translate-y-4 opacity-0 blur-[2px]"
                }`}
              >
                도시어부 촬영지 · 12명 프리미엄 소그룹
              </p>
              <h1
                className={`font-brand text-[34px] font-semibold leading-tight text-white transition-all [transition-duration:1350ms] [transition-delay:120ms] [transition-timing-function:cubic-bezier(0.22,1,0.36,1)] sm:text-[40px] ${
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
                className={`grid grid-cols-1 gap-2 transition-all [transition-duration:1200ms] [transition-delay:360ms] [transition-timing-function:cubic-bezier(0.22,1,0.36,1)] sm:grid-cols-2 ${
                  showHeroActions ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0 pointer-events-none"
                }`}
              >
                <button
                  type="button"
                  onClick={() => setShowHeroCallSheet(true)}
                  className="inline-flex min-h-[54px] items-center justify-center gap-2 rounded-2xl bg-accent px-4 text-[17px] font-bold text-primary shadow-gold"
                >
                  <PhoneCall className="h-5 w-5" />
                  상담 전화하기
                </button>
                <Link
                  to="/summer-itinerary"
                  className="inline-flex min-h-[54px] items-center justify-center gap-2 rounded-2xl border border-white/55 bg-black/20 px-4 text-[17px] font-semibold text-white"
                >
                  알래스카 여행 일정
                  <ArrowRight className="h-5 w-5" />
                </Link>
              </div>
            </div>
          </div>
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
                  <img src={story.image} alt={story.title} loading="lazy" className="h-56 w-full object-cover" />
                </button>
                <div className="space-y-1 px-4 py-4">
                  <h3 className="text-[23px] font-semibold leading-tight">{story.title}</h3>
                  <p className="text-[16px] text-foreground/80">{story.subtitle}</p>
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
            <p className="text-[16px] text-foreground/80">원하는 장면을 충분히 보셨다면, 지금 가능한 좌석부터 먼저 확인해보세요.</p>
            <div className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-2">
              <a
                href={`tel:${contacts[0].tel}`}
                className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-xl bg-primary px-4 text-[16px] font-semibold text-white"
              >
                <PhoneCall className="h-4 w-4" />
                엄태인 대표 연결
              </a>
              <a
                href={`tel:${contacts[1].tel}`}
                className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-xl bg-accent px-4 text-[16px] font-bold text-primary"
              >
                <PhoneCall className="h-4 w-4" />
                정수미 대표 연결
              </a>
            </div>
          </div>
        </section>

        <section id="wow-points" className="mx-auto mt-10 w-full max-w-5xl px-4">
          <div className="mb-4 flex items-end justify-between gap-4">
            <h2 className="font-brand text-[30px] font-semibold leading-tight">결정을 당기는 하이라이트</h2>
            <p className="text-[16px] text-muted-foreground">상담 전환이 높은 장면만 추렸습니다</p>
          </div>

          <div className="grid gap-3">
            {wowPoints.map((point) => (
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
            <p className="text-[16px] text-white/80">확정 상품</p>
            <h2 className="mt-1 font-brand text-[31px] font-semibold leading-tight">{summerSummary.title}</h2>
            <p className="mt-3 text-[17px] font-semibold text-accent">{summerSummary.period}</p>
            <p className="mt-1 text-[23px] font-bold">{summerSummary.price}</p>
            <div className="mt-5 grid grid-cols-1 gap-2 sm:grid-cols-2">
              <a
                href={`tel:${contacts[0].tel}`}
                className="inline-flex min-h-[52px] items-center justify-center gap-2 rounded-xl bg-accent px-4 text-[17px] font-bold text-primary"
              >
                <PhoneCall className="h-5 w-5" />
                {"\uC5C4\uD0DC\uC778 \uB300\uD45C \uC0C1\uB2F4"}
              </a>
              <a
                href={`tel:${contacts[1].tel}`}
                className="inline-flex min-h-[52px] items-center justify-center gap-2 rounded-xl border border-white/40 px-4 text-[17px] font-semibold"
              >
                <PhoneCall className="h-5 w-5" />
                {"\uC815\uC218\uBBF8 \uB300\uD45C \uC0C1\uB2F4"}
              </a>
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
                      className="inline-flex min-h-[48px] items-center rounded-xl border border-primary/30 px-4 text-[16px] font-semibold text-primary"
                    >
                      오픈 알림 상담
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
            <h2 className="font-brand text-[30px] font-semibold leading-tight">전화 한 통으로 상담 시작</h2>
            <p className="mt-2 text-[16px] text-foreground/80">짧게 물어보셔도 됩니다. 가능한 일정과 항공을 바로 확인해드립니다.</p>
            <div className="mt-5 grid gap-2">
              {contacts.map((contact) => (
                <a
                  key={contact.tel}
                  href={`tel:${contact.tel}`}
                  className="inline-flex min-h-[52px] items-center justify-between rounded-xl bg-white px-4 text-[17px] font-bold text-primary shadow-card"
                >
                  <span>{contact.role}</span>
                  <span>{contact.phone}</span>
                </a>
              ))}
            </div>
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
                  className="inline-flex min-h-[52px] items-center justify-between rounded-xl bg-primary px-4 text-[17px] font-bold text-white"
                >
                  <span>{contact.name}</span>
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
                        갤러리로 돌아가기
                      </button>
                      <Link
                        to="/summer-itinerary"
                        onClick={() => setSelectedPhotoId(null)}
                        className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-xl bg-accent px-4 text-[16px] font-bold text-primary"
                      >
                        여름 확정 일정 보기
                        <ArrowRight className="h-4 w-4" />
                      </Link>
                    </div>
                  </div>
                </article>
              );
            })}

            <article className="shorts-frame relative flex h-[100svh] snap-start items-end overflow-hidden bg-[radial-gradient(circle_at_20%_20%,#1f3f66,transparent_45%),radial-gradient(circle_at_85%_75%,#cf9f45,transparent_35%),#0b1420]">
              <div className="mx-auto w-full max-w-3xl space-y-4 px-4 pb-[calc(env(safe-area-inset-bottom)+26px)]">
                <p className="wow-ribbon">마지막 장면</p>
                <h3 className="font-brand text-[33px] font-semibold leading-tight text-white">끝까지 보셨습니다. 지금 전화로 자리부터 확인하세요.</h3>
                <p className="text-[16px] text-white/85">출발 가능 좌석과 항공을 실시간으로 확인해드리겠습니다.</p>

                <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                  <a
                    href={`tel:${contacts[0].tel}`}
                    className="inline-flex min-h-[52px] items-center justify-center gap-2 rounded-xl bg-white px-4 text-[16px] font-bold text-primary"
                  >
                    <PhoneCall className="h-5 w-5" />
                    엄태인 대표 연결
                  </a>
                  <a
                    href={`tel:${contacts[1].tel}`}
                    className="inline-flex min-h-[52px] items-center justify-center gap-2 rounded-xl bg-accent px-4 text-[16px] font-bold text-primary"
                  >
                    <PhoneCall className="h-5 w-5" />
                    정수미 대표 연결
                  </a>
                </div>

                <button
                  type="button"
                  onClick={() => setSelectedPhotoId(null)}
                  className="inline-flex min-h-[48px] items-center justify-center rounded-xl border border-white/40 px-4 text-[16px] font-semibold text-white"
                >
                  숏폼 닫고 홈페이지 계속 보기
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
      {showHeroContent ? <FloatingCallButton /> : null}
    </div>
  );
};

export default Index;
