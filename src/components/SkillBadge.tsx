import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";

interface SkillBadgeProps {
  name: string;
  icon?: LucideIcon;
  index: number;
}

const SkillBadge = ({ name, icon: Icon, index }: SkillBadgeProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: "0px 0px 60px 0px" }}
      transition={{ duration: 0.2, delay: (index % 6) * 0.03 }}
      whileHover={{ scale: 1.05, y: -2 }}
      className="skill-badge flex items-center gap-2 cursor-default text-xs sm:text-sm break-words min-h-[36px]"
    >
      {Icon && <Icon className="w-4 h-4 text-primary" />}
      <span>{name}</span>
    </motion.div>
  );
};

export default SkillBadge;
