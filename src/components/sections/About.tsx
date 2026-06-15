import React, { useRef, useEffect } from "react";
import { translations } from "@/data";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLanguage } from "@/contexts/LanguageContext";
import { TextReveal } from "@/components/ui/TextReveal";

gsap.registerPlugin(ScrollTrigger);

export function About() {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const { language } = useLanguage();
  const t = translations[language];

  useEffect(() => {
    if (!containerRef.current) return;

    // Parallax effect on cards when scrolling
    cardsRef.current.forEach((card, i) => {
      if (!card) return;
      gsap.fromTo(
        card,
        { y: 100, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: card,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        },
      );
    });
  }, []);

  return (
    <section
      id="about"
      className="relative py-24 sm:py-32 px-6 sm:px-8 md:px-16"
      ref={containerRef}
    >
      <div className="max-w-6xl w-full mx-auto">
        <h2 className="text-4xl md:text-6xl font-light font-serif italic opacity-90 text-white mb-16">
          <TextReveal>{t.ui.technicalArsenal}</TextReveal>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {t.skills.map((skillGroup, index) => (
            <div
              key={index}
              ref={(el) => {
                cardsRef.current[index] = el;
              }}
              className="bg-white/5 border border-white/20 backdrop-blur-md shadow-[0_8px_32px_0_rgba(255,255,255,0.03)] rounded-2xl p-8 hover:bg-white/10 hover:border-white/30 transition-all duration-300"
            >
              <h3 className="text-[10px] uppercase tracking-[0.2em] text-white/40 mb-6 border-b border-white/10 pb-4">
                {skillGroup.category}
              </h3>
              <ul className="flex flex-wrap gap-2">
                {skillGroup.items.map((item, i) => (
                  <li
                    key={i}
                    className="text-[9px] border border-white/20 px-3 py-1.5 rounded-full uppercase tracking-wider text-white"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
