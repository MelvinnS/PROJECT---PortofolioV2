import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { AmbientGlow } from './components/layout/AmbientGlow';
import { HomePage } from './pages/HomePage';
import { ProjectDetailPage } from './pages/ProjectDetailPage';
import { CreativeDetailPage } from './pages/CreativeDetailPage';
import ProjectsPage from './pages/ProjectsPage';
import AboutPage from './pages/AboutPage';
import MobileAppPage from './pages/MobileAppPage';
import WebDevPage from './pages/WebDevPage';
import PhotographyPage from './pages/PhotographyPage';
import VideoEditingPage from './pages/VideoEditingPage';
import GraphicDesignPage from './pages/GraphicDesignPage';
import { PageTransitionProvider } from './components/layout/PageTransition';
import { useLenis } from './hooks/useLenis';
import type Lenis from 'lenis';

const ScrollToTop: React.FC = () => {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    const lenis = (window as unknown as { __lenis?: Lenis }).__lenis;

    if (!hash) {
      if (lenis) lenis.scrollTo(0, { immediate: true });
      else window.scrollTo(0, 0);
    } else {
      const id = hash.replace('#', '');
      const element = document.getElementById(id);
      if (element) {
        if (lenis) lenis.scrollTo(element, { offset: -72, immediate: true });
        else element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [pathname, hash]);

  return null;
};

export const App: React.FC = () => {
  useLenis();

  return (
    <Router>
      <PageTransitionProvider>
      <ScrollToTop />
      <AmbientGlow />
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/projects" element={<ProjectsPage />} />
        <Route path="/projects/mobile-app" element={<MobileAppPage />} />
        <Route path="/projects/web-dev" element={<WebDevPage />} />
        <Route path="/projects/tresbekasli" element={<WebDevPage />} />
        <Route path="/projects/photography" element={<PhotographyPage />} />
        <Route path="/creative/photography" element={<PhotographyPage />} />
        <Route path="/projects/video-editing" element={<VideoEditingPage />} />
        <Route path="/creative/videography-editing" element={<VideoEditingPage />} />
        <Route path="/creative/video-editing" element={<VideoEditingPage />} />
        <Route path="/creative/short-movie" element={<VideoEditingPage />} />
        <Route path="/projects/graphic-designer" element={<GraphicDesignPage />} />
        <Route path="/projects/graphic-design" element={<GraphicDesignPage />} />
        <Route path="/creative/graphic-design" element={<GraphicDesignPage />} />
        <Route path="/creative/design-trashback" element={<GraphicDesignPage />} />
        <Route path="/creative/design-parentstalk" element={<GraphicDesignPage />} />
        <Route path="/projects/:id" element={<ProjectDetailPage />} />
        <Route path="/creative/:category" element={<CreativeDetailPage />} />
      </Routes>
      <Footer />
      </PageTransitionProvider>
    </Router>
  );
};
