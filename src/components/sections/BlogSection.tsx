import React, { useRef, useEffect } from "react";
import { translations } from "@/data";
import { useLanguage } from "@/contexts/LanguageContext";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

export function BlogSection() {
  const { language } = useLanguage();
  const posts = translations[language as 'en' | 'fr'].blogPosts;
  const containerRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    // We want each post to fade in when it reaches the center, stay for a while, and fade out
    const ctx = gsap.context(() => {
      itemsRef.current.forEach((item, index) => {
        if (!item) return;
        
        // Pin the item while scrolling to read
        ScrollTrigger.create({
          trigger: item,
          start: "top center",
          end: "+=150%", // Pins for 150% of viewport height (keeps it readable during scroll)
          pin: true,
          pinSpacing: true,
          animation: gsap.timeline()
            .to(item.querySelector('.content-wrapper'), { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" })
            .to(item.querySelector('.content-wrapper'), { opacity: 0, y: -50, duration: 0.5, ease: "power2.in" }, "+=2"), // Fades out at the end of pin
          scrub: 1,
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, [posts]);

  return (
    <div ref={containerRef} className="w-full relative z-10 flex flex-col items-center">
      
      {/* Intro Scenario Space - 150vh to let the 3D camera "fly in" before first text appears */}
      <div className="h-[150vh] w-full flex items-center justify-center pointer-events-none">
        <div className="text-center opacity-50 animate-pulse mt-auto mb-32">
          <span className="text-xs font-mono uppercase tracking-[0.5em] text-white">
            {language === 'en' ? 'Scroll to explore' : 'Défilez pour explorer'}
          </span>
          <div className="w-[1px] h-16 bg-white/30 mx-auto mt-4"></div>
        </div>
      </div>

      {/* Blog Posts */}
      <div className="w-full max-w-4xl px-6 md:px-12 flex flex-col">
        {posts.map((post, index) => (
          <div 
            key={post.id}
            ref={el => { itemsRef.current[index] = el; }}
            className="w-full h-screen flex items-center justify-center"
          >
            {/* The wrapper that actually animates opacity and Y position */}
            <div className="content-wrapper opacity-0 translate-y-12 w-full bg-black/60 backdrop-blur-md border border-white/10 p-8 md:p-16 rounded-3xl shadow-2xl">
              <div className="flex flex-col items-center text-center gap-4">
                <span className="text-orange-500 font-mono text-sm tracking-widest uppercase border border-orange-500/30 px-3 py-1 rounded-full bg-orange-500/10">
                  {post.date}
                </span>
                <h2 className="text-3xl md:text-5xl lg:text-6xl font-light tracking-tight text-white leading-tight mt-4">
                  {post.title}
                </h2>
                
                <div className="w-12 h-[1px] bg-white/20 mx-auto my-6"></div>
                
                <p className="text-white/70 text-lg md:text-xl lg:text-2xl font-light leading-relaxed">
                  {post.content}
                </p>

                <div className="flex flex-wrap justify-center gap-3 mt-8">
                  {post.tags.map(tag => (
                    <span key={tag} className="text-xs font-mono uppercase tracking-widest text-white/40 border border-white/10 px-4 py-2 rounded-full">
                      {tag}
                    </span>
                  ))}
                </div>

                {/* External Link */}
                {post.link && (
                  <a 
                    href={post.link} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="mt-8 px-8 py-3 bg-white text-black font-medium rounded-full hover:bg-orange-500 hover:text-white transition-colors duration-300 pointer-events-auto"
                  >
                    {language === 'en' ? 'Read Full Article' : 'Lire l\'article complet'}
                  </a>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {/* End Space */}
      <div className="h-screen w-full flex items-center justify-center pointer-events-none">
        <span className="text-xs font-mono uppercase tracking-[0.5em] text-white/30">
           {language === 'en' ? 'End of publications' : 'Fin des publications'}
        </span>
      </div>
    </div>
  );
}
