import React, { useEffect } from "react";
import { createPortal } from "react-dom";

export function Modal({ 
  isOpen, 
  onClose, 
  children 
}: { 
  isOpen: boolean; 
  onClose: () => void; 
  children: React.ReactNode;
}) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return createPortal(
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 md:p-12">
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-md transition-opacity"
        onClick={onClose}
      />
      <div className="relative z-10 w-full max-w-4xl max-h-[100%] sm:max-h-[90vh] flex flex-col bg-[#050505] border border-white/10 rounded-2xl shadow-2xl animate-in fade-in zoom-in-95 duration-300">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 sm:top-6 sm:right-6 p-2 rounded-full border border-white/10 bg-[#0a0a0a] text-white/50 hover:bg-white hover:text-black transition-colors z-20"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
        </button>
        <div className="overflow-y-auto flex-1 min-h-0 p-6 sm:p-10 pt-16 sm:pt-16 rounded-2xl">
          {children}
        </div>
      </div>
    </div>,
    document.body
  );
}
