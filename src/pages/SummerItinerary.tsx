import { useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import { CalendarDays, CheckCircle2, PhoneCall, PlaneTakeoff, ShieldCheck, XCircle } from "lucide-react";

import Header from "@/components/landing/Header";
import Footer from "@/components/landing/Footer";
import FloatingCallButton from "@/components/landing/FloatingCallButton";
import SeoHead from "@/components/seo/SeoHead";
import {
  contacts,
  dayPlans,
  excludes,
  faqItems,
  includes,
  summerSummary,
} from "@/data/summerCampaignData";

const SummerItinerary = () => {
  const jsonLd = useMemo(
    () => [
      {
        "@context": "https://schema.org",
        "@type": "TouristTrip",
        name: summerSummary.title,
        description: `${summerSummary.period}, ${summerSummary.price}`,
        itinerary: {
          "@type": "ItemList",
          itemListElement: dayPlans.map((day, index) => ({
            "@type": "ListItem",
            position: index + 1,
            name: `${day.day} ${day.route}`,
          })),
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
        mainEntity: faqItems.map((item) => ({
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

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });

    if (window.location.hash) {
      const cleanUrl = `${window.location.pathname}${window.location.search}`;
      window.history.replaceState(null, "", cleanUrl);
    }
  }, []);
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SeoHead
        title="여름 8박9일 상세 일정 | 알래스카 프리미엄"
        description="2026년 7월 15일~23일 출발 확정. Day1~Day9 상세 일정, 포함/불포함, 1인 9,500,000원(12명 기준)."
        path="/summer-itinerary"
        image="/alaska-mobile/hero-2.webp"
        keywords="알래스카 여름 일정, 알래스카 8박9일 상세, 알래스카 가격, 도시어부 호머"
        jsonLd={jsonLd}
      />

      <Header />

      <main className="pb-28 pt-24">
        <section className="mx-auto w-full max-w-5xl px-4">
          <div className="overflow-hidden rounded-3xl border bg-white shadow-card">
            <img
              src="/alaska-mobile/hero-2.webp"
              alt="알래스카 여름 대표 이미지"
              className="h-64 w-full object-cover"
              loading="eager"
            />
            <div className="space-y-3 p-5">
              <p className="text-[16px] font-semibold text-accent">여름 확정 상품</p>
              <h1 className="text-[32px] font-bold leading-tight">{summerSummary.title}</h1>
              <p className="text-[17px] font-semibold text-primary">{summerSummary.period}</p>
              <p className="text-[24px] font-bold">{summerSummary.price}</p>
              <p className="text-[16px] text-foreground/80">항공: {summerSummary.airline}</p>

              <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                <a
                  href={`tel:${contacts[0].tel}`}
                  className="inline-flex min-h-[52px] items-center justify-center gap-2 rounded-xl bg-accent px-4 text-[17px] font-bold text-primary"
                >
                  <PhoneCall className="h-5 w-5" />
                  {contacts[0].name}
                </a>
                <a
                  href={`tel:${contacts[1].tel}`}
                  className="inline-flex min-h-[52px] items-center justify-center gap-2 rounded-xl border border-primary/30 px-4 text-[17px] font-semibold text-primary"
                >
                  <CalendarDays className="h-5 w-5" />
                  {contacts[1].name}
                </a>
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto mt-6 grid w-full max-w-5xl gap-4 px-4 md:grid-cols-2">
          <article className="rounded-2xl border bg-white p-5 shadow-card">
            <h2 className="mb-3 flex items-center gap-2 text-[22px] font-bold">
              <ShieldCheck className="h-6 w-6 text-primary" />
              포함 사항
            </h2>
            <ul className="space-y-2">
              {includes.map((item) => (
                <li key={item} className="flex items-start gap-2 text-[16px]">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </article>

          <article className="rounded-2xl border bg-white p-5 shadow-card">
            <h2 className="mb-3 flex items-center gap-2 text-[22px] font-bold">
              <XCircle className="h-6 w-6 text-primary" />
              불포함 사항
            </h2>
            <ul className="space-y-2">
              {excludes.map((item) => (
                <li key={item} className="flex items-start gap-2 text-[16px]">
                  <XCircle className="mt-0.5 h-5 w-5 shrink-0 text-muted-foreground" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </article>
        </section>

        <section className="mx-auto mt-8 w-full max-w-5xl px-4">
          <h2 className="mb-4 text-[28px] font-bold">Day1 ~ Day9 상세 일정</h2>
          <div className="space-y-5">
            {dayPlans.map((day) => (
              <article id={`day-${day.day.replace(/\s+/g, "-").toLowerCase()}`} key={day.day} className="overflow-hidden rounded-2xl border bg-white shadow-card">
                <img src={day.image} alt={`${day.day} ${day.route}`} className="h-56 w-full object-cover" loading="lazy" />

                <div className="space-y-3 p-5">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <p className="rounded-lg bg-primary px-3 py-1 text-[16px] font-bold text-white">{day.day}</p>
                    <p className="text-[16px] font-semibold text-primary">{day.date}</p>
                  </div>

                  <h3 className="text-[24px] font-bold leading-tight">{day.route}</h3>
                  <p className="text-[16px] leading-relaxed text-foreground/80">{day.summary}</p>

                  <ul className="space-y-2">
                    {day.highlights.map((highlight) => (
                      <li key={highlight} className="flex items-start gap-2 text-[16px]">
                        <PlaneTakeoff className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
                        <span>{highlight}</span>
                      </li>
                    ))}
                  </ul>

                  <p className="text-[16px] font-semibold">식사: {day.meals}</p>

                  <div className="flex gap-2 overflow-x-auto pb-1">
                    {day.gallery.map((image, index) => (
                      <img
                        key={`${day.day}-${image}`}
                        src={image}
                        alt={`${day.day} 갤러리 ${index + 1}`}
                        loading="lazy"
                        className="h-24 w-36 flex-shrink-0 rounded-lg object-cover"
                      />
                    ))}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="mx-auto mt-8 w-full max-w-5xl px-4">
          <h2 className="mb-4 text-[28px] font-bold">여름 시즌 FAQ</h2>
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
          <div className="rounded-3xl border bg-primary px-5 py-6 text-white">
            <h2 className="text-[28px] font-bold leading-tight">일정이 맞는지 지금 확인해보세요</h2>
            <p className="mt-2 text-[16px] text-white/85">상담 시 항공 좌석/출발 가능 여부를 바로 확인해드립니다.</p>
            <div className="mt-5 grid gap-2">
              {contacts.map((contact) => (
                <a
                  key={contact.tel}
                  href={`tel:${contact.tel}`}
                  className="inline-flex min-h-[52px] items-center justify-between rounded-xl bg-white px-4 text-[17px] font-bold text-primary"
                >
                  <span>{contact.role}</span>
                  <span>{contact.phone}</span>
                </a>
              ))}
            </div>

            <Link
              to="/"
              className="mt-4 inline-flex min-h-[48px] items-center rounded-xl border border-white/40 px-4 text-[16px] font-semibold"
            >
              홈으로 돌아가기
            </Link>
          </div>
        </section>
      </main>

      <Footer />
      <FloatingCallButton />
    </div>
  );
};

export default SummerItinerary;

