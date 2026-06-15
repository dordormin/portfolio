import React, { useRef, useEffect } from "react";
import { translations } from "@/data";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLanguage } from "@/contexts/LanguageContext";
import { ChevronRight, Award } from "lucide-react";
import { TextReveal } from "@/components/ui/TextReveal";

gsap.registerPlugin(ScrollTrigger);

export function Experience() {
  const containerRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<(HTMLDivElement | null)[]>([]);
  const { language } = useLanguage();
  const t = translations[language];

  useEffect(() => {
    itemsRef.current.forEach((item, i) => {
      if (!item) return;
      gsap.fromTo(
        item,
        { x: -50, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: item,
            start: "top 80%",
          },
        }
      );
    });
  }, []);

  return (
    <section id="experience" className="py-24 sm:py-32 px-6 sm:px-8 md:px-16 relative">
      <div className="max-w-6xl w-full mx-auto" ref={containerRef}>
        <h2 className="text-4xl md:text-6xl font-light font-serif italic opacity-90 text-white mb-16">
          <TextReveal>{t.ui.professionalPath}</TextReveal>
        </h2>
        
        <div className="relative space-y-12 before:absolute before:inset-0 before:ml-[1.1rem] before:h-full before:w-[1px] before:bg-white/10">
          {t.experience.map((exp, index) => (
            <div 
              key={index} 
              ref={el => { itemsRef.current[index] = el; }}
              className="relative flex items-start gap-8"
            >
              <div className="flex items-center justify-center w-9 h-9 rounded-full border border-white/20 bg-[#050505] shrink-0 z-10 mt-1">
                <div className="w-2 h-2 bg-orange-500 rounded-full animate-pulse"></div>
              </div>
              <div className="flex-1 p-8 rounded-2xl bg-white/5 border border-white/20 backdrop-blur-md shadow-[0_8px_32px_0_rgba(255,255,255,0.03)] hover:bg-white/10 hover:border-white/30 transition-all duration-300">
                <div className="flex flex-col md:flex-row md:items-start justify-between mb-4 gap-4 md:gap-2">
                  <div>
                    <h3 className="font-light text-2xl md:text-3xl tracking-tight text-white mb-2">{exp.role}</h3>
                    <div className="text-white/50 text-sm">{exp.company} &bull; {exp.location}</div>
                  </div>
                  <span className="text-[10px] uppercase font-mono tracking-widest bg-white/10 px-2 py-1 rounded inline-flex shrink-0 w-fit text-white">{exp.period}</span>
                </div>
                <ul className="space-y-4 text-white/60 text-sm leading-relaxed mt-6">
                  {exp.responsibilities.map((ach, i) => (
                    <li key={i} className="flex gap-4 items-start group">
                      <div className="bg-white/5 p-1 rounded-full border border-white/10 group-hover:bg-orange-500/10 group-hover:border-orange-500/20 transition-colors mt-0.5 shrink-0">
                        <ChevronRight className="w-3 h-3 text-orange-500/70" />
                      </div>
                      <span className="pt-0.5">{ach}</span>
                    </li>
                  ))}
                  {exp.achievements.map((ach, i) => (
                    <li key={`ach-${i}`} className="flex gap-4 items-start group">
                      <div className="bg-white/5 p-1 rounded-full border border-white/10 group-hover:bg-green-500/10 group-hover:border-green-500/20 transition-colors mt-0.5 shrink-0">
                        <Award className="w-3 h-3 text-green-500/70" />
                      </div>
                      <span className="pt-0.5">{ach}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
