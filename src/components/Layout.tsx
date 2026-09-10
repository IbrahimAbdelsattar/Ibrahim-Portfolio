import { ReactNode } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import FloatingShapes from "./FloatingShapes";
import IbrahimChatbot from "./IbrahimChatbot";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="min-h-screen bg-background relative">
      <FloatingShapes />
      <Navbar />
      <main className="relative z-10 pt-16 lg:pt-20">
        {children}
      </main>
      <Footer />
      <IbrahimChatbot />
    </div>
  );
};

export default Layout;
