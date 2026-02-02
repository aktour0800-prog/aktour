import { Phone } from "lucide-react";

const FloatingCallButton = () => {
  return (
    <a
      href="tel:010-3309-0800"
      className="fixed bottom-6 right-6 z-50 flex items-center gap-2 bg-accent text-primary font-bold text-base px-5 py-4 rounded-full shadow-gold hover:scale-105 transition-transform duration-200 safe-bottom"
      style={{
        boxShadow: '0 4px 24px -4px hsla(43, 74%, 49%, 0.5)'
      }}
    >
      <Phone className="w-6 h-6" />
      <span className="hidden sm:inline">전화상담</span>
    </a>
  );
};

export default FloatingCallButton;
