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

  const [apiPosts, setApiPosts] = React.useState<any[]>([]);
  const [loading, setLoading] = React.useState(true);

  // Fetch real articles from Dev.to public API
  useEffect(() => {
    async function fetchNews() {
      try {
        // top=1 fetches the top articles of the current day
        const response = await fetch("https://dev.to/api/articles?tag=ai&top=1&per_page=4");
        const data = await response.json();
        
        const formattedPosts = data.map((article: any) => ({
          id: String(article.id),
          title: article.title,
          date: new Date(article.published_at).toLocaleDateString(language === 'fr' ? 'fr-FR' : 'en-US', {
            year: 'numeric', month: 'long', day: 'numeric'
          }),
          content: article.description,
          tags: article.tag_list.slice(0, 3),
          link: article.url
        }));
        
        setApiPosts(formattedPosts);
      } catch (error) {
        console.error("Failed to fetch news", error);
        // Fallback to local data if API fails
        setApiPosts(posts);
      } finally {
        setLoading(false);
      }
    }
    fetchNews();
  }, [language, posts]);

  useEffect(() => {
    if (loading || apiPosts.length === 0) return;

    // We want each post to fade in when it reaches the center, stay for a while, and fade out
    const ctx = gsap.context(() => {
      itemsRef.current.forEach((item, index) => {
        if (!item) return;
        
        // Pin the item while scrolling to read
        ScrollTrigger.create({
          trigger: item,
          start: "center center", // Changed from top center so it pins exactly in the middle of the screen
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
  }, [apiPosts, loading]);

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
        {loading ? (
          <div className="w-full h-[100dvh] flex items-center justify-center">
            <span className="text-white/50 font-mono animate-pulse">Loading API data...</span>
          </div>
        ) : apiPosts.map((post, index) => (
          <div 
            key={post.id}
            ref={el => { itemsRef.current[index] = el; }}
            className="w-full h-[100dvh] flex items-center justify-center"
          >
            {/* The wrapper that actually animates opacity and Y position */}
            <div className="content-wrapper opacity-0 translate-y-12 w-full bg-black/60 backdrop-blur-md border border-white/10 p-8 md:p-16 rounded-3xl shadow-2xl">
              <div className="flex flex-col items-center text-center gap-4">
                <span className="text-orange-500 font-mono text-sm tracking-widest uppercase border border-orange-500/30 px-3 py-1 rounded-full bg-orange-500/10">
                  {post.date}
                </span>
                <h2 className="text-3xl md:text-5xl lg:text-4xl font-light tracking-tight text-white leading-tight mt-4">
                  {post.title}
                </h2>
                
                <div className="w-12 h-[1px] bg-white/20 mx-auto my-6"></div>
                
                <p className="text-white/70 text-lg md:text-xl font-light leading-relaxed">
                  {post.content}
                </p>

                <div className="flex flex-wrap justify-center gap-3 mt-8">
                  {post.tags.map((tag: string) => (
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
      <div className="h-[100dvh] w-full flex items-center justify-center pointer-events-none">
        <span className="text-xs font-mono uppercase tracking-[0.5em] text-white/30">
           {language === 'en' ? 'End of publications' : 'Fin des publications'}
        </span>
      </div>
    </div>
  );
}
