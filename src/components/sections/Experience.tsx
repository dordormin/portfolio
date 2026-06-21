import React, { useRef } from "react";
import { translations } from "@/data";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLanguage } from "@/contexts/LanguageContext";
import { ChevronRight, Award } from "lucide-react";
import { TextReveal } from "@/components/ui/TextReveal";
import { AnimatedList } from "@/components/ui/AnimatedList";
import { SectionRow } from "@/components/ui/SectionRow";

gsap.registerPlugin(ScrollTrigger);

export function Experience() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { language } = useLanguage();
  const t = translations[language];

  return (
    <section id="experience" className="py-24 sm:py-32 md:py-40 px-6 sm:px-10 md:px-16 lg:px-24 relative z-10">
      <div className="max-w-[90rem] w-full mx-auto" ref={containerRef}>
        <h2 className="text-5xl sm:text-7xl md:text-[6rem] lg:text-[7rem] font-light font-serif italic opacity-90 text-white mb-20 md:mb-32 tracking-tighter leading-none">
          <TextReveal>{t.ui.professionalPath}</TextReveal>
        </h2>
        
        <div className="flex flex-col border-t border-white/20">
          <AnimatedList
            items={t.experience}
            renderItem={(exp) => (
              <SectionRow>
                <SectionRow.Left>
                  <SectionRow.Label>{exp.period}</SectionRow.Label>
                  <div>
                    <SectionRow.Title className="text-3xl md:text-4xl lg:text-5xl">{exp.company}</SectionRow.Title>
                    <SectionRow.Subtitle>{exp.location}</SectionRow.Subtitle>
                  </div>
                  {exp.logo && (
                    <div className="mt-4 w-24 h-24 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 p-3 flex items-center justify-center">
                      <img src={exp.logo} alt={exp.company} className="max-w-full max-h-full object-contain" />
                    </div>
                  )}
                </SectionRow.Left>
                
                <SectionRow.Right>
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
                </SectionRow.Right>
              </SectionRow>
            )}
          />
        </div>
      </div>
    </section>
  );
}
