import React, { useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion";

const ParticleBg = () => {
  const [dimensions, setDimensions] = useState({
    width: typeof window !== "undefined" ? window.innerWidth : 0,
    height: typeof window !== "undefined" ? window.innerHeight : 0,
  });

  // Update dimensions on window resize
  useEffect(() => {
    const handleResize = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Generate particles
  const numberOfParticles = useMemo(() => {
    // Scale number of particles based on screen size
    const base = Math.min(dimensions.width, dimensions.height) * 0.1;
    return Math.min(Math.max(base, 20), 80); // Between 20 and 80 particles
  }, [dimensions]);

  const particles = useMemo(() => {
    return Array.from({ length: numberOfParticles }).map((_, i) => {
      const size = Math.random() * 3 + 1;
      const x = Math.random() * dimensions.width;
      const y = Math.random() * dimensions.height;
      const duration = Math.random() * 80 + 40;
      const delay = Math.random() * -40;
      const opacity = Math.random() * 0.5 + 0.1;

      return {
        id: i,
        size,
        x,
        y,
        duration,
        delay,
        opacity,
      };
    });
  }, [numberOfParticles, dimensions]);

  // Animation variants for each particle
  const particleVariants = {
    animate: (particle) => ({
      y: [particle.y, particle.y - 200, particle.y],
      x: [particle.x, particle.x + (Math.random() * 200 - 100), particle.x],
      opacity: [particle.opacity, particle.opacity * 1.5, particle.opacity],
      transition: {
        duration: particle.duration,
        repeat: Infinity,
        ease: "easeInOut",
        delay: particle.delay,
        times: [0, 0.5, 1],
      },
    }),
  };

  return (
    <div className="fixed inset-0 overflow-hidden z-0 pointer-events-none">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full bg-brand-500/10 dark:bg-brand-400/10"
          style={{
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            left: `${particle.x}px`,
            top: `${particle.y}px`,
            opacity: particle.opacity,
          }}
          variants={particleVariants}
          animate="animate"
          custom={particle}
        />
      ))}
    </div>
  );
};

export default ParticleBg;
