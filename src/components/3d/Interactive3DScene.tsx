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

    // Respect reduced-motion up front: no canvas sizing, no node allocation, no RAF.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let animationFrameId = 0;
    let isRunning = false;

    // The canvas is a fixed decorative backdrop at low opacity. Rendering it at full
    // devicePixelRatio costs fill rate for no visible gain, so the backing store is
    // capped and the context is scaled once per resize.
    //
    // `width`/`height` stay in CSS pixels: every distance threshold below is a fraction of
    // the sphere radius, so keeping the maths in CSS pixels means the drawn output is
    // resolution-independent.
    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    let width = window.innerWidth;
    let height = window.innerHeight;
    canvas.width = Math.round(width * dpr);
    canvas.height = Math.round(height * dpr);
    ctx.scale(dpr, dpr);

    // Target rotation angles and velocities driven by mouse
    let rotX = 0;
    let rotY = 0;
    let targetRotX = 0;
    let targetRotY = 0;
    let mouseX = 0;
    let mouseY = 0;

    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      // setTransform replaces the previous scale() so repeated resizes don't compound it.
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      sphereRadius = Math.min(width, height) * 0.42;
      rebuildEdges();
    };

    const handleMouseMove = (e: MouseEvent) => {
      const halfW = width / 2;
      const halfH = height / 2;
      mouseX = (e.clientX - halfW) / halfW;
      mouseY = (e.clientY - halfH) / halfH;
      targetRotY = mouseX * 0.4;
      targetRotX = -mouseY * 0.4;
    };

    const start = () => {
      if (isRunning) return;
      isRunning = true;
      lastFrameTime = 0;
      animationFrameId = requestAnimationFrame(render);
    };

    const stop = () => {
      if (!isRunning) return;
      isRunning = false;
      cancelAnimationFrame(animationFrameId);
    };

    const handleVisibilityChange = () => {
      if (document.hidden) stop();
      else start();
    };

    // The canvas is `position: fixed`, so it stays "on screen" for the whole session.
    // Its only purpose is to sit behind the hero, so once the hero has scrolled away the
    // scene is invisible: stop rendering entirely instead of burning frames in the
    // background for the rest of the visit.
    const heroSentinel = document.createElement("div");
    heroSentinel.setAttribute("aria-hidden", "true");
    heroSentinel.style.cssText = "position:absolute;top:0;left:0;width:1px;height:1px;pointer-events:none;";
    canvas.parentElement?.insertBefore(heroSentinel, canvas);
    const heroObserver = new IntersectionObserver(
      ([entry]) => (entry.isIntersecting ? start() : stop()),
      { rootMargin: "100px" }
    );
    heroObserver.observe(heroSentinel);

    window.addEventListener("resize", handleResize);
    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    document.addEventListener("visibilitychange", handleVisibilityChange);

    // Mobile detection: fewer nodes + slower frame rate = smooth scrolling
    const isMobile = window.innerWidth < 768;
    const isSmallScreen = window.innerWidth < 480;

    // Generate 3D nodes clustered in a spherical cloud
    const nodeCount = isSmallScreen ? 20 : isMobile ? 28 : 55;
    let sphereRadius = Math.min(width, height) * 0.42;
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

    /**
     * Precomputed connection pairs.
     *
     * The naive version recomputes all N*(N-1)/2 distances every frame (1485 pairs at 55
     * nodes, 60x per second) only to discard almost all of them as "too far apart".
     *
     * `maxDistance` is a fixed fraction of `sphereRadius`, so any pair whose separation
     * already exceeds it can never come into range later: each node only drifts inside the
     * sphere rather than travelling across it. Solving the pairs once turns the per-frame
     * cost from O(N^2) into O(edges). Recomputed on resize, since `sphereRadius` changes.
     */
    let maxDistance = sphereRadius * 0.45;
    let edges: [number, number][] = [];

    const rebuildEdges = () => {
      maxDistance = sphereRadius * 0.45;
      const next: [number, number][] = [];
      for (let i = 0; i < nodeCount; i++) {
        for (let j = i + 1; j < nodeCount; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dz = nodes[i].z - nodes[j].z;
          if (Math.sqrt(dx * dx + dy * dy + dz * dz) < maxDistance) next.push([i, j]);
        }
      }
      edges = next;
    };

    rebuildEdges();

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
      // Reused across frames to avoid allocating 55 objects every 16ms.
      const projectedNodes: { x2d: number; y2d: number; radius: number; alpha: number }[] = nodes.map(() => ({
        x2d: 0,
        y2d: 0,
        radius: 0,
        alpha: 0,
      }));

      for (let i = 0; i < nodes.length; i++) {
        const node = nodes[i];
        const p = projectedNodes[i];

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

        p.x2d = x2d;
        p.y2d = y2d;
        p.radius = node.baseRadius * scale;
        p.alpha = alpha;
      }

      // Draw connection lines, reusing the precomputed edge list instead of testing
      // all N*(N-1)/2 pairs per frame. A single path per batch cuts draw-call count too.
      ctx.lineWidth = 1;

      for (let e = 0; e < edges.length; e++) {
        const p1 = projectedNodes[edges[e][0]];
        const p2 = projectedNodes[edges[e][1]];
        const dx = p1.x2d - p2.x2d;
        const dy = p1.y2d - p2.y2d;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < maxDistance) {
          ctx.strokeStyle = `rgba(54, 135, 227, ${(1 - dist / maxDistance) * 0.18 * ((p1.alpha + p2.alpha) / 2)})`;
          ctx.beginPath();
          ctx.moveTo(p1.x2d, p1.y2d);
          ctx.lineTo(p2.x2d, p2.y2d);
          ctx.stroke();
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

      if (isRunning) animationFrameId = requestAnimationFrame(render);
    };

    // Rendering is owned by the IntersectionObserver; a bare render() here would defeat it.
    start();

    return () => {
      stop();
      heroObserver.disconnect();
      heroSentinel.remove();
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
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
