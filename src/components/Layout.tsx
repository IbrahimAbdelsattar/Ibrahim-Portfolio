import { ReactNode, useLayoutEffect } from "react";
import { useEnhancedEffects } from "@/hooks/use-enhanced-effects";
import Navbar from "./Navbar";
import Footer from "./Footer";
import FloatingShapes from "./FloatingShapes";
import Interactive3DScene from "./3d/Interactive3DScene";
import ChatWidget from "./ChatWidget";
import ScrollProgress from "./ScrollProgress";
import BackToTop from "./BackToTop";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const enhancedEffects = useEnhancedEffects();
  useLayoutEffect(() => {
    document.documentElement.dataset.effects = enhancedEffects ? "full" : "reduced";
    return () => { delete document.documentElement.dataset.effects; };
  }, [enhancedEffects]);
  return (
    <div className="min-h-dvh bg-background relative overflow-x-clip">
      <ScrollProgress />
      <FloatingShapes />
      {enhancedEffects && <Interactive3DScene />}
      <Navbar />
      <a href="#main-content" className="skip-link">Skip to content</a>
      <main id="main-content" tabIndex={-1} className="relative z-10 pt-16 lg:pt-20 overflow-x-clip outline-none">
        {children}
      </main>
      <Footer />
      <BackToTop />
      <ChatWidget />
    </div>
  );
};

export default Layout;
