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
          duration: 0.8,
          delay: i * 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: item,
            start: "top 90%",
            toggleActions: "play none none reverse",
          },
        },
      );
    });
  }, []);

  return (
    <section
      id="certifications"
      className="relative py-24 sm:py-32 px-6 sm:px-8 md:px-16 border-t border-white/5"
      ref={containerRef}
    >
      <div className="max-w-6xl w-full mx-auto">
        <h2 className="text-4xl md:text-6xl font-light font-serif italic opacity-90 text-white mb-16">
          <TextReveal>{t.ui.certifications}</TextReveal>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {t.certifications.map((cert, index) => (
            <div
              key={index}
              ref={(el) => {
                itemsRef.current[index] = el;
              }}
              className="bg-white/5 border border-white/20 backdrop-blur-md shadow-[0_8px_32px_0_rgba(255,255,255,0.03)] rounded-2xl p-8 hover:bg-white/10 hover:border-white/30 transition-all duration-300 flex items-center justify-between"
            >
              <div>
                <h3 className="text-xl font-light tracking-tight text-white mb-2">
                  {cert.title}
                </h3>
                <p className="text-white/50 text-sm">{cert.issuer}</p>
              </div>
              <div className="text-[10px] uppercase tracking-widest text-white/40 border border-white/10 px-3 py-1.5 rounded-full shrink-0 ml-4">
                {cert.date}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
