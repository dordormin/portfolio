import React, { useRef, useEffect } from "react";
import { translations } from "@/data";
import gsap from "gsap";
import { motion } from "motion/react";
import { useLanguage } from "@/contexts/LanguageContext";
import { handleDownloadCV } from "@/utils/downloadCv";
import { Magnetic } from "../ui/Magnetic";
import { TextScramble } from "../ui/TextScramble";

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
    <section id="hero" className="relative min-h-screen md:min-h-screen flex items-center px-6 md:px-16 py-16 md:py-0">
      <div ref={textRef} className="max-w-6xl w-full mx-auto relative z-10">
        <p className="text-orange-500 font-mono mb-4 text-[11px] tracking-[0.4em] uppercase">
          <TextScramble text={t.personalInfo.role} delay={800} />
        </p>
        <h1 className="text-6xl sm:text-7xl md:text-8xl lg:text-[7rem] font-light tracking-tighter leading-none italic font-serif opacity-90 text-white mb-6">
          <TextScramble text={t.personalInfo.name} delay={200} speed={40} />
        </h1>
        <h2 className="text-xl sm:text-2xl font-light text-white/50 mb-12 max-w-2xl leading-relaxed">
          {t.personalInfo.summary}
        </h2>
        
        <div className="flex flex-wrap gap-4 items-center">
          <Magnetic intensity={0.1}>
            <a href="#projects" className="px-8 py-3 bg-white text-black text-sm uppercase tracking-wider font-semibold rounded-full hover:bg-zinc-200 transition-colors whitespace-nowrap">
              {t.ui.viewWork}
            </a>
          </Magnetic>
          <Magnetic intensity={0.1}>
            <a href="#contact" className="px-8 py-3 bg-white/5 text-white border border-white/20 text-sm uppercase tracking-wider font-semibold rounded-full hover:bg-white/10 transition-colors whitespace-nowrap">
              {t.ui.contactMe}
            </a>
          </Magnetic>
          <Magnetic intensity={0.1}>
            <motion.a 
              href="#"
              onClick={(e) => handleDownloadCV(language, e)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 px-8 py-3 bg-orange-600 text-white text-sm uppercase tracking-wider font-semibold rounded-full hover:bg-orange-500 transition-colors shadow-lg shadow-orange-900/20 whitespace-nowrap"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" x2="12" y1="15" y2="3"/></svg>
              <span>{t.ui.downloadCv}</span>
            </motion.a>
          </Magnetic>
        </div>
      </div>
      <div className="absolute bottom-12 left-8 md:left-16 right-8 md:right-16 h-[1px] bg-gradient-to-r from-white/20 via-white/5 to-transparent hidden md:block"></div>
    </section>
  );
}
