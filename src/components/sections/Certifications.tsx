import React, { useRef, useEffect } from "react";
import { translations } from "@/data";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLanguage } from "@/contexts/LanguageContext";
import { TextReveal } from "@/components/ui/TextReveal";

gsap.registerPlugin(ScrollTrigger);

export function Certifications() {
  const containerRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<(HTMLDivElement | null)[]>([]);
  const { language } = useLanguage();
  const t = translations[language];

  useEffect(() => {
    if (!containerRef.current) return;

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
        },
      );
    });
  }, []);

  return (
    <section
      id="certifications"
      className="relative py-24 sm:py-32 md:py-40 px-6 sm:px-10 md:px-16 lg:px-24"
      ref={containerRef}
    >
      <div className="max-w-[90rem] w-full mx-auto">
        <h2 className="text-5xl sm:text-7xl md:text-[6rem] lg:text-[7rem] font-light font-serif italic opacity-90 text-white mb-20 md:mb-32 tracking-tighter leading-none">
          <TextReveal>{t.ui.certifications}</TextReveal>
        </h2>

        <div className="flex flex-col border-t border-white/20">
          {t.certifications.map((cert, index) => (
            <div
              key={index}
              ref={(el) => {
                itemsRef.current[index] = el;
              }}
              className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 py-8 md:py-12 border-b border-border group"
            >
              <div className="flex flex-col">
                <h3 className="text-2xl md:text-3xl lg:text-4xl font-light tracking-tight text-white mb-2 transition-colors duration-500 group-hover:text-white/80">
                  {cert.title}
                </h3>
                <p className="text-white/40 text-sm md:text-base font-light">{cert.issuer}</p>
              </div>
              <div className="text-xs md:text-sm font-mono uppercase tracking-[0.2em] text-orange-500 shrink-0">
                {cert.date}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
