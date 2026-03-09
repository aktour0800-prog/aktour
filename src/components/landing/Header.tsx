import { Phone, CalendarDays } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const Header = () => {
  const location = useLocation();
  const isSummerPage = location.pathname === "/summer-itinerary" || location.pathname === "/itinerary";

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-white/20 bg-primary/80 backdrop-blur-xl safe-top">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3">
        <Link to="/" className="text-white">
          <p className="text-[20px] font-bold leading-none">AlaskaTrip</p>
          <p className="mt-1 text-[16px] text-white/80">프리미엄 알래스카</p>
        </Link>

        <div className="flex items-center gap-2">
          <a
            href="tel:01033090800"
            className="inline-flex min-h-[48px] items-center gap-2 rounded-xl border border-white/25 px-4 text-[16px] font-semibold text-white"
            aria-label="대표 상담 전화"
          >
            <Phone className="h-5 w-5" />
            전화상담
          </a>
          <Link
            to={isSummerPage ? "/" : "/summer-itinerary"}
            className="inline-flex min-h-[48px] items-center gap-2 rounded-xl bg-accent px-4 text-[16px] font-bold text-primary"
          >
            <CalendarDays className="h-5 w-5" />
            {isSummerPage ? "홈" : "여름일정"}
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
