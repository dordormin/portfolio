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
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: item,
            start: "top 85%",
          },
        }
      );
    });
  }, []);

  return (
    <section id="experience" className="py-24 sm:py-32 md:py-40 px-6 sm:px-10 md:px-16 lg:px-24 relative z-10">
      <div className="max-w-[90rem] w-full mx-auto" ref={containerRef}>
        <h2 className="text-5xl sm:text-7xl md:text-[6rem] lg:text-[7rem] font-light font-serif italic opacity-90 text-white mb-20 md:mb-32 tracking-tighter leading-none">
          <TextReveal>{t.ui.professionalPath}</TextReveal>
        </h2>
        
        <div className="flex flex-col border-t border-white/20">
          {t.experience.map((exp, index) => (
            <div 
              key={index} 
              ref={el => { itemsRef.current[index] = el; }}
              className="flex flex-col lg:flex-row items-start gap-8 lg:gap-16 py-12 md:py-20 border-b border-border group"
            >
              {/* Left Column: Timeline & Company */}
              <div className="w-full lg:w-1/3 shrink-0 flex flex-col gap-4">
                <span className="text-xs md:text-sm uppercase font-mono tracking-[0.2em] text-orange-500">
                  {exp.period}
                </span>
                <div>
                  <h3 className="text-3xl md:text-4xl lg:text-5xl font-light tracking-tight text-white transition-colors duration-500 group-hover:text-white/80">
                    {exp.company}
                  </h3>
                  <div className="text-white/40 text-sm mt-2">{exp.location}</div>
                </div>
              </div>
              
              {/* Right Column: Role & Details */}
              <div className="w-full lg:w-2/3 flex flex-col">
                <h4 className="text-2xl md:text-3xl lg:text-4xl font-light text-white mb-8 leading-tight">
                  {exp.role}
                </h4>
                
                <ul className="space-y-6 text-white/60 text-base md:text-lg lg:text-xl font-light leading-relaxed max-w-3xl">
                  {exp.responsibilities.map((resp, i) => (
                    <li key={i} className="flex gap-4 items-start">
                      <div className="mt-1.5 shrink-0 opacity-50">
                        <ChevronRight className="w-4 h-4 text-orange-500" />
                      </div>
                      <span className="text-white/70">{resp}</span>
                    </li>
                  ))}
                  {exp.achievements.map((ach, i) => (
                    <li key={`ach-${i}`} className="flex gap-4 items-start pt-2">
                      <div className="mt-1.5 shrink-0 opacity-80">
                        <Award className="w-4 h-4 text-white" />
                      </div>
                      <span className="text-white">{ach}</span>
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
