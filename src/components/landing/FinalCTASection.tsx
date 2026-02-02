import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Phone, MessageCircle, Check, Users, Award, Tv, TrendingDown, AlertTriangle, Clock, ExternalLink } from "lucide-react";

const FinalCTASection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  const trustBadges = [
    { number: "15명", label: "소그룹 한정", icon: Users },
    { number: "18년", label: "여행 전문", icon: Award },
    { number: "도시어부", label: "현지 코디", icon: Tv },
  ];

  const contacts = [
    { name: "엄태인 대표", phone: "010-3309-0800" },
    { name: "정수미 대표", phone: "010-6424-7774" },
  ];

  const reassurances = [
    "상담만 받으셔도 됩니다",
    "부담 없이 궁금한 것만 물어보세요",
  ];

  return (
    <section 
      ref={ref}
      className="relative py-20 md:py-28 overflow-hidden"
      style={{
        background: "linear-gradient(180deg, hsl(var(--primary)) 0%, hsl(210, 50%, 12%) 100%)",
      }}
    >
      {/* Subtle Aurora Overlay */}
      <div 
        className="absolute inset-0 opacity-20"
        style={{
          background: "radial-gradient(ellipse at 50% 0%, hsl(var(--accent) / 0.3) 0%, transparent 60%)",
        }}
      />

      <div className="container mx-auto px-5 relative z-10">
        {/* 1. EMOTIONAL HOOK */}
        <motion.div
          className="text-center mb-12 md:mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 leading-tight">
            "언제까지 미루실 건가요?"
          </h2>
          <div className="space-y-2 text-lg md:text-xl text-white/80">
            <p>동남아, 유럽, 하와이는</p>
            <p>내년에도 갈 수 있습니다.</p>
          </div>
          <div className="mt-6 space-y-1">
            <p className="text-lg md:text-xl text-white/90">하지만</p>
            <p className="text-2xl md:text-3xl font-bold text-accent">
              빙하는 매년 녹고 있습니다.
            </p>
          </div>
        </motion.div>

        {/* 근거 자료 섹션 */}
        <motion.div
          className="max-w-4xl mx-auto mb-12 md:mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 md:p-8 border border-white/10">
            {/* 근거 카드 그리드 */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              {/* 빠른 빙하 감소 */}
              <div className="bg-white/5 rounded-xl p-5 border border-white/10">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-lg bg-accent/20 flex items-center justify-center">
                    <TrendingDown className="w-5 h-5 text-accent" />
                  </div>
                  <h3 className="text-white font-bold text-base">빠른 빙하 감소</h3>
                </div>
                <p className="text-white/80 text-sm leading-relaxed">
                  알래스카는 지구 다른 지역보다 <span className="text-accent font-semibold">2배 이상 빠른</span> 기온 상승을 겪으며, 빙하 질량이 빠르게 줄어들고 있습니다.
                </p>
              </div>

              {/* 지속적인 홍수 피해 */}
              <div className="bg-white/5 rounded-xl p-5 border border-white/10">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-lg bg-accent/20 flex items-center justify-center">
                    <AlertTriangle className="w-5 h-5 text-accent" />
                  </div>
                  <h3 className="text-white font-bold text-base">지속적인 홍수 피해</h3>
                </div>
                <p className="text-white/80 text-sm leading-relaxed">
                  2011년 이후 멘덴홀 빙하 상류의 얼음 둑이 붕괴되면서 <span className="text-accent font-semibold">매년 여름철</span> 홍수가 발생하고 있습니다.
                </p>
              </div>

              {/* 위험 증가 */}
              <div className="bg-white/5 rounded-xl p-5 border border-white/10">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-lg bg-accent/20 flex items-center justify-center">
                    <Clock className="w-5 h-5 text-accent" />
                  </div>
                  <h3 className="text-white font-bold text-base">위험 증가</h3>
                </div>
                <p className="text-white/80 text-sm leading-relaxed">
                  2023~2025년 들어 빙하가 녹은 물이 범람하는 주기가 <span className="text-accent font-semibold">짧아지고</span> 피해 규모가 커지고 있습니다.
                </p>
              </div>
            </div>

            {/* 상세 설명 */}
            <div className="bg-white/5 rounded-xl p-5 border-l-4 border-accent">
              <p className="text-white/90 text-sm md:text-base leading-relaxed mb-3">
                알래스카의 빙하는 기후 변화로 인해 매우 빠르게 녹고 있으며, 이로 인해 대규모 침수 및 홍수 피해가 매년 반복되고 있습니다. 특히 멘덴홀 빙하 등의 융해로 인한 빙하 호수 범람으로 준우(Juneau) 지역을 중심으로 주택 및 도로 침수 피해가 심각해지고 있습니다.
              </p>
              <div className="flex items-center gap-2 text-white/60 text-xs">
                <ExternalLink className="w-3 h-3" />
                <span>출처: YTN 뉴스 (2024. 8. 9.)</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* 2. TRUST BADGES */}
        <motion.div
          className="flex justify-center gap-4 md:gap-8 mb-12 md:mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {trustBadges.map((badge, idx) => (
            <div 
              key={idx}
              className="text-center"
            >
              <div className="w-20 h-20 md:w-24 md:h-24 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 flex flex-col items-center justify-center mb-2">
                <span className="text-2xl md:text-3xl font-bold text-accent">
                  {badge.number}
                </span>
              </div>
              <span className="text-sm md:text-base text-white/70">
                {badge.label}
              </span>
            </div>
          ))}
        </motion.div>

        {/* 3. CALL TO ACTION */}
        <motion.div
          className="max-w-md mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          {/* CTA Header */}
          <div className="text-center mb-6">
            <div className="inline-flex items-center gap-2 text-accent">
              <Phone className="w-6 h-6" />
              <span className="text-xl md:text-2xl font-bold">
                전화 한 통이면 됩니다
              </span>
            </div>
          </div>

          {/* Phone Cards */}
          <div className="space-y-3 mb-6">
            {contacts.map((contact, idx) => (
              <a
                key={idx}
                href={`tel:${contact.phone.replace(/-/g, '')}`}
                className="flex items-center justify-between p-4 md:p-5 rounded-2xl bg-primary/80 border border-white/10 hover:border-accent/50 hover:bg-accent/10 transition-all duration-300 group"
              >
                <div>
                  <p className="text-white/70 text-sm mb-1">{contact.name}</p>
                  <p className="text-2xl md:text-3xl font-bold text-accent tracking-wide">
                    {contact.phone}
                  </p>
                </div>
                <div className="bg-accent text-primary px-4 py-2 rounded-full font-bold text-sm group-hover:scale-105 transition-transform">
                  통화
                </div>
              </a>
            ))}
          </div>

          {/* Business Hours */}
          <p className="text-center text-white/60 text-sm mb-6">
            상담시간 09:00 - 18:00
          </p>

          {/* KakaoTalk Button */}
          <a
            href="#"
            className="flex items-center justify-center gap-3 w-full p-4 rounded-2xl bg-[#FEE500] text-[#3C1E1E] font-bold text-lg hover:brightness-95 transition-all mb-8"
          >
            <MessageCircle className="w-6 h-6" />
            카카오톡으로 문의하기
          </a>

          {/* Reassurances */}
          <div className="space-y-2 mb-10">
            {reassurances.map((text, idx) => (
              <div 
                key={idx}
                className="flex items-center gap-3 text-white/70"
              >
                <Check className="w-5 h-5 text-accent flex-shrink-0" />
                <span className="text-base">{text}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* 4. FINAL EMOTIONAL CLOSE */}
        <motion.div
          className="text-center pt-8 border-t border-white/10"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <p className="text-xl md:text-2xl text-white/90 italic leading-relaxed">
            "평생 한 번,
            <br />
            <span className="text-accent font-semibold">지금 아니면 언제 가시겠어요?</span>"
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default FinalCTASection;
