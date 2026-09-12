import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Sparkles, FolderGit2, Pin } from "lucide-react";
import Layout from "@/components/Layout";
import ProjectCard from "@/components/ProjectCard";
import ProjectModal from "@/components/ProjectModal";
import AnimatedTabs from "@/components/AnimatedTabs";
import Reveal from "@/components/Reveal";
import { projects, Project } from "@/data";

const categories = [
  "All",
  "📌 Pinned",
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

  const pinnedCount = useMemo(() => projects.filter((p) => p.isPinned).length, []);

  const filteredProjects = useMemo(() => {
    let result = projects.filter((project) => {
      const matchesCategory =
        selectedCategory === "All"
          ? true
          : selectedCategory === "📌 Pinned"
          ? Boolean(project.isPinned)
          : project.category === selectedCategory;

      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        q === "" ||
        project.title.toLowerCase().includes(q) ||
        project.description.toLowerCase().includes(q) ||
        project.technologies.some((tech) => tech.toLowerCase().includes(q));

      return matchesCategory && matchesSearch;
    });

    // In "All" view or category views without explicit order, ensure pinned projects appear first
    if (selectedCategory === "All" && searchQuery.trim() === "") {
      result = [...result].sort((a, b) => {
        if (a.isPinned && !b.isPinned) return -1;
        if (!a.isPinned && b.isPinned) return 1;
        return 0;
      });
    }

    return result;
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
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs sm:text-sm font-medium mb-4 shadow-sm">
              <Sparkles className="w-4 h-4" />
              <span>Full GitHub Portfolio & Flagship Systems</span>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-3 sm:mb-4 text-balance">
              Featured <span className="gradient-text">Projects</span>
            </h1>
            <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto">
              Explore all my open-source repositories and flagship systems in Generative AI, RAG & LLM Agents, Dialectal NLP, Speech AI, and Predictive Machine Learning.
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

            {/* Category Tabs — animated sliding pill */}
            <div className="w-full md:w-auto md:max-w-xl md:flex md:justify-end">
              <AnimatedTabs
                id="project-categories"
                ariaLabel="Filter projects by category"
                tabs={categories.map((c) => ({ value: c, label: c }))}
                value={selectedCategory}
                onChange={setSelectedCategory}
              />
            </div>
          </div>

          {/* Projects Counter & Pinned Indicator */}
          <div className="flex flex-wrap items-center justify-between gap-3 mb-6 text-sm text-muted-foreground px-2">
            <div className="flex items-center gap-2">
              <FolderGit2 className="w-4 h-4 text-primary" />
              <span>
                Showing <strong className="text-foreground">{filteredProjects.length}</strong> of{" "}
                <strong className="text-foreground">{projects.length}</strong> GitHub repositories
              </span>
            </div>
            <div className="flex items-center gap-2 text-xs">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 border border-primary/25 text-primary font-medium">
                <Pin className="w-3.5 h-3.5" />
                {pinnedCount} Flagship Pinned
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
