import { useEffect, useRef } from "react";
import { useReducedMotionPreference } from "@/hooks/use-reduced-motion";
import { usePageVisible } from "@/hooks/use-page-visible";
import { useMediaQuery } from "@/hooks/use-media-query";

/** Small, allocation-free particle projection; foreground scrolling gets priority. */
const Interactive3DScene = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reducedMotion = useReducedMotionPreference();
  const visible = usePageVisible();
  const touch = useMediaQuery("(hover: none), (pointer: coarse)");
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;
    if (reducedMotion) { ctx.clearRect(0, 0, canvas.width, canvas.height); return; }
    if (!visible) return;
    let width = 0, height = 0, radius = 0, frame = 0;
    let angle = 0, rotX = 0, rotY = 0, targetX = 0, targetY = 0;
    let previous = 0, scrollAt = -Infinity;
    const resize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      radius = Math.min(width, height) * 0.42;
    };
    resize();
    const count = touch ? 14 : 36;
    const nodes = Array.from({ length: count }, (_, i) => {
      const phi = Math.acos(1 - 2 * (i + 0.5) / count);
      const theta = Math.PI * (1 + Math.sqrt(5)) * i;
      return { x: Math.sin(phi) * Math.cos(theta), y: Math.sin(phi) * Math.sin(theta), z: Math.cos(phi),
        x2: 0, y2: 0, alpha: 0, size: 0, baseSize: 1.2 + (i % 5) * 0.3 };
    });
    const pointer = (e: PointerEvent) => { targetX = -(e.clientY / height - 0.5) * 0.7; targetY = (e.clientX / width - 0.5) * 0.7; };
    const scroll = () => { scrollAt = performance.now(); };
    const render = (now: number) => {
      frame = requestAnimationFrame(render);
      // Keep decoration still while scrolling rather than competing for frame time.
      if (now - scrollAt < 120) { previous = now; return; }
      const elapsed = now - previous;
      if (elapsed < 1000 / 30) return;
      const delta = Math.min(elapsed, 70) / (1000 / 30);
      previous = now;
      angle += 0.0025 * delta;
      const smoothing = 1 - Math.pow(0.92, delta);
      rotX += (targetX - rotX) * smoothing;
      rotY += (targetY - rotY) * smoothing;
      const cy = Math.cos(rotY + angle), sy = Math.sin(rotY + angle);
      const cx = Math.cos(rotX + Math.sin(angle * 0.7) * 0.1), sx = Math.sin(rotX + Math.sin(angle * 0.7) * 0.1);
      ctx.clearRect(0, 0, width, height);
      for (const node of nodes) {
        const x = (node.x * cy - node.z * sy) * radius;
        const z = (node.z * cy + node.x * sy) * radius;
        const y = node.y * radius * cx - z * sx;
        const depth = z * cx + node.y * radius * sx;
        const scale = 450 / (450 + depth + radius * 0.8);
        node.x2 = x * scale + width / 2;
        node.y2 = y * scale + height / 2;
        node.size = Math.max(0.8, node.baseSize * scale);
        node.alpha = Math.max(0.1, Math.min(1, (depth + radius) / (radius * 1.8)));
      }
      const distance = radius * 0.45, threshold = distance * distance;
      ctx.lineWidth = 1;
      for (let i = 0; i < count; i++) {
        const a = nodes[i];
        for (let j = i + 1; j < count; j++) {
          const b = nodes[j];
          const squared = (a.x2 - b.x2) ** 2 + (a.y2 - b.y2) ** 2;
          if (squared >= threshold) continue;
          ctx.strokeStyle = `rgba(123,164,208,${(1 - Math.sqrt(squared) / distance) * 0.09 * (a.alpha + b.alpha)})`;
          ctx.beginPath(); ctx.moveTo(a.x2, a.y2); ctx.lineTo(b.x2, b.y2); ctx.stroke();
        }
        ctx.fillStyle = `rgba(123,164,208,${a.alpha * 0.75})`;
        ctx.beginPath(); ctx.arc(a.x2, a.y2, a.size, 0, Math.PI * 2); ctx.fill();
      }
    };
    window.addEventListener("resize", resize);
    window.addEventListener("scroll", scroll, { passive: true });
    if (!touch) window.addEventListener("pointermove", pointer, { passive: true });
    frame = requestAnimationFrame(render);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", resize);
      window.removeEventListener("scroll", scroll);
      window.removeEventListener("pointermove", pointer);
    };
  }, [reducedMotion, visible, touch]);
  return <canvas ref={canvasRef} aria-hidden="true" className="fixed inset-0 pointer-events-none z-0 opacity-30 md:opacity-40" />;
};
export default Interactive3DScene;
