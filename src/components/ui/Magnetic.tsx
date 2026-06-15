import React, { useRef, useState, useEffect } from 'react';
import { motion, useAnimation } from 'motion/react';

export function Magnetic({ children, intensity = 0.5 }: { children: React.ReactNode; intensity?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const controls = useAnimation();

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const { width, height, left, top } = node.getBoundingClientRect();
      const x = clientX - (left + width / 2);
      const y = clientY - (top + height / 2);

      controls.start({
        x: x * intensity,
        y: y * intensity,
        transition: { type: "spring", stiffness: 150, damping: 15, mass: 0.1 }
      });
    };

    const handleMouseLeave = () => {
      controls.start({
        x: 0,
        y: 0,
        transition: { type: "spring", stiffness: 150, damping: 15, mass: 0.1 }
      });
    };

    node.addEventListener("mousemove", handleMouseMove);
    node.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      node.removeEventListener("mousemove", handleMouseMove);
      node.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [controls, intensity]);

  return (
    <motion.div ref={ref} animate={controls} className="inline-block relative">
      {children}
    </motion.div>
  );
}
