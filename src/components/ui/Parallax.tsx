import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";

interface ParallaxProps {
  children: React.ReactNode;
  offset?: number;
  className?: string;
}

export function Parallax({ children, offset = 50, className = "" }: ParallaxProps) {
  const ref = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [-offset, offset]);

  return (
    <div ref={ref} className={className}>
      <motion.div style={{ y }}>{children}</motion.div>
    </div>
  );
}
