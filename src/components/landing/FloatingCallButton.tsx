import { PhoneCall } from "lucide-react";

import { contacts } from "@/data/summerCampaignData";

const FloatingCallButton = () => {
  return (
    <div className="fixed inset-x-0 bottom-0 z-50 border-t border-border bg-white/95 px-3 pb-[calc(env(safe-area-inset-bottom)+12px)] pt-3 backdrop-blur-md">
      <div className="mx-auto grid max-w-5xl grid-cols-2 gap-2">
        <a
          href={`tel:${contacts[0].tel}`}
          className="inline-flex min-h-[52px] items-center justify-center gap-1.5 rounded-xl bg-primary px-3 text-[16px] font-bold text-white"
          aria-label={`${contacts[0].name} 전화 연결`}
        >
          <PhoneCall className="h-5 w-5" />
          {contacts[0].name}
        </a>
        <a
          href={`tel:${contacts[1].tel}`}
          className="inline-flex min-h-[52px] items-center justify-center gap-1.5 rounded-xl bg-accent px-3 text-[16px] font-bold text-primary"
          aria-label={`${contacts[1].name} 전화 연결`}
        >
          <PhoneCall className="h-5 w-5" />
          {contacts[1].name}
        </a>
      </div>
    </div>
  );
};

export default FloatingCallButton;

