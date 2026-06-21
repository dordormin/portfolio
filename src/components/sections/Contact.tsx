import React from "react";
import { translations } from "@/data";
import { Mail, MapPin, Phone } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { handleDownloadCV } from "@/utils/downloadCv";
import { Magnetic } from "../ui/Magnetic";

export function Contact() {
  const { language } = useLanguage();
  const t = translations[language];

  return (
    <footer id="contact" className="px-6 sm:px-10 md:px-16 lg:px-24 pt-16 pb-8 flex flex-col z-10 relative">
      <div className="max-w-[90rem] w-full mx-auto">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end w-full mb-16 gap-12 lg:gap-8">
        <div>
          <h2 className="text-5xl sm:text-6xl lg:text-8xl font-light font-serif italic text-white tracking-tighter leading-none mb-6">
            {t.ui.letsConnect.split(' ').map((word, i, arr) => (
              <React.Fragment key={i}>
                {word}{i !== arr.length - 1 && <br />}
              </React.Fragment>
            ))}
          </h2>
          <p className="text-white/40 text-lg leading-relaxed font-light max-w-md">
            {t.ui.contactLead}
          </p>
        </div>
        
        <div className="flex flex-col gap-3 sm:gap-4 text-white/50 text-xs sm:text-sm uppercase tracking-wider sm:tracking-widest font-mono items-start break-all sm:break-normal">
          <Magnetic intensity={0.2}>
            <a href={`mailto:${t.personalInfo.email}`} className="flex items-center gap-4 hover:text-white transition-colors">
              <Mail size={16} />
              <span>{t.personalInfo.email}</span>
            </a>
          </Magnetic>
          <Magnetic intensity={0.2}>
            <a href={`tel:${t.personalInfo.phone}`} className="flex items-center gap-4 hover:text-white transition-colors">
              <Phone size={16} />
              <span>{t.personalInfo.phone}</span>
            </a>
          </Magnetic>
          <Magnetic intensity={0.2}>
            <div className="flex items-center gap-4">
              <MapPin size={16} className="text-orange-500" />
              <span>{t.personalInfo.location}</span>
            </div>
          </Magnetic>
        </div>
      </div>
      
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end bg-black/20 p-6 rounded-2xl border border-white/5 gap-6">
          <div className="flex flex-col gap-4 text-left">
            <div className="flex items-center gap-4">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
              <span className="text-[10px] text-white/40 uppercase tracking-widest">{t.ui.availableForCollab}</span>
            </div>
            <span className="text-[10px] text-white/30 tracking-widest">© {new Date().getFullYear()} Dordor Minetdi. <span className="hidden sm:inline">|</span> Portfolio by <a href="https://dordorapps.tech" target="_blank" rel="noopener noreferrer" className="text-white/50 hover:text-white underline decoration-white/20 hover:decoration-white/50 underline-offset-4 transition-all pb-0.5">Dordor Apps</a></span>
          </div>
          <div className="flex flex-wrap gap-4 sm:gap-8 text-[10px] uppercase tracking-widest text-white/40">
            <Magnetic intensity={0.2}>
              <a href={t.personalInfo.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">LinkedIn</a>
            </Magnetic>
            <Magnetic intensity={0.2}>
              <a href={t.personalInfo.github} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">GitHub</a>
            </Magnetic>
            <Magnetic intensity={0.2}>
              <a href="#" onClick={(e) => handleDownloadCV(language, e as unknown as React.MouseEvent<HTMLAnchorElement>)} className="hover:text-white transition-colors">Resume.pdf</a>
            </Magnetic>
          </div>
        </div>
      </div>
    </footer>
  );
}
