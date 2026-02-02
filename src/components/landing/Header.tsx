import { useState, useEffect } from "react";
import { Phone, Calendar, Menu, X } from "lucide-react";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToItinerary = () => {
    setIsMobileMenuOpen(false);
    document.getElementById("itinerary")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 safe-top ${
        isScrolled
          ? "bg-white shadow-card py-3"
          : "bg-transparent py-4"
      }`}
    >
      <div className="container mx-auto px-5">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <a href="/" className="flex items-center group">
            <span
              className={`text-2xl md:text-3xl font-display transition-all duration-300 ${
                isScrolled ? "text-primary" : "text-white"
              }`}
            >
              <span className="font-bold">Alaska</span>
              <span className="font-medium">Trip</span>
            </span>
            {!isScrolled && (
              <span className="ml-3 text-sm text-white/70 italic font-display hidden sm:block">
                Let's go Alaska!!!
              </span>
            )}
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-3">
            <a
              href="tel:010-6424-7774"
              className={`px-5 py-2.5 rounded-xl font-semibold transition-all duration-200 ${
                isScrolled 
                  ? "text-primary border-2 border-primary/30 hover:bg-primary/5 hover:border-primary/50" 
                  : "text-white border-2 border-white/30 hover:bg-white/10 hover:border-white/50"
              }`}
            >
              <Phone className="w-4 h-4 inline-block mr-2" />
              전화상담
            </a>
            <button
              onClick={scrollToItinerary}
              className={`px-5 py-2.5 rounded-xl font-semibold transition-all duration-200 ${
                isScrolled 
                  ? "bg-primary text-primary-foreground hover:bg-primary/90 shadow-sm" 
                  : "bg-accent text-primary hover:bg-accent/90 shadow-gold"
              }`}
            >
              <Calendar className="w-4 h-4 inline-block mr-2" />
              일정보기
            </button>
          </nav>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-2">
            <a
              href="tel:010-6424-7774"
              className={`p-2.5 rounded-xl transition-all duration-200 ${
                isScrolled 
                  ? "bg-primary text-primary-foreground shadow-sm" 
                  : "bg-white/20 backdrop-blur-sm text-white border border-white/30"
              }`}
            >
              <Phone className="w-5 h-5" />
            </a>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`p-2.5 rounded-xl transition-all duration-200 ${
                isScrolled 
                  ? "text-foreground hover:bg-secondary" 
                  : "text-white hover:bg-white/10"
              }`}
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <nav className="md:hidden mt-4 pb-2">
            <div className="flex flex-col gap-3 bg-white/95 backdrop-blur-md rounded-2xl p-4 shadow-elegant border border-white/20">
              <a
                href="tel:010-6424-7774"
                className="flex items-center gap-3 text-foreground text-lg font-semibold py-4 px-5 rounded-xl hover:bg-primary/5 hover:text-primary transition-all duration-200 border border-transparent hover:border-primary/20"
              >
                <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
                  <Phone className="w-5 h-5 text-accent" />
                </div>
                전화상담
              </a>
              <button
                onClick={scrollToItinerary}
                className="btn-gold text-lg justify-center shadow-gold"
              >
                <Calendar className="w-5 h-5" />
                일정보기
              </button>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
