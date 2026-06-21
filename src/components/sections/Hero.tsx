import React, { useRef, useEffect } from "react";
import { translations } from "@/data";
import gsap from "gsap";
import { motion } from "motion/react";
import { useLanguage } from "@/contexts/LanguageContext";
import { handleDownloadCV } from "@/utils/downloadCv";
import { Magnetic } from "../ui/Magnetic";
import { TextScramble } from "../ui/TextScramble";
import { OSWidget } from "../ui/OSWidget";

export function Hero() {
  const textRef = useRef<HTMLDivElement>(null);
  const { language } = useLanguage();
  const t = translations[language];

  useEffect(() => {
    if (!textRef.current) return;
    
    gsap.fromTo(
      textRef.current.children,
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, stagger: 0.2, ease: "power3.out", delay: 0.2 }
    );
  }, []);

  return (
    <section id="hero" className="relative min-h-[100dvh] flex flex-col justify-center px-6 sm:px-10 md:px-16 lg:px-24 py-32 md:py-40 overflow-hidden">
      <div className="max-w-[90rem] w-full mx-auto relative z-10 flex flex-col lg:flex-row items-center justify-between gap-12 sm:gap-16 lg:gap-24">
        
        {/* Left Side: Intro */}
        <div ref={textRef} className="w-full lg:w-3/5 xl:w-2/3">
          <p className="text-orange-500 font-mono mb-4 sm:mb-6 text-[10px] sm:text-[11px] md:text-xs tracking-[0.4em] uppercase">
            <TextScramble text={t.personalInfo.role} delay={800} />
          </p>
          <h1 className="text-5xl sm:text-6xl md:text-8xl lg:text-[7.5rem] font-light tracking-tighter leading-none italic font-serif opacity-90 text-white mb-6 sm:mb-8">
            <TextScramble text={t.personalInfo.name} delay={200} speed={40} />
          </h1>
          <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-light text-white/50 mb-10 sm:mb-14 max-w-2xl lg:max-w-3xl leading-relaxed">
            {t.personalInfo.summary}
          </h2>
          
          <div className="flex flex-wrap gap-4 sm:gap-6 items-center">
            <Magnetic intensity={0.1}>
              <a href="#projects" className="px-6 sm:px-8 py-3 sm:py-4 bg-white text-black text-xs sm:text-sm uppercase tracking-wider font-semibold rounded-full hover:bg-zinc-200 transition-colors whitespace-nowrap">
                {t.ui.viewWork}
              </a>
            </Magnetic>
            <Magnetic intensity={0.1}>
              <a href="#contact" className="px-6 sm:px-8 py-3 sm:py-4 bg-white/5 text-white border border-white/20 text-xs sm:text-sm uppercase tracking-wider font-semibold rounded-full hover:bg-white/10 transition-colors whitespace-nowrap">
                {t.ui.contactMe}
              </a>
            </Magnetic>
            <Magnetic intensity={0.1}>
              <motion.a 
                href="#"
                onClick={(e) => handleDownloadCV(language, e)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2 sm:gap-3 px-6 sm:px-8 py-3 sm:py-4 bg-orange-600 text-white text-xs sm:text-sm uppercase tracking-wider font-semibold rounded-full hover:bg-orange-500 transition-colors shadow-lg shadow-orange-900/20 whitespace-nowrap"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 sm:w-5 sm:h-5"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" x2="12" y1="15" y2="3"/></svg>
                <span>{t.ui.downloadCv}</span>
              </motion.a>
            </Magnetic>
          </div>
        </div>

        {/* Right Side: OS Widget */}
        <div className="w-full sm:w-4/5 md:w-2/3 lg:w-2/5 xl:w-1/3 flex justify-center lg:justify-end mt-8 lg:mt-0">
          <div className="w-full max-w-sm lg:max-w-md">
            <OSWidget />
          </div>
        </div>

      </div>
      
      {/* Decorative divider following the content flow instead of absolute positioning */}
      <div className="max-w-[90rem] w-full mx-auto mt-16 lg:mt-24 h-[1px] bg-gradient-to-r from-white/20 via-white/5 to-transparent hidden sm:block relative z-10"></div>
    </section>
  );
}
