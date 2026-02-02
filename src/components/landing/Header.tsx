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
          <a href="/" className="flex items-center">
            <span
              className={`text-xl font-bold transition-colors ${
                isScrolled ? "text-primary" : "text-white"
              }`}
            >
              AlaskaTrip
            </span>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            <a
              href="tel:010-6424-7774"
              className={`font-medium transition-colors ${
                isScrolled 
                  ? "text-foreground hover:text-primary" 
                  : "text-white/90 hover:text-white"
              }`}
            >
              전화상담
            </a>
            <button
              onClick={scrollToItinerary}
              className={`font-medium transition-colors ${
                isScrolled 
                  ? "text-foreground hover:text-primary" 
                  : "text-white/90 hover:text-white"
              }`}
            >
              일정보기
            </button>
          </nav>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-2">
            <a
              href="tel:010-6424-7774"
              className={`p-2 rounded-xl transition-colors ${
                isScrolled ? "bg-primary text-primary-foreground" : "bg-white/20 text-white"
              }`}
            >
              <Phone className="w-5 h-5" />
            </a>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`p-2 -mr-2 transition-colors ${
                isScrolled ? "text-foreground" : "text-white"
              }`}
            >
              {isMobileMenuOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <nav className="md:hidden mt-4 pb-2">
            <div className="flex flex-col gap-2 bg-white rounded-2xl p-4 shadow-card">
              <a
                href="tel:010-6424-7774"
                className="flex items-center gap-3 text-foreground text-lg font-semibold py-4 px-4 rounded-xl hover:bg-secondary transition-colors"
              >
                <Phone className="w-5 h-5 text-accent" />
                전화상담
              </a>
              <button
                onClick={scrollToItinerary}
                className="btn-gold text-lg justify-center"
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
