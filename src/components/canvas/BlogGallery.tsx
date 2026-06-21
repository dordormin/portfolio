import React, { useRef, useState, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import * as THREE from 'three';
import { translations } from '@/data';
import { useLanguage } from '@/contexts/LanguageContext';
import { X } from 'lucide-react';

export function BlogGallery({ isMobile }: { isMobile: boolean }) {
  const groupRef = useRef<THREE.Group>(null);
  const { language } = useLanguage();
  const posts = translations[language as 'en' | 'fr'].blogPosts;
  
  const [activePost, setActivePost] = useState<string | null>(null);
  const [rotation, setRotation] = useState(0);
  
  const targetRotation = useRef(0);
  const isDragging = useRef(false);
  const previousX = useRef(0);

  // Interaction handlers for spinning the gallery
  useEffect(() => {
    const handlePointerDown = (e: PointerEvent) => {
      isDragging.current = true;
      previousX.current = e.clientX;
    };
    
    const handlePointerUp = () => {
      isDragging.current = false;
    };
    
    const handlePointerMove = (e: PointerEvent) => {
      if (isDragging.current && !activePost) {
        const deltaX = e.clientX - previousX.current;
        targetRotation.current += deltaX * 0.005;
        previousX.current = e.clientX;
      }
    };
    
    const handleWheel = (e: WheelEvent) => {
      if (!activePost) {
        targetRotation.current += e.deltaY * 0.002;
      }
    };

    window.addEventListener('pointerdown', handlePointerDown);
    window.addEventListener('pointerup', handlePointerUp);
    window.addEventListener('pointermove', handlePointerMove);
    window.addEventListener('wheel', handleWheel);

    return () => {
      window.removeEventListener('pointerdown', handlePointerDown);
      window.removeEventListener('pointerup', handlePointerUp);
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('wheel', handleWheel);
    };
  }, [activePost]);

  // Smooth rotation
  useFrame((state, delta) => {
    if (groupRef.current) {
      // Lerp rotation towards target
      const currentRotation = groupRef.current.rotation.y;
      groupRef.current.rotation.y = THREE.MathUtils.damp(currentRotation, targetRotation.current, 4, delta);
    }
  });

  // Calculate positions in a circle
  const radius = isMobile ? 3 : 5;
  const angleStep = (Math.PI * 2) / posts.length;

  return (
    <>
      <group ref={groupRef} position={[0, 0, -2]}>
        {posts.map((post, index) => {
          const angle = index * angleStep;
          const x = Math.sin(angle) * radius;
          const z = Math.cos(angle) * radius;
          
          return (
            <group key={post.id} position={[x, 0, z]} rotation={[0, angle, 0]}>
              <Html 
                transform 
                occlude 
                wrapperClass="pointer-events-none"
                style={{
                  transition: 'all 0.5s',
                  opacity: activePost && activePost !== post.id ? 0 : 1,
                  transform: activePost === post.id ? 'scale(1.5)' : 'scale(1)',
                }}
              >
                <div 
                  className={`w-[280px] md:w-[400px] p-6 rounded-2xl backdrop-blur-xl border border-white/10 shadow-2xl transition-all duration-500 pointer-events-auto cursor-pointer ${
                    activePost === post.id 
                      ? 'bg-black/90 z-50' 
                      : 'bg-black/40 hover:bg-black/60 hover:border-primary/50'
                  }`}
                  onClick={() => !activePost && setActivePost(post.id)}
                >
                  <div className="flex justify-between items-start mb-4">
                    <span className="text-primary font-mono text-xs uppercase tracking-widest">{post.date}</span>
                    {activePost === post.id && (
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          setActivePost(null);
                        }}
                        className="text-white/50 hover:text-white p-1"
                      >
                        <X size={20} />
                      </button>
                    )}
                  </div>
                  
                  <h3 className="text-white font-display text-xl md:text-2xl mb-3 leading-snug">{post.title}</h3>
                  
                  {activePost === post.id ? (
                    <div className="text-white/80 font-sans text-sm md:text-base leading-relaxed mt-4 animate-in fade-in slide-in-from-bottom-4 duration-700">
                      <p>{post.content}</p>
                      <div className="flex gap-2 mt-6">
                        {post.tags.map(tag => (
                          <span key={tag} className="px-2 py-1 border border-primary/30 text-primary rounded-full text-[10px] uppercase font-mono">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <p className="text-white/60 font-sans text-sm line-clamp-3">{post.excerpt}</p>
                  )}
                  
                  {!activePost && (
                    <div className="mt-6 flex items-center text-primary text-xs font-mono uppercase tracking-wider group-hover:gap-2 transition-all">
                      <span>{language === 'en' ? 'Read More' : 'Lire la suite'}</span>
                      <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
                    </div>
                  )}
                </div>
              </Html>
            </group>
          );
        })}
      </group>
      
      {/* Instructions Overlay */}
      {!activePost && (
        <Html center position={[0, -2.5, 0]}>
          <div className="pointer-events-none text-white/40 font-mono text-[10px] md:text-xs uppercase tracking-[0.3em] whitespace-nowrap animate-pulse">
            {language === 'en' ? 'Drag to rotate • Click to read' : 'Glissez pour tourner • Cliquez pour lire'}
          </div>
        </Html>
      )}
    </>
  );
}
