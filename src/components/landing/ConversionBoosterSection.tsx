import { FormEvent, useEffect, useMemo, useState } from "react";
import { CalendarDays, CheckCircle2, Clock3, Flame, Heart, PhoneCall, X } from "lucide-react";

import {
  contacts,
  designEvidence,
  seasonalWaitlistOptions,
  summerCampaignClock,
} from "@/data/summerCampaignData";

type WaitlistSeasonKey = "fall" | "winter";

interface WaitlistEntry {
  season: WaitlistSeasonKey;
  name: string;
  phone: string;
  createdAt: string;
}

interface WaitlistState {
  likedSeason: WaitlistSeasonKey | null;
  entries: WaitlistEntry[];
}

const WAITLIST_STORAGE_KEY = "alaska_waitlist_v1";

const createDefaultWaitlistState = (): WaitlistState => ({
  likedSeason: null,
  entries: [],
});

const loadWaitlistState = (): WaitlistState => {
  if (typeof window === "undefined") {
    return createDefaultWaitlistState();
  }

  try {
    const raw = window.localStorage.getItem(WAITLIST_STORAGE_KEY);
    if (!raw) {
      return createDefaultWaitlistState();
    }

    const parsed = JSON.parse(raw) as {
      likedSeason?: WaitlistSeasonKey;
      liked?: Partial<Record<WaitlistSeasonKey, boolean>>;
      entries?: WaitlistEntry[];
    };

    const likedSeason: WaitlistSeasonKey | null =
      parsed.likedSeason === "fall" || parsed.likedSeason === "winter"
        ? parsed.likedSeason
        : parsed.liked?.fall
          ? "fall"
          : parsed.liked?.winter
            ? "winter"
            : null;

    return {
      likedSeason,
      entries: Array.isArray(parsed.entries)
        ? parsed.entries.filter(
            (entry): entry is WaitlistEntry =>
              Boolean(entry) &&
              (entry.season === "fall" || entry.season === "winter") &&
              typeof entry.phone === "string",
          )
        : [],
    };
  } catch {
    return createDefaultWaitlistState();
  }
};

