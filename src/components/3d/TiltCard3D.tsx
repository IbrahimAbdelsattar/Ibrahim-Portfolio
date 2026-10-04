import { useReducedMotionPreference } from "@/hooks/use-reduced-motion";
import { useMediaQuery } from "@/hooks/use-media-query";
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
  const isCoarsePointer = useMediaQuery("(hover: none), (pointer: coarse)");
  const reducedMotion = useReducedMotionPreference();
  const disableTilt = isCoarsePointer || reducedMotion;

  // Normalized mouse coordinates from -0.5 to 0.5
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth springs for high-end organic physics (no sudden snaps or jitter)
  const springConfig = { stiffness: 220, damping: 26, mass: 0.8 };
  const mouseXSpring = useSpring(mouseX, springConfig);
  const mouseYSpring = useSpring(mouseY, springConfig);
  useEffect(() => {
    if (disableTilt) { mouseX.set(0); mouseY.set(0); mouseXSpring.jump(0); mouseYSpring.jump(0); setIsHovered(false); }
  }, [disableTilt, mouseX, mouseY, mouseXSpring, mouseYSpring]);

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
      `radial-gradient(circle 280px at ${x}% ${y}%, rgba(231, 240, 250, 0.22) 0%, rgba(123, 164, 208, 0.10) 30%, transparent 70%)`
  );

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (disableTilt || !cardRef.current) return;

    // If mouse button is pressed down, don't move card under cursor
    if (e.buttons > 0) return;

    // If hovering over buttons or links, stabilize rotation so clicks never miss
    const target = e.target as HTMLElement | null;
    if (target && (target.closest("button") || target.closest("a"))) {
      mouseX.set(0);
      mouseY.set(0);
      return;
    }

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
    if (disableTilt) return;
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
        disableTilt
          ? undefined
          : {
              perspective: 1000,
              transformStyle: "preserve-3d",
            }
      }
      className={`relative ${className}`}
    >
      <motion.div
        style={
          disableTilt
            ? undefined
            : {
                rotateX,
                rotateY,
                transformStyle: "preserve-3d",
              }
        }
        whileHover={disableTilt ? undefined : { scale }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className={`w-full h-full relative ${disableTilt ? "" : "preserve-3d"}`}
      >
        {/* Card Content with 3D child depth */}
        {children}

        {/* Dynamic 3D Glare Light Refraction */}
        {glare && !disableTilt && (
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
