import React, { useRef, useEffect } from "react";
import { translations } from "@/data";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLanguage } from "@/contexts/LanguageContext";
import { TextReveal } from "@/components/ui/TextReveal";
import { 
  Brain, Network, Database, Cloud, Code2, Bot, Layout, Server, Rocket, Box, Shield, Terminal
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

type LogoType = string | React.FC<any>;

const skillToLogos: Record<string, LogoType[]> = {
  "C# & .NET": ["dotnet", Code2],
  "Python (FastAPI, Django)": ["python", "fastapi", "django"],
  "Java & Spring Boot": [Code2, "springboot"],
  "PostgreSQL & SQLite": ["postgresql", "sqlite"],
  "MongoDB": ["mongodb"],
  
  "React & Vite": ["react", "vite"],
  "Angular": ["angular"],
  "JavaScript / TypeScript": ["javascript", "typescript"],
  "HTML5 & CSS3": ["html5", Layout],

  "LangChain & LangGraph": ["langchain"],
  "RAG Architectures": [Bot, Database],
  "Architectures RAG": [Bot, Database],
  "Data Pipelines": [Database, Network],
  "Pipelines de Données": [Database, Network],
  "SQLAlchemy": ["python", Database],

  "Docker & CI/CD": ["docker", "githubactions"],
  "AWS Cloud": [Cloud, Server],
  "Agile & Jira": ["jira", Layout],
  "TDD & Testing": [Shield, Terminal],
  "TDD & Tests": [Shield, Terminal],
};

export function About() {
  const containerRef = useRef<HTMLDivElement>(null);
  const rowsRef = useRef<(HTMLDivElement | null)[]>([]);
  const { language } = useLanguage();
  const t = translations[language];

  useEffect(() => {
    if (!containerRef.current) return;

    // Fade and slide up each row on scroll
    rowsRef.current.forEach((row, i) => {
      if (!row) return;
      gsap.fromTo(
        row,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: row,
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
      className="relative py-24 sm:py-32 px-6 sm:px-10 md:px-16 lg:px-24"
      ref={containerRef}
    >
      <div className="max-w-[90rem] w-full mx-auto">
        <h2 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-light font-serif italic text-white/90 tracking-tighter mb-12 md:mb-24">
          <TextReveal>{t.ui.technicalArsenal}</TextReveal>
        </h2>

        <div className="flex flex-col gap-12 md:gap-24">
          {t.skills.map((skillGroup, index) => (
            <div 
              key={index} 
              className="flex flex-col lg:flex-row gap-8 lg:gap-24 border-t border-white/10 pt-10 md:pt-16" 
              ref={(el) => { rowsRef.current[index] = el; }}
            >
              
              <div className="lg:w-1/3 shrink-0">
                <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-light font-serif italic text-white/80">
                  {skillGroup.category}
                </h3>
              </div>
              
              <div className="lg:w-2/3">
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-8 sm:gap-x-12 sm:gap-y-10">
                  {skillGroup.items.map((item, i) => {
                    const logos = skillToLogos[item] || [];
                    return (
                      <li key={i} className="flex flex-col gap-4 group">
                        <span className="text-sm md:text-base font-mono uppercase tracking-widest text-white/50 group-hover:text-white transition-colors duration-500">
                          {item}
                        </span>
                        
                        <div className="flex gap-4 items-center opacity-30 group-hover:opacity-100 transition-opacity duration-500 min-h-[32px]">
                          {logos.length > 0 ? (
                            logos.map((logo, j) => {
                              if (typeof logo === 'string') {
                                return (
                                  <img 
                                    key={j} 
                                    src={`https://cdn.simpleicons.org/${logo}/white`} 
                                    alt={logo} 
                                    className="w-6 h-6 md:w-8 md:h-8" 
                                  />
                                );
                              } else {
                                const IconComponent = logo;
                                return <IconComponent key={j} className="w-6 h-6 md:w-8 md:h-8 text-white" strokeWidth={1.5} />;
                              }
                            })
                          ) : (
                            <div className="w-6 h-6 md:w-8 md:h-8 rounded-full border border-white/20"></div>
                          )}
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </div>

            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
