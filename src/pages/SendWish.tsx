import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Send } from 'lucide-react';
import { motion } from 'framer-motion';
import { PageLayout } from '../components/PageLayout';
import { wishesApi } from '../services/api';

export const SendWish: React.FC = () => {
  const [wish, setWish] = useState('');
  const [isSending, setIsSending] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('handleSubmit called');
    if (!wish.trim()) return;
    
    setIsSending(true);
    try {
      await wishesApi.create(wish);
      console.log('Wish sent successfully');
      navigate('/wish-sent');
    } catch (error) {
      console.error('Failed to send wish:', error);
      alert('Failed to send wish. Please try again.');
    } finally {
      setIsSending(false);
    }
  };

  return (
    <PageLayout>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md mx-auto relative z-10"
      >
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label 
              htmlFor="wish" 
              className="block text-lg font-medium text-gray-700 mb-2"
            >
              Write your wish
            </label>
            <textarea
              id="wish"
              value={wish}
              onChange={(e) => setWish(e.target.value)}
              className="w-full h-32 p-4 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent resize-none relative z-10"
              placeholder="Share your kind thoughts..."
              required
            />
          </div>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={isSending || !wish.trim()}
            className="w-full py-3 px-6 bg-teal-600 text-white rounded-lg font-medium flex items-center justify-center space-x-2 hover:bg-teal-700 transition-colors disabled:bg-teal-400"
          >
            <Send size={20} />
            <span>{isSending ? 'Sending...' : 'Send Wish'}</span>
          </motion.button>
        </form>
      </motion.div>
    </PageLayout>
  );
};