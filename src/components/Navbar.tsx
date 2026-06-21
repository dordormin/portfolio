import React, { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/contexts/LanguageContext";
import { Magnetic } from "./ui/Magnetic";
import { Logo } from "./ui/Logo";
import { Home, User, GraduationCap, Briefcase, FolderGit2, BookOpen } from "lucide-react";

interface NavbarProps {
  viewMode: 'portfolio' | 'blog';
  setViewMode: (mode: 'portfolio' | 'blog') => void;
}

export function Navbar({ viewMode, setViewMode }: NavbarProps) {
  const [activeSegment, setActiveSegment] = useState("hero");
  const { language, setLanguage } = useLanguage();

  const navItems = [
    { name: language === "en" ? "Home" : "Accueil", href: "#hero", icon: Home },
    { name: language === "en" ? "About" : "À propos", href: "#about", icon: User },
    { name: language === "en" ? "Education" : "Formation", href: "#education", icon: GraduationCap },
    { name: language === "en" ? "Experience" : "Expérience", href: "#experience", icon: Briefcase },
    { name: language === "en" ? "Projects" : "Projets", href: "#projects", icon: FolderGit2 },
  ];

  useEffect(() => {
    const handleScroll = () => {
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
        "fixed top-0 left-0 w-full md:w-20 lg:w-24 border-b md:border-b-0 md:border-r border-white/10 flex flex-row md:flex-col items-center justify-between md:py-6 bg-black/40 backdrop-blur-xl shrink-0 z-50 md:h-screen"
      )}
    >
      <div className="flex flex-row md:flex-col items-center gap-6 sm:gap-8 shrink-0 pr-6 sm:pr-8 md:pr-0 md:w-full border-r border-white/10 md:border-r-0 md:border-b py-4 md:py-0 px-6 sm:px-8 md:px-0 md:pb-4 lg:pb-6 self-stretch md:self-auto">
        <Magnetic intensity={0.2}>
          <div className="cursor-hover group">
            <Logo className="w-10 h-10 text-white/80 group-hover:text-orange-500 transition-colors duration-500" />
          </div>
        </Magnetic>
        <Magnetic>
          <button 
            onClick={() => setLanguage(language === 'en' ? 'fr' : 'en')}
            className="text-[10px] md:text-[11px] font-mono border border-white/20 rounded px-2 md:px-3 py-1 md:py-1.5 uppercase hover:bg-white/20 hover:text-orange-400 transition-colors shrink-0"
          >
            {language}
          </button>
        </Magnetic>
      </div>

      <div className="flex flex-row md:flex-col gap-6 sm:gap-8 md:gap-6 lg:gap-8 overflow-x-auto md:overflow-x-hidden md:overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] items-center flex-1 min-w-0 md:min-h-0 justify-start md:justify-center md:w-full py-4 pl-6 sm:pl-8 md:pl-0 pr-6 sm:pr-8 md:pr-0">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeSegment === item.href.substring(1) && viewMode === 'portfolio';
          
          return (
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
                className="group relative flex flex-row md:flex-col items-center justify-center gap-3 md:py-2 transition-all duration-500"
              >
                {/* Active Indicator Line */}
                <span className={cn(
                  "absolute -left-3 md:-left-4 lg:-left-6 w-1 rounded-r-full bg-orange-500 transition-all duration-500",
                  isActive ? "h-1/2 opacity-100" : "h-0 opacity-0"
                )} />

                <Icon className={cn(
                  "w-5 h-5 md:w-6 md:h-6 shrink-0 transition-all duration-500",
                  isActive ? "text-orange-500 scale-110" : "text-white/40 group-hover:text-white/80"
                )} />

                {/* Expanding Vertical Text (Desktop only) */}
                <div className={cn(
                  "hidden md:block overflow-hidden transition-all duration-500 ease-in-out",
                  isActive ? "max-h-40 opacity-100" : "max-h-0 opacity-0"
                )}>
                  <span className="[writing-mode:vertical-rl] rotate-180 text-[10px] uppercase tracking-[0.3em] font-semibold text-white whitespace-nowrap">
                    {item.name}
                  </span>
                </div>

                {/* Tooltip for inactive items */}
                {!isActive && (
                  <div className="absolute left-full ml-4 md:ml-8 px-4 py-2 bg-black/90 border border-white/10 rounded-lg backdrop-blur-md opacity-0 -translate-x-4 pointer-events-none transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0 hidden md:block z-50">
                    <span className="text-xs uppercase tracking-widest text-white whitespace-nowrap font-medium">
                      {item.name}
                    </span>
                  </div>
                )}
              </a>
            </Magnetic>
          );
        })}

        {/* Separator */}
        <div className="w-[1px] h-6 md:w-8 md:h-[1px] bg-white/10 rounded-full hidden md:block"></div>

        {/* Blog Button */}
        <Magnetic intensity={0.3}>
          <button
            onClick={() => setViewMode(viewMode === 'blog' ? 'portfolio' : 'blog')}
            className="group relative flex flex-row md:flex-col items-center justify-center gap-3 md:py-2 transition-all duration-500"
          >
            {/* Active Indicator Line */}
            <span className={cn(
              "absolute -left-3 md:-left-4 lg:-left-6 w-1 rounded-r-full bg-blue-500 transition-all duration-500",
              viewMode === 'blog' ? "h-1/2 opacity-100" : "h-0 opacity-0"
            )} />

            <BookOpen className={cn(
              "w-5 h-5 md:w-6 md:h-6 shrink-0 transition-all duration-500",
              viewMode === 'blog' ? "text-blue-500 scale-110" : "text-white/40 group-hover:text-blue-400"
            )} />

            {/* Expanding Vertical Text (Desktop only) */}
            <div className={cn(
              "hidden md:block overflow-hidden transition-all duration-500 ease-in-out",
              viewMode === 'blog' ? "max-h-40 opacity-100" : "max-h-0 opacity-0"
            )}>
              <span className="[writing-mode:vertical-rl] rotate-180 text-[10px] uppercase tracking-[0.3em] font-semibold text-blue-500 whitespace-nowrap">
                {language === 'en' ? 'Blog 3D' : 'Blog 3D'}
              </span>
            </div>

            {/* Tooltip for inactive state */}
            {viewMode !== 'blog' && (
              <div className="absolute left-full ml-4 md:ml-8 px-4 py-2 bg-black/90 border border-white/10 rounded-lg backdrop-blur-md opacity-0 -translate-x-4 pointer-events-none transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0 hidden md:block z-50">
                <span className="text-xs uppercase tracking-widest text-white whitespace-nowrap font-medium">
                  {language === 'en' ? 'Blog 3D' : 'Blog 3D'}
                </span>
              </div>
            )}
          </button>
        </Magnetic>
      </div>

      <div className="hidden md:flex flex-col gap-4 text-white/40 items-center justify-end flex-1 pb-6">
        <span className="text-[10px] [writing-mode:vertical-rl] rotate-180 tracking-widest">© 2026</span>
      </div>
    </nav>
  );
}
