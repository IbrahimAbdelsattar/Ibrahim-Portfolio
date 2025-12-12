import { motion } from "framer-motion";

const FloatingShapes = () => {
  const shapes = [
    { size: 300, x: "10%", y: "20%", delay: 0 },
    { size: 200, x: "80%", y: "10%", delay: 2 },
    { size: 250, x: "70%", y: "60%", delay: 4 },
    { size: 150, x: "20%", y: "70%", delay: 6 },
    { size: 180, x: "50%", y: "40%", delay: 3 },
    { size: 120, x: "90%", y: "80%", delay: 5 },
  ];

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {shapes.map((shape, index) => (
        <motion.div
          key={index}
          className="absolute rounded-full opacity-10 blur-3xl"
          style={{
            width: shape.size,
            height: shape.size,
            left: shape.x,
            top: shape.y,
            background: `linear-gradient(135deg, hsl(187 85% 53%), hsl(220 80% 50%))`,
          }}
          animate={{
            y: [-20, 20, -20],
            x: [-10, 10, -10],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 10 + index * 2,
            repeat: Infinity,
            ease: "easeInOut",
            delay: shape.delay,
          }}
        />
      ))}
      
      {/* Grid pattern overlay */}
      <div 
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `
            linear-gradient(hsl(187 85% 53%) 1px, transparent 1px),
            linear-gradient(90deg, hsl(187 85% 53%) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
        }}
      />
    </div>
  );
};

export default FloatingShapes;
