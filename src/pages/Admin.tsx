import { FormEvent, useEffect, useMemo, useState } from "react";
import { Lock, LogOut, RefreshCw } from "lucide-react";

type AuthStatus = "checking" | "guest" | "authenticated";

interface LeadRow {
  id: number;
  event_type: "waitlist" | "like";
  season: "spring" | "summer" | "fall" | "winter";
  name: string | null;
  phone: string | null;
  ip: string | null;
  user_agent: string | null;
  created_at: string;
}

interface SummaryRow {
  event_type: "waitlist" | "like";
  season: "spring" | "summer" | "fall" | "winter";
  count: number;
}

const seasonLabel: Record<LeadRow["season"], string> = {
  spring: "봄",
  summer: "여름",
  fall: "가을",
  winter: "겨울",
};

const eventLabel: Record<LeadRow["event_type"], string> = {
  waitlist: "대기 신청",
  like: "좋아요",
};

const Admin = () => {
  const [authStatus, setAuthStatus] = useState<AuthStatus>("checking");
  const [password, setPassword] = useState("");
  const [items, setItems] = useState<LeadRow[]>([]);
  const [summary, setSummary] = useState<SummaryRow[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const loadLeads = async () => {
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

      setItems(payload.items ?? []);
      setSummary(payload.summary ?? []);
      setAuthStatus("authenticated");
    } catch (loadError) {
      setError(loadError instanceof Error ? loadError.message : "리드 조회 중 오류가 발생했습니다.");
      if (authStatus === "checking") {
        setAuthStatus("guest");
      }
    } finally {
      setLoading(false);
    }
  };

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const waitlistCount = useMemo(
    () => summary.filter((row) => row.event_type === "waitlist").reduce((sum, row) => sum + Number(row.count || 0), 0),
    [summary],
  );

  const likeCount = useMemo(
    () => summary.filter((row) => row.event_type === "like").reduce((sum, row) => sum + Number(row.count || 0), 0),
    [summary],
  );

  const handleLogin = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!password.trim()) {
      setError("비밀번호를 입력해주세요.");
      return;
    }

    setLoading(true);
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
      setLoading(false);
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
      setLoading(false);
    }
  };

  if (authStatus !== "authenticated") {
    return (
      <main className="min-h-screen bg-background px-4 py-8 text-foreground">
        <div className="mx-auto w-full max-w-md rounded-3xl border bg-white p-6 shadow-card">
          <h1 className="text-[28px] font-bold">AlaskaTrip Admin</h1>
          <p className="mt-2 text-[16px] text-muted-foreground">비밀번호를 입력하면 DB에 저장된 리드를 조회할 수 있습니다.</p>

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

            {error ? <p className="rounded-xl bg-red-50 px-3 py-2 text-[15px] text-red-600">{error}</p> : null}

            <button
              type="submit"
              disabled={loading}
              className="inline-flex min-h-[52px] w-full items-center justify-center gap-2 rounded-xl bg-primary px-4 text-[16px] font-semibold text-white disabled:opacity-60"
            >
              <Lock className="h-5 w-5" />
              {loading ? "확인 중..." : "로그인"}
            </button>
          </form>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-background px-4 py-6 text-foreground">
      <div className="mx-auto w-full max-w-6xl space-y-4">
        <header className="rounded-3xl border bg-white p-5 shadow-card">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h1 className="text-[28px] font-bold">AlaskaTrip Admin</h1>
              <p className="text-[16px] text-muted-foreground">대기 신청/좋아요 DB 수집 현황</p>
            </div>

            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => void loadLeads()}
                disabled={loading}
                className="inline-flex min-h-[44px] items-center gap-2 rounded-xl border px-3 text-[15px] font-semibold"
              >
                <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />
                새로고침
              </button>
              <button
                type="button"
                onClick={() => void handleLogout()}
                disabled={loading}
                className="inline-flex min-h-[44px] items-center gap-2 rounded-xl bg-primary px-3 text-[15px] font-semibold text-white"
              >
                <LogOut className="h-4 w-4" />
                로그아웃
              </button>
            </div>
          </div>

          <div className="mt-4 grid gap-2 sm:grid-cols-3">
            <div className="rounded-2xl border bg-secondary p-4">
              <p className="text-[15px] text-muted-foreground">전체 이벤트</p>
              <p className="text-[28px] font-bold">{items.length}</p>
            </div>
            <div className="rounded-2xl border bg-secondary p-4">
              <p className="text-[15px] text-muted-foreground">대기 신청</p>
              <p className="text-[28px] font-bold">{waitlistCount}</p>
            </div>
            <div className="rounded-2xl border bg-secondary p-4">
              <p className="text-[15px] text-muted-foreground">좋아요</p>
              <p className="text-[28px] font-bold">{likeCount}</p>
            </div>
          </div>

          {error ? <p className="mt-3 rounded-xl bg-red-50 px-3 py-2 text-[15px] text-red-600">{error}</p> : null}
        </header>

        <section className="rounded-3xl border bg-white p-4 shadow-card">
          <h2 className="text-[22px] font-bold">시즌별 집계</h2>
          <div className="mt-3 grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
            {summary.map((row) => (
              <article key={`${row.event_type}-${row.season}`} className="rounded-2xl border bg-background p-3">
                <p className="text-[15px] text-muted-foreground">{eventLabel[row.event_type]} · {seasonLabel[row.season]}</p>
                <p className="text-[24px] font-bold">{Number(row.count || 0)}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="rounded-3xl border bg-white p-4 shadow-card">
          <h2 className="text-[22px] font-bold">최근 수집 데이터</h2>

          <div className="mt-3 overflow-x-auto">
            <table className="min-w-full border-collapse text-left text-[14px]">
              <thead>
                <tr className="border-b bg-secondary">
                  <th className="px-3 py-2 font-semibold">시간</th>
                  <th className="px-3 py-2 font-semibold">유형</th>
                  <th className="px-3 py-2 font-semibold">시즌</th>
                  <th className="px-3 py-2 font-semibold">이름</th>
                  <th className="px-3 py-2 font-semibold">휴대폰</th>
                  <th className="px-3 py-2 font-semibold">IP</th>
                </tr>
              </thead>
              <tbody>
                {items.map((item) => (
                  <tr key={item.id} className="border-b last:border-b-0">
                    <td className="px-3 py-2 whitespace-nowrap">{new Date(item.created_at).toLocaleString("ko-KR", { hour12: false })}</td>
                    <td className="px-3 py-2">{eventLabel[item.event_type]}</td>
                    <td className="px-3 py-2">{seasonLabel[item.season]}</td>
                    <td className="px-3 py-2">{item.name ?? "-"}</td>
                    <td className="px-3 py-2">{item.phone ?? "-"}</td>
                    <td className="px-3 py-2">{item.ip ?? "-"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </main>
  );
};

export default Admin;
