import { FormEvent, useCallback, useEffect, useMemo, useState } from "react";
import { Lock, LogOut, RefreshCw, Save, Trash2 } from "lucide-react";

type AuthStatus = "checking" | "guest" | "authenticated";
type EventType = "waitlist" | "like" | "inquiry" | "call_intent";
type SeasonType = "spring" | "summer" | "fall" | "winter";
type FollowUpStatus = "new" | "called" | "no_answer" | "inquiry_left" | "closed";

interface LeadRow {
  id: number;
  event_type: EventType;
  season: SeasonType;
  name: string | null;
  phone: string | null;
  ip: string | null;
  user_agent: string | null;
  follow_up_status: FollowUpStatus;
  memo: string | null;
  created_at: string;
  updated_at: string;
}

interface SummaryRow {
  event_type: EventType;
  season: SeasonType;
  count: number;
}

interface LeadDraft {
  follow_up_status: FollowUpStatus;
  memo: string;
}

const seasonLabel: Record<SeasonType, string> = {
  spring: "봄",
  summer: "여름",
  fall: "가을",
  winter: "겨울",
};

const eventLabel: Record<EventType, string> = {
  waitlist: "대기 신청",
  like: "좋아요",
  inquiry: "문의 남김",
  call_intent: "전화 의도",
};

const followUpLabel: Record<FollowUpStatus, string> = {
  new: "신규",
  called: "통화완료",
  no_answer: "부재중",
  inquiry_left: "문의남김",
  closed: "처리완료",
};

const followUpOptions: FollowUpStatus[] = ["new", "called", "no_answer", "inquiry_left", "closed"];

