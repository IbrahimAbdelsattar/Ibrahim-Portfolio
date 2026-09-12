import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

interface RevealProps {
  children: ReactNode;
  /** Vertical offset in px — kept small for a subtle premium feel. */
  y?: number;
  /** Stagger delay in seconds. */
  delay?: number;
  className?: string;
  /** Run only the first time the element enters the viewport. */
  once?: boolean;
}

/** Subtle fade+rise scroll reveal used consistently across the whole site. */
const Reveal = ({ children, y = 18, delay = 0, className, once = true }: RevealProps) => {
  const reduceMotion = useReducedMotion();

  if (reduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, margin: "-60px" }}
      transition={{ duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default Reveal;
