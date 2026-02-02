const Footer = () => {
  return (
    <footer className="bg-primary py-10 text-white">
      <div className="container mx-auto px-5">
        <div className="text-center space-y-4">
          {/* Brand */}
          <p className="font-bold text-xl text-white">
            AlaskaTrip
          </p>
          
          {/* Operating Company */}
          <p className="text-base text-white/80">
            AlaskaTrip은 (주)아름다운비행이 운영합니다.
          </p>
          
          {/* Business Info */}
          <div className="text-sm text-white/60 space-y-1">
            <p>사업자등록번호: 114-86-62823 | 대표: 엄태인</p>
            <p>서울특별시 종로구 새문안로3길 36, 1225호</p>
          </div>
          
          {/* Copyright */}
          <p className="text-sm text-white/40 pt-4">
            © 2026 AlaskaTrip. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
