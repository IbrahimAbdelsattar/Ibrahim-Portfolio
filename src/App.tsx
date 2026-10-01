import { useReducedMotionPreference } from "@/hooks/use-reduced-motion";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { lazy, Suspense, useEffect } from "react";
import { AnimatePresence, MotionConfig, motion } from "framer-motion";
import Layout from "./components/Layout";

const Home = lazy(() => import("./pages/Home"));
const About = lazy(() => import("./pages/About"));
const Projects = lazy(() => import("./pages/Projects"));
const ProjectDetail = lazy(() => import("./pages/ProjectDetail"));
const Certifications = lazy(() => import("./pages/Certifications"));
const Contact = lazy(() => import("./pages/Contact"));
const NotFound = lazy(() => import("./pages/NotFound"));

const queryClient = new QueryClient();

const PageRoutes = () => {
  const location = useLocation();
  const reducedMotion = useReducedMotionPreference();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
    const canonical = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (canonical) canonical.href = `https://ibrahim-abdelsattar.netlify.app${location.pathname}`;
    const title = location.pathname.split("/")[1];
    if (location.pathname.startsWith("/projects/")) return;
    document.title = title
      ? `${title.charAt(0).toUpperCase() + title.slice(1)} — Ibrahim Abdelsattar`
      : "Ibrahim Abdelsattar — AI Engineer";
  }, [location.pathname]);

  return <Layout>
    <AnimatePresence mode="wait" initial={false}>
      <motion.div key={location.pathname} initial={reducedMotion ? false : { opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
        transition={{ duration: reducedMotion ? 0 : 0.2, ease: [0.22, 1, 0.36, 1] }}>
        <Suspense fallback={<div className="container mx-auto px-4 py-24 min-h-[65vh]" role="status" aria-label="Loading page"><div className="h-3 w-28 rounded-full bg-primary/20 mb-8" /><div className="h-12 w-2/3 max-w-lg rounded-2xl bg-muted/40 mb-5" /><div className="h-4 w-1/2 rounded-full bg-muted/30" /></div>}>
          <Routes location={location}>
            <Route path="/" element={<Home />} /><Route path="/about" element={<About />} />
            <Route path="/projects" element={<Projects />} /><Route path="/projects/:slug" element={<ProjectDetail />} />
            <Route path="/certifications" element={<Certifications />} /><Route path="/contact" element={<Contact />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </motion.div>
    </AnimatePresence>
  </Layout>;
};

const App = () => {
  const reducedMotion = useReducedMotionPreference();
  return (
  <MotionConfig reducedMotion={reducedMotion ? "always" : "never"}>
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <PageRoutes />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
  </MotionConfig>
  );
};

export default App;
