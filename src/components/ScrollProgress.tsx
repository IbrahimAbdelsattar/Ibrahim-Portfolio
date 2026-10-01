import { useReducedMotionPreference } from "@/hooks/use-reduced-motion";
import { motion, useScroll, useSpring } from "framer-motion";

/** Thin gradient scroll-progress bar pinned to the very top of the viewport. */
const ScrollProgress = () => {
  const reduceMotion = useReducedMotionPreference();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 28,
    mass: 0.4,
  });

  if (reduceMotion) return null;

  return (
    <motion.div
      aria-hidden="true"
      style={{ scaleX }}
      className="fixed top-0 left-0 right-0 z-[60] h-[3px] origin-left bg-gradient-to-r from-primary via-primary-dark to-secondary"
    />
  );
};

export default ScrollProgress;
