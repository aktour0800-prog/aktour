import { Phone, MessageCircle, Clock } from "lucide-react";

const TrustCTASection = () => {
  return (
    <section id="contact" className="bg-primary text-primary-foreground py-16 md:py-20">
      <div className="container mx-auto px-5 text-center">
        {/* Title */}
        <h2 className="text-[28px] md:text-[36px] font-bold mb-3">
          알래스카가 기다리고 있습니다
        </h2>
        <p className="text-white/80 text-lg mb-10">
          버킷리스트를 현실로 만들 준비 되셨나요?
        </p>

        {/* Phone Section */}
        <div className="mb-8">
          <div className="inline-flex items-center gap-2 text-accent text-xl font-bold mb-6">
            <Phone className="w-6 h-6" />
            전화 상담
          </div>
        </div>

        {/* Phone Cards */}
        <div className="max-w-md mx-auto space-y-4 mb-8">
          {/* 엄태인 대표 */}
          <a
            href="tel:010-3309-0800"
            className="block bg-white/10 hover:bg-white/15 border border-white/20 rounded-2xl p-5 transition-all duration-200 min-h-[72px]"
          >
            <div className="flex items-center justify-between">
              <div className="text-left">
                <div className="text-white/60 text-sm mb-1">대표</div>
                <div className="text-white font-bold text-lg">엄태인</div>
              </div>
              <div className="text-accent text-xl md:text-2xl font-bold">
                010-3309-0800
              </div>
            </div>
          </a>

          {/* 정수미 대표 */}
          <a
            href="tel:010-6424-7774"
            className="block bg-white/10 hover:bg-white/15 border border-white/20 rounded-2xl p-5 transition-all duration-200 min-h-[72px]"
          >
            <div className="flex items-center justify-between">
              <div className="text-left">
                <div className="text-white/60 text-sm mb-1">대표</div>
                <div className="text-white font-bold text-lg">정수미</div>
              </div>
              <div className="text-accent text-xl md:text-2xl font-bold">
                010-6424-7774
              </div>
            </div>
          </a>
        </div>

        {/* Hours */}
        <div className="flex items-center justify-center gap-2 text-white/70 text-base mb-8">
          <Clock className="w-5 h-5" />
          <span>상담시간 09:00 - 18:00</span>
        </div>

        {/* KakaoTalk Button */}
        <a
          href="https://pf.kakao.com/_your_kakao_id"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-3 w-full max-w-md py-5 bg-[#FEE500] text-[#3C1E1E] rounded-2xl font-bold text-lg hover:bg-[#FDD800] transition-colors min-h-[56px]"
        >
          <MessageCircle className="w-6 h-6" />
          카카오톡 상담
        </a>

        {/* Reassurance */}
        <p className="text-white/50 text-base mt-8">
          * 상담만 받으셔도 됩니다. 부담 없이 문의하세요.
        </p>
      </div>
    </section>
  );
};

export default TrustCTASection;
