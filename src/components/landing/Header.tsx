import { CalendarDays, Phone } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

import { contacts } from "@/data/summerCampaignData";

interface HeaderProps {
  hidden?: boolean;
}

const Header = ({ hidden = false }: HeaderProps) => {
  const location = useLocation();
  const isSummerPage = location.pathname === "/summer-itinerary" || location.pathname === "/itinerary";

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b border-white/25 bg-[hsl(var(--primary)/0.96)] shadow-[0_8px_24px_rgba(5,16,33,0.28)] backdrop-blur-xl safe-top transition-all duration-300 ${
        hidden ? "-translate-y-full opacity-0 pointer-events-none" : "translate-y-0 opacity-100"
      }`}
    >
      <div className="mx-auto flex max-w-5xl items-center justify-between gap-2 px-3 py-2.5 sm:px-4 sm:py-3">
        <Link to="/" className="text-white">
          <p className="whitespace-nowrap text-[17px] font-bold leading-none sm:text-[20px]">AlaskaTrip</p>
          <p className="mt-1 hidden text-[16px] text-white/95 sm:block">프리미엄 알래스카</p>
        </Link>

        <div className="flex shrink-0 items-center gap-2">
          <a
            href={`tel:${contacts[0].tel}`}
            className="inline-flex min-h-[48px] items-center gap-1.5 whitespace-nowrap rounded-xl border border-white/45 bg-white/14 px-3 text-[16px] font-semibold text-white"
            aria-label={`${contacts[0].name} 전화 연결`}
          >
            <Phone className="h-4 w-4" />
            전화상담
          </a>
          <Link
            to={isSummerPage ? "/" : "/summer-itinerary"}
            className="inline-flex min-h-[48px] items-center gap-1.5 whitespace-nowrap rounded-xl bg-accent px-3 text-[16px] font-bold text-primary"
          >
            <CalendarDays className="h-4 w-4" />
            {isSummerPage ? "홈" : "여름 일정"}
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
