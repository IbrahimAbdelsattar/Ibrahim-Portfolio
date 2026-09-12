import { motion } from "framer-motion";
import { Award, Calendar, Building2 } from "lucide-react";

interface CertificationCardProps {
  title: string;
  issuer: string;
  year?: string;
  image: string;
  index: number;
  onClick: () => void;
}

const CertificationCard = ({
  title,
  issuer,
  year,
  image,
  index,
  onClick,
}: CertificationCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      className="group glass-card rounded-3xl overflow-hidden hover-glow cursor-pointer flex flex-col"
      onClick={onClick}
    >
      {/* Certificate Image */}
      <div className="relative h-40 overflow-hidden bg-secondary/30">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-80 transition-all duration-500 group-hover:scale-105 group-hover:opacity-100"
          style={{ backgroundImage: `url(${image})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-card/90 to-transparent" />
        
        {/* Badge */}
        <div className="absolute top-4 right-4 w-10 h-10 rounded-full glass-card border border-white/20 flex items-center justify-center backdrop-blur-md shadow-md">
          <Award className="w-5 h-5 text-primary" />
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="text-base font-semibold text-foreground mb-3 line-clamp-2 group-hover:text-primary transition-colors">
          {title}
        </h3>
        
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2 text-muted-foreground text-sm">
            <Building2 className="w-4 h-4 text-primary/70" />
            <span>{issuer}</span>
          </div>
          {year && (
            <div className="flex items-center gap-2 text-muted-foreground text-sm">
              <Calendar className="w-4 h-4 text-primary/70" />
              <span>{year}</span>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default CertificationCard;
