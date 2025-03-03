import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { wishesData } from '../data/wishes';

interface FloatingWishProps {
  text: string;
  index: number;
}

const FloatingWish: React.FC<FloatingWishProps> = ({ text, index }) => {
  const position = useMemo(() => {
    const section = index % 6; // Divide screen into 6 sections for more spacing
    const baseDelay = (index * 0.8) % 3; // Longer delay between animations
    
    // Calculate position with more spacing
    const left = 10 + (section * 15) + (Math.random() * 5);
    const top = 10 + (Math.random() * 80);
    
    return { left, top, delay: baseDelay };
  }, [index]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 0 }}
      animate={{
        opacity: [0.1, 0.2, 0.1],
        y: [-20, 0, -20],
      }}
      transition={{
        duration: 8,
        delay: position.delay,
        repeat: Infinity,
        repeatType: "reverse",
      }}
      className="absolute text-sm text-gray-600/30 pointer-events-none select-none"
      style={{
        left: `${position.left}%`,
        top: `${position.top}%`,
        maxWidth: '180px',
      }}
    >
      {text}
    </motion.div>
  );
};

export const FloatingWishes: React.FC = () => {
  const displayWishes = useMemo(() => {
    const shuffled = [...wishesData].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, 6); // Reduced number of floating wishes
  }, []);

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      {displayWishes.map((wish, index) => (
        <FloatingWish key={index} text={wish} index={index} />
      ))}
    </div>
  );
};