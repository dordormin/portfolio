import React, { ReactNode, useRef, useEffect, useId } from "react";
import { cn } from "@/lib/utils";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface AnimatedListProps<T> {
  items: T[];
  renderItem: (item: T, index: number) => ReactNode;
  className?: string;
  itemClassName?: string;
}

export function AnimatedList<T>({ items, renderItem, className, itemClassName }: AnimatedListProps<T>) {
  const containerRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<(HTMLDivElement | null)[]>([]);
  const listId = useId().replace(/:/g, "");

  useEffect(() => {
    const ctx = gsap.context(() => {
      itemsRef.current.forEach((item, i) => {
        if (!item) return;
        
        gsap.fromTo(
          item,
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            delay: i * 0.05,
            ease: "power3.out",
            scrollTrigger: {
              id: `animated-list-${listId}-item-${i}`,
              trigger: item,
              start: "top 85%",
            },
          }
        );
      });
    }, containerRef); // Scoped to this container

    return () => {
      ctx.revert(); // Automatically kills all ScrollTriggers created in this context!
    };
  }, [listId, items]);

  return (
    <div ref={containerRef} className={cn("flex flex-col border-t border-white/20", className)}>
      {items.map((item, index) => (
        <div 
          key={index}
          ref={el => { itemsRef.current[index] = el; }}
          className={cn("w-full border-b border-white/10 opacity-0", itemClassName)}
        >
          {renderItem(item, index)}
        </div>
      ))}
    </div>
  );
}
