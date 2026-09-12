import { motion } from "framer-motion";

const FloatingShapes = () => {
  const shapes = [
    { 
      size: 480, 
      x: "5%", 
      y: "10%", 
      color: "radial-gradient(circle, hsl(var(--primary) / 0.8) 0%, hsl(var(--secondary) / 0.4) 60%, transparent 80%)", 
      delay: 0,
      duration: 18 
    },
    { 
      size: 400, 
      x: "75%", 
      y: "15%", 
      color: "radial-gradient(circle, hsl(var(--secondary) / 0.7) 0%, hsl(var(--primary-dark) / 0.5) 60%, transparent 80%)", 
      delay: 2,
      duration: 22 
    },
    { 
      size: 550, 
      x: "60%", 
      y: "55%", 
      color: "radial-gradient(circle, hsl(var(--primary) / 0.65) 0%, hsl(var(--secondary) / 0.35) 60%, transparent 80%)", 
      delay: 4,
      duration: 25 
    },
    { 
      size: 380, 
      x: "15%", 
      y: "65%", 
      color: "radial-gradient(circle, hsl(var(--primary-dark) / 0.8) 0%, hsl(var(--primary) / 0.4) 60%, transparent 80%)", 
      delay: 3,
      duration: 20 
    },
    { 
      size: 320, 
      x: "45%", 
      y: "35%", 
      color: "radial-gradient(circle, hsl(var(--secondary) / 0.6) 0%, hsl(var(--primary) / 0.3) 60%, transparent 80%)", 
      delay: 5,
      duration: 16 
    },
  ];

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {shapes.map((shape, index) => (
        <motion.div
          key={index}
          className="absolute rounded-full opacity-20 md:opacity-25 blur-[100px] md:blur-[130px]"
          style={{
            width: shape.size,
            height: shape.size,
            left: shape.x,
            top: shape.y,
            background: shape.color,
          }}
          animate={{
            y: [-30, 30, -30],
            x: [-20, 20, -20],
            scale: [1, 1.15, 1],
          }}
          transition={{
            duration: shape.duration,
            repeat: Infinity,
            ease: "easeInOut",
            delay: shape.delay,
          }}
        />
      ))}
      
      {/* Subtle fine grid overlay for glass depth */}
      <div 
        className="absolute inset-0 opacity-[0.025] dark:opacity-[0.035]"
        style={{
          backgroundImage: `
            linear-gradient(hsl(var(--primary) / 0.6) 1px, transparent 1px),
            linear-gradient(90deg, hsl(var(--primary) / 0.6) 1px, transparent 1px)
          `,
          backgroundSize: '64px 64px',
        }}
      />
    </div>
  );
};

export default FloatingShapes;
