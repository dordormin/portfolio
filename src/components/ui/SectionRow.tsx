import React, { createContext, useContext, ReactNode } from "react";
import { cn } from "@/lib/utils";

const SectionRowContext = createContext<boolean | null>(null);

function useSectionRow() {
  const context = useContext(SectionRowContext);
  if (!context) {
    throw new Error("SectionRow subcomponents must be rendered within a <SectionRow>");
  }
  return context;
}

interface SectionRowProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
}

export function SectionRow({ children, className, onClick }: SectionRowProps) {
  return (
    <SectionRowContext.Provider value={true}>
      <div 
        onClick={onClick}
        className={cn(
          "group flex flex-col lg:flex-row items-start justify-between gap-8 lg:gap-16 py-12 md:py-20 border-b border-white/10 transition-colors",
          onClick && "cursor-pointer",
          className
        )}
      >
        {children}
      </div>
    </SectionRowContext.Provider>
  );
}

SectionRow.Left = function SectionRowLeft({ children, className }: { children: ReactNode; className?: string }) {
  useSectionRow();
  return (
    <div className={cn("w-full lg:w-1/3 shrink-0 flex flex-col gap-4", className)}>
      {children}
    </div>
  );
};

SectionRow.Right = function SectionRowRight({ children, className }: { children: ReactNode; className?: string }) {
  useSectionRow();
  return (
    <div className={cn("w-full lg:w-2/3 flex flex-col", className)}>
      {children}
    </div>
  );
};

SectionRow.Label = function SectionRowLabel({ children, className }: { children: ReactNode; className?: string }) {
  useSectionRow();
  return (
    <span className={cn("text-xs md:text-sm uppercase font-mono tracking-[0.2em] text-orange-500", className)}>
      {children}
    </span>
  );
};

SectionRow.Title = function SectionRowTitle({ children, className }: { children: ReactNode; className?: string }) {
  useSectionRow();
  return (
    <h3 className={cn("text-3xl md:text-5xl lg:text-6xl font-light tracking-tight text-white transition-all duration-500 group-hover:translate-x-2 group-hover:text-white/80", className)}>
      {children}
    </h3>
  );
};

SectionRow.Subtitle = function SectionRowSubtitle({ children, className }: { children: ReactNode; className?: string }) {
  useSectionRow();
  return (
    <div className={cn("text-white/40 text-sm mt-2", className)}>
      {children}
    </div>
  );
};

SectionRow.Description = function SectionRowDescription({ children, className }: { children: ReactNode; className?: string }) {
  useSectionRow();
  return (
    <p className={cn("text-white/50 text-lg sm:text-xl lg:text-2xl font-light leading-relaxed max-w-xl transition-colors duration-500 group-hover:text-white/70", className)}>
      {children}
    </p>
  );
};

SectionRow.Tags = function SectionRowTags({ tags, className }: { tags: string[]; className?: string }) {
  useSectionRow();
  return (
    <div className={cn("flex flex-wrap gap-3", className)}>
      {tags.map(tag => (
        <span key={tag} className="text-[10px] sm:text-xs font-mono uppercase tracking-widest text-white/40 border border-white/10 px-4 py-2 rounded-full">
          {tag}
        </span>
      ))}
    </div>
  );
};
