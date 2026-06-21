import React, { createContext, useContext, ReactNode } from "react";
import { cn } from "@/lib/utils";

// 1. Create Context to share state between compound components if needed
// In this case, we might just use it to enforce that subcomponents are used inside Card
const CardContext = createContext<boolean | null>(null);

function useCardContext() {
  const context = useContext(CardContext);
  if (!context) {
    throw new Error("Card components must be rendered within a <Card> parent");
  }
  return context;
}

// 2. Base Card Component
interface CardProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  hoverEffect?: boolean;
}

export function Card({ children, className, onClick, hoverEffect = false }: CardProps) {
  return (
    <CardContext.Provider value={true}>
      <div 
        onClick={onClick}
        className={cn(
          "bg-white/5 border border-white/10 rounded-2xl p-6 md:p-8 backdrop-blur-sm transition-all duration-300",
          hoverEffect && "hover:bg-white/10 hover:border-primary/50 cursor-pointer group",
          className
        )}
      >
        {children}
      </div>
    </CardContext.Provider>
  );
}

// 3. Subcomponents
interface CardHeaderProps {
  title: string;
  subtitle?: string;
  subtitleAccent?: string;
  className?: string;
}

Card.Header = function CardHeader({ title, subtitle, subtitleAccent, className }: CardHeaderProps) {
  useCardContext(); // Enforce usage inside Card
  
  return (
    <div className={cn("mb-6", className)}>
      <h3 className="text-xl md:text-2xl font-display text-white mb-2 group-hover:text-primary transition-colors">
        {title}
      </h3>
      {subtitle && (
        <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 text-sm text-white/50 font-mono">
          <span className="uppercase tracking-wider">{subtitle}</span>
          {subtitleAccent && (
            <>
              <span className="hidden sm:inline text-primary">•</span>
              <span className="text-primary">{subtitleAccent}</span>
            </>
          )}
        </div>
      )}
    </div>
  );
};

interface CardBodyProps {
  children: ReactNode;
  className?: string;
}

Card.Body = function CardBody({ children, className }: CardBodyProps) {
  useCardContext();
  return (
    <div className={cn("text-white/70 font-sans leading-relaxed text-sm md:text-base", className)}>
      {children}
    </div>
  );
};

interface CardFooterProps {
  children: ReactNode;
  className?: string;
}

Card.Footer = function CardFooter({ children, className }: CardFooterProps) {
  useCardContext();
  return (
    <div className={cn("mt-6", className)}>
      {children}
    </div>
  );
};

// Optional Subcomponent for Tags/Pills specifically
interface CardTagsProps {
  tags: string[];
}

Card.Tags = function CardTags({ tags }: CardTagsProps) {
  useCardContext();
  return (
    <div className="flex flex-wrap gap-2 mt-4">
      {tags.map((tag, idx) => (
        <span
          key={idx}
          className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-[10px] sm:text-xs font-mono uppercase tracking-wider text-white/60"
        >
          {tag}
        </span>
      ))}
    </div>
  );
};
