import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useProgress } from "@react-three/drei";
import { hardwareProfiler } from "@/utils/HardwareProfiler";

export function Loader() {
  const [isLoading, setIsLoading] = useState(true);
  const [mounted, setMounted] = useState(false);
  const { progress: threeProgress, active } = useProgress();
  const [simulatedProgress, setSimulatedProgress] = useState(0);
  const [hardwareTier, setHardwareTier] = useState<number | null>(null);

  useEffect(() => {
    setMounted(true);
    setHardwareTier(hardwareProfiler.runBenchmark());
    
    let currentProgress = 0;
    
    // Simulate initial loading sequence
    const interval = setInterval(() => {
      currentProgress += Math.random() * 15;
      if (currentProgress > 90) {
        clearInterval(interval);
        setSimulatedProgress(90);
      } else {
        setSimulatedProgress(currentProgress);
      }
    }, 150);

    const handleLoad = () => {
      clearInterval(interval);
      setSimulatedProgress(100);
      
      // Delay to ensure smooth exit
      setTimeout(() => setIsLoading(false), 800);
    };

    if (document.readyState === "complete") {
      handleLoad();
    } else {
      window.addEventListener("load", handleLoad);
    }

    return () => {
      clearInterval(interval);
      window.removeEventListener("load", handleLoad);
    };
  }, []);

  // Compute overall progress taking into account ThreeJS if active
  const displayProgress = active 
    ? Math.min(Math.round((simulatedProgress + threeProgress) / 2), 100) 
    : Math.round(simulatedProgress);

  // Quick initial flash prevention
  if (!mounted) return null;

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1, ease: "easeInOut" }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-background"
        >
          <div className="flex flex-col items-center max-w-sm w-full px-8">
            {/* Loader animation blob */}
            <div className="relative w-24 h-24 mb-12 flex items-center justify-center auto-pulse">
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: [0.8, 1.2, 0.9], opacity: [0.5, 0.8, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                className="absolute inset-0 border border-orange-500/30 rounded-full"
              />
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: [0.8, 1.5, 1], opacity: [0.2, 0.6, 0] }}
                transition={{ duration: 2, delay: 0.5, repeat: Infinity, ease: "easeInOut" }}
                className="absolute inset-0 border border-orange-500/20 rounded-full"
              />
              <div className="w-12 h-12 bg-gradient-to-tr from-orange-600 to-orange-400 rounded-full shadow-[0_0_30px_rgba(249,115,22,0.5)]" />
            </div>

            {/* Progress bar */}
            <div className="w-full h-[2px] bg-white/10 rounded-full overflow-hidden mb-4 relative line-clamp-1">
              <motion.div
                className="absolute inset-y-0 left-0 bg-gradient-to-r from-orange-400 to-orange-600"
                initial={{ width: "0%" }}
                animate={{ width: `${displayProgress}%` }}
                transition={{ ease: "easeInOut", duration: 0.3 }}
              />
            </div>

            {/* Log / Status text */}
            <div className="flex justify-between items-center w-full text-[10px] sm:text-xs">
              <span className="text-white/40 font-mono uppercase tracking-[0.2em]">
                 {displayProgress < 50 ? "Initializing Arsenal..." : `Hardware Allocation: Tier ${hardwareTier}`}
              </span>
              <span className="text-orange-500 font-mono font-bold tracking-wider">
                {displayProgress}%
              </span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
