import React, { useRef, useState, useEffect } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

interface TiltCard3DProps {
  children: React.ReactNode;
  className?: string;
  maxTilt?: number;
  scale?: number;
  glare?: boolean;
  onClick?: () => void;
}

export const TiltCard3D: React.FC<TiltCard3DProps> = ({
  children,
  className = "",
  maxTilt = 10,
  scale = 1.02,
  glare = true,
  onClick,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isCoarsePointer, setIsCoarsePointer] = useState(false);

  // Disable expensive 3D tilt on touch devices — big mobile smoothness win
  useEffect(() => {
    const mq = window.matchMedia("(hover: none), (pointer: coarse)");
    const update = () => setIsCoarsePointer(mq.matches || window.innerWidth < 768);
    update();
    mq.addEventListener?.("change", update);
    window.addEventListener("resize", update);
    return () => {
      mq.removeEventListener?.("change", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  // Normalized mouse coordinates from -0.5 to 0.5
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth springs for high-end organic physics (no sudden snaps or jitter)
  const springConfig = { stiffness: 280, damping: 22, mass: 0.8 };
  const mouseXSpring = useSpring(mouseX, springConfig);
  const mouseYSpring = useSpring(mouseY, springConfig);

  // 3D Rotations
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], [maxTilt, -maxTilt]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], [-maxTilt, maxTilt]);

  // Glare reflection position (0% to 100%)
  const glareX = useTransform(mouseXSpring, [-0.5, 0.5], [10, 90]);
  const glareY = useTransform(mouseYSpring, [-0.5, 0.5], [10, 90]);
  // Hoisted unconditionally to keep hook order stable (never call hooks in JSX conditionals)
  const glareBackground = useTransform(
    [glareX, glareY],
    ([x, y]) =>
      `radial-gradient(circle 280px at ${x}% ${y}%, rgba(255, 255, 255, 0.35) 0%, rgba(54, 135, 227, 0.15) 30%, transparent 70%)`
  );

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isCoarsePointer || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    const mouseFromLeft = e.clientX - rect.left;
    const mouseFromTop = e.clientY - rect.top;

    const xPct = mouseFromLeft / width - 0.5;
    const yPct = mouseFromTop / height - 0.5;

    mouseX.set(xPct);
    mouseY.set(yPct);
  };

  const handleMouseEnter = () => {
    if (isCoarsePointer) return;
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      style={
        isCoarsePointer
          ? undefined
          : {
              perspective: 1000,
              transformStyle: "preserve-3d",
            }
      }
      className={`relative ${isCoarsePointer ? "" : "will-change-transform"} ${className}`}
    >
      <motion.div
        style={
          isCoarsePointer
            ? undefined
            : {
                rotateX,
                rotateY,
                transformStyle: "preserve-3d",
              }
        }
        whileHover={isCoarsePointer ? undefined : { scale }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className={`w-full h-full relative ${isCoarsePointer ? "" : "preserve-3d"}`}
      >
        {/* Card Content with 3D child depth */}
        {children}

        {/* Dynamic 3D Glare Light Refraction */}
        {glare && !isCoarsePointer && (
          <motion.div
            className="pointer-events-none absolute inset-0 z-30 rounded-[inherit] overflow-hidden transition-opacity duration-300"
            style={{
              opacity: isHovered ? 0.45 : 0,
            }}
          >
            <motion.div
              className="w-full h-full"
              style={{
                background: glareBackground,
              }}
            />
          </motion.div>
        )}
      </motion.div>
    </motion.div>
  );
};

export default TiltCard3D;
