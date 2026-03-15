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
            className="inline-flex min-h-[52px] items-center justify-center gap-1.5 rounded-xl bg-primary px-3 text-[16px] font-bold text-white"
            aria-label={`${contacts[0].name} 전화 연결`}
          >
            <PhoneCall className="h-5 w-5" />
            지금 좌석 확인 전화
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
            className="inline-flex min-h-[52px] items-center justify-center gap-1.5 rounded-xl bg-accent px-3 text-[16px] font-bold text-primary"
            aria-label={`${contacts[1].name} 전화 연결`}
          >
            <PhoneCall className="h-5 w-5" />
            지금 좌석 확인 전화
          </a>
        </div>

        <p className="text-center text-[14px] text-muted-foreground">
          통화 가능 09:00~21:00 · 연결이 어려우면 <a href="/#final-call" className="font-semibold text-primary underline">문의 남기기</a>
        </p>
      </div>
    </div>
  );
};

export default FloatingCallButton;
