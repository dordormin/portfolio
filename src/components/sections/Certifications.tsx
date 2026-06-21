import { useLanguage } from "@/contexts/LanguageContext";
import { translations } from "@/data";
import { TextReveal } from "@/components/ui/TextReveal";
import { AnimatedList } from "@/components/ui/AnimatedList";
import { SectionRow } from "@/components/ui/SectionRow";

export function Certifications() {
  const { language } = useLanguage();
  const t = translations[language];

  return (
    <section
      className="relative py-24 sm:py-32 md:py-40 px-6 sm:px-10 md:px-16 lg:px-24"
    >
      <div className="max-w-[90rem] w-full mx-auto">
        <h2 className="text-5xl sm:text-7xl md:text-[6rem] lg:text-[7rem] font-light font-serif italic opacity-90 text-white mb-20 md:mb-32 tracking-tighter leading-none">
          <TextReveal>{t.ui.certifications}</TextReveal>
        </h2>

        <AnimatedList
          items={t.certifications}
          renderItem={(cert) => (
            <SectionRow className="py-8 md:py-12 items-center">
              <SectionRow.Left className="w-full md:w-3/4 flex-row justify-start items-center gap-6">
                {cert.logo && (
                  <div className="w-16 h-16 md:w-20 md:h-20 shrink-0 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 p-3 flex items-center justify-center">
                    <img src={cert.logo} alt={cert.issuer} className="max-w-full max-h-full object-contain" />
                  </div>
                )}
                <div className="flex flex-col">
                  <SectionRow.Title className="text-2xl md:text-3xl lg:text-4xl mb-2">{cert.title}</SectionRow.Title>
                  <SectionRow.Subtitle className="mt-0">{cert.issuer}</SectionRow.Subtitle>
                </div>
              </SectionRow.Left>
              <SectionRow.Right className="w-full md:w-1/4 items-start md:items-end">
                <SectionRow.Label>{cert.date}</SectionRow.Label>
              </SectionRow.Right>
            </SectionRow>
          )}
        />
      </div>
    </section>
  );
}
