import { motion } from "framer-motion";
import { Github, ExternalLink, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ProjectCardProps {
  title: string;
  description: string;
  technologies: string[];
  image: string;
  githubUrl?: string;
  liveUrl?: string;
  index: number;
  onLiveClick?: () => void;
}

const ProjectCard = ({
  title,
  description,
  technologies,
  image,
  githubUrl,
  liveUrl,
  index,
  onLiveClick,
}: ProjectCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group relative glass-card rounded-3xl overflow-hidden hover-glow flex flex-col"
    >
      {/* Project Image */}
      <div className="relative h-48 overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
          style={{ backgroundImage: `url(${image})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-card/90 via-card/40 to-transparent" />
        
        {/* Overlay buttons */}
      <div className="absolute inset-0 flex items-center justify-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          {githubUrl && (
            <a href={githubUrl} target="_blank" rel="noopener noreferrer">
              <Button variant="glass" size="icon" className="rounded-full shadow-lg">
                <Github className="w-5 h-5" />
              </Button>
            </a>
          )}
          {/* View Details Button */}
          {onLiveClick && (
            <Button 
              variant="glass" 
              size="icon" 
              className="rounded-full cursor-pointer shadow-lg"
              onClick={(e) => { e.preventDefault(); onLiveClick(); }}
            >
              <Eye className="w-5 h-5" />
            </Button>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="p-6 flex-1 flex flex-col justify-between">
        <div>
          <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
            {title}
          </h3>
          <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
            {description}
          </p>
        </div>
        
        {/* Technologies */}
        <div className="flex flex-wrap gap-2 pt-2">
          {technologies.map((tech) => (
            <span
              key={tech}
              className="px-2.5 py-1 text-xs font-medium rounded-lg glass-card text-primary"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectCard;
