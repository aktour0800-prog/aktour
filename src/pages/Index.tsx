import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowDown, ArrowRight, CalendarDays, PhoneCall, Sparkles, X } from "lucide-react";

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
} from "@/data/summerCampaignData";

const HERO_REVEAL_MS = 1700;

const Index = () => {
  const [showHeroContent, setShowHeroContent] = useState(false);
  const [heroIndex, setHeroIndex] = useState(0);
  const [activeSeason, setActiveSeason] = useState<GallerySeasonKey>("summer");
  const [activeSummerDay, setActiveSummerDay] = useState<number | "all">("all");
  const [selectedPhotoId, setSelectedPhotoId] = useState<string | null>(null);
  const [selectedTasteKey, setSelectedTasteKey] = useState(tasteMatches[0].key);
  const [shortsIndex, setShortsIndex] = useState(0);

  const shortsFeedRef = useRef<HTMLDivElement | null>(null);

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

  const orderedGalleryForShorts = useMemo(() => {
    if (!selectedPhotoId) {
      return [];
    }

    const startIndex = filteredGallery.findIndex((photo) => photo.id === selectedPhotoId);
    if (startIndex < 0) {
      return [];
    }

    return [...filteredGallery.slice(startIndex), ...filteredGallery.slice(0, startIndex)];
  }, [filteredGallery, selectedPhotoId]);

  const shortsStepCount = orderedGalleryForShorts.length + 1;
  const shortsProgress = shortsStepCount > 0 ? Math.min(100, Math.round(((shortsIndex + 1) / shortsStepCount) * 100)) : 0;

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
    const slider = window.setInterval(() => {
      setHeroIndex((prev) => (prev + 1) % heroImages.length);
    }, 4700);

    return () => window.clearInterval(slider);
  }, [heroImages.length]);

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
    if (!selectedPhotoId) {
      setShortsIndex(0);
      return;
    }

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const scrollRoot = shortsFeedRef.current;
    if (scrollRoot) {
      scrollRoot.scrollTo({ top: 0, left: 0, behavior: "auto" });
    }

    const handleKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setSelectedPhotoId(null);
      }

      if (event.key === "ArrowDown" || event.key === "PageDown") {
        shortsFeedRef.current?.scrollBy({ top: window.innerHeight * 0.92, behavior: "smooth" });
      }

      if (event.key === "ArrowUp" || event.key === "PageUp") {
        shortsFeedRef.current?.scrollBy({ top: -window.innerHeight * 0.92, behavior: "smooth" });
      }
    };

    window.addEventListener("keydown", handleKey);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", handleKey);
    };
  }, [selectedPhotoId]);

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
        title="알래스카 프리미엄 8박9일 | 50대 맞춤 소그룹"
        description="사진으로 먼저 설레고, 일정으로 확신하는 알래스카 여름 8박9일. 2026년 7월 출발 확정, 1인 9,500,000원(12명 기준)."
        path="/"
        image="/alaska-mobile/hero-1.webp"
        keywords="알래스카 여행, 알래스카 8박9일, 알래스카 여름 일정, 도시어부 촬영지, 프리미엄 소그룹"
        jsonLd={jsonLd}
      />

      {showHeroContent ? <Header /> : null}

      <main className="pb-28">
        <section className="relative min-h-[100svh] overflow-hidden">
          {heroImages.map((src, index) => (
            <img
              key={src}
              src={src}
              alt="알래스카 대표 풍경"
              loading={index === 0 ? "eager" : "lazy"}
              className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 ${
                heroIndex === index ? "opacity-100" : "opacity-0"
              }`}
            />
          ))}

          <div
            className={`absolute inset-0 transition-all duration-700 ${showHeroContent ? "opacity-100" : "opacity-95"}`}
            style={{ background: "var(--gradient-hero)" }}
          />

          <div className="relative mx-auto flex min-h-[100svh] w-full max-w-5xl flex-col justify-end px-4 pb-16 pt-24">
            <div
              className={`max-w-lg space-y-3 transition-all duration-700 ${
                showHeroContent ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
              }`}
            >
              <p className="inline-flex rounded-full border border-white/30 bg-black/30 px-3 py-1 text-[16px] font-semibold text-white">
                도시어부 촬영지 · 12명 프리미엄 소그룹
              </p>
              <h1 className="font-brand text-[34px] font-semibold leading-tight text-white sm:text-[40px]">
                사진을 보면,
                <br />
                마음이 먼저 출발합니다
              </h1>
              <p className="text-[17px] font-medium text-white/95">2026년 7월 단 1회 확정 · 8박 9일</p>

              <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                <a
                  href={`tel:${contacts[0].tel}`}
                  className="inline-flex min-h-[54px] items-center justify-center gap-2 rounded-2xl bg-accent px-4 text-[17px] font-bold text-primary shadow-gold"
                >
                  <PhoneCall className="h-5 w-5" />
                  엄태인 대표 상담
                </a>
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
                <img src={story.image} alt={story.title} loading="lazy" className="h-56 w-full object-cover" />
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
            <img src={selectedTaste.image} alt={selectedTaste.label} className="h-56 w-full object-cover" loading="lazy" />
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
              <p className="text-[16px] text-foreground/80">사진을 누르면 풀스크린으로 아래로 넘겨 연속 감상할 수 있습니다.</p>
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
                  className={`inline-flex min-h-[46px] items-center rounded-full border px-4 text-[16px] font-semibold transition-all ${
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
                    className={`inline-flex min-h-[44px] items-center rounded-full border px-3 text-[16px] font-semibold transition-all ${
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
                <img src={point.image} alt={point.title} loading="lazy" className="h-56 w-full object-cover" />
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
              <Link
                to="/summer-itinerary"
                className="inline-flex min-h-[52px] items-center justify-center gap-2 rounded-xl bg-accent px-4 text-[17px] font-bold text-primary"
              >
                <CalendarDays className="h-5 w-5" />
                여름 일정 상세
              </Link>
              <a
                href={`tel:${contacts[1].tel}`}
                className="inline-flex min-h-[52px] items-center justify-center gap-2 rounded-xl border border-white/40 px-4 text-[17px] font-semibold"
              >
                정수미 대표 상담
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
                  <img src={season.image} alt={`${season.title} 대표 이미지`} loading="lazy" className="h-44 w-full object-cover" />
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

      {selectedPhotoId ? (
        <div className="shorts-overlay fixed inset-0 z-[70] bg-black/90" role="dialog" aria-modal="true">
          <div className="pointer-events-none absolute inset-x-0 top-0 z-20 px-3 pt-[calc(env(safe-area-inset-top)+8px)]">
            <div className="mx-auto max-w-3xl">
              <div className="pointer-events-auto flex items-center justify-between rounded-2xl border border-white/20 bg-black/55 px-3 py-2 backdrop-blur">
                <div>
                  <p className="text-[16px] font-semibold text-white">알래스카 숏폼 갤러리</p>
                  <p className="text-[16px] text-white/75">{Math.min(shortsIndex + 1, shortsStepCount)} / {shortsStepCount}</p>
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

          <div ref={shortsFeedRef} className="shorts-feed h-[100svh] overflow-y-auto snap-y snap-mandatory">
            {orderedGalleryForShorts.map((photo, index) => (
              <article key={`short-${photo.id}`} className="shorts-frame relative h-[100svh] snap-start overflow-hidden">
                <img src={photo.image} alt={photo.title} className="h-full w-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-b from-black/25 via-black/35 to-black/78" />

                <div className="absolute inset-x-0 bottom-0 mx-auto w-full max-w-3xl space-y-3 px-4 pb-[calc(env(safe-area-inset-bottom)+22px)]">
                  <p className="wow-ribbon">{photo.dayLabel} · {photo.spot}</p>
                  <h3 className="font-brand text-[30px] font-semibold leading-tight text-white">{photo.title}</h3>
                  <p className="text-[16px] text-white/85">실제 보유 이미지 기반 숏폼 장면입니다.</p>

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

                  {index < orderedGalleryForShorts.length - 1 ? (
                    <p className="inline-flex items-center gap-1 rounded-full bg-white/15 px-3 py-1 text-[16px] font-medium text-white">
                      <ArrowDown className="h-4 w-4" /> 아래로 넘기면 다음 장면
                    </p>
                  ) : (
                    <p className="inline-flex items-center gap-1 rounded-full bg-white/15 px-3 py-1 text-[16px] font-medium text-white">
                      마지막 장면 다음에 상담 CTA가 열립니다
                    </p>
                  )}
                </div>
              </article>
            ))}

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

      <Footer />
      {showHeroContent ? <FloatingCallButton /> : null}
    </div>
  );
};

export default Index;
