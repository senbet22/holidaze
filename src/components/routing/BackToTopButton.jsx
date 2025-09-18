import { useEffect, useState } from "react";
import { assets } from "../../assets/assets.mjs";
import { useDarkMode } from "../../hooks/useDarkMode";

export default function BackToTopButton() {
  const { isDarkMode } = useDarkMode();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      setIsVisible(window.scrollY > 400);
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <button
      onClick={scrollToTop}
      className={`fixed bottom-6 right-6 z-50 p-3 cursor-pointer rounded-full bg-amber-500/70 shadow-sm hover:bg-amber-500 focus:bg-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-300 shadow-primary transition-opacity duration-300 ${
        isVisible ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
      aria-label="Scroll back to top of page"
      aria-hidden={!isVisible}
      tabIndex={isVisible ? 0 : -1}
    >
      <img
        src={isDarkMode ? assets.dropdown_icon_white : assets.dropdown_icon}
        className="rotate-180"
        alt=""
        role="presentation"
      />
    </button>
  );
}
