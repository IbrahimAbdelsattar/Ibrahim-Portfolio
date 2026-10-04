import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import Reveal from "@/components/Reveal";

const NotFound = () => (
  <section className="min-h-[65dvh] flex items-center justify-center px-4 py-20">
    <Reveal className="text-center max-w-lg">
      <p className="eyebrow mb-4">Page not found</p>
      <h1 className="mb-5 text-7xl sm:text-8xl font-bold gradient-text">404</h1>
      <p className="mb-8 text-lg text-muted-foreground">This page is outside the map. Let's get you back to the work.</p>
      <Link to="/projects" className="inline-flex items-center gap-2 rounded-full px-6 py-3 bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors">
        <ArrowLeft className="w-4 h-4" /> Explore projects
      </Link>
    </Reveal>
  </section>
);

export default NotFound;
