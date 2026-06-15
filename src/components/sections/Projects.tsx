import React, { useRef, useEffect, useState } from "react";
import { translations } from "@/data";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Modal } from "@/components/ui/Modal";
import { useLanguage } from "@/contexts/LanguageContext";
import { Parallax } from "@/components/ui/Parallax";
import { Magnetic } from "@/components/ui/Magnetic";
import { TextReveal } from "@/components/ui/TextReveal";

gsap.registerPlugin(ScrollTrigger);

export function Projects() {
  const { language } = useLanguage();
  const t = translations[language];
  const [selectedProject, setSelectedProject] = useState<typeof t.projects[0] | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    cardsRef.current.forEach((card, i) => {
      if (!card) return;
      gsap.fromTo(
        card,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          delay: i * 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: card,
            start: "top 85%",
          },
        }
      );
    });
  }, []);

  return (
    <section id="projects" className="py-24 sm:py-32 px-6 sm:px-8 md:px-16 relative">
      <div className="max-w-6xl w-full mx-auto" ref={containerRef}>
        <h2 className="text-4xl md:text-6xl font-light font-serif italic opacity-90 text-white mb-16">
          <TextReveal>{t.ui.featuredWork}</TextReveal>
        </h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-6 gap-6 items-stretch">
          {t.projects.map((project, index) => (
            <Parallax key={project.id} offset={index % 2 === 0 ? 30 : -30}>
              <div 
                ref={el => { cardsRef.current[index] = el; }}
                onClick={() => setSelectedProject(project)}
                className="group relative bg-white/5 border border-white/20 rounded-2xl p-8 flex flex-col justify-between overflow-hidden backdrop-blur-md shadow-[0_8px_32px_0_rgba(255,255,255,0.03)] cursor-pointer hover:bg-white/10 hover:border-white/30 transition-all duration-500 h-full min-h-[320px]"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative z-10">
                  <div className="flex justify-between items-start mb-12">
                    <span className="text-[10px] font-mono bg-white/10 text-white px-2 py-1 rounded">0{index + 1} / {t.ui.project}</span>
                    <div className="text-white/30 group-hover:text-white transform group-hover:translate-x-1 transition-all duration-300">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
                    </div>
                  </div>
                  <h3 className="text-4xl font-light mb-4 tracking-tight text-white">{project.title}</h3>
                  <p className="text-white/50 text-sm leading-snug mb-8">
                    {project.shortDescription}
                  </p>
                </div>
                <div className="relative z-10 flex flex-wrap gap-2 mt-auto">
                  {project.tags.map(tag => (
                    <span key={tag} className="text-[9px] border border-white/20 px-3 py-1.5 rounded-full uppercase tracking-wider text-white">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </Parallax>
          ))}
        </div>
      </div>

      <Modal isOpen={!!selectedProject} onClose={() => setSelectedProject(null)}>
        {selectedProject && (
          <div className="text-left space-y-6">
            <div className="border-b border-white/10 pb-6 mb-6">
              <h2 className="text-4xl font-light text-white mb-4 tracking-tight">{selectedProject.title}</h2>
              <div className="flex flex-wrap gap-2 mb-6">
                {selectedProject.tags.map(tag => (
                  <span key={tag} className="text-[9px] border border-white/20 px-3 py-1.5 rounded-full uppercase tracking-wider text-white">
                    {tag}
                  </span>
                ))}
              </div>
              <p className="text-lg text-white/50 font-light">{selectedProject.shortDescription}</p>
            </div>
            
            <div className="space-y-6 pb-4">
              <div>
                <h3 className="text-xs sm:text-sm font-mono tracking-widest text-white/40 uppercase mb-2 flex items-center gap-2">
                  <span className="text-orange-500 font-bold">01.</span> {t.ui.theChallenge}
                </h3>
                <p className="text-white/70 leading-relaxed bg-white/5 p-4 sm:p-5 rounded-2xl border border-white/10 font-light text-sm sm:text-base">
                  {selectedProject.caseStudy.challenge}
                </p>
              </div>
              
              <div>
                <h3 className="text-xs sm:text-sm font-mono tracking-widest text-white/40 uppercase mb-2 flex items-center gap-2">
                  <span className="text-orange-500 font-bold">02.</span> {t.ui.theSolution}
                </h3>
                <p className="text-white/70 leading-relaxed bg-white/5 p-4 sm:p-5 rounded-2xl border border-white/10 font-light text-sm sm:text-base">
                  {selectedProject.caseStudy.solution}
                </p>
              </div>

              <div>
                <h3 className="text-xs sm:text-sm font-mono tracking-widest text-white/40 uppercase mb-2 flex items-center gap-2">
                  <span className="text-orange-500 font-bold">03.</span> {t.ui.theImpact}
                </h3>
                <p className="text-white/70 leading-relaxed bg-white/5 p-4 sm:p-5 rounded-2xl border border-white/10 font-light text-sm sm:text-base">
                  {selectedProject.caseStudy.impact}
                </p>
              </div>

              <div className="pt-4 pb-8 flex gap-4">
                {selectedProject.link !== "#" && (
                  <Magnetic intensity={0.1}>
                    <a 
                      href={selectedProject.link} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-6 sm:px-8 py-3 bg-white text-black font-semibold uppercase tracking-wider text-xs sm:text-sm rounded-full hover:bg-zinc-200 transition-colors whitespace-nowrap"
                    >
                      <span>{t.ui.viewLiveSite}</span>
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
                    </a>
                  </Magnetic>
                )}
              </div>
            </div>
          </div>
        )}
      </Modal>
    </section>
  );
}
