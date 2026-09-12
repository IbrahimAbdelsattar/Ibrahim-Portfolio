import { motion } from "framer-motion";
import { Award, Calendar, Building2 } from "lucide-react";
import TiltCard3D from "@/components/3d/TiltCard3D";

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
      className="h-full"
    >
      <TiltCard3D
        maxTilt={12}
        scale={1.03}
        onClick={onClick}
        className="h-full group rounded-3xl cursor-pointer"
      >
        <div className="h-full glass-card rounded-3xl overflow-hidden hover-glow flex flex-col preserve-3d">
          {/* Certificate Image */}
          <div className="relative h-36 sm:h-40 overflow-hidden bg-secondary/30">
            <div 
              className="absolute inset-0 bg-cover bg-center opacity-85 transition-all duration-700 group-hover:scale-110 group-hover:opacity-100"
              style={{ backgroundImage: `url(${image})` }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-card/95 via-card/40 to-transparent" />
            
            {/* 3D Popping Badge */}
            <div className="absolute top-4 right-4 w-10 h-10 rounded-full glass-card border border-white/20 flex items-center justify-center backdrop-blur-md shadow-xl translate-z-30 group-hover:scale-110 transition-transform">
              <Award className="w-5 h-5 text-primary" />
            </div>
          </div>

          {/* Content with Z-Depth */}
          <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between preserve-3d">
            <div className="translate-z-20">
              <h3 className="text-sm sm:text-base font-semibold text-foreground mb-3 line-clamp-2 group-hover:text-primary transition-colors leading-snug">
                {title}
              </h3>
            </div>
            
            <div className="flex flex-col gap-2 translate-z-10">
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
        </div>
      </TiltCard3D>
    </motion.div>
  );
};

export default CertificationCard;
