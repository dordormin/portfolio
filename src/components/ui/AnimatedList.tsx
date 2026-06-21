import React, { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface AnimatedListProps<T> {
  items: T[];
  renderItem: (item: T, index: number) => ReactNode;
  className?: string;
  itemClassName?: string;
}

export function AnimatedList<T>({ items, renderItem, className, itemClassName }: AnimatedListProps<T>) {
  return (
    <div className={cn("flex flex-col gap-8 md:gap-12", className)}>
      {items.map((item, index) => (
        <div 
          key={index}
          className={cn(
            "opacity-0 animate-in fade-in slide-in-from-bottom-8 duration-700 fill-mode-forwards",
            itemClassName
          )}
          style={{ animationDelay: `${index * 150}ms` }}
        >
          {renderItem(item, index)}
        </div>
      ))}
    </div>
  );
}
