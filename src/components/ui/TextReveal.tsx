import React, { useRef } from "react";
import { motion, useInView } from "motion/react";

interface TextRevealProps {
  children: React.ReactNode;
}

export function TextReveal({ children }: TextRevealProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-10% 0px" });

  if (typeof children !== "string") {
    return <>{children}</>;
  }

  const words = children.split(" ");

  return (
    <span ref={ref} className="inline-block">
      {words.map((word, i) => (
        <span key={i} className="inline-block overflow-hidden mr-[0.25em]">
          <motion.span
            className="inline-block"
            initial={{ y: "100%" }}
            animate={isInView ? { y: 0 } : { y: "100%" }}
            transition={{
              duration: 0.8,
              ease: [0.33, 1, 0.68, 1], // Custom bounce/ease out
              delay: i * 0.05,
            }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </span>
  );
}