const Admin = () => {
  const [authStatus, setAuthStatus] = useState<AuthStatus>("checking");
  const [password, setPassword] = useState("");
  const [items, setItems] = useState<LeadRow[]>([]);
  const [summary, setSummary] = useState<SummaryRow[]>([]);
  const [drafts, setDrafts] = useState<Record<number, LeadDraft>>({});
  const [loading, setLoading] = useState(false);
  const [submittingLogin, setSubmittingLogin] = useState(false);
  const [error, setError] = useState("");
  const [rowBusy, setRowBusy] = useState<Record<number, "saving" | "deleting" | undefined>>({});

  const loadLeads = useCallback(async () => {
    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/admin/leads?limit=500", {
        method: "GET",
        credentials: "include",
      });

      if (response.status === 401) {
        setAuthStatus("guest");
        setItems([]);
        setSummary([]);
        setDrafts({});
        return;
      }

      if (!response.ok) {
        const payload = (await response.json().catch(() => null)) as { message?: string } | null;
        throw new Error(payload?.message ?? "리드 조회에 실패했습니다.");
      }

      const payload = (await response.json()) as {
        items?: LeadRow[];
        summary?: SummaryRow[];
      };

      const nextItems = payload.items ?? [];
      const nextSummary = payload.summary ?? [];

      setItems(nextItems);
      setSummary(nextSummary);
      setAuthStatus("authenticated");

      const nextDrafts = nextItems.reduce<Record<number, LeadDraft>>((acc, item) => {
        acc[item.id] = {
          follow_up_status: item.follow_up_status ?? "new",
          memo: item.memo ?? "",
        };
        return acc;
      }, {});

      setDrafts(nextDrafts);
    } catch (loadError) {
      setError(loadError instanceof Error ? loadError.message : "리드 조회 중 오류가 발생했습니다.");
      setAuthStatus("guest");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    document.title = "AlaskaTrip Admin";

    let robotsMeta = document.head.querySelector<HTMLMetaElement>('meta[name="robots"]');
    const created = !robotsMeta;
    if (!robotsMeta) {
      robotsMeta = document.createElement("meta");
      robotsMeta.setAttribute("name", "robots");
      document.head.appendChild(robotsMeta);
    }
    robotsMeta.setAttribute("content", "noindex, nofollow");

    void loadLeads();

    return () => {
      if (created) {
        robotsMeta?.parentNode?.removeChild(robotsMeta);
      }
    };
  }, [loadLeads]);

  const waitlistCount = useMemo(
    () => summary.filter((row) => row.event_type === "waitlist").reduce((sum, row) => sum + Number(row.count || 0), 0),
    [summary],
  );

  const likeCount = useMemo(
    () => summary.filter((row) => row.event_type === "like").reduce((sum, row) => sum + Number(row.count || 0), 0),
    [summary],
  );

  const inquiryCount = useMemo(
    () => summary.filter((row) => row.event_type === "inquiry").reduce((sum, row) => sum + Number(row.count || 0), 0),
    [summary],
  );

  const callIntentCount = useMemo(
    () => summary.filter((row) => row.event_type === "call_intent").reduce((sum, row) => sum + Number(row.count || 0), 0),
    [summary],
  );

  const handleLogin = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!password.trim()) {
      setError("비밀번호를 입력해주세요.");
      return;
    }

    setSubmittingLogin(true);
    setError("");

    try {
      const response = await fetch("/api/admin/login", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ password }),
      });

      if (!response.ok) {
        const payload = (await response.json().catch(() => null)) as { message?: string } | null;
        throw new Error(payload?.message ?? "로그인에 실패했습니다.");
      }

      setPassword("");
      await loadLeads();
    } catch (loginError) {
      setError(loginError instanceof Error ? loginError.message : "로그인에 실패했습니다.");
      setAuthStatus("guest");
    } finally {
      setSubmittingLogin(false);
    }
  };

  const handleLogout = async () => {
    setLoading(true);
    setError("");

    try {
      await fetch("/api/admin/logout", {
        method: "POST",
        credentials: "include",
      });
    } finally {
      setAuthStatus("guest");
      setItems([]);
      setSummary([]);
      setDrafts({});
      setLoading(false);
    }
  };

  const updateDraft = (id: number, patch: Partial<LeadDraft>) => {
    setDrafts((prev) => ({
      ...prev,
      [id]: {
        follow_up_status: prev[id]?.follow_up_status ?? "new",
        memo: prev[id]?.memo ?? "",
        ...patch,
      },
    }));
  };

  const handleSaveRow = async (id: number) => {
    const draft = drafts[id];
    if (!draft) {
      return;
    }

    setRowBusy((prev) => ({ ...prev, [id]: "saving" }));
    setError("");

    try {
      const response = await fetch("/api/admin/leads", {
        method: "PATCH",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id,
          follow_up_status: draft.follow_up_status,
          memo: draft.memo,
        }),
      });

      if (!response.ok) {
        const payload = (await response.json().catch(() => null)) as { message?: string } | null;
        throw new Error(payload?.message ?? "저장에 실패했습니다.");
      }

      const payload = (await response.json()) as {
        item?: {
          id: number;
          follow_up_status: FollowUpStatus;
          memo: string | null;
          updated_at: string;
        };
      };

      if (payload.item) {
        setItems((prev) =>
          prev.map((row) =>
            row.id === id
              ? {
                  ...row,
                  follow_up_status: payload.item?.follow_up_status ?? row.follow_up_status,
                  memo: payload.item?.memo ?? row.memo,
                  updated_at: payload.item?.updated_at ?? row.updated_at,
                }
              : row,
          ),
        );
      }
    } catch (saveError) {
      setError(saveError instanceof Error ? saveError.message : "저장 중 오류가 발생했습니다.");
    } finally {
      setRowBusy((prev) => ({ ...prev, [id]: undefined }));
    }
  };

  const handleDeleteRow = async (id: number) => {
    if (!window.confirm("이 리드를 삭제하시겠습니까?")) {
      return;
    }

    setRowBusy((prev) => ({ ...prev, [id]: "deleting" }));
    setError("");

    try {
      const response = await fetch(`/api/admin/leads?id=${id}`, {
        method: "DELETE",
        credentials: "include",
      });

      if (!response.ok) {
        const payload = (await response.json().catch(() => null)) as { message?: string } | null;
        throw new Error(payload?.message ?? "삭제에 실패했습니다.");
      }

      await loadLeads();
    } catch (deleteError) {
      setError(deleteError instanceof Error ? deleteError.message : "삭제 중 오류가 발생했습니다.");
    } finally {
      setRowBusy((prev) => ({ ...prev, [id]: undefined }));
    }
  };

  if (authStatus !== "authenticated") {
    return (
      <main className="min-h-screen bg-background px-4 py-8 text-foreground">
        <div className="mx-auto w-full max-w-md rounded-3xl border bg-white p-6 shadow-card">
          <h1 className="text-[28px] font-bold">AlaskaTrip Admin</h1>
          <p className="mt-2 text-[16px] text-muted-foreground">비밀번호를 입력하면 리드 DB를 확인할 수 있습니다.</p>

          <form onSubmit={handleLogin} className="mt-4 space-y-3">
            <label className="block text-[16px] font-semibold">
              관리자 비밀번호
              <input
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                className="mt-2 w-full rounded-xl border px-4 py-3 text-[16px]"
                autoComplete="current-password"
                placeholder="비밀번호"
              />
            </label>

            {error ? <p className="rounded-xl bg-red-50 px-3 py-2 text-[16px] text-red-600">{error}</p> : null}

            <button
              type="submit"
              disabled={submittingLogin}
              className="inline-flex min-h-[52px] w-full items-center justify-center gap-2 rounded-xl bg-primary px-4 text-[16px] font-semibold text-white disabled:opacity-60"
            >
              <Lock className="h-5 w-5" />
              {submittingLogin ? "확인 중..." : "로그인"}
            </button>
          </form>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-background px-4 py-6 text-foreground">
      <div className="mx-auto w-full max-w-7xl space-y-4">
        <header className="rounded-3xl border bg-white p-5 shadow-card">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h1 className="text-[28px] font-bold">AlaskaTrip Admin</h1>
              <p className="text-[16px] text-muted-foreground">{"\uB300\uAE30 \uC2E0\uCCAD/\uC88B\uC544\uC694/\uBB38\uC758/\uC804\uD654 \uC758\uB3C4 \uB9AC\uB4DC \uAD00\uB9AC"}</p>
            </div>

            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => void loadLeads()}
                disabled={loading}
                className="inline-flex min-h-[48px] items-center gap-2 rounded-xl border px-3 text-[16px] font-semibold"
              >
                <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />
                새로고침
              </button>
              <button
                type="button"
                onClick={() => void handleLogout()}
                disabled={loading}
                className="inline-flex min-h-[48px] items-center gap-2 rounded-xl bg-primary px-3 text-[16px] font-semibold text-white"
              >
                <LogOut className="h-4 w-4" />
                로그아웃
              </button>
            </div>
          </div>

          <div className="mt-4 grid gap-2 sm:grid-cols-2 lg:grid-cols-5">
            <div className="rounded-2xl border bg-secondary p-4">
              <p className="text-[16px] text-muted-foreground">전체 리드</p>
              <p className="text-[28px] font-bold">{items.length}</p>
            </div>
            <div className="rounded-2xl border bg-secondary p-4">
              <p className="text-[16px] text-muted-foreground">대기 신청</p>
              <p className="text-[28px] font-bold">{waitlistCount}</p>
            </div>
            <div className="rounded-2xl border bg-secondary p-4">
              <p className="text-[16px] text-muted-foreground">좋아요</p>
              <p className="text-[28px] font-bold">{likeCount}</p>
            </div>
            <div className="rounded-2xl border bg-secondary p-4">
              <p className="text-[16px] text-muted-foreground">문의 남김</p>
              <p className="text-[28px] font-bold">{inquiryCount}</p>
            </div>
            <div className="rounded-2xl border bg-secondary p-4">
              <p className="text-[16px] text-muted-foreground">전화 의도</p>
              <p className="text-[28px] font-bold">{callIntentCount}</p>
            </div>
          </div>

          {error ? <p className="mt-3 rounded-xl bg-red-50 px-3 py-2 text-[16px] text-red-600">{error}</p> : null}
        </header>

        <section className="rounded-3xl border bg-white p-4 shadow-card">
          <h2 className="text-[22px] font-bold">시즌/이벤트 요약</h2>
          <div className="mt-3 grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
            {summary.map((row) => (
              <article key={`${row.event_type}-${row.season}`} className="rounded-2xl border bg-background p-3">
                <p className="text-[16px] text-muted-foreground">
                  {eventLabel[row.event_type]} · {seasonLabel[row.season]}
                </p>
                <p className="text-[24px] font-bold">{Number(row.count || 0)}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="rounded-3xl border bg-white p-4 shadow-card">
          <h2 className="text-[22px] font-bold">리드 상세 관리</h2>

          <div className="mt-3 overflow-x-auto">
            <table className="min-w-full border-collapse text-left text-[16px]">
              <thead>
                <tr className="border-b bg-secondary">
                  <th className="px-3 py-2 font-semibold">시간</th>
                  <th className="px-3 py-2 font-semibold">이벤트</th>
                  <th className="px-3 py-2 font-semibold">시즌</th>
                  <th className="px-3 py-2 font-semibold">이름</th>
                  <th className="px-3 py-2 font-semibold">휴대폰</th>
                  <th className="px-3 py-2 font-semibold">상태</th>
                  <th className="px-3 py-2 font-semibold">메모</th>
                  <th className="px-3 py-2 font-semibold">작업</th>
                </tr>
              </thead>
              <tbody>
                {items.map((item) => {
                  const draft = drafts[item.id] ?? {
                    follow_up_status: item.follow_up_status,
                    memo: item.memo ?? "",
                  };
                  const busyState = rowBusy[item.id];
                  const isSaving = busyState === "saving";
                  const isDeleting = busyState === "deleting";

                  return (
                    <tr key={item.id} className="border-b align-top last:border-b-0">
                      <td className="px-3 py-2 whitespace-nowrap">
                        {new Date(item.created_at).toLocaleString("ko-KR", { hour12: false })}
                      </td>
                      <td className="px-3 py-2">{eventLabel[item.event_type]}</td>
                      <td className="px-3 py-2">{seasonLabel[item.season]}</td>
                      <td className="px-3 py-2">{item.name ?? "-"}</td>
                      <td className="px-3 py-2">{item.phone ?? "-"}</td>
                      <td className="px-3 py-2 min-w-[140px]">
                        <select
                          value={draft.follow_up_status}
                          onChange={(event) =>
                            updateDraft(item.id, {
                              follow_up_status: event.target.value as FollowUpStatus,
                            })
                          }
                          className="w-full rounded-lg border px-2 py-2 text-[16px]"
                        >
                          {followUpOptions.map((status) => (
                            <option key={`${item.id}-${status}`} value={status}>
                              {followUpLabel[status]}
                            </option>
                          ))}
                        </select>
                      </td>
                      <td className="px-3 py-2 min-w-[240px]">
                        <input
                          value={draft.memo}
                          onChange={(event) => updateDraft(item.id, { memo: event.target.value.slice(0, 500) })}
                          className="w-full rounded-lg border px-2 py-2 text-[16px]"
                          placeholder="메모 입력"
                        />
                      </td>
                      <td className="px-3 py-2 min-w-[160px]">
                        <div className="grid gap-2">
                          <button
                            type="button"
                            onClick={() => void handleSaveRow(item.id)}
                            disabled={isSaving || isDeleting}
                            className="inline-flex min-h-[48px] items-center justify-center gap-1 rounded-lg bg-primary px-3 text-[16px] font-semibold text-white disabled:opacity-60"
                          >
                            <Save className="h-4 w-4" />
                            {isSaving ? "저장 중" : "저장"}
                          </button>
                          <button
                            type="button"
                            onClick={() => void handleDeleteRow(item.id)}
                            disabled={isSaving || isDeleting}
                            className="inline-flex min-h-[48px] items-center justify-center gap-1 rounded-lg border border-red-200 bg-red-50 px-3 text-[16px] font-semibold text-red-700 disabled:opacity-60"
                          >
                            <Trash2 className="h-4 w-4" />
                            {isDeleting ? "삭제 중" : "삭제"}
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </main>
  );
};

export default Admin;


