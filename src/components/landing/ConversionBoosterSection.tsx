import { FormEvent, useEffect, useMemo, useState } from "react";
import { CalendarDays, CheckCircle2, Clock3, Flame, Heart, PhoneCall, X } from "lucide-react";

import {
  contacts,
  seasonLeadOptions,
  summerCampaignClock,
} from "@/data/summerCampaignData";

type WaitlistSeasonKey = "spring" | "fall" | "winter";

interface WaitlistEntry {
  season: WaitlistSeasonKey;
  name: string;
  phone: string;
  createdAt: string;
}

interface WaitlistState {
  liked: Record<WaitlistSeasonKey, boolean>;
  entries: WaitlistEntry[];
}

const WAITLIST_STORAGE_KEY = "alaska_waitlist_v2";

const createDefaultWaitlistState = (): WaitlistState => ({
  liked: {
    spring: false,
    fall: false,
    winter: false,
  },
  entries: [],
});

const loadWaitlistState = (): WaitlistState => {
  if (typeof window === "undefined") {
    return createDefaultWaitlistState();
  }

  const defaultState = createDefaultWaitlistState();

  try {
    const raw = window.localStorage.getItem(WAITLIST_STORAGE_KEY) ?? window.localStorage.getItem("alaska_waitlist_v1");
    if (!raw) {
      return defaultState;
    }

    const parsed = JSON.parse(raw) as {
      liked?: Partial<Record<WaitlistSeasonKey, boolean>>;
      likedSeason?: WaitlistSeasonKey;
      entries?: WaitlistEntry[];
    };

    if (parsed.likedSeason && (parsed.likedSeason === "spring" || parsed.likedSeason === "fall" || parsed.likedSeason === "winter")) {
      defaultState.liked[parsed.likedSeason] = true;
    }

    if (parsed.liked) {
      defaultState.liked.spring = Boolean(parsed.liked.spring);
      defaultState.liked.fall = Boolean(parsed.liked.fall);
      defaultState.liked.winter = Boolean(parsed.liked.winter);
    }

    defaultState.entries = Array.isArray(parsed.entries)
      ? parsed.entries.filter(
          (entry): entry is WaitlistEntry =>
            Boolean(entry) &&
            (entry.season === "spring" || entry.season === "fall" || entry.season === "winter") &&
            typeof entry.phone === "string",
        )
      : [];

    return defaultState;
  } catch {
    return defaultState;
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
      if (prev.liked[season]) {
        return prev;
      }

      return {
        ...prev,
        liked: {
          ...prev.liked,
          [season]: true,
        },
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

    const existingSeasonEntry = waitlistState.entries.find(
      (entry) => entry.phone === phone && entry.season === waitlistTarget,
    );

    if (existingSeasonEntry) {
      setWaitlistFeedback({
        type: "error",
        message: "이 번호는 이미 해당 시즌에 등록되어 있습니다.",
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
      liked: {
        ...prev.liked,
        [waitlistTarget]: true,
      },
      entries: [...prev.entries, nextEntry],
    }));

    setWaitlistFeedback({ type: "success", message: "대기 등록 완료. 시즌 오픈 즉시 우선 연락드리겠습니다." });
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
          <p className="text-[16px] text-white/85">상담 순서 기준으로 좌석이 마감됩니다. 전화로 즉시 가능 좌석을 확인하세요.</p>

          <div className="h-2 overflow-hidden rounded-full bg-white/25">
            <span
              className="block h-full rounded-full bg-accent transition-all duration-500"
              style={{ width: `${recruitmentProgress}%` }}
            />
          </div>
          <p className="text-[16px] text-white/80">모집 진행률 {recruitmentProgress}% · 늦을수록 항공 선택 폭이 줄어듭니다.</p>

          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
            <a
              href={`tel:${contacts[0].tel}`}
              className="cta-pulse inline-flex min-h-[52px] items-center justify-center gap-2 rounded-xl bg-accent px-4 text-[16px] font-bold text-primary"
            >
              <PhoneCall className="h-5 w-5" />
              여름 좌석 바로 확인
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
          <h2 className="font-brand text-[30px] font-semibold leading-tight">봄 · 가을 · 겨울 오픈 알림</h2>
          <p className="text-[16px] text-muted-foreground">시즌별로 모두 선택할 수 있습니다.</p>
        </div>

        <div className="grid gap-4">
          {seasonLeadOptions.map((season) => {
            const liked = waitlistState.liked[season.key];
            const localCount = waitlistState.entries.filter((entry) => entry.season === season.key).length;

            return (
              <article key={season.key} className="waitlist-card">
                <img src={season.image} alt={season.title} loading="lazy" className="h-48 w-full object-cover" />
                <div className="space-y-2 p-5">
                  <h3 className="text-[24px] font-semibold leading-tight">{season.title}</h3>
                  <p className="text-[16px] text-foreground/80">{season.subtitle}</p>
                  <p className="text-[16px] font-semibold text-primary">{season.openPlan}</p>

                  <div className="grid grid-cols-4 gap-1.5">
                    {season.previewImages.map((image, index) => (
                      <img
                        key={`${season.key}-${image}`}
                        src={image}
                        alt={`${season.title} 미리보기 ${index + 1}`}
                        loading="lazy"
                        className="h-16 w-full rounded-lg object-cover"
                      />
                    ))}
                  </div>

                  <p className="text-[16px] text-muted-foreground">이 브라우저 대기 신청 {localCount}건</p>

                  <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                    <button
                      type="button"
                      onClick={() => handleWaitlistLike(season.key)}
                      disabled={liked}
                      className={`inline-flex min-h-[48px] items-center justify-center gap-2 rounded-xl border px-4 text-[16px] font-semibold ${
                        liked
                          ? "border-primary/20 bg-primary/10 text-primary"
                          : "border-primary/30 bg-white text-primary"
                      }`}
                    >
                      {liked ? <CheckCircle2 className="h-5 w-5" /> : <Heart className="h-5 w-5" />}
                      {liked ? "좋아요 완료" : "좋아요"}
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
                <p className="text-[16px] font-semibold text-primary">시즌 오픈 우선 안내</p>
                <h3 className="font-brand text-[26px] font-semibold leading-tight">
                  {seasonLeadOptions.find((option) => option.key === waitlistTarget)?.title}
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
              <p className="text-[16px] text-foreground/80">시즌별로 1회 등록되며, 오픈 시 우선 연락드립니다.</p>

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
                  담당자와 바로 통화
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
