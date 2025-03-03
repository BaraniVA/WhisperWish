import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle } from 'lucide-react';
import { PageLayout } from '../components/PageLayout';

export const WishSent: React.FC = () => {
  return (
    <PageLayout>
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md mx-auto text-center"
      >
        <div className="bg-white/90 backdrop-blur-sm p-8 rounded-2xl shadow-lg">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2 }}
            className="flex justify-center mb-6"
          >
            <CheckCircle className="text-green-500" size={48} />
          </motion.div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Wish Sent Successfully!
          </h2>
          <p className="text-gray-600 mb-6">
            Your kind thoughts are now floating in the universe, ready to brighten someone's day.
          </p>
        </div>
      </motion.div>
    </PageLayout>
  );
};