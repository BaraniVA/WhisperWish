import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

interface WishButtonProps {
  to: string;
  icon: React.ReactNode;
  label: string;
}

export const WishButton: React.FC<WishButtonProps> = ({ to, icon, label }) => {
  return (
    <Link to={to}>
      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="flex flex-col items-center p-8 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer"
      >
        <div className="text-4xl mb-4 text-teal-600">{icon}</div>
        <span className="text-lg font-medium text-gray-700">{label}</span>
      </motion.div>
    </Link>
  );
};