import React from 'react';
import { translations } from '@/data';
import { useLanguage } from '@/contexts/LanguageContext';
import { SectionRow } from '../ui/SectionRow';
import { AnimatedList } from '../ui/AnimatedList';
import { GraduationCap } from 'lucide-react';

export function Education() {
  const { language } = useLanguage();
  const t = translations[language as 'en' | 'fr'];

  return (
    <SectionRow
      id="education"
      title={t.ui.education}
      icon={<GraduationCap className="text-orange-500 w-6 h-6 md:w-8 md:h-8" />}
    >
      <div className="w-full lg:w-4/5 max-w-4xl pt-8">
        <AnimatedList 
          items={t.education}
          listId="education"
          renderItem={(edu) => (
            <div className="group relative w-full rounded-2xl bg-black/40 backdrop-blur-sm border border-white/5 hover:border-orange-500/30 hover:bg-black/60 transition-all duration-500 p-8">
              {/* Timeline Indicator */}
              <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-0 bg-gradient-to-b from-orange-500 to-amber-500 group-hover:h-2/3 transition-all duration-500 rounded-r-full" />
              
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
                <div className="flex items-center gap-4">
                  {edu.logo && (
                    <div className="w-16 h-16 rounded-xl bg-white/10 p-2 border border-white/5 flex items-center justify-center shrink-0">
                      <img src={edu.logo} alt={edu.institution} className="max-w-full max-h-full object-contain" />
                    </div>
                  )}
                  <div>
                    <h3 className="text-2xl font-light text-white group-hover:text-orange-400 transition-colors">
                      {edu.degree}
                    </h3>
                    <div className="flex items-center gap-3 mt-2 text-white/60">
                      <span className="font-mono text-sm tracking-wide text-orange-500/80">{edu.institution}</span>
                      <span className="w-1 h-1 rounded-full bg-white/20" />
                      <span className="text-sm font-mono">{edu.location}</span>
                    </div>
                  </div>
                </div>
                <div className="px-4 py-2 rounded-full border border-white/10 bg-white/5 text-sm font-mono text-white/80 shrink-0">
                  {edu.period}
                </div>
              </div>

              <ul className="space-y-4">
                {edu.highlights.map((highlight: string, i: number) => (
                  <li key={i} className="flex items-start text-white/70 text-lg leading-relaxed font-light">
                    <span className="text-orange-500 mr-4 mt-2">›</span>
                    <span className="flex-1">{highlight}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        />
      </div>
    </SectionRow>
  );
}
