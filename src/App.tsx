import React, { useState, Suspense, lazy } from 'react';
const BackgroundCanvas = lazy(() => import('./components/canvas/BackgroundCanvas').then(module => ({ default: module.BackgroundCanvas })));
import { Navbar } from './components/Navbar';
import { Hero } from './components/sections/Hero';

const About = lazy(() => import('./components/sections/About').then(module => ({ default: module.About })));
const Certifications = lazy(() => import('./components/sections/Certifications').then(module => ({ default: module.Certifications })));
const Experience = lazy(() => import('./components/sections/Experience').then(module => ({ default: module.Experience })));
const Education = lazy(() => import('./components/sections/Education').then(module => ({ default: module.Education })));
const Projects = lazy(() => import('./components/sections/Projects').then(module => ({ default: module.Projects })));
const Contact = lazy(() => import('./components/sections/Contact').then(module => ({ default: module.Contact })));
const BlogSection = lazy(() => import('./components/sections/BlogSection').then(module => ({ default: module.BlogSection })));
import { ScrollProgress } from './components/ui/ScrollProgress';
import { Loader } from './components/ui/Loader';
import { SmoothScroll } from './components/ui/SmoothScroll';
import { CustomCursor } from './components/ui/CustomCursor';
import { SoundToggle } from './components/ui/SoundToggle';

export default function App() {
  const [viewMode, setViewMode] = useState<'portfolio' | 'blog'>('portfolio');

  return (
    <SmoothScroll>
      <CustomCursor />
      <div className="relative min-h-[100dvh] flex flex-col md:flex-row text-white antialiased selection:bg-orange-500/30 font-sans bg-background overflow-x-hidden">
        <Loader />
        {viewMode === 'portfolio' && <ScrollProgress />}
        <SoundToggle />
      {/* Atmospheric Background */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] bg-blue-900/20 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[-10%] right-[-5%] w-[500px] h-[500px] bg-orange-900/10 rounded-full blur-[100px]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(20,20,20,0)_0%,rgba(0,0,0,1)_100%)]"></div>
      </div>
      
      <Suspense fallback={null}>
        <BackgroundCanvas viewMode={viewMode} />
      </Suspense>
      
      <Navbar viewMode={viewMode} setViewMode={setViewMode} />
      
      {viewMode === 'portfolio' ? (
        <main className="flex-1 relative z-10 w-full max-w-full md:ml-20 lg:ml-24 pt-[72px] md:pt-0">
          <Hero />
          <Suspense fallback={<div className="h-screen"></div>}>
            <About />
            <Education />
            <Experience />
            <Certifications />
            <Projects />
            <Contact />
          </Suspense>
        </main>
      ) : (
        <main className="flex-1 relative z-10 w-full max-w-full md:ml-20 lg:ml-24 pt-[72px] md:pt-0">
          <Suspense fallback={<div className="h-screen"></div>}>
            <BlogSection />
          </Suspense>
        </main>
      )}
    </div>
    </SmoothScroll>
  );
}
