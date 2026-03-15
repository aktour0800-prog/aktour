import { PhoneCall } from "lucide-react";

import { contacts } from "@/data/summerCampaignData";
import { trackCallIntent } from "@/lib/callIntent";

const FloatingCallButton = () => {
  return (
    <div className="fixed inset-x-0 bottom-0 z-50 border-t border-border bg-white/95 px-3 pb-[calc(env(safe-area-inset-bottom)+12px)] pt-3 backdrop-blur-md">
      <div className="mx-auto max-w-5xl space-y-2">
        <div className="grid grid-cols-2 gap-2">
          <a
            href={`tel:${contacts[0].tel}`}
            onClick={() =>
              trackCallIntent({
                season: "summer",
                contact: contacts[0].name,
                surface: "floating",
              })
            }
            className="cta-premium cta-premium-primary inline-flex min-h-[52px] items-center justify-center gap-1.5 rounded-xl bg-primary px-3 text-[15px] font-bold text-white sm:text-[16px]"
            aria-label={`${contacts[0].name} \uC804\uD654 \uC5F0\uACB0`}
          >
            <PhoneCall className="h-5 w-5" />
            <span className="sm:hidden">{contacts[0].name}</span>
            <span className="hidden sm:inline">{"\uC9C0\uAE08 \uC88C\uC11D \uD655\uC778 \uC804\uD654"}</span>
          </a>
          <a
            href={`tel:${contacts[1].tel}`}
            onClick={() =>
              trackCallIntent({
                season: "summer",
                contact: contacts[1].name,
                surface: "floating",
              })
            }
            className="cta-premium cta-premium-accent inline-flex min-h-[52px] items-center justify-center gap-1.5 rounded-xl bg-accent px-3 text-[15px] font-bold text-primary sm:text-[16px]"
            aria-label={`${contacts[1].name} \uC804\uD654 \uC5F0\uACB0`}
          >
            <PhoneCall className="h-5 w-5" />
            <span className="sm:hidden">{contacts[1].name}</span>
            <span className="hidden sm:inline">{"\uC9C0\uAE08 \uC88C\uC11D \uD655\uC778 \uC804\uD654"}</span>
          </a>
        </div>

        <p className="text-center text-[13px] text-muted-foreground sm:text-[14px]">
          {"\uD1B5\uD654 \uAC00\uB2A5 09:00~21:00 \u00B7 \uC5F0\uACB0\uC774 \uC5B4\uB824\uC6B0\uBA74 "}
          <a href="/#final-call" className="font-semibold text-primary underline">
            {"\uBB38\uC758 \uB0A8\uAE30\uAE30"}
          </a>
        </p>
      </div>
    </div>
  );
};

export default FloatingCallButton;