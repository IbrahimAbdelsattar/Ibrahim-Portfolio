import { motion } from "framer-motion";
import { Award, Calendar, Building2 } from "lucide-react";
import ResponsiveImage from "@/components/ResponsiveImage";

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
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px 80px 0px" }}
      transition={{ duration: 0.25, delay: (index % 4) * 0.04 }}
      className="h-full"
    >
      <div
        onClick={onClick}
        className="h-full group rounded-3xl cursor-pointer"
      >
        <div className="h-full glass-card rounded-3xl overflow-hidden hover-glow flex flex-col">
          {/* Certificate Image */}
          <div className="relative h-36 sm:h-40 overflow-hidden bg-secondary/30">
            <ResponsiveImage
              src={image}
              alt={`${title} certificate`}
              sizes="(min-width: 1280px) 25vw, (min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
              className="absolute inset-0 w-full h-full object-cover opacity-85 transition-all duration-700 group-hover:scale-110 group-hover:opacity-100"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-card/95 via-card/40 to-transparent" />
            
            {/* Badge */}
            <div className="absolute top-4 right-4 w-10 h-10 rounded-full glass-card border border-white/20 flex items-center justify-center backdrop-blur-md shadow-xl group-hover:scale-110 transition-transform">
              <Award className="w-5 h-5 text-primary" />
            </div>
          </div>

          {/* Content */}
          <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
            <div>
              <h3 className="text-sm sm:text-base font-semibold text-foreground mb-3 line-clamp-2 group-hover:text-primary transition-colors leading-snug">
                {title}
              </h3>
            </div>
            
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
        </div>
      </div>
    </motion.div>
  );
};

export default CertificationCard;
