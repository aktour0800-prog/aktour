import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, CalendarDays, PhoneCall } from "lucide-react";

import Header from "@/components/landing/Header";
import Footer from "@/components/landing/Footer";
import FloatingCallButton from "@/components/landing/FloatingCallButton";
import SeoHead from "@/components/seo/SeoHead";
import {
  contacts,
  faqItems,
  seasonCards,
  storyCards,
  summerSummary,
  trustMetrics,
} from "@/data/summerCampaignData";

const HERO_REVEAL_MS = 1700;

const Index = () => {
  const [showHeroContent, setShowHeroContent] = useState(false);
  const [heroIndex, setHeroIndex] = useState(0);

  const heroImages = [
    "/alaska-mobile/hero-1.webp",
    "/alaska-mobile/hero-2.webp",
    "/alaska-mobile/hero-3.webp",
  ];

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
    }, 4200);
    return () => window.clearInterval(slider);
  }, [heroImages.length]);

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
        <section className="relative min-h-screen overflow-hidden">
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
            className={`absolute inset-0 bg-gradient-to-b transition-all duration-700 ${
              showHeroContent
                ? "from-black/30 via-black/35 to-black/70 opacity-100"
                : "from-black/5 via-black/10 to-black/25 opacity-90"
            }`}
          />

          <div className="relative mx-auto flex min-h-[78vh] w-full max-w-5xl flex-col justify-end px-4 pb-12">
            <div
              className={`max-w-xl space-y-5 rounded-2xl border border-white/20 bg-black/35 p-6 backdrop-blur-sm transition-all duration-700 ${
                showHeroContent ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
              }`}
            >
              <p className="text-[18px] font-semibold text-accent">50대 이상 프리미엄 소그룹</p>
              <h1 className="text-[34px] font-bold leading-tight text-white">
                지금, 알래스카를
                <br />
                가장 편하게 만나는 방법
              </h1>
              <p className="text-[16px] leading-relaxed text-white/90">
                2026년 7월 단 1회 확정.
                <br />
                8박 9일, 12명 프리미엄 소그룹.
              </p>
              <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                <a
                  href={`tel:${contacts[0].tel}`}
                  className="inline-flex min-h-[52px] items-center justify-center gap-2 rounded-xl bg-accent px-4 text-[17px] font-bold text-primary"
                >
                  <PhoneCall className="h-5 w-5" />
                  지금 상담 전화
                </a>
                <Link
                  to="/summer-itinerary"
                  className="inline-flex min-h-[52px] items-center justify-center gap-2 rounded-xl border border-white/40 px-4 text-[17px] font-semibold text-white"
                >
                  확정 일정 보기
                  <ArrowRight className="h-5 w-5" />
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto mt-6 grid w-full max-w-5xl gap-3 px-4">
          {trustMetrics.map((metric) => (
            <article key={metric.title} className="rounded-2xl border bg-card p-5 shadow-card">
              <p className="text-[16px] font-semibold text-muted-foreground">{metric.title}</p>
              <p className="mt-1 text-[30px] font-bold text-primary">{metric.value}</p>
              <p className="mt-1 text-[16px] text-foreground/80">{metric.description}</p>
            </article>
          ))}
        </section>

        <section id="summer-highlights" className="mx-auto mt-10 w-full max-w-5xl px-4">
          <div className="mb-5 flex items-end justify-between">
            <h2 className="text-[28px] font-bold leading-tight">여름 하이라이트 포토 스토리</h2>
            <Link to="/summer-itinerary" className="text-[16px] font-semibold text-primary underline-offset-4 hover:underline">
              전체 일정
            </Link>
          </div>

          <div className="grid gap-4">
            {storyCards.map((story) => (
              <article key={story.title} className="overflow-hidden rounded-2xl border bg-white shadow-card">
                <img
                  src={story.image}
                  alt={story.title}
                  loading="lazy"
                  className="h-64 w-full object-cover"
                />
                <div className="space-y-2 p-5">
                  <h3 className="text-[24px] font-bold">{story.title}</h3>
                  <p className="text-[16px] text-foreground/80">{story.subtitle}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="mx-auto mt-10 w-full max-w-5xl px-4">
          <div className="rounded-3xl border bg-primary px-5 py-6 text-white shadow-elegant">
            <p className="text-[16px] text-white/80">확정 상품</p>
            <h2 className="mt-1 text-[30px] font-bold leading-tight">{summerSummary.title}</h2>
            <p className="mt-3 text-[17px] font-semibold text-accent">{summerSummary.period}</p>
            <p className="mt-1 text-[22px] font-bold">{summerSummary.price}</p>
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
                일정 상담 전화
              </a>
            </div>
          </div>
        </section>

        <section id="season-status" className="mx-auto mt-10 w-full max-w-5xl px-4">
          <h2 className="mb-4 text-[28px] font-bold leading-tight">시즌 공개 상태</h2>
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
                  <h3 className="text-[22px] font-bold">{season.title}</h3>
                  <p className="text-[16px] text-foreground/80">{season.summary}</p>
                  {season.status === "open" ? (
                    <Link to="/summer-itinerary" className="inline-flex min-h-[48px] items-center rounded-xl bg-primary px-4 text-[16px] font-semibold text-white">
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
          <h2 className="mb-4 text-[28px] font-bold leading-tight">자주 묻는 질문</h2>
          <div className="space-y-3">
            {faqItems.map((faq) => (
              <details key={faq.question} className="rounded-2xl border bg-white p-5 shadow-card">
                <summary className="cursor-pointer text-[17px] font-semibold">{faq.question}</summary>
                <p className="mt-3 text-[16px] leading-relaxed text-foreground/80">{faq.answer}</p>
              </details>
            ))}
          </div>
        </section>

        <section className="mx-auto mt-10 w-full max-w-5xl px-4">
          <div className="rounded-3xl border bg-secondary px-5 py-6">
            <h2 className="text-[28px] font-bold leading-tight">전화 한 통으로 상담 시작</h2>
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

      <Footer />
      {showHeroContent ? <FloatingCallButton /> : null}
    </div>
  );
};

export default Index;

