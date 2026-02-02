import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Phone, MessageCircle, Check, Users, Award, Tv, TrendingDown, AlertTriangle, Clock, ExternalLink, Play } from "lucide-react";

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
            <div className="bg-white/5 rounded-xl p-5 border-l-4 border-accent mb-4">
              <p className="text-white/90 text-sm md:text-base leading-relaxed mb-3">
                알래스카의 빙하는 기후 변화로 인해 매우 빠르게 녹고 있으며, 이로 인해 대규모 침수 및 홍수 피해가 매년 반복되고 있습니다. 특히 멘덴홀 빙하 등의 융해로 인한 빙하 호수 범람으로 준우(Juneau) 지역을 중심으로 주택 및 도로 침수 피해가 심각해지고 있습니다.
              </p>
              <p className="text-white/80 text-sm mb-4">
                이 영상은 알래스카 빙하가 녹아 발생한 홍수 상황을 보여줍니다:
              </p>
            </div>

            {/* YouTube 동영상 링크 */}
            <a
              href="https://youtu.be/fWfDyIjp2B4?si=2R723Qx_mX8jb-ep"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative block rounded-xl overflow-hidden border border-white/20 hover:border-accent/50 transition-all duration-300"
            >
              <div className="relative aspect-video bg-white/5">
                {/* YouTube 썸네일 */}
                <img
                  src="https://img.youtube.com/vi/fWfDyIjp2B4/maxresdefault.jpg"
                  alt="알래스카 빙하 녹음 관련 YTN 뉴스"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    // 썸네일 로드 실패 시 대체 이미지
                    e.currentTarget.src = "https://img.youtube.com/vi/fWfDyIjp2B4/hqdefault.jpg";
                  }}
                />
                {/* 플레이 버튼 오버레이 */}
                <div className="absolute inset-0 flex items-center justify-center bg-black/30 group-hover:bg-black/40 transition-colors">
                  <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-accent/90 flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg">
                    <Play className="w-8 h-8 md:w-10 md:h-10 text-primary ml-1" fill="currentColor" />
                  </div>
                </div>
                {/* 동영상 정보 */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                  <div className="flex items-center gap-2 text-white">
                    <span className="bg-red-600 text-white text-xs font-bold px-2 py-1 rounded">YTN</span>
                    <span className="text-sm font-medium">알래스카 빙하 녹음으로 인한 홍수 상황</span>
                  </div>
                  <div className="flex items-center gap-2 mt-1 text-white/70 text-xs">
                    <span>00:33</span>
                    <span>•</span>
                    <span>2024. 8. 9.</span>
                  </div>
                </div>
              </div>
            </a>

            {/* 출처 링크 */}
            <div className="mt-4 flex items-center justify-center gap-2">
              <a
                href="https://youtu.be/fWfDyIjp2B4?si=2R723Qx_mX8jb-ep"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-white/60 hover:text-accent text-xs transition-colors"
              >
                <ExternalLink className="w-3 h-3" />
                <span>출처: YTN 뉴스 (2024. 8. 9.) - 동영상 보기</span>
              </a>
            </div>
          </div>
        </motion.div>

        {/* 2. TRUST BADGES */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-12 md:mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {trustBadges.map((badge, idx) => {
            const Icon = badge.icon;
            return (
              <motion.div
                key={idx}
                className="group relative"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.2 + idx * 0.1 }}
                whileHover={{ y: -4 }}
              >
                <div className="relative bg-white/5 backdrop-blur-md rounded-2xl p-6 md:p-8 border border-white/10 hover:border-accent/30 transition-all duration-300 overflow-hidden">
                  {/* 그라데이션 배경 효과 */}
                  <div className="absolute inset-0 bg-gradient-to-br from-accent/5 via-transparent to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  
                  {/* 아이콘 */}
                  <div className="relative flex items-center justify-center mb-4">
                    <div className="w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-gradient-to-br from-accent/20 to-accent/10 border border-accent/30 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <Icon className="w-8 h-8 md:w-10 md:h-10 text-accent" />
                    </div>
                  </div>
                  
                  {/* 숫자/텍스트 */}
                  <div className="relative text-center mb-3">
                    <div className="text-3xl md:text-4xl font-bold text-accent mb-2 group-hover:scale-105 transition-transform duration-300">
                      {badge.number}
                    </div>
                    <div className="text-base md:text-lg font-semibold text-white">
                      {badge.label}
                    </div>
                  </div>
                  
                  {/* 호버 효과 - 하단 골드 라인 */}
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-accent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* 3. CALL TO ACTION */}
        <motion.div
          className="max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          {/* CTA Header - 더 세련된 디자인 */}
          <motion.div
            className="text-center mb-8"
            initial={{ opacity: 0, y: 10 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <div className="inline-flex items-center gap-3 mb-3">
              <div className="w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center">
                <Phone className="w-6 h-6 text-accent" />
              </div>
              <h3 className="text-2xl md:text-3xl font-bold text-white">
                전화 한 통이면 됩니다
              </h3>
            </div>
            <p className="text-white/70 text-base">
              지금 바로 상담받고 특별한 여행을 시작하세요
            </p>
          </motion.div>

          {/* Phone Cards - 개선된 디자인 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            {contacts.map((contact, idx) => (
              <motion.a
                key={idx}
                href={`tel:${contact.phone.replace(/-/g, '')}`}
                className="group relative bg-white/5 backdrop-blur-md rounded-2xl p-6 border border-white/10 hover:border-accent/50 transition-all duration-300 overflow-hidden"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.6 + idx * 0.1 }}
                whileHover={{ y: -4, scale: 1.02 }}
              >
                {/* 그라데이션 배경 효과 */}
                <div className="absolute inset-0 bg-gradient-to-br from-accent/5 via-transparent to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                <div className="relative flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                      <p className="text-white/60 text-xs font-medium uppercase tracking-wider">
                        {contact.name}
                      </p>
                    </div>
                    <p className="text-2xl md:text-3xl font-bold text-accent tracking-tight mb-1 group-hover:scale-105 transition-transform duration-300">
                      {contact.phone}
                    </p>
                  </div>
                  
                  {/* 통화 버튼 */}
                  <div className="ml-4 flex-shrink-0">
                    <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-accent to-accent/80 flex items-center justify-center group-hover:scale-110 group-hover:shadow-gold transition-all duration-300">
                      <Phone className="w-6 h-6 text-primary" />
                    </div>
                  </div>
                </div>
                
                {/* 하단 골드 라인 */}
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-accent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </motion.a>
            ))}
          </div>

          {/* Business Hours - 개선된 스타일 */}
          <motion.div
            className="flex items-center justify-center gap-2 mb-8"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.8 }}
          >
            <Clock className="w-4 h-4 text-white/50" />
            <p className="text-white/60 text-sm">
              상담시간 <span className="text-accent font-semibold">09:00 - 18:00</span>
            </p>
          </motion.div>

          {/* KakaoTalk Button - 개선된 디자인 */}
          <motion.a
            href="#"
            className="group relative flex items-center justify-center gap-3 w-full p-5 rounded-2xl bg-[#FEE500] text-[#3C1E1E] font-bold text-lg hover:shadow-2xl transition-all duration-300 mb-8 overflow-hidden"
            initial={{ opacity: 0, y: 10 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.9 }}
            whileHover={{ scale: 1.02 }}
          >
            {/* 배경 효과 */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#FEE500] to-[#FDD800] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            
            <MessageCircle className="w-6 h-6 relative z-10" />
            <span className="relative z-10">카카오톡으로 문의하기</span>
            
            {/* 우측 화살표 */}
            <div className="absolute right-5 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300 relative z-10">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </motion.a>

          {/* Reassurances - 개선된 디자인 */}
          <motion.div
            className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 mb-10"
            initial={{ opacity: 0, y: 10 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 1.0 }}
          >
            <div className="space-y-4">
              {reassurances.map((text, idx) => (
                <div 
                  key={idx}
                  className="flex items-start gap-3"
                >
                  <div className="w-6 h-6 rounded-full bg-accent/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Check className="w-4 h-4 text-accent" />
                  </div>
                  <p className="text-white/80 text-base leading-relaxed flex-1">
                    {text}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>
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
