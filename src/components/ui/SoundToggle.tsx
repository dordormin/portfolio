import React from "react";
import { Volume2, VolumeX } from "lucide-react";
import { useSoundContext } from "@/contexts/SoundContext";
import { Magnetic } from "./Magnetic";

export function SoundToggle() {
  const { isMuted, toggleMute } = useSoundContext();

  return (
    <div className="fixed top-4 right-4 md:top-6 md:right-8 z-50">
      <Magnetic intensity={0.2}>
        <button
          onClick={toggleMute}
          className="p-2 md:p-3 bg-black/40 backdrop-blur-xl border border-white/20 rounded-full hover:bg-white/20 hover:text-orange-400 transition-colors"
          title={isMuted ? "Activer le son" : "Désactiver le son"}
        >
          {isMuted ? (
            <VolumeX className="w-4 h-4 md:w-5 md:h-5 text-white/60" />
          ) : (
            <Volume2 className="w-4 h-4 md:w-5 md:h-5 text-white/90" />
          )}
        </button>
      </Magnetic>
    </div>
  );
}