const ConversionBoosterSection = () => {
  const [now, setNow] = useState(() => new Date());
  const [waitlistState, setWaitlistState] = useState<WaitlistState>(() => loadWaitlistState());
  const [waitlistTarget, setWaitlistTarget] = useState<WaitlistSeasonKey | null>(null);
  const [waitlistName, setWaitlistName] = useState("");
  const [waitlistPhone, setWaitlistPhone] = useState("");
  const [waitlistFeedback, setWaitlistFeedback] = useState<{ type: "idle" | "error" | "success"; message: string }>({
    type: "idle",
    message: "",
  });

  const departureAt = useMemo(() => new Date(summerCampaignClock.departureAt), []);
  const recruitmentOpenAt = useMemo(() => new Date(summerCampaignClock.recruitmentOpenAt), []);

  const dDay = useMemo(() => {
    const msPerDay = 1000 * 60 * 60 * 24;
    return Math.ceil((departureAt.getTime() - now.getTime()) / msPerDay);
  }, [departureAt, now]);

  const dDayLabel = dDay > 0 ? `D-${dDay}` : dDay === 0 ? "D-DAY" : "출발 이후";

  const recruitmentProgress = useMemo(() => {
    const total = departureAt.getTime() - recruitmentOpenAt.getTime();
    if (total <= 0) {
      return 100;
    }

    const elapsed = Math.min(Math.max(now.getTime() - recruitmentOpenAt.getTime(), 0), total);
    return Math.round((elapsed / total) * 100);
  }, [departureAt, recruitmentOpenAt, now]);

  const selectedLikeSeason = useMemo(
    () => seasonalWaitlistOptions.find((item) => item.key === waitlistState.likedSeason) ?? null,
    [waitlistState.likedSeason],
  );

  useEffect(() => {
    const timer = window.setInterval(() => setNow(new Date()), 60_000);
    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    window.localStorage.setItem(WAITLIST_STORAGE_KEY, JSON.stringify(waitlistState));
  }, [waitlistState]);

  const handleWaitlistLike = (season: WaitlistSeasonKey) => {
    setWaitlistState((prev) => {
      if (prev.likedSeason) {
        return prev;
      }

      return {
        ...prev,
        likedSeason: season,
      };
    });
  };

  const openWaitlistModal = (season: WaitlistSeasonKey) => {
    setWaitlistTarget(season);
    setWaitlistName("");
    setWaitlistPhone("");
    setWaitlistFeedback({ type: "idle", message: "" });
  };

  const closeWaitlistModal = () => {
    setWaitlistTarget(null);
    setWaitlistFeedback({ type: "idle", message: "" });
  };

  const submitWaitlist = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!waitlistTarget) {
      return;
    }

    const name = waitlistName.trim();
    const phone = waitlistPhone.replace(/\D/g, "");

    if (name.length < 2) {
      setWaitlistFeedback({ type: "error", message: "이름을 2글자 이상 입력해주세요." });
      return;
    }

    if (phone.length < 10 || phone.length > 11) {
      setWaitlistFeedback({ type: "error", message: "휴대폰 번호를 정확히 입력해주세요." });
      return;
    }

    const existing = waitlistState.entries.find((entry) => entry.phone === phone);
    if (existing) {
      const existingSeason = seasonalWaitlistOptions.find((option) => option.key === existing.season);
      setWaitlistFeedback({
        type: "error",
        message: `이 번호는 이미 ${existingSeason?.title ?? existing.season}으로 등록되었습니다.`,
      });
      return;
    }

    const nextEntry: WaitlistEntry = {
      season: waitlistTarget,
      name,
      phone,
      createdAt: new Date().toISOString(),
    };

    setWaitlistState((prev) => ({
      likedSeason: prev.likedSeason ?? waitlistTarget,
      entries: [...prev.entries, nextEntry],
    }));

    setWaitlistFeedback({ type: "success", message: "대기 등록이 완료되었습니다. 오픈 시 우선 안내해드립니다." });
  };

  return (
    <>
      <section className="mx-auto mt-8 w-full max-w-5xl px-4">
        <div className="deadline-card space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <p className="deadline-chip">
              <Flame className="h-4 w-4" />
              정원 {summerCampaignClock.capacity}명 한정
            </p>
            <p className="inline-flex items-center gap-1 rounded-full bg-white/20 px-3 py-1 text-[16px] font-bold text-white">
              <Clock3 className="h-4 w-4" />
              {dDayLabel}
            </p>
          </div>

          <h2 className="font-brand text-[30px] font-semibold leading-tight text-white">여름 출발 카운트다운 진행 중</h2>
          <p className="text-[16px] text-white/85">모집 한도 12명으로 운영하며, 상담 순서 기준으로 마감됩니다.</p>

          <div className="h-2 overflow-hidden rounded-full bg-white/25">
            <span
              className="block h-full rounded-full bg-accent transition-all duration-500"
              style={{ width: `${recruitmentProgress}%` }}
            />
          </div>
          <p className="text-[16px] text-white/80">모집 기간 진행률 {recruitmentProgress}% · 늦을수록 항공 선택폭이 줄어듭니다.</p>

          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
            <a
              href={`tel:${contacts[0].tel}`}
              className="cta-pulse inline-flex min-h-[52px] items-center justify-center gap-2 rounded-xl bg-accent px-4 text-[16px] font-bold text-primary"
            >
              <PhoneCall className="h-5 w-5" />
              좌석 가능 여부 지금 확인
            </a>
            <a
              href={`tel:${contacts[1].tel}`}
              className="inline-flex min-h-[52px] items-center justify-center gap-2 rounded-xl border border-white/35 px-4 text-[16px] font-semibold text-white"
            >
              일정 담당 빠른 연결
            </a>
          </div>
        </div>
      </section>

      <section className="mx-auto mt-10 w-full max-w-5xl px-4">
        <div className="mb-4 flex items-end justify-between gap-4">
          <h2 className="font-brand text-[30px] font-semibold leading-tight">설계 근거</h2>
          <p className="text-[16px] text-muted-foreground">국내 사용성이 검증된 패턴 기반</p>
        </div>

        <div className="grid gap-3">
          {designEvidence.map((item) => (
            <article key={item.title} className="evidence-card">
              <p className="text-[16px] font-semibold text-primary">벤치마크: {item.benchmark}</p>
              <h3 className="mt-1 text-[23px] font-semibold leading-tight">{item.title}</h3>
              <p className="mt-2 text-[16px] text-foreground/80">{item.reason}</p>
              <p className="mt-2 text-[16px] font-semibold text-primary/85">적용: {item.appliedPattern}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto mt-10 w-full max-w-5xl px-4">
        <div className="mb-4 flex items-end justify-between gap-4">
          <h2 className="font-brand text-[30px] font-semibold leading-tight">가을/겨울 대기 리스트</h2>
          <p className="text-[16px] text-muted-foreground">좋아요는 기기 기준 1회 · 대기 신청은 번호 기준 1회</p>
        </div>

        {selectedLikeSeason ? (
          <p className="mb-3 rounded-2xl border border-primary/15 bg-primary/5 px-4 py-3 text-[16px] text-primary">
            현재 좋아요 선택: <strong>{selectedLikeSeason.title}</strong>
          </p>
        ) : null}

        <div className="grid gap-4">
          {seasonalWaitlistOptions.map((season) => {
            const liked = waitlistState.likedSeason === season.key;
            const likeLocked = Boolean(waitlistState.likedSeason) && !liked;
            const localCount = waitlistState.entries.filter((entry) => entry.season === season.key).length;

            return (
              <article key={season.key} className="waitlist-card">
                <img src={season.image} alt={season.title} loading="lazy" className="h-48 w-full object-cover" />
                <div className="space-y-2 p-5">
                  <h3 className="text-[24px] font-semibold leading-tight">{season.title}</h3>
                  <p className="text-[16px] text-foreground/80">{season.subtitle}</p>
                  <p className="text-[16px] font-semibold text-primary">{season.openPlan}</p>
                  <p className="text-[16px] text-muted-foreground">근거: {season.benchmarkNote}</p>
                  <p className="text-[16px] text-muted-foreground">현재 기기 등록 수: {localCount}</p>

                  <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                    <button
                      type="button"
                      onClick={() => handleWaitlistLike(season.key)}
                      disabled={liked || likeLocked}
                      className={`inline-flex min-h-[48px] items-center justify-center gap-2 rounded-xl border px-4 text-[16px] font-semibold ${
                        liked
                          ? "border-primary/20 bg-primary/10 text-primary"
                          : likeLocked
                            ? "border-border bg-secondary text-muted-foreground"
                            : "border-primary/30 bg-white text-primary"
                      }`}
                    >
                      {liked ? <CheckCircle2 className="h-5 w-5" /> : <Heart className="h-5 w-5" />}
                      {liked ? "내 선택 완료" : likeLocked ? "다른 시즌 선택 완료" : "좋아요 1회"}
                    </button>

                    <button
                      type="button"
                      onClick={() => openWaitlistModal(season.key)}
                      className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-xl bg-primary px-4 text-[16px] font-semibold text-white"
                    >
                      <CalendarDays className="h-5 w-5" />
                      대기 신청
                    </button>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      {waitlistTarget ? (
        <div className="fixed inset-0 z-[80] flex items-center justify-center bg-black/65 px-4" role="dialog" aria-modal="true">
          <div className="w-full max-w-xl overflow-hidden rounded-3xl border bg-white shadow-elegant">
            <div className="flex items-start justify-between border-b px-5 py-4">
              <div>
                <p className="text-[16px] font-semibold text-primary">가을/겨울 우선 오픈 대기</p>
                <h3 className="font-brand text-[26px] font-semibold leading-tight">
                  {seasonalWaitlistOptions.find((option) => option.key === waitlistTarget)?.title}
                </h3>
              </div>
              <button
                type="button"
                onClick={closeWaitlistModal}
                className="inline-flex h-11 w-11 items-center justify-center rounded-full border"
                aria-label="대기 신청 닫기"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="space-y-3 px-5 py-4">
              <p className="text-[16px] text-foreground/80">전화번호 기준 1회만 등록됩니다. 오픈 시 우선 안내해드립니다.</p>

              <form onSubmit={submitWaitlist} className="space-y-2">
                <input
                  value={waitlistName}
                  onChange={(event) => setWaitlistName(event.target.value)}
                  placeholder="이름"
                  className="w-full rounded-xl border px-4 py-3 text-[16px]"
                />
                <input
                  value={waitlistPhone}
                  onChange={(event) => setWaitlistPhone(event.target.value)}
                  inputMode="tel"
                  placeholder="휴대폰 번호 (숫자만)"
                  className="w-full rounded-xl border px-4 py-3 text-[16px]"
                />

                <button
                  type="submit"
                  className="inline-flex min-h-[50px] w-full items-center justify-center rounded-xl bg-primary px-4 text-[16px] font-semibold text-white"
                >
                  대기 등록하기
                </button>
              </form>

              {waitlistFeedback.type !== "idle" ? (
                <p
                  className={`rounded-xl px-3 py-2 text-[16px] ${
                    waitlistFeedback.type === "error"
                      ? "bg-red-50 text-red-600"
                      : "bg-primary/10 text-primary"
                  }`}
                >
                  {waitlistFeedback.message}
                </p>
              ) : null}

              {waitlistFeedback.type === "success" ? (
                <a
                  href={`tel:${contacts[1].tel}`}
                  className="inline-flex min-h-[50px] w-full items-center justify-center gap-2 rounded-xl bg-accent px-4 text-[16px] font-bold text-primary"
                >
                  <PhoneCall className="h-5 w-5" />
                  담당자 전화로 바로 연결
                </a>
              ) : null}
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default ConversionBoosterSection;

