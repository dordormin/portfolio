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
          duration: 1,
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
    <section id="projects" className="py-24 sm:py-32 md:py-40 px-6 sm:px-10 md:px-16 lg:px-24 relative z-10">
      <div className="max-w-[90rem] w-full mx-auto" ref={containerRef}>
        <h2 className="text-5xl sm:text-7xl md:text-[6rem] lg:text-[7rem] font-light font-serif italic opacity-90 text-white mb-20 md:mb-32 tracking-tighter leading-none">
          <TextReveal>{t.ui.featuredWork}</TextReveal>
        </h2>
        
        <div className="flex flex-col border-t border-white/20">
          {t.projects.map((project, index) => (
            <Parallax key={project.id} offset={10}>
              <div 
                ref={el => { cardsRef.current[index] = el; }} 
                onClick={() => setSelectedProject(project)}
                className="group flex flex-col md:flex-row items-start md:items-center justify-between gap-8 md:gap-16 py-12 md:py-24 border-b border-white/10 cursor-pointer"
              >
                {/* Left Side: Number and Title */}
                <div className="w-full md:w-1/2 flex flex-col">
                  <span className="text-xs md:text-sm font-mono text-orange-500 mb-6 tracking-[0.2em] uppercase">
                    {(index + 1).toString().padStart(2, '0')} — {t.ui.project}
                  </span>
                  <h3 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-light tracking-tighter text-white transition-transform duration-700 group-hover:translate-x-4">
                    {project.title}
                  </h3>
                </div>
                
                {/* Right Side: Description and Action */}
                <div className="w-full md:w-1/2 flex flex-col items-start md:items-end text-left md:text-right mt-4 md:mt-0">
                  <p className="text-white/50 text-lg sm:text-xl lg:text-2xl font-light leading-relaxed mb-10 max-w-xl transition-colors duration-500 group-hover:text-white/70">
                    {project.shortDescription}
                  </p>
                  
                  <div className="flex flex-wrap gap-3 md:justify-end mb-8 w-full">
                    {project.tags.map(tag => (
                      <span key={tag} className="text-[10px] sm:text-xs font-mono uppercase tracking-widest text-white/40 border border-white/10 px-4 py-2 rounded-full">
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="text-orange-500 transform transition-all duration-500 group-hover:translate-x-2 group-hover:-translate-y-2 group-hover:scale-110">
                    <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
                  </div>
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
              <h2 className="text-4xl md:text-6xl font-light text-white mb-6 tracking-tight">{selectedProject.title}</h2>
              <div className="flex flex-wrap gap-2 mb-8">
                {selectedProject.tags.map(tag => (
                  <span key={tag} className="text-[10px] border border-white/20 px-3 py-1.5 rounded-full uppercase tracking-wider text-white">
                    {tag}
                  </span>
                ))}
              </div>
              <p className="text-xl text-white/50 font-light leading-relaxed">{selectedProject.shortDescription}</p>
            </div>
            
            <div className="space-y-10 pb-8">
              <div>
                <h3 className="text-sm font-mono tracking-[0.2em] text-orange-500 uppercase mb-4">
                  01. {t.ui.theChallenge}
                </h3>
                <p className="text-white/80 leading-relaxed font-light text-lg">
                  {selectedProject.caseStudy.challenge}
                </p>
              </div>
              
              <div>
                <h3 className="text-sm font-mono tracking-[0.2em] text-orange-500 uppercase mb-4">
                  02. {t.ui.theSolution}
                </h3>
                <p className="text-white/80 leading-relaxed font-light text-lg">
                  {selectedProject.caseStudy.solution}
                </p>
              </div>

              <div>
                <h3 className="text-sm font-mono tracking-[0.2em] text-orange-500 uppercase mb-4">
                  03. {t.ui.theImpact}
                </h3>
                <p className="text-white/80 leading-relaxed font-light text-lg">
                  {selectedProject.caseStudy.impact}
                </p>
              </div>

              <div className="pt-8 flex gap-4">
                {selectedProject.link !== "#" && (
                  <Magnetic intensity={0.1}>
                    <a 
                      href={selectedProject.link} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-3 px-8 py-4 bg-white text-black font-semibold uppercase tracking-widest text-sm rounded-full hover:bg-zinc-200 transition-colors whitespace-nowrap"
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
