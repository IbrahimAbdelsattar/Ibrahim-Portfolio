import { ReactNode, Suspense, lazy } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import BackToTop from "./BackToTop";

// The chatbot pulls in ~25 KB of knowledge-base text (profile, experience, Q&A pairs).
// It sits behind a floating button most visitors never open, so it should not block the
// page it is embedded in. Deferred until the browser is idle.
const IbrahimChatbot = lazy(() => import("./IbrahimChatbot"));

interface LayoutProps {
  children: ReactNode;
}

const ChatbotFallback = (
  <div
    aria-hidden="true"
    className="fixed bottom-5 right-5 z-40 w-14 h-14 rounded-full bg-gradient-to-r from-primary via-blue-600 to-secondary opacity-70 shadow-2xl"
  />
);

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="min-h-dvh bg-background relative overflow-x-clip">

      <Navbar />
      <main className="relative pt-16 lg:pt-20 overflow-x-clip">
        {children}
      </main>
      <Footer />
      <BackToTop />
      <Suspense fallback={ChatbotFallback}>
        <IbrahimChatbot />
      </Suspense>
    </div>
  );
};

export default Layout;
