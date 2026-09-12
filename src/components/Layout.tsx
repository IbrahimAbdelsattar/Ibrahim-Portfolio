import { ReactNode } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import FloatingShapes from "./FloatingShapes";
import Interactive3DScene from "./3d/Interactive3DScene";
import IbrahimChatbot from "./IbrahimChatbot";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="min-h-dvh bg-background relative overflow-x-clip">
      <FloatingShapes />
      <Interactive3DScene />
      <Navbar />
      <main className="relative z-10 pt-16 lg:pt-20 overflow-x-clip">
        {children}
      </main>
      <Footer />
      <IbrahimChatbot />
    </div>
  );
};

export default Layout;
