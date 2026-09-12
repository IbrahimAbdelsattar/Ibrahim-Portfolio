import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Sparkles, FolderGit2 } from "lucide-react";
import Layout from "@/components/Layout";
import ProjectCard from "@/components/ProjectCard";
import ProjectModal from "@/components/ProjectModal";
import { projects, Project } from "@/data";

const categories = [
  "All",
  "GenAI & Agents",
  "NLP & Speech",
  "Machine Learning & Analytics",
  "Full-Stack & Systems",
] as const;

const Projects = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      const matchesCategory =
        selectedCategory === "All" || project.category === selectedCategory;
      const matchesSearch =
        searchQuery.trim() === "" ||
        project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.technologies.some((tech) =>
          tech.toLowerCase().includes(searchQuery.toLowerCase())
        );
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  const handleProjectClick = (project: Project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  return (
    <Layout>
      <section className="py-12 sm:py-20 overflow-x-clip">
        <div className="container mx-auto px-4 lg:px-8">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-8 sm:mb-12"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs sm:text-sm font-medium mb-4">
              <Sparkles className="w-4 h-4" />
              <span>Full Portfolio Showcase</span>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-3 sm:mb-4 text-balance">
              Featured <span className="gradient-text">Projects</span>
            </h1>
            <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto">
              Explore my latest work in Generative AI, RAG & LLM Agents, Dialectal NLP, Speech AI, and End-to-End Predictive Machine Learning.
            </p>
          </motion.div>

          {/* Search & Category Filter Section */}
          <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 sm:gap-6 mb-8 sm:mb-12">
            {/* Search Input */}
            <div className="relative w-full md:w-80">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
              <input
                type="search"
                inputMode="search"
                placeholder="Search projects or technologies..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 min-h-[48px] rounded-xl glass-input text-base sm:text-sm"
              />
            </div>

            {/* Category Pills */}
            <div className="flex flex-nowrap md:flex-wrap items-center gap-2 w-full md:w-auto overflow-x-auto no-scrollbar scroll-smooth-touch py-1 -mx-4 px-4 md:mx-0 md:px-0">
              {categories.map((category) => {
                const isActive = selectedCategory === category;
                return (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-4 py-2.5 min-h-[44px] shrink-0 text-xs sm:text-sm font-medium rounded-xl transition-all cursor-pointer backdrop-blur-md ${
                      isActive
                        ? "bg-primary text-primary-foreground shadow-lg shadow-primary/25 scale-105"
                        : "glass-card hover:border-primary/40 text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {category}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Projects Counter */}
          <div className="flex items-center justify-between mb-6 text-sm text-muted-foreground px-2">
            <div className="flex items-center gap-2">
              <FolderGit2 className="w-4 h-4 text-primary" />
              <span>
                Showing <strong className="text-foreground">{filteredProjects.length}</strong> projects
              </span>
            </div>
          </div>

          {/* Projects Grid */}
          <motion.div layout className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
            <AnimatePresence>
              {filteredProjects.map((project, index) => (
                <ProjectCard
                  key={project.title}
                  {...project}
                  index={index}
                  onLiveClick={() => handleProjectClick(project)}
                />
              ))}
            </AnimatePresence>
          </motion.div>

          {filteredProjects.length === 0 && (
            <div className="text-center py-20 bg-card/20 rounded-2xl border border-dashed border-border mt-6">
              <p className="text-muted-foreground text-lg mb-2">No projects found</p>
              <p className="text-sm text-muted-foreground/70">
                Try clearing your search query or picking a different category.
              </p>
            </div>
          )}

          <ProjectModal
            project={selectedProject}
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
          />
        </div>
      </section>
    </Layout>
  );
};

export default Projects;
