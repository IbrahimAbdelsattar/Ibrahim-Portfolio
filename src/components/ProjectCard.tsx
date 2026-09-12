import { motion } from "framer-motion";
import { Github, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import TiltCard3D from "@/components/3d/TiltCard3D";

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
      className="h-full"
    >
      <TiltCard3D
        maxTilt={12}
        scale={1.03}
        className="h-full group rounded-3xl"
      >
        <div className="h-full glass-card rounded-3xl overflow-hidden hover-glow flex flex-col preserve-3d">
          {/* Project Image with 3D Depth */}
          <div className="relative h-48 overflow-hidden">
            <div 
              className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
              style={{ backgroundImage: `url(${image})` }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-card/95 via-card/40 to-transparent" />
            
            {/* Overlay buttons with high 3D pop */}
            <div className="absolute inset-0 flex items-center justify-center gap-4 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-z-30">
              {githubUrl && (
                <a href={githubUrl} target="_blank" rel="noopener noreferrer">
                  <Button variant="glass" size="icon" className="rounded-full shadow-xl hover:scale-110">
                    <Github className="w-5 h-5" />
                  </Button>
                </a>
              )}
              {/* View Details Button */}
              {onLiveClick && (
                <Button 
                  variant="glass" 
                  size="icon" 
                  className="rounded-full cursor-pointer shadow-xl hover:scale-110"
                  onClick={(e) => { e.preventDefault(); onLiveClick(); }}
                >
                  <Eye className="w-5 h-5" />
                </Button>
              )}
            </div>
          </div>

          {/* Content with Z-Depth */}
          <div className="p-6 flex-1 flex flex-col justify-between preserve-3d">
            <div className="translate-z-20">
              <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                {title}
              </h3>
              <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                {description}
              </p>
            </div>
            
            {/* Technologies with subtle Z-elevation */}
            <div className="flex flex-wrap gap-2 pt-2 translate-z-10">
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
        </div>
      </TiltCard3D>
    </motion.div>
  );
};

export default ProjectCard;
