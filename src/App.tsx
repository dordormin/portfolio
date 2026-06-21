import React, { useState } from 'react';
import { BackgroundCanvas } from './components/canvas/BackgroundCanvas';
import { Navbar } from './components/Navbar';
import { Hero } from './components/sections/Hero';
import { About } from './components/sections/About';
import { Certifications } from './components/sections/Certifications';
import { Experience } from './components/sections/Experience';
import { Education } from './components/sections/Education';
import { Projects } from './components/sections/Projects';
import { Contact } from './components/sections/Contact';
import { BlogSection } from './components/sections/BlogSection';
import { ScrollProgress } from './components/ui/ScrollProgress';
import { Loader } from './components/ui/Loader';
import { SmoothScroll } from './components/ui/SmoothScroll';
import { CustomCursor } from './components/ui/CustomCursor';

export default function App() {
  const [viewMode, setViewMode] = useState<'portfolio' | 'blog'>('portfolio');

  return (
    <SmoothScroll>
      <CustomCursor />
      <div className="relative min-h-screen flex flex-col md:flex-row text-white antialiased selection:bg-orange-500/30 font-sans bg-background overflow-x-hidden">
        <Loader />
        {viewMode === 'portfolio' && <ScrollProgress />}
      {/* Atmospheric Background */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] bg-blue-900/20 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[-10%] right-[-5%] w-[500px] h-[500px] bg-orange-900/10 rounded-full blur-[100px]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(20,20,20,0)_0%,rgba(0,0,0,1)_100%)]"></div>
      </div>
      
      <BackgroundCanvas viewMode={viewMode} />
      
      <Navbar viewMode={viewMode} setViewMode={setViewMode} />
      
      {viewMode === 'portfolio' ? (
        <main className="flex-1 relative z-10 w-full max-w-full md:ml-20 lg:ml-24 pt-[72px] md:pt-0">
          <Hero />
          <About />
          <Education />
          <Experience />
          <Certifications />
          <Projects />
          <Contact />
        </main>
      ) : (
        <main className="flex-1 relative z-10 w-full max-w-full md:ml-20 lg:ml-24 pt-[72px] md:pt-0">
          <BlogSection />
        </main>
      )}
    </div>
    </SmoothScroll>
  );
}
