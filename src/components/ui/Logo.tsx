import React from 'react';

export function Logo({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 40" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <rect width="48" height="40" rx="12" fill="currentColor" fillOpacity="0.05" />
      <path 
        d="M12 12V28H16C20.4183 28 24 24.4183 24 20C24 15.5817 20.4183 12 16 12H12Z" 
        stroke="currentColor" 
        strokeWidth="2.5" 
        strokeLinejoin="round"
      />
      <path 
        d="M28 28V12L33 19L38 12V28" 
        stroke="currentColor" 
        strokeWidth="2.5" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      />
    </svg>
  );
}
