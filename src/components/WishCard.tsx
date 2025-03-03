import React from 'react';
import { motion } from 'framer-motion';
import { MessageCircle } from 'lucide-react';

interface WishCardProps {
  wish: string;
  delay?: number;
}

export const WishCard: React.FC<WishCardProps> = ({ wish, delay = 0 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay }}
      className="bg-white/80 backdrop-blur-sm p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow"
    >
      <div className="flex items-start gap-3">
        <MessageCircle className="text-teal-500 mt-1 flex-shrink-0" size={18} />
        <p className="text-gray-700 leading-relaxed">{wish}</p>
      </div>
    </motion.div>
  );
};