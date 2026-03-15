import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <main className="min-h-screen bg-background px-4 py-10 text-foreground">
      <section className="mx-auto w-full max-w-md rounded-3xl border bg-white p-6 text-center shadow-card">
        <p className="text-[16px] font-semibold text-primary">페이지를 찾을 수 없습니다</p>
        <h1 className="mt-2 text-[34px] font-bold leading-tight">404</h1>
        <p className="mt-3 text-[16px] text-muted-foreground">요청하신 주소가 변경되었거나 삭제되었습니다.</p>

        <div className="mt-5 grid gap-2">
          <Link
            to="/"
            className="inline-flex min-h-[48px] items-center justify-center rounded-xl bg-primary px-4 text-[16px] font-semibold text-white"
          >
            홈으로 이동
          </Link>
          <Link
            to="/summer-itinerary"
            className="inline-flex min-h-[48px] items-center justify-center rounded-xl border border-primary/30 px-4 text-[16px] font-semibold text-primary"
          >
            여름 일정 보기
          </Link>
        </div>
      </section>
    </main>
  );
};

export default NotFound;
