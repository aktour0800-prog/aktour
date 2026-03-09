import { PhoneCall } from "lucide-react";

const FloatingCallButton = () => {
  return (
    <div className="fixed inset-x-0 bottom-0 z-50 border-t border-border bg-white/95 px-3 pb-[calc(env(safe-area-inset-bottom)+12px)] pt-3 backdrop-blur-md">
      <div className="mx-auto grid max-w-5xl grid-cols-2 gap-2">
        <a
          href="tel:01033090800"
          className="inline-flex min-h-[52px] items-center justify-center gap-2 rounded-xl bg-primary px-3 text-[16px] font-bold text-white"
          aria-label="엄태인 실장 전화 연결"
        >
          <PhoneCall className="h-5 w-5" />
          대표 010-3309-0800
        </a>
        <a
          href="tel:01064247774"
          className="inline-flex min-h-[52px] items-center justify-center gap-2 rounded-xl bg-accent px-3 text-[16px] font-bold text-primary"
          aria-label="정수미 담당 전화 연결"
        >
          <PhoneCall className="h-5 w-5" />
          일정 010-6424-7774
        </a>
      </div>
    </div>
  );
};

export default FloatingCallButton;
