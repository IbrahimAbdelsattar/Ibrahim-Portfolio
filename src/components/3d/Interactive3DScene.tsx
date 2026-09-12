import React, { useEffect, useRef } from "react";

interface Node3D {
  x: number;
  y: number;
  z: number;
  vx: number;
  vy: number;
  vz: number;
  baseRadius: number;
}

export const Interactive3DScene: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Target rotation angles and velocities driven by mouse
    let rotX = 0;
    let rotY = 0;
    let targetRotX = 0;
    let targetRotY = 0;
    let mouseX = 0;
    let mouseY = 0;

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    const handleMouseMove = (e: MouseEvent) => {
      const halfW = width / 2;
      const halfH = height / 2;
      mouseX = (e.clientX - halfW) / halfW;
      mouseY = (e.clientY - halfH) / halfH;
      targetRotY = mouseX * 0.4;
      targetRotX = -mouseY * 0.4;
    };

    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mediaQuery.matches) return;

    let isVisible = true;
    const handleVisibilityChange = () => {
      isVisible = !document.hidden;
      if (isVisible) {
        animationFrameId = requestAnimationFrame(render);
      } else {
        cancelAnimationFrame(animationFrameId);
      }
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    document.addEventListener("visibilitychange", handleVisibilityChange);

    // Mobile detection: fewer nodes + slower frame rate = smooth scrolling
    const isMobile = window.innerWidth < 768;
    const isSmallScreen = window.innerWidth < 480;

    // Generate 3D nodes clustered in a spherical cloud
    const nodeCount = isSmallScreen ? 20 : isMobile ? 28 : 55;
    const sphereRadius = Math.min(width, height) * 0.42;
    const nodes: Node3D[] = [];

    for (let i = 0; i < nodeCount; i++) {
      // Golden spiral distribution on sphere
      const phi = Math.acos(1 - (2 * (i + 0.5)) / nodeCount);
      const theta = Math.PI * (1 + Math.sqrt(5)) * i;
      const r = sphereRadius * (0.65 + Math.random() * 0.35);

      nodes.push({
        x: r * Math.sin(phi) * Math.cos(theta),
        y: r * Math.sin(phi) * Math.sin(theta),
        z: r * Math.cos(phi),
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        vz: (Math.random() - 0.5) * 0.3,
        baseRadius: Math.random() * 1.8 + 1.2,
      });
    }

    const fov = 450; // Camera distance perspective
    let angle = 0;
    let lastFrameTime = 0;
    const frameInterval = isMobile ? 1000 / 30 : 1000 / 60; // 30fps on mobile, 60fps desktop

    const render = (now: number = 0) => {
      // Throttle mobile frame rate for smoothness + battery
      if (now - lastFrameTime < frameInterval) {
        animationFrameId = requestAnimationFrame(render);
        return;
      }
      lastFrameTime = now;

      // Pause rendering when page is scrolled far beyond hero on mobile
      // (canvas is fixed background; still skip heavy work when tab hidden handled above)
      ctx.clearRect(0, 0, width, height);

      // Smooth interpolation towards mouse-guided rotation
      rotX += (targetRotX - rotX) * 0.05;
      rotY += (targetRotY - rotY) * 0.05;

      // Constant gentle ambient 3D orbit
      angle += 0.0025;
      const currentRotY = rotY + angle;
      const currentRotX = rotX + Math.sin(angle * 0.7) * 0.1;

      const cosY = Math.cos(currentRotY);
      const sinY = Math.sin(currentRotY);
      const cosX = Math.cos(currentRotX);
      const sinX = Math.sin(currentRotX);

      const halfW = width / 2;
      const halfH = height / 2;

      // Project 3D nodes into 2D coordinates
      const projectedNodes: { x2d: number; y2d: number; z: number; radius: number; alpha: number }[] = [];

      for (let i = 0; i < nodes.length; i++) {
        const node = nodes[i];

        // Organic micro-drift
        node.x += node.vx;
        node.y += node.vy;
        node.z += node.vz;

        // Soft bounce boundaries
        if (Math.abs(node.x) > sphereRadius) node.vx *= -1;
        if (Math.abs(node.y) > sphereRadius) node.vy *= -1;
        if (Math.abs(node.z) > sphereRadius) node.vz *= -1;

        // 3D Rotation Matrix (around Y then X)
        const x1 = node.x * cosY - node.z * sinY;
        const z1 = node.z * cosY + node.x * sinY;

        const y2 = node.y * cosX - z1 * sinX;
        const z2 = z1 * cosX + node.y * sinX;

        // Perspective projection
        const scale = fov / (fov + z2 + sphereRadius * 0.8);
        const x2d = x1 * scale + halfW;
        const y2d = y2 * scale + halfH;
        const alpha = Math.max(0.1, Math.min(1, (z2 + sphereRadius) / (sphereRadius * 1.8)));

        projectedNodes.push({
          x2d,
          y2d,
          z: z2,
          radius: node.baseRadius * scale,
          alpha,
        });
      }

      // Draw connection lines in 3D depth order
      const maxDistance = sphereRadius * 0.45;
      ctx.lineWidth = 1;

      for (let i = 0; i < projectedNodes.length; i++) {
        const p1 = projectedNodes[i];
        for (let j = i + 1; j < projectedNodes.length; j++) {
          const p2 = projectedNodes[j];
          const dx = p1.x2d - p2.x2d;
          const dy = p1.y2d - p2.y2d;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < maxDistance) {
            const lineAlpha = (1 - dist / maxDistance) * 0.18 * ((p1.alpha + p2.alpha) / 2);
            ctx.strokeStyle = `rgba(54, 135, 227, ${lineAlpha})`;
            ctx.beginPath();
            ctx.moveTo(p1.x2d, p1.y2d);
            ctx.lineTo(p2.x2d, p2.y2d);
            ctx.stroke();
          }
        }
      }

      // Draw nodes
      for (let i = 0; i < projectedNodes.length; i++) {
        const p = projectedNodes[i];
        ctx.fillStyle = `rgba(120, 162, 212, ${p.alpha * 0.75})`;
        ctx.beginPath();
        ctx.arc(p.x2d, p.y2d, Math.max(0.8, p.radius), 0, Math.PI * 2);
        ctx.fill();

        // Node glow (desktop only — expensive on mobile GPUs)
        if (p.alpha > 0.6 && !isMobile) {
          ctx.fillStyle = `rgba(54, 135, 227, ${p.alpha * 0.25})`;
          ctx.beginPath();
          ctx.arc(p.x2d, p.y2d, p.radius * 2.4, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none z-0 opacity-30 md:opacity-40 dark:opacity-40 dark:md:opacity-50 transition-opacity duration-700"
    />
  );
};

export default Interactive3DScene;
