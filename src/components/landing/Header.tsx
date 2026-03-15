import { CalendarDays, Phone } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

import { contacts } from "@/data/summerCampaignData";
import { trackCallIntent } from "@/lib/callIntent";

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
      <div className="mx-auto flex max-w-5xl items-center justify-between gap-1.5 px-2.5 py-2 sm:gap-2 sm:px-4 sm:py-3">
        <Link to="/" className="text-white">
          <p className="whitespace-nowrap text-[16px] font-bold leading-none sm:text-[20px]">AlaskaTrip</p>
          <p className="mt-1 hidden text-[15px] text-white/95 md:block">{"\uD504\uB9AC\uBBF8\uC5C4 \uC54C\uB798\uC2A4\uCE74"}</p>
        </Link>

        <div className="flex shrink-0 items-center gap-1.5 sm:gap-2">
          <a
            href={`tel:${contacts[0].tel}`}
            onClick={() =>
              trackCallIntent({
                season: "summer",
                contact: contacts[0].name,
                surface: "header",
              })
            }
            className="cta-premium cta-premium-primary inline-flex min-h-[48px] items-center gap-1.5 whitespace-nowrap rounded-xl border border-white/45 bg-white/14 px-2.5 text-[15px] font-semibold text-white sm:px-3 sm:text-[16px]"
            aria-label={`${contacts[0].name} \uC804\uD654 \uC5F0\uACB0`}
          >
            <Phone className="h-4 w-4" />
            <span className="sm:hidden">{"\uC88C\uC11D \uC804\uD654"}</span>
            <span className="hidden sm:inline">{"\uC9C0\uAE08 \uC88C\uC11D \uD655\uC778 \uC804\uD654"}</span>
          </a>
          <Link
            to={isSummerPage ? "/" : "/summer-itinerary"}
            className="cta-premium cta-premium-accent inline-flex min-h-[48px] items-center gap-1.5 whitespace-nowrap rounded-xl bg-accent px-2.5 text-[15px] font-bold text-primary sm:px-3 sm:text-[16px]"
          >
            <CalendarDays className="h-4 w-4" />
            <span className="sm:hidden">{isSummerPage ? "\uD648" : "\uC5EC\uB984"}</span>
            <span className="hidden sm:inline">{isSummerPage ? "\uD648" : "\uC5EC\uB984 \uC77C\uC815"}</span>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;