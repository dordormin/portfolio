import React, { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/contexts/LanguageContext";
import { Magnetic } from "./ui/Magnetic";
import { Logo } from "./ui/Logo";

interface NavbarProps {
  viewMode: 'portfolio' | 'blog';
  setViewMode: (mode: 'portfolio' | 'blog') => void;
}

export function Navbar({ viewMode, setViewMode }: NavbarProps) {
  const [activeSegment, setActiveSegment] = useState("hero");
  const { language, setLanguage } = useLanguage();

  const navItems = [
    { name: language === "en" ? "Home" : "Accueil", href: "#hero" },
    { name: language === "en" ? "About" : "À propos", href: "#about" },
    { name: language === "en" ? "Education" : "Formation", href: "#education" },
    { name: language === "en" ? "Experience" : "Expérience", href: "#experience" },
    { name: language === "en" ? "Projects" : "Projets", href: "#projects" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      // Simple intersection-like logic based on scroll position
      const sections = navItems.map((item) => document.querySelector(item.href) as HTMLElement);
      const scrollPosition = window.scrollY + window.innerHeight / 3;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSegment(navItems[i].href.substring(1));
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 w-full md:w-20 lg:w-24 border-b md:border-b-0 md:border-r border-border flex flex-row md:flex-col items-center justify-between md:py-6 bg-black/40 backdrop-blur-xl shrink-0 z-50 md:h-screen"
      )}
    >
      <div className="flex flex-row md:flex-col items-center gap-6 sm:gap-8 shrink-0 pr-6 sm:pr-8 md:pr-0 md:w-full border-r border-border md:border-r-0 md:border-b py-4 md:py-0 px-6 sm:px-8 md:px-0 md:pb-4 lg:pb-6 self-stretch md:self-auto">
        <Magnetic intensity={0.2}>
          <div className="cursor-hover group">
            <Logo className="w-12 h-10 text-white/80 group-hover:text-primary transition-colors duration-500" />
          </div>
        </Magnetic>
        <Magnetic>
          <button 
            onClick={() => setLanguage(language === 'en' ? 'fr' : 'en')}
            className="text-[10px] md:text-[11px] font-mono border border-white/20 rounded px-2 md:px-3 py-1 md:py-1.5 uppercase hover:bg-white/20 transition-colors shrink-0"
          >
            {language}
          </button>
        </Magnetic>
      </div>
      <div className="flex flex-row md:flex-col gap-6 sm:gap-8 md:gap-4 lg:gap-8 xl:gap-12 overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] items-center flex-1 min-w-0 justify-start md:justify-evenly xl:justify-center md:w-full py-4 pl-6 sm:pl-8 md:pl-0 pr-6 sm:pr-8 md:pr-0">
        {navItems.map((item) => (
          <Magnetic key={item.href} intensity={0.3}>
            <a
              href={item.href}
              onClick={(e) => {
                if (viewMode === 'blog') {
                  setViewMode('portfolio');
                  setTimeout(() => handleNavClick(e, item.href), 100);
                } else {
                  handleNavClick(e, item.href);
                }
              }}
              className={cn(
                "whitespace-nowrap md:[writing-mode:vertical-rl] md:rotate-180 text-[10px] uppercase tracking-widest md:tracking-[0.3em] font-semibold transition-colors",
                activeSegment === item.href.substring(1) && viewMode === 'portfolio'
                  ? "text-white underline underline-offset-8"
                  : "text-white/50 hover:text-white"
              )}
            >
              {item.name}
            </a>
          </Magnetic>
        ))}

        {/* Blog Button */}
        <Magnetic intensity={0.3}>
          <button
            onClick={() => setViewMode(viewMode === 'blog' ? 'portfolio' : 'blog')}
            className={cn(
              "whitespace-nowrap md:[writing-mode:vertical-rl] md:rotate-180 text-[10px] uppercase tracking-widest md:tracking-[0.3em] font-semibold transition-colors",
              viewMode === 'blog'
                ? "text-primary underline underline-offset-8"
                : "text-primary/70 hover:text-primary"
            )}
          >
            {language === 'en' ? 'Blog 3D' : 'Blog 3D'}
          </button>
        </Magnetic>
      </div>
      <div className="hidden md:flex flex-col gap-4 text-white/40 items-center">
        <div className="w-[1px] h-4 md:h-6 lg:h-8 xl:h-12 bg-white/20 rounded-full"></div>
        <span className="text-[10px] [writing-mode:vertical-rl] rotate-180">© 2026</span>
      </div>
    </nav>
  );
}
