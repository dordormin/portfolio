import React, { useState, useEffect, useRef } from 'react';
import { useInView } from 'framer-motion';

interface TextScrambleProps {
  text: string;
  className?: string;
  delay?: number;
  speed?: number;
}

const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+{}[]|:;<>,.?/~';

export const TextScramble: React.FC<TextScrambleProps> = ({ 
  text, 
  className = "", 
  delay = 0,
  speed = 40
}) => {
  const [displayText, setDisplayText] = useState(text.replace(/./g, ' '));
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (isInView && !hasAnimated.current) {
      hasAnimated.current = true;
      let timeoutId: NodeJS.Timeout;
      let frame = 0;
      const length = text.length;
      
      const scramble = () => {
        let output = '';
        let complete = 0;
        
        for (let i = 0; i < length; i++) {
          if (frame >= i * 2) {
            output += text[i];
            complete++;
          } else if (frame >= i * 2 - 5) {
            output += characters[Math.floor(Math.random() * characters.length)];
          } else {
            output += ' ';
          }
        }
        
        setDisplayText(output);
        
        if (complete < length) {
          frame++;
          timeoutId = setTimeout(scramble, speed);
        }
      };

      setTimeout(scramble, delay);

      return () => clearTimeout(timeoutId);
    }
  }, [isInView, text, delay, speed]);

  return (
    <span ref={ref} className={className}>
      {displayText}
    </span>
  );
};
